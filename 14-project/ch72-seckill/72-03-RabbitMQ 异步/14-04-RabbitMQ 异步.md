# 72.3 RabbitMQ 异步：如何异步下单？

## 一、先问一个问题

**为什么需要异步下单？**

### 生活例子：餐厅点餐

```
同步方式
└── 点餐 → 等菜做好 → 吃饭（慢）

异步方式
└── 点餐 → 拿号 → 上菜后通知（快）
```

**异步优势**：
- 快速响应
- 削峰填谷
- 解耦系统

## 二、实现方案

### 发送消息

```java
@Service
public class SeckillService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendSeckillMessage(SeckillMessage message) {
        rabbitTemplate.convertAndSend(
            "seckill.exchange",
            "seckill.order",
            message
        );
    }
}
```

### 消费消息

```java
@Component
public class SeckillConsumer {
    
    @Autowired
    private OrderService orderService;
    
    @RabbitListener(queues = "seckill.order.queue")
    public void handleSeckill(SeckillMessage message) {
        // 创建订单
        orderService.createOrder(message);
        
        // 扣减库存
        orderService.decreaseStock(message);
    }
}
```

## 三、小结

| 角色 | 作用 | 说明 |
|------|------|------|
| Exchange | 消息交换 | 路由消息 |
| Queue | 消息队列 | 存储消息 |
| Consumer | 消费者 | 处理消息 |

**核心要点**：
- 秒杀成功发消息
- 异步创建订单
- 削峰填谷

---

[上一节：72.2 Redis 预减库存](./72-02-Redis 预减库存/14-04-Redis 预减库存.md) | 
[下一节：72.4 Sentinel 限流](./72-04-Sentinel 限流/14-04-Sentinel 限流.md)
