# 13.3 OpenFeign 服务调用

## 一、OpenFeign 简介

### 1.1 什么是 OpenFeign

OpenFeign 是一个声明式的 HTTP 客户端，让微服务之间的调用变得更简单。

**特点**：
- 声明式接口
- 支持负载均衡
- 集成 Ribbon
- 支持熔断降级

### 1.2 对比 RestTemplate

```java
// RestTemplate（命令式）
Result<User> user = restTemplate.getForObject(
    "http://service-user/users/" + id,
    Result.class
);

// OpenFeign（声明式）
@FeignClient("service-user")
public interface UserClient {
    @GetMapping("/users/{id}")
    Result<User> getUser(@PathVariable("id") Long id);
}

// 调用
Result<User> user = userClient.getUser(id);
```

## 二、快速开始

### 2.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

### 2.2 开启 Feign

```java
@SpringBootApplication
@EnableFeignClients  // 开启 Feign 客户端
public class ConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
```

### 2.3 创建 Feign 接口

```java
@FeignClient("service-user")
public interface UserClient {
    
    @GetMapping("/users/{id}")
    Result<User> getUser(@PathVariable("id") Long id);
    
    @GetMapping("/users")
    Result<List<User>> list();
    
    @PostMapping("/users")
    Result<User> create(@RequestBody User user);
}
```

### 2.4 使用 Feign 客户端

```java
@RestController
@RequestMapping("/orders")
public class OrderController {
    
    @Autowired
    private UserClient userClient;
    
    @GetMapping("/{id}")
    public Result<Order> getOrder(@PathVariable Long id) {
        // 调用远程服务
        Result<User> userResult = userClient.getUser(id);
        
        Order order = new Order();
        order.setId(id);
        order.setUser(userResult.getData());
        order.setAmount(new BigDecimal("100.00"));
        
        return Result.success(order);
    }
}
```

## 三、Feign 配置

### 3.1 配置文件

```yaml
feign:
  client:
    config:
      default:  # 全局配置
        connectTimeout: 5000  # 连接超时
        readTimeout: 10000    # 读取超时
        loggerLevel: BASIC    # 日志级别
      service-user:  # 指定服务配置
        connectTimeout: 10000
        readTimeout: 30000
```

### 3.2 日志级别

```yaml
feign:
  client:
    config:
      default:
        loggerLevel: FULL  # NONE, BASIC, HEADERS, FULL
```

```java
@Configuration
public class FeignConfig {
    
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
```

### 3.3 日志输出

```yaml
logging:
  level:
    com.example.client.UserClient: DEBUG
```

## 四、高级用法

### 4.1 继承接口

```java
// 公共接口
public interface IUserService {
    @GetMapping("/users/{id}")
    Result<User> getUser(@PathVariable("id") Long id);
    
    @PostMapping("/users")
    Result<User> create(@RequestBody User user);
}

// Feign 客户端继承接口
@FeignClient("service-user")
public interface UserClient extends IUserService {
    
    @Override
    @GetMapping("/users/{id}")
    Result<User> getUser(@PathVariable("id") Long id);
    
    @GetMapping("/users/list")
    Result<List<User>> list();
}
```

### 4.2 请求头传递

```java
@FeignClient("service-user")
public interface UserClient {
    
    @GetMapping("/users/{id}")
    Result<User> getUser(
        @PathVariable("id") Long id,
        @RequestHeader("Authorization") String token
    );
    
    @PostMapping("/users")
    Result<User> create(
        @RequestBody User user,
        @RequestHeader Map<String, String> headers
    );
}
```

### 4.3 请求参数

```java
@FeignClient("service-user")
public interface UserClient {
    
    // 单个参数
    @GetMapping("/users/search")
    Result<User> findByName(@RequestParam("name") String name);
    
    // 多个参数
    @GetMapping("/users/search")
    Result<List<User>> search(
        @RequestParam("name") String name,
        @RequestParam("age") Integer age
    );
    
    // 参数对象
    @GetMapping("/users/search")
    Result<List<User>> search(UserQuery query);
}
```

### 4.4 超时配置

```java
@Configuration
public class FeignConfig {
    
    @Bean
    public Request.Options options() {
        // 连接超时 5 秒，读取超时 10 秒
        return new Request.Options(5000, 10000);
    }
}
```

## 五、拦截器

### 5.1 创建拦截器

