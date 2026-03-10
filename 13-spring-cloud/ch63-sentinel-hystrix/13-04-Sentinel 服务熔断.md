# 13.4 Sentinel 服务熔断

## 一、Sentinel 简介

### 1.1 什么是 Sentinel

Sentinel 是阿里巴巴开源的流量控制组件，主要功能：
- 流量控制
- 熔断降级
- 系统负载保护
- 实时监控

### 1.2 核心概念

| 概念 | 说明 |
|------|------|
| 资源 | 需要保护的对象（方法、接口） |
| 规则 | 流量控制规则 |
| 流控模式 | QPS、线程数 |
| 降级策略 | 异常比例、异常数、响应时间 |

## 二、Sentinel 安装

### 2.1 Docker 安装

```bash
docker run -d \
  -p 8080:8080 \
  --name sentinel \
  bladex/sentinel-dashboard:1.8.6
```

### 2.2 访问控制台

```
http://localhost:8080
默认账号：sentinel/sentinel
```

## 三、整合 Sentinel

### 3.1 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

### 3.2 配置文件

```yaml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080  # 控制台地址
        port: 8719                 # 客户端端口
      datasource:
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: ${spring.application.name}-sentinel
            groupId: DEFAULT_GROUP
            rule-type: flow
      enabled: true
```

## 四、流量控制

### 4.1 @SentinelResource 注解

```java
@Service
public class UserService {
    
    @SentinelResource(
        value = "getUserById",           // 资源名
        blockHandler = "blockHandler",   // 限流处理
        fallback = "fallback"            // 降级处理
    )
    public User getUserById(Long id) {
        return userMapper.findById(id);
    }
    
    // 限流处理方法
    public User blockHandler(Long id, BlockException ex) {
        User user = new User();
        user.setId(id);
        user.setName("限流用户");
        return user;
    }
    
    // 降级处理方法
    public User fallback(Long id, Throwable ex) {
        User user = new User();
        user.setId(id);
        user.setName("降级用户");
        return user;
    }
}
```

### 4.2 流控规则

```
资源名：getUserById
阈值类型：QPS
单机阈值：10
流控模式：直接
流控效果：快速失败
```

### 4.3 热点参数限流

```java
@SentinelResource(
    value = "search",
    blockHandler = "blockHandler"
)
public List<User> search(String keyword, Integer page) {
    return userMapper.search(keyword, page);
}
```

## 五、熔断降级

### 5.1 降级策略

| 策略 | 说明 |
|------|------|
| 异常比例 | 异常比例超过阈值 |
| 异常数 | 异常数超过阈值 |
| 响应时间 | 平均响应时间超过阈值 |

### 5.2 配置降级规则

```java
@Service
public class OrderService {
    
    @SentinelResource(
        value = "createOrder",
        fallback = "createOrderFallback",
        fallbackClass = {OrderFallback.class}
    )
    public Order createOrder(OrderDTO dto) {
        // 业务逻辑
        return orderMapper.insert(dto);
    }
}
```

```java
public class OrderFallback {
    
    public static Order createOrderFallback(OrderDTO dto, Throwable ex) {
        Order order = new Order();
        order.setId(0L);
        order.setStatus(OrderStatus.FAILED);
        order.setMessage("系统繁忙，请稍后重试");
        return order;
    }
}
```

### 5.3 Feign 集成熔断

```java
@FeignClient(
    name = "service-user",
    fallbackFactory = UserClientFallbackFactory.class
)
public interface UserClient {
    
    @GetMapping("/users/{id}")
    Result<User> getUser(@PathVariable("id") Long id);
}
```

```java
@Component
public class UserClientFallbackFactory implements FallbackFactory<UserClient> {
    
    @Override
    public UserClient create(Throwable cause) {
        return new UserClient() {
            @Override
            public Result<User> getUser(Long id) {
                // 熔断降级
                User user = new User();
                user.setId(id);
                user.setName("降级用户");
                return Result.success(user);
            }
        };
    }
}
```

## 六、规则持久化

### 6.1 Nacos 配置

```yaml
# Nacos 配置内容
[
  {
    "resource": "getUserById",
    "limitApp": "default",
    "grade": 1,
    "count": 10,
    "strategy": 0,
    "controlBehavior": 0,
    "clusterMode": false
  }
]
```

### 6.2 配置说明

