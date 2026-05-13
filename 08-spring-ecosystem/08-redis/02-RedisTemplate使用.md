# 53.2 RedisTemplate 使用：操作数据结构（生活类比：工具箱）

## 一、先问一个问题
**问题**：如何在代码中操作 Redis 的各种数据类型？
RedisTemplate 就是操作 Redis 的"工具箱"！

### 生活类比
- String 操作：像存纸条，写内容、读内容
- Hash 操作：像存抽屉，多个格子分别存放
- List 操作：像排队，从左边进或右边进
- Set 操作：像抽奖箱，不重复的球

## 二、注入 RedisTemplate

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
}
```

## 三、String 操作

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

## 四、Hash 操作

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
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

## 五、List 操作

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
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

## 六、Set 和 ZSet 操作

### 6.1 Set 操作

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
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
}
```

### 6.2 ZSet 操作

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // 添加成员和分数
    public Boolean zAdd(String key, Object value, double score) {
        return redisTemplate.opsForZSet().add(key, value, score);
    }
    
    // 获取排名（从低到高）
    public Long rank(String key, Object value) {
        return redisTemplate.opsForZSet().rank(key, value);
    }
    
    // 获取指定范围的成员
    public Set<Object> zRange(String key, long start, long end) {
        return redisTemplate.opsForZSet().range(key, start, end);
    }
}
```

## 七、常见疑问

**Q1：opsForValue()、opsForHash() 是什么？**
A：RedisTemplate 针对不同数据类型提供了专门的操作对象，通过 opsForXxx() 获取。

**Q2：为什么返回值有时是 Long，有时是 Boolean？**
A：不同操作返回值不同。如 add 返回添加的成员数（Long），zAdd 返回是否成功（Boolean）。

## 八、小结

| 操作类型 | 获取方式 | 常用方法 |
|----------|----------|----------|
| String | opsForValue() | set, get, increment |
| Hash | opsForHash() | put, get, entries |
| List | opsForList() | leftPush, rightPush, range |
| Set | opsForSet() | add, members, isMember |
| ZSet | opsForZSet() | add, rank, range |