```java
@Component
public class FeignInterceptor implements RequestInterceptor {
    
    @Override
    public void apply(RequestTemplate template) {
        // 获取当前请求
        ServletRequestAttributes attributes = 
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            
            // 传递 Token
            String token = request.getHeader("Authorization");
            if (token != null) {
                template.header("Authorization", token);
            }
            
            // 传递用户信息
            String userId = request.getHeader("X-User-Id");
            if (userId != null) {
                template.header("X-User-Id", userId);
            }
        }
        
        // 添加统一请求头
        template.header("X-Request-Source", "order-service");
    }
}
```

### 5.2 配置拦截器

```java
@Configuration
public class FeignConfig {
    
    @Bean
    public RequestInterceptor requestInterceptor() {
        return new FeignInterceptor();
    }
}
```

## 六、负载均衡

### 6.1 启用负载均衡

```java
@SpringBootApplication
@EnableFeignClients
public class ConsumerApplication {
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### 6.2 负载均衡策略

```java
@Configuration
public class LoadBalancerConfig {
    
    @Bean
    public IRule loadBalancerRule() {
        // 轮询策略
        return new RoundRobinRule();
        
        // 随机策略
        // return new RandomRule();
        
        // 权重策略
        // return new WeightedResponseTimeRule();
    }
}
```

## 七、熔断降级

### 7.1 添加 Sentinel 依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

### 7.2 配置熔断

```yaml
feign:
  sentinel:
    enabled: true

spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
      datasource:
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: ${spring.application.name}-sentinel
            groupId: DEFAULT_GROUP
            rule-type: flow
```

### 7.3 降级处理

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
                // 降级处理
                User user = new User();
                user.setId(id);
                user.setName("降级用户");
                return Result.success(user);
            }
        };
    }
}
```

## 八、综合示例

### 8.1 完整 Feign 客户端

```java
@FeignClient(
    name = "service-user",
    configuration = FeignConfig.class,
    fallbackFactory = UserClientFallbackFactory.class
)
public interface UserClient {
    
    @GetMapping("/users/{id}")
    Result<User> getUser(@PathVariable("id") Long id);
    
    @GetMapping("/users")
    Result<List<User>> list();
    
    @PostMapping("/users")
    Result<User> create(@RequestBody User user);
    
    @PutMapping("/users/{id}")
    Result<User> update(
        @PathVariable("id") Long id,
        @RequestBody User user
    );
    
    @DeleteMapping("/users/{id}")
    Result<Void> delete(@PathVariable("id") Long id);
    
    @GetMapping("/users/search")
    Result<List<User>> search(@RequestParam Map<String, Object> params);
}
```

### 8.2 Feign 配置类

```java
@Configuration
public class FeignConfig {
    
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
    
    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            // 添加统一请求头
            template.header("X-Request-Source", "order-service");
            template.header("X-Request-Time", String.valueOf(System.currentTimeMillis()));
        };
    }
    
    @Bean
    public Retryer retryer() {
        // 重试配置
        return new Retryer.Default(100, 1000, 3);
    }
}
```

### 8.3 使用示例

```java
@RestController
@RequestMapping("/orders")
public class OrderController {
    
    @Autowired
    private UserClient userClient;
    
    @GetMapping("/{id}")
    public Result<Order> getOrder(@PathVariable Long id) {
        // 获取用户信息
        Result<User> userResult = userClient.getUser(id);
        
        if (userResult.getCode() != 200) {
            return Result.error("获取用户信息失败");
        }
        
        // 创建订单
        Order order = new Order();
        order.setId(id);
        order.setUser(userResult.getData());
        order.setAmount(new BigDecimal("100.00"));
        order.setStatus(OrderStatus.PENDING);
        
        return Result.success(order);
    }
    
    @PostMapping
    public Result<Order> createOrder(@RequestBody OrderDTO dto) {
        // 验证用户
        Result<User> userResult = userClient.getUser(dto.getUserId());
        if (userResult.getData() == null) {
            return Result.error("用户不存在");
        }
        
        // 创建订单逻辑
        Order order = new Order();
        order.setUserId(dto.getUserId());
        order.setProductId(dto.getProductId());
        order.setAmount(dto.getAmount());
        
        return Result.success(order);
    }
}
```

## 九、小结

本节要点：
1. **OpenFeign**：声明式 HTTP 客户端
2. **基本用法**：@FeignClient、@EnableFeignClients
3. **配置**：超时、日志、拦截器
4. **负载均衡**：集成 Ribbon
5. **熔断降级**：集成 Sentinel

---

[上一节：13.2 Nacos 服务注册与发现](./13-02-Nacos 服务注册发现.md) | [下一节：13.4 Sentinel 服务熔断](./13-04-Sentinel 服务熔断.md)
