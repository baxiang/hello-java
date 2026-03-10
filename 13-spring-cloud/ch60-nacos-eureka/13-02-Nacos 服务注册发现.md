# 13.2 Nacos 服务注册与发现

## 一、Nacos 简介

### 1.1 什么是 Nacos

Nacos（Naming and Configuration Service）是阿里巴巴开源的服务发现和配置管理平台。

**功能**：
- 服务注册与发现
- 配置管理
- 服务元数据管理
- 服务健康检查

### 1.2 Nacos 架构

```
┌─────────────────────────────────────────┐
│              Nacos Server               │
│  ┌─────────────┐    ┌─────────────┐    │
│  │  命名服务   │    │  配置服务   │    │
│  └─────────────┘    └─────────────┘    │
└─────────────────────────────────────────┘
              ↑              ↑
              │              │
     服务注册与发现    配置管理
```

## 二、Nacos 安装

### 2.1 Docker 安装

```bash
# 单机模式
docker run -d \
  -p 8848:8848 \
  -p 9848:9848 \
  -p 9849:9849 \
  --name nacos \
  -e MODE=standalone \
  nacos/nacos-server:2.2.0
```

### 2.2 访问控制台

```
http://localhost:8848/nacos
默认账号：nacos/nacos
```

## 三、服务提供者

### 3.1 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 3.2 配置文件

```yaml
server:
  port: 8081

spring:
  application:
    name: service-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: public
        group: DEFAULT_GROUP
```

### 3.3 启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
```

### 3.4 服务接口

```java
@RestController
@RequestMapping("/user")
public class UserController {
    
    @Value("${server.port}")
    private String port;
    
    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        User user = new User(id, "张三" + port, 18);
        return Result.success(user);
    }
    
    @GetMapping("/list")
    public Result<List<User>> list() {
        List<User> users = Arrays.asList(
            new User(1L, "张三", 18),
            new User(2L, "李四", 20)
        );
        return Result.success(users);
    }
}
```

## 四、服务消费者

### 4.1 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

### 4.2 配置文件

```yaml
server:
  port: 8082

spring:
  application:
    name: service-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
```

### 4.3 使用 RestTemplate

```java
@SpringBootApplication
@EnableDiscoveryClient
public class ConsumerApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
    
    @Bean
    @LoadBalanced  // 启用负载均衡
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

```java
@RestController
@RequestMapping("/order")
public class OrderController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @GetMapping("/{id}")
    public Result<Order> getOrder(@PathVariable Long id) {
        // 通过服务名调用
        Result<User> user = restTemplate.getForObject(
            "http://service-provider/user/" + id,
            Result.class
        );
        
        Order order = new Order(id, user.getData(), new BigDecimal("100.00"));
        return Result.success(order);
    }
}
```

### 4.4 使用 DiscoveryClient

```java
@RestController
@RequestMapping("/discover")
public class DiscoveryController {
    
    @Autowired
    private DiscoveryClient discoveryClient;
    
    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }
    
    @GetMapping("/instances/{serviceId}")
    public List<ServiceInstance> getInstances(@PathVariable String serviceId) {
        return discoveryClient.getInstances(serviceId);
    }
}
```

## 五、负载均衡

### 5.1 配置负载均衡

```java
@Configuration
public class LoadBalancerConfig {
    
    @Bean
    public ServiceInstanceListSupplier serviceInstanceListSupplier() {
        return ServiceInstanceListSupplier.builder()
            .withDiscoveryClient()
            .withHealthChecks()
            .build();
    }
}
```

### 5.2 负载均衡策略

```yaml
spring:
  cloud:
    loadbalancer:
      ribbon:
        enabled: false  # 禁用 Ribbon
      configurations: zone-preference  # 区域优先
```

### 5.3 自定义策略

```java
@Configuration
public class CustomLoadBalancerConfig {
    
    @Bean
    public ReactorServiceInstanceLoadBalancer loadBalancer(
            Environment environment,
            LoadBalancerClient loadBalancerClient) {
        return new RandomLoadBalancer(environment, loadBalancerClient);
    }
}
```

## 六、多实例部署

### 6.1 启动多个提供者

```bash
# 实例 1
java -jar provider.jar --server.port=8081

# 实例 2
java -jar provider.jar --server.port=8082

# 实例 3
java -jar provider.jar --server.port=8083
```

