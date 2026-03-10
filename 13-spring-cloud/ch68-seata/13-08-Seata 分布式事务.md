# 13.8 Seata 分布式事务

## 一、分布式事务简介

### 1.1 什么是分布式事务

分布式事务是指在不同服务之间的事务处理，保证数据的一致性。

**本地事务**：
```
服务 A → 数据库 A（事务）
```

**分布式事务**：
```
服务 A → 数据库 A（事务）
   ↓
服务 B → 数据库 B（事务）
```

### 1.2 CAP 理论

| 特性 | 说明 |
|------|------|
| Consistency | 一致性 |
| Availability | 可用性 |
| Partition Tolerance | 分区容错性 |

**CAP 只能三选二**

### 1.3 BASE 理论

| 特性 | 说明 |
|------|------|
| Basically Available | 基本可用 |
| Soft state | 软状态 |
| Eventually consistent | 最终一致性 |

## 二、Seata 简介

### 2.1 什么是 Seata

Seata 是阿里巴巴开源的分布式事务解决方案。

**核心概念**：
- TC（Transaction Coordinator）：事务协调器
- TM（Transaction Manager）：事务管理器
- RM（Resource Manager）：资源管理器

### 2.2 Seata 架构

```
┌─────────────┐
│     TM      │
│  事务管理器  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│     TC      │
│  事务协调器  │
└──────┬──────┘
       │
       ├──→ RM1（服务 A）
       └──→ RM2（服务 B）
```

## 三、Seata 安装

### 3.1 Docker 安装

```bash
docker run -d \
  -p 8091:8091 \
  --name seata-server \
  seataio/seata-server:1.5.2 \
  -h localhost -p 8091
```

### 3.2 数据库初始化

```sql
-- 创建 undo_log 表（每个业务数据库）
CREATE TABLE undo_log (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    branch_id BIGINT(20) NOT NULL,
    xid VARCHAR(100) NOT NULL,
    context VARCHAR(128) NOT NULL,
    rollback_info LONGBLOB NOT NULL,
    log_status INT(11) NOT NULL,
    log_created DATETIME NOT NULL,
    log_modified DATETIME NOT NULL,
    ext VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY ux_undo_log (xid, branch_id)
);
```

## 四、整合 Seata

### 4.1 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

### 4.2 配置文件

```yaml
spring:
  cloud:
    seata:
      tx-service-group: my_test_tx_group  # 事务组
  datasource:
    url: jdbc:mysql://localhost:3306/demo
    username: root
    password: 123456

seata:
  enabled: true
  application-id: ${spring.application.name}
  tx-service-group: ${spring.cloud.seata.tx-service-group}
  service:
    vgroup-mapping:
      my_test_tx_group: default
    grouplist:
      default: localhost:8091
  registry:
    type: file
  config:
    type: file
```

### 4.3 开启分布式事务

```java
@Service
public class OrderService {
    
    @Autowired
    private UserClient userClient;
    
    @Autowired
    private ProductClient productClient;
    
    @GlobalTransactional  // 开启分布式事务
    public Order createOrder(OrderDTO dto) {
        // 1. 扣减库存
        productClient.decreaseStock(dto.getProductId(), dto.getQuantity());
        
        // 2. 扣减余额
        userClient.decreaseBalance(dto.getUserId(), dto.getAmount());
        
        // 3. 创建订单
        Order order = new Order();
        order.setUserId(dto.getUserId());
        order.setProductId(dto.getProductId());
        order.setAmount(dto.getAmount());
        order.setStatus(OrderStatus.PENDING);
        
        return orderMapper.insert(order);
    }
}
```

## 五、事务模式

### 5.1 AT 模式（默认）

**特点**：
- 无侵入
- 两阶段提交
- 基于 undo_log

**流程**：
```
阶段一：
1. 执行业务 SQL
2. 记录 undo_log
3. 提交本地事务

阶段二：
- 提交：删除 undo_log
- 回滚：根据 undo_log 回滚
```

### 5.2 TCC 模式

**特点**：
- 需要实现三个接口
- 性能更好
- 适用场景广