| 字段 | 说明 |
|------|------|
| resource | 资源名 |
| limitApp | 流控应用 |
| grade | 流控类型（0:线程数，1:QPS） |
| count | 阈值 |
| strategy | 流控模式 |
| controlBehavior | 流控效果 |

## 七、系统规则

### 7.1 系统保护

```java
@Configuration
public class SentinelConfig {
    
    @PostConstruct
    public void initSystemRules() {
        List<SystemRule> rules = new ArrayList<>();
        
        // 系统负载
        SystemRule rule1 = new SystemRule();
        rule1.setHighestSystemLoad(2.5);
        rules.add(rule1);
        
        // CPU 使用率
        SystemRule rule2 = new SystemRule();
        rule2.setHighestCpuUsage(0.8);
        rules.add(rule2);
        
        // 平均响应时间
        SystemRule rule3 = new SystemRule();
        rule3.setAvgRt(100);
        rules.add(rule3);
        
        // 最大并发数
        SystemRule rule4 = new SystemRule();
        rule4.setMaxThread(100);
        rules.add(rule4);
        
        SystemRuleManager.loadRules(rules);
    }
}
```

## 八、实时监控

### 8.1 监控指标

- QPS（每秒请求数）
- 响应时间
- 异常数
- 线程数

### 8.2 查看监控

访问 Sentinel 控制台：
```
http://localhost:8080
→ 实时监控
```

## 九、综合示例

### 9.1 完整服务层

```java
@Service
public class ProductService {
    
    @Autowired
    private ProductMapper productMapper;
    
    // 查询商品 - 限流保护
    @SentinelResource(
        value = "getProductById",
        blockHandler = "getProductBlockHandler",
        fallback = "getProductFallback"
    )
    public Product getById(Long id) {
        return productMapper.findById(id);
    }
    
    // 限流处理
    public Product getProductBlockHandler(Long id, BlockException ex) {
        Product product = new Product();
        product.setId(id);
        product.setName("限流商品");
        product.setPrice(new BigDecimal("0.00"));
        return product;
    }
    
    // 降级处理
    public Product getProductFallback(Long id, Throwable ex) {
        Product product = new Product();
        product.setId(id);
        product.setName("降级商品");
        product.setPrice(new BigDecimal("0.00"));
        return product;
    }
    
    // 搜索商品 - 热点参数限流
    @SentinelResource(
        value = "searchProducts",
        blockHandler = "searchBlockHandler"
    )
    public List<Product> search(String keyword, int page, int size) {
        return productMapper.search(keyword, page, size);
    }
    
    public List<Product> searchBlockHandler(String keyword, int page, int size, 
                                            BlockException ex) {
        return Collections.emptyList();
    }
}
```

### 9.2 Controller 层

```java
@RestController
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping("/{id}")
    public Result<Product> getById(@PathVariable Long id) {
        Product product = productService.getById(id);
        return Result.success(product);
    }
    
    @GetMapping("/search")
    public Result<List<Product>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Product> products = productService.search(keyword, page, size);
        return Result.success(products);
    }
}
```

### 9.3 配置规则

```yaml
# application-dev.yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848
            dataId: ${spring.application.name}-flow-rules
            groupId: DEFAULT_GROUP
            rule-type: flow
        degrade:
          nacos:
            server-addr: localhost:8848
            dataId: ${spring.application.name}-degrade-rules
            groupId: DEFAULT_GROUP
            rule-type: degrade
```

```json
// Nacos 流控规则配置
[
  {
    "resource": "getProductById",
    "limitApp": "default",
    "grade": 1,
    "count": 100,
    "strategy": 0,
    "controlBehavior": 0,
    "clusterMode": false
  },
  {
    "resource": "searchProducts",
    "limitApp": "default",
    "grade": 1,
    "count": 50,
    "strategy": 0,
    "controlBehavior": 0,
    "clusterMode": false
  }
]
```

## 十、小结

本节要点：
1. **Sentinel**：流量控制、熔断降级
2. **@SentinelResource**：资源定义
3. **流控规则**：QPS、线程数
4. **降级策略**：异常比例、异常数、响应时间
5. **规则持久化**：Nacos 配置中心

---

[上一节：13.3 OpenFeign 服务调用](./13-03-OpenFeign 服务调用.md) | [下一节：13.5 Gateway API 网关](./13-05-Gateway API 网关.md)