### 6.2 查看服务列表

访问 Nacos 控制台：
```
http://localhost:8848/nacos
服务管理 → 服务列表 → service-provider
```

### 6.3 测试负载均衡

```java
@RestController
@RequestMapping("/test")
public class LoadBalanceTestController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @GetMapping("/balance")
    public List<String> testLoadBalance() {
        List<String> results = new ArrayList<>();
        
        // 多次调用，观察负载均衡
        for (int i = 0; i < 10; i++) {
            String result = restTemplate.getForObject(
                "http://service-provider/user/1",
                String.class
            );
            results.add(result);
        }
        
        return results;
    }
}
```

## 七、服务元数据

### 7.1 配置元数据

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        metadata:
          version: 1.0.0
          region: beijing
          zone: zone1
```

### 7.2 获取元数据

```java
@RestController
public class MetadataController {
    
    @Autowired
    private DiscoveryClient discoveryClient;
    
    @GetMapping("/metadata")
    public Map<String, String> getMetadata() {
        List<ServiceInstance> instances = 
            discoveryClient.getInstances("service-provider");
        
        if (!instances.isEmpty()) {
            return instances.get(0).getMetadata();
        }
        return Collections.emptyMap();
    }
}
```

## 八、健康检查

### 8.1 Nacos 健康检查

```
Nacos Server
    ↓ 心跳检测（5 秒）
服务实例
    ↓ 上报健康状态
Nacos Server
```

### 8.2 配置健康检查

```yaml
spring:
  cloud:
    nacos:
      discovery:
        # 心跳间隔
        heart-beat-interval: 5000
        # 心跳超时
        heart-beat-timeout: 15000
        # IP 保护时间
        ip-delete-timeout: 30000
```

### 8.3 临时实例 vs 持久化实例

```yaml
# 临时实例（默认）
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: true  # 临时实例，心跳停止后移除

# 持久化实例
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false  # 持久化实例，心跳停止后标记不健康
```

## 九、综合示例

### 9.1 完整服务提供者

```java
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

```yaml
server:
  port: 8081

spring:
  application:
    name: service-user
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: public
        group: DEFAULT_GROUP
        metadata:
          version: 1.0.0

management:
  endpoints:
    web:
      exposure:
        include: health,info
```

```java
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Value("${server.port}")
    private String port;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id) {
        return Result.success(userService.findById(id));
    }
    
    @GetMapping
    public Result<List<User>> list() {
        return Result.success(userService.findAll());
    }
    
    @PostMapping
    public Result<User> create(@RequestBody User user) {
        userService.save(user);
        return Result.success(user);
    }
    
    @GetMapping("/port")
    public String getPort() {
        return "当前端口：" + port;
    }
}
```

### 9.2 完整服务消费者

```java
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @Bean
    public OpenFeign feign() {
        return OpenFeign.builder();
    }
}
```

```java
@RestController
@RequestMapping("/orders")
public class OrderController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private UserFeignClient userFeignClient;
    
    @GetMapping("/{id}")
    public Result<Order> getById(@PathVariable Long id) {
        // 方式 1：RestTemplate
        Result<User> user = restTemplate.getForObject(
            "http://service-user/users/" + id,
            Result.class
        );
        
        Order order = new Order();
        order.setId(id);
        order.setUser(user.getData());
        order.setAmount(new BigDecimal("100.00"));
        
        return Result.success(order);
    }
    
    @GetMapping("/feign/{id}")
    public Result<Order> getByFeign(@PathVariable Long id) {
        // 方式 2：Feign
        Result<User> user = userFeignClient.getUser(id);
        
        Order order = new Order();
        order.setId(id);
        order.setUser(user.getData());
        order.setAmount(new BigDecimal("100.00"));
        
        return Result.success(order);
    }
}
```

## 十、小结

本节要点：
1. **Nacos**：服务注册与发现
2. **服务提供者**：@EnableDiscoveryClient
3. **服务消费者**：RestTemplate + @LoadBalanced
4. **负载均衡**：客户端负载均衡
5. **健康检查**：心跳检测机制

---

[上一节：13.1 微服务架构概述](./13-01-微服务架构概述.md) | [下一节：13.3 OpenFeign 服务调用](./13-03-OpenFeign 服务调用.md)
