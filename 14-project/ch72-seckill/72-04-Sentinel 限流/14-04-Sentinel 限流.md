# 72.4 Sentinel 限流：如何保护系统？

## 一、先问一个问题

**为什么需要限流？**

### 生活例子：景区限流

```
不限流
└── 10000 人同时进入 → 挤爆

限流
└── 每分钟进入 100 人 → 有序
```

**限流作用**：
- 保护系统
- 防止雪崩
- 公平访问

## 二、实现方案

### 配置限流规则

```java
@Configuration
public class SentinelConfig {
    
    @PostConstruct
    public void initRules() {
        List<FlowRule> rules = new ArrayList<>();
        
        FlowRule rule = new FlowRule();
        rule.setResource("seckill:execute");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(1000);  // QPS 限制
        rules.add(rule);
        
        FlowRuleManager.loadRules(rules);
    }
}
```

### 限流注解

```java
@Service
public class SeckillService {
    
    @SentinelResource(
        value = "seckill:execute",
        blockHandler = "handleBlock"
    )
    public String seckill(Long productId, String token) {
        // 秒杀逻辑
    }
    
    // 限流处理方法
    public String handleBlock(Long productId, String token, BlockException ex) {
        throw new BusinessException("系统繁忙，请稍后重试");
    }
}
```

## 三、小结

| 配置 | 说明 | 示例 |
|------|------|------|
| QPS 限流 | 每秒请求数 | 1000 QPS |
| 线程限流 | 并发线程数 | 100 线程 |
| 热点限流 | 参数限流 | 用户 ID 限流 |

**核心要点**：
- 配置限流规则
- 限流后友好提示
- 保护系统不崩溃

---

[上一节：72.3 RabbitMQ 异步](./72-03-RabbitMQ 异步/14-04-RabbitMQ 异步.md) | 
[下一节：72.5 分布式锁](./72-05-分布式锁/14-04-分布式锁.md)
