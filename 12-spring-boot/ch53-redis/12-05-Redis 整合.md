# 12.5 Redis 整合

## 一、Redis 简介

### 1.1 什么是 Redis

Redis（Remote Dictionary Server）是一个开源的、基于内存的键值对存储数据库。

**特点**：
- 基于内存，性能极高
- 支持多种数据结构
- 支持持久化
- 支持主从复制、哨兵、集群
- 支持发布订阅

### 1.2 数据类型

| 类型 | 说明 | 应用场景 |
|------|------|----------|
| String | 字符串 | 缓存、计数器 |
| List | 列表 | 消息队列、最新列表 |
| Set | 集合 | 去重、共同好友 |
| Hash | 哈希 | 对象存储 |
| ZSet | 有序集合 | 排行榜 |

## 二、Spring Data Redis

### 2.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- 连接池 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 2.2 配置文件

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 10s
    lettuce:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0
```

### 2.3 配置类

```java
@Configuration
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 使用 Jackson 序列化
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

## 三、RedisTemplate 使用

### 3.1 注入 RedisTemplate

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
}
```

### 3.2 String 操作

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // 设置值
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }
    
    // 设置值带过期时间
    public void set(String key, Object value, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }
    
    // 获取值
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
    
    // 删除
    public void delete(String key) {
        redisTemplate.delete(key);
    }
    
    // 自增
    public Long increment(String key) {
        return redisTemplate.opsForValue().increment(key);
    }
}
```

### 3.3 Hash 操作

```java
@Service
public class RedisService {
    
    // 设置 hash 字段
    public void hSet(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }
    
    // 获取 hash 字段
    public Object hGet(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }
    
    // 获取整个 hash
    public Map<Object, Object> hGetAll(String key) {
        return redisTemplate.opsForHash().entries(key);
    }
    
    // 删除 hash 字段
    public void hDelete(String key, Object... fields) {
        redisTemplate.opsForHash().delete(key, fields);
    }
}
```

### 3.4 List 操作

```java
@Service
public class RedisService {
    
    // 左侧推入
    public Long leftPush(String key, Object value) {
        return redisTemplate.opsForList().leftPush(key, value);
    }
    
    // 右侧推入
    public Long rightPush(String key, Object value) {
        return redisTemplate.opsForList().rightPush(key, value);
    }
    
    // 左侧弹出
    public Object leftPop(String key) {
        return redisTemplate.opsForList().leftPop(key);
    }
    
    // 获取列表范围
    public List<Object> range(String key, long start, long end) {
        return redisTemplate.opsForList().range(key, start, end);
    }
}
```

### 3.5 Set 操作

```java
@Service
public class RedisService {
    
    // 添加成员
    public Long add(String key, Object... members) {
        return redisTemplate.opsForSet().add(key, members);
    }
    
    // 获取所有成员
    public Set<Object> members(String key) {
        return redisTemplate.opsForSet().members(key);
    }
    
    // 判断是否成员
    public Boolean isMember(String key, Object member) {
        return redisTemplate.opsForSet().isMember(key, member);
    }
    
    // 删除成员
    public Long remove(String key, Object... members) {
        return redisTemplate.opsForSet().remove(key, members);
    }
}
```

### 3.6 ZSet 操作

```java
@Service
public class RedisService {
    
    // 添加成员和分数
    public Boolean add(String key, Object value, double score) {
        return redisTemplate.opsForZSet().add(key, value, score);
    }
    
    // 获取排名（从低到高）
    public Long rank(String key, Object value) {
        return redisTemplate.opsForZSet().rank(key, value);
    }
    
    // 获取指定范围的成员
    public Set<Object> range(String key, long start, long end) {
        return redisTemplate.opsForZSet().range(key, start, end);
    }
    
    // 获取指定分数范围的成员
    public Set<Object> rangeByScore(String key, double min, double max) {
        return redisTemplate.opsForZSet().rangeByScore(key, min, max);
    }
}
```

## 四、缓存注解

### 4.1 添加配置

```yaml
spring:
  cache:
    type: redis
    redis:
      time-to-live: 3600000  # 过期时间 1 小时
```

### 4.2 开启缓存

```java
@SpringBootApplication
@EnableCaching
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 4.3 @Cacheable

```java
@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    // 查询缓存
    @Cacheable(value = "user", key = "#id")
    public User findById(Long id) {
        System.out.println("查询数据库...");
        return userMapper.findById(id);
    }
    
    // 条件缓存
    @Cacheable(value = "user", key = "#id", condition = "#id > 0")
    public User findByIdConditional(Long id) {
        return userMapper.findById(id);
    }
}
```

### 4.4 @CachePut

```java
@Service
public class UserService {
    