**接口**：
```java
public interface TccTransactionService {
    
    // Try：尝试执行
    boolean tryMethod(OrderDTO dto);
    
    // Confirm：确认执行
    boolean confirmMethod(OrderDTO dto);
    
    // Cancel：取消执行
    boolean cancelMethod(OrderDTO dto);
}
```

### 5.3 Saga 模式

**特点**：
- 长事务处理
- 补偿机制
- 最终一致性

## 六、综合示例

### 6.1 订单服务

```java
@Service
public class OrderService {
    
    @Autowired
    private OrderMapper orderMapper;
    
    @Autowired
    private ProductClient productClient;
    
    @Autowired
    private UserClient userClient;
    
    @GlobalTransactional(timeoutMills = 300000, name = "create-order-tx")
    public Order createOrder(OrderDTO dto) {
        System.out.println("开始创建订单，XID: " + RootContext.getXID());
        
        // 1. 扣减库存
        productClient.decreaseStock(dto.getProductId(), dto.getQuantity());
        
        // 2. 扣减余额
        userClient.decreaseBalance(dto.getUserId(), dto.getAmount());
        
        // 3. 创建订单
        Order order = new Order();
        order.setUserId(dto.getUserId());
        order.setProductId(dto.getProductId());
        order.setAmount(dto.getAmount());
        order.setStatus(OrderStatus.SUCCESS);
        
        orderMapper.insert(order);
        
        System.out.println("订单创建成功");
        return order;
    }
}
```

### 6.2 库存服务

```java
@Service
public class ProductService {
    
    @Autowired
    private ProductMapper productMapper;
    
    @Transactional  // 本地事务
    public void decreaseStock(Long productId, Integer quantity) {
        System.out.println("扣减库存，XID: " + RootContext.getXID());
        
        Product product = productMapper.findById(productId);
        if (product.getStock() < quantity) {
            throw new BusinessException("库存不足");
        }
        
        productMapper.decreaseStock(productId, quantity);
    }
}
```

### 6.3 用户服务

```java
@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Transactional  // 本地事务
    public void decreaseBalance(Long userId, BigDecimal amount) {
        System.out.println("扣减余额，XID: " + RootContext.getXID());
        
        User user = userMapper.findById(userId);
        if (user.getBalance().compareTo(amount) < 0) {
            throw new BusinessException("余额不足");
        }
        
        userMapper.decreaseBalance(userId, amount);
    }
}
```

### 6.4 Feign 客户端

```java
@FeignClient(name = "service-product", fallback = ProductClientFallback.class)
public interface ProductClient {
    
    @PostMapping("/products/decrease")
    void decreaseStock(@RequestParam("productId") Long productId,
                       @RequestParam("quantity") Integer quantity);
}

@FeignClient(name = "service-user", fallback = UserClientFallback.class)
public interface UserClient {
    
    @PostMapping("/users/decrease-balance")
    void decreaseBalance(@RequestParam("userId") Long userId,
                         @RequestParam("amount") BigDecimal amount);
}
```

### 6.5 降级处理

```java
@Component
public class ProductClientFallback implements ProductClient {
    
    @Override
    public void decreaseStock(Long productId, Integer quantity) {
        throw new BusinessException("库存服务调用失败");
    }
}

@Component
public class UserClientFallback implements UserClient {
    
    @Override
    public void decreaseBalance(Long userId, BigDecimal amount) {
        throw new BusinessException("用户服务调用失败");
    }
}
```

## 七、注意事项

### 7.1 性能考虑

- 分布式事务有性能开销
- 合理设置超时时间
- 避免大事务

### 7.2 幂等性

```java
// 确保接口幂等性
@Transactional
public void decreaseStock(Long productId, Integer quantity) {
    // 使用唯一键或乐观锁
    productMapper.decreaseStock(productId, quantity);
}
```

### 7.3 空回滚

```java
// 处理空回滚情况
if (xid == null) {
    // 记录空回滚日志
    return;
}
```

## 八、小结

本节要点：
1. **分布式事务**：跨服务数据一致性
2. **Seata**：分布式事务解决方案
3. **AT 模式**：无侵入，两阶段提交
4. **TCC 模式**：Try-Confirm-Cancel
5. **GlobalTransactional**：开启分布式事务

---

[上一节：13.7 链路追踪](./13-07-链路追踪.md) | [下一章：第 14 章 项目实战](../ch14-project/README.md)
