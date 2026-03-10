# 72.2 Redis 预减库存：如何提升性能？

## 一、先问一个问题

**为什么用 Redis 预减库存？**

### 生活例子：电影院选座

```
传统方式
└── 每次查询数据库 → 慢

Redis 方式
└── 座位图在内存 → 快
```

**Redis 优势**：
- 内存操作，性能高
- 原子操作，防超卖
- 支持高并发

## 二、实现方案

### 预热库存

```java
@Service
public class SeckillService {
    
    @Autowired
    private RedisTemplate<String, Integer> redisTemplate;
    
    // 秒杀开始前，加载库存到 Redis
    public void warmUp(Long productId, Integer stock) {
        String key = "seckill:stock:" + productId;
        redisTemplate.opsForValue().set(key, stock);
    }
}
```

### 预减库存

```java
public boolean decreaseStock(Long productId) {
    String key = "seckill:stock:" + productId;
    
    // 原子递减
    Integer stock = redisTemplate.opsForValue().decrement(key);
    
    if (stock < 0) {
        // 库存不足，恢复
        redisTemplate.opsForValue().increment(key);
        return false;
    }
    
    return true;
}
```

## 三、小结

| 操作 | Redis 命令 | 说明 |
|------|------------|------|
| 预热 | SET | 加载库存 |
| 预减 | DECR | 原子递减 |
| 恢复 | INCR | 库存回滚 |

**核心要点**：
- 库存预热到 Redis
- 原子操作防超卖
- 失败恢复库存

---

[上一节：72.1 秒杀架构](./72-01-秒杀架构/14-04-秒杀架构.md) | 
[下一节：72.3 RabbitMQ 异步](./72-03-RabbitMQ 异步/14-04-RabbitMQ 异步.md)