    // 更新缓存
    @CachePut(value = "user", key = "#user.id")
    public User update(User user) {
        userMapper.update(user);
        return user;
    }
}
```

### 4.5 @CacheEvict

```java
@Service
public class UserService {
    
    // 删除缓存
    @CacheEvict(value = "user", key = "#id")
    public void delete(Long id) {
        userMapper.delete(id);
    }
    
    // 删除所有缓存
    @CacheEvict(value = "user", allEntries = true)
    public void deleteAll() {
        // ...
    }
}
```

### 4.6 @Caching

```java
@Service
public class UserService {
    
    @Caching(evict = {
        @CacheEvict(value = "user", key = "#id"),
        @CacheEvict(value = "user_list", allEntries = true)
    })
    public void delete(Long id) {
        userMapper.delete(id);
    }
}
```

## 五、Redis 分布式锁

### 5.1 使用 Redisson

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.21.3</version>
</dependency>
```

### 5.2 配置类

```java
@Configuration
public class RedissonConfig {
    
    @Bean
    public RedissonClient redissonClient() {
        Config config = new Config();
        config.useSingleServer()
              .setAddress("redis://localhost:6379");
        return Redisson.create(config);
    }
}
```

### 5.3 使用分布式锁

```java
@Service
public class OrderService {
    
    @Autowired
    private RedissonClient redissonClient;
    
    public void createOrder(String userId) {
        RLock lock = redissonClient.getLock("order:lock:" + userId);
        
        if (lock.tryLock()) {
            try {
                // 业务逻辑
                // ...
            } finally {
                lock.unlock();
            }
        } else {
            throw new BusinessException("系统繁忙，请稍后重试");
        }
    }
}
```

### 5.4 使用 RedisTemplate 实现

```java
@Service
public class RedisLockService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    public boolean tryLock(String key, String value, long expire) {
        Boolean success = redisTemplate.opsForValue()
                .setIfAbsent(key, value, expire, TimeUnit.SECONDS);
        return Boolean.TRUE.equals(success);
    }
    
    public boolean unlock(String key, String value) {
        Object currentValue = redisTemplate.opsForValue().get(key);
        if (value.equals(currentValue)) {
            redisTemplate.delete(key);
            return true;
        }
        return false;
    }
}
```

## 六、综合示例

### 6.1 缓存商品数据

```java
@Service
public class ProductService {
    
    @Autowired
    private ProductMapper productMapper;
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // 查询商品，先查缓存，缓存没有查数据库
    public Product findById(Long id) {
        String key = "product:" + id;
        
        // 查缓存
        Product product = (Product) redisTemplate.opsForValue().get(key);
        if (product != null) {
            return product;
        }
        
        // 查数据库
        product = productMapper.findById(id);
        if (product != null) {
            // 写入缓存，30 分钟过期
            redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
        }
        
        return product;
    }
    
    // 更新商品，同时更新缓存
    public void update(Product product) {
        productMapper.update(product);
        
        String key = "product:" + product.getId();
        redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
    }
    
    // 删除商品，同时删除缓存
    public void delete(Long id) {
        productMapper.delete(id);
        redisTemplate.delete("product:" + id);
    }
}
```

### 6.2 商品库存扣减（分布式锁）

```java
@Service
public class SeckillService {
    
    @Autowired
    private RedissonClient redissonClient;
    
    @Autowired
    private ProductMapper productMapper;
    
    public void seckill(Long productId, Long userId) {
        String lockKey = "seckill:lock:" + productId;
        RLock lock = redissonClient.getLock(lockKey);
        
        if (lock.tryLock()) {
            try {
                // 检查库存
                Product product = productMapper.findById(productId);
                if (product.getStock() <= 0) {
                    throw new BusinessException("库存不足");
                }
                
                // 扣减库存
                productMapper.decreaseStock(productId);
                
                // 创建订单
                // ...
            } finally {
                lock.unlock();
            }
        } else {
            throw new BusinessException("系统繁忙");
        }
    }
}
```

## 七、小结

本节要点：
1. **RedisTemplate**：操作 Redis 各种数据结构
2. **缓存注解**：@Cacheable、@CachePut、@CacheEvict
3. **分布式锁**：Redisson 或 RedisTemplate 实现
4. **应用场景**：缓存、计数器、排行榜、分布式锁

---

[上一节：12.4 数据访问](./12-04-数据访问.md) | [下一节：12.6 消息队列](./12-06-消息队列.md)
