# 53.1 Redis 简介与安装：内存数据库（生活类比：超市货架）

## 一、先问一个问题

**问题**：数据库查询慢，如何提升系统性能？

### 生活例子：超市货架

想象一家大型超市：

- **仓库存储（数据库）**：货物种类齐全、数量庞大，但找货需要时间
- **前台货架（Redis）**：只摆放热销商品，顾客随手可取
- **补货机制**：前台卖完了，立即从仓库补货

如果顾客每次买一瓶水都要去仓库找，效率极低。Redis 就是系统的"前台货架"——把常用数据放在内存中，让访问速度提升几个数量级！

**类比对应**：

| 超市概念 | 系统对应 | 说明 |
|----------|----------|------|
| 仓库 | MySQL | 数据全，查询慢 |
| 前台货架 | Redis | 数据少，读取快 |
| 补货员 | 缓存加载逻辑 | 未命中时从 DB 加载 |
| 货架容量 | Redis 内存 | 需设置过期时间 |

## 二、什么是 Redis

**Redis**（Remote Dictionary Server）是一个开源的、基于内存的键值对存储数据库。

**核心特点**：

- 基于内存，读写速度极快（单机可达 10 万次/秒）
- 支持多种数据结构，不只是简单的 key-value
- 支持持久化（RDB/AOF），数据不丢失
- 支持主从复制、哨兵、集群

## 三、Redis 数据类型

Redis 提供五种核心数据结构，每种都有独特的应用场景：

### 3.1 String（字符串）

最基本的类型，一个 key 对应一个 value。

```bash
SET name "Redis"        # 设置值
GET name                # 获取值
INCR views              # 自增（计数器）
SETEX token 3600 "abc"  # 设置过期时间（秒）
```

**应用场景**：Session 存储、验证码、计数器、分布式锁

### 3.2 List（列表）

双向链表，支持从两端push/pop。

```bash
LPUSH messages "msg1"   # 从左侧插入
RPUSH messages "msg2"   # 从右侧插入
LPOP messages           # 从左侧弹出
LRANGE messages 0 -1    # 获取所有元素
```

**应用场景**：消息队列、最新文章列表、操作日志

### 3.3 Set（集合）

无序、不重复的元素集合。

```bash
SADD tags "java" "redis"    # 添加元素
SMEMBERS tags               # 获取所有元素
SISMEMBER tags "java"       # 判断是否存在
SINTER user1:likes user2:likes  # 交集（共同喜好）
```

**应用场景**：标签系统、共同好友、抽奖去重

### 3.4 Hash（哈希）

适合存储对象，字段独立操作。

```bash
HSET user:1001 name "张三" age 25
HGET user:1001 name
HGETALL user:1001
```

**应用场景**：用户信息、购物车、商品详情

### 3.5 ZSet（有序集合）

带分数的集合，自动排序。

```bash
ZADD rank 100 "player1"     # 添加元素及分数
ZINCRBY rank 50 "player1"   # 增加分数
ZREVRANGE rank 0 9          # 获取 Top 10
ZRANK rank "player1"        # 获取排名
```

**应用场景**：排行榜、优先级队列、延迟任务

## 四、Spring Boot 集成

### 4.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- 连接池支持 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 4.2 配置文件

在 `application.yml` 中配置 Redis 连接信息：

```yaml
spring:
  redis:
    host: localhost          # Redis 服务器地址
    port: 6379               # Redis 端口
    password:                # 密码（无密码留空）
    database: 0              # 数据库索引（0-15）
    timeout: 10s             # 连接超时时间
    lettuce:
      pool:
        max-active: 8        # 最大活跃连接数
        max-wait: -1ms       # 获取连接最大等待时间（-1 表示无限）
        max-idle: 8          # 最大空闲连接数
        min-idle: 0          # 最小空闲连接数
```

**配置说明**：

- `host`：Redis 服务器地址，默认 localhost
- `port`：Redis 端口号，默认 6379
- `database`：使用的数据库编号，默认 0
- `max-active`：连接池最大连接数，根据并发量调整
- `max-idle`：最大空闲连接数，保持一定数量可快速响应

### 4.3 配置类

```java
@Configuration
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 使用 Jackson 序列化值
        Jackson2JsonRedisSerializer<Object> serializer = 
            new Jackson2JsonRedisSerializer<>(Object.class);
        
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);
        
        return template;
    }
}
```

## 五、常见疑问

**Q1：Redis 和数据库有什么区别？**  
A：Redis 基于内存，速度更快但容量有限；数据库基于磁盘，适合持久化存储大量数据。两者通常配合使用，Redis 做缓存，数据库做持久化。

**Q2：Redis 数据会丢失吗？**  
A：默认数据只存在内存中，重启后丢失。可通过 RDB 快照或 AOF 日志实现持久化，根据业务需求选择。

**Q3：为什么需要连接池？**  
A：创建 Redis 连接开销较大。连接池复用已有连接，减少握手次数，提升高并发场景下的性能。

## 六、小结

| 概念 | 说明 | 关键配置 |
|------|------|----------|
| Redis | 内存键值数据库 | host, port, password |
| 数据类型 | String/List/Set/Hash/ZSet | 按场景选用 |
| Spring 集成 | spring-boot-starter-data-redis | RedisTemplate |
| 连接池 | Lettuce + commons-pool2 | max-active, max-idle |

## 七、动手练习

1. 本地安装 Redis 并启动服务（`redis-server`）
2. 创建 Spring Boot 项目，添加 Redis 依赖
3. 配置 `application.yml`，编写 `RedisConfig` 配置类
