# 13.5 Gateway API 网关

## 一、Gateway 简介

### 1.1 什么是 API 网关

API 网关是微服务架构的统一入口，提供：
- 路由转发
- 负载均衡
- 权限验证
- 限流熔断
- 日志监控

### 1.2 Gateway 特点

- 基于 Spring WebFlux
- 高性能异步非阻塞
- 支持动态路由
- 丰富的过滤器

## 二、创建网关项目

### 2.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

### 2.2 配置文件

```yaml
server:
  port: 9000

spring:
  application:
    name: api-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true  # 启用服务发现
          lower-case-service-id: true  # 小写服务名
```

### 2.3 启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
```

## 三、路由配置

### 3.1 基础路由

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service          # 路由 ID
          uri: lb://service-user    # 目标服务（负载均衡）
          predicates:
            - Path=/api/user/**     # 路径匹配
          filters:
            - StripPrefix=1         # 去掉路径前缀
```

### 3.2 多路由配置

```yaml
spring:
  cloud:
    gateway:
      routes:
        # 用户服务
        - id: user-service
          uri: lb://service-user
          predicates:
            - Path=/api/user/**
          filters:
            - StripPrefix=1
        
        # 订单服务
        - id: order-service
          uri: lb://service-order
          predicates:
            - Path=/api/order/**
          filters:
            - StripPrefix=1
        
        # 商品服务
        - id: product-service
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          filters:
            - StripPrefix=1
```

### 3.3 路由断言

| 断言 | 说明 | 示例 |
|------|------|------|
| Path | 路径匹配 | Path=/api/** |
| Method | 请求方法 | Method=GET,POST |
| Header | 请求头 | Header=X-Request-Id, \d+ |
| Query | 查询参数 | Query=page, \d+ |
| Host | 主机名 | Host=**.example.com |
| RemoteAddr | 远程地址 | RemoteAddr=192.168.1.1/24 |
| Between | 时间范围 | Between=2024-01-01,2024-12-31 |

### 3.4 组合断言

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://service-user
          predicates:
            - Path=/api/user/**
            - Method=GET,POST
            - Header=Authorization, Bearer.*
```

## 四、过滤器

### 4.1 内置过滤器

| 过滤器 | 说明 |
|--------|------|
| StripPrefix | 去掉路径前缀 |
| PrefixPath | 添加路径前缀 |
| AddRequestHeader | 添加请求头 |
| AddResponseHeader | 添加响应头 |
| AddRequestParameter | 添加请求参数 |
| RedirectTo | 重定向 |
| Retry | 重试 |

### 4.2 过滤器配置

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://service-user
          predicates:
            - Path=/api/user/**
          filters:
            - StripPrefix=1
            - AddRequestHeader=X-Request-Source, gateway
            - AddResponseHeader=X-Response-Time, ${spring.application.name}
            - name: Retry
              args:
                retries: 3
                statuses: BAD_GATEWAY
                methods: GET
                backoff:
                  firstBackoff: 10ms
                  maxBackoff: 50ms
                  factor: 2
```

### 4.3 自定义全局过滤器

```java
@Component
public class AuthFilter implements GlobalFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, 
                            GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().value();
        
        // 白名单放行
        if (path.contains("/login") || path.contains("/register")) {
            return chain.filter(exchange);
        }
        
        // 验证 Token
        String token = request.getHeaders().getFirst("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        // 验证 Token 逻辑
        // ...
        
        // 传递用户信息到下游服务
        ServerHttpRequest newRequest = request.mutate()
            .header("X-User-Id", "123")
            .header("X-Username", "admin")
            .build();
        
        return chain.filter(exchange.mutate().request(newRequest).build());
    }
    
    @Override
    public int getOrder() {
        return -100;  // 优先级
    }
}
```

### 4.4 自定义局部过滤器

```java
@Component
public class LogFilter implements GatewayFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, 
                            GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        
        long startTime = System.currentTimeMillis();
        
        System.out.println("请求路径：" + request.getPath());
        System.out.println("请求方法：" + request.getMethod());
        
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long endTime = System.currentTimeMillis();
            System.out.println("响应时间：" + (endTime - startTime) + "ms");
        }));
    }
    
    @Override
    public int getOrder() {
        return 0;
    }
}
```

```java
@Configuration
public class FilterConfig {
    
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r
                .path("/api/user/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .filter(new LogFilter())
                )
                .uri("lb://service-user")
            )
            .build();
    }
}
```

## 五、限流配置

### 5.1 集成 Sentinel

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
</dependency>
```

### 5.2 配置限流

```yaml
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
```

### 5.3 网关限流规则

```json
[
  {
    "resource": "api-gateway",
    "limitApp": "default",
    "grade": 1,
    "count": 100,
    "strategy": 0,
    "controlBehavior": 0
  },
  {
    "resource": "api-gateway#GET:/api/user/**",
    "limitApp": "default",
    "grade": 1,
    "count": 50,
    "strategy": 0,
    "controlBehavior": 0
  }
]
```

## 六、跨域配置

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsWebFilter(source);
    }
}
```

## 七、综合示例

### 7.1 完整网关配置

```yaml
server:
  port: 9000

spring:
  application:
    name: api-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
      routes:
        # 用户服务
        - id: service-user
          uri: lb://service-user
          predicates:
            - Path=/api/user/**
          filters:
            - StripPrefix=1
            - AddRequestHeader=X-Request-Source, api-gateway
        
        # 订单服务
        - id: service-order
          uri: lb://service-order
          predicates:
            - Path=/api/order/**
          filters:
            - StripPrefix=1
        
        # 商品服务
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          filters:
            - StripPrefix=1
        
        # 认证服务（不 strip prefix）
        - id: service-auth
          uri: lb://service-auth
          predicates:
            - Path=/api/auth/**
        
        # 限流配置
        - id: rate-limit-route
          uri: lb://service-user
          predicates:
            - Path=/api/limit/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
```

### 7.2 统一异常处理

```java
@RestControllerAdvice
public class GatewayExceptionHandler {
    
    @ExceptionHandler(ServerWebInputException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleInputException(ServerWebInputException ex) {
        return Result.error(400, "请求参数错误");
    }
    
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result<Void> handleNotFound(NoHandlerFoundException ex) {
        return Result.error(404, "接口不存在");
    }
}
```

### 7.3 健康检查接口

```java
@RestController
@RequestMapping("/actuator")
public class HealthController {
    
    @GetMapping("/health")
    public Result<Map<String, Object>> health() {
        Map<String, Object> info = new HashMap<>();
        info.put("status", "UP");
        info.put("timestamp", System.currentTimeMillis());
        info.put("service", "api-gateway");
        return Result.success(info);
    }
}
```

## 八、小结

本节要点：
1. **Gateway**：API 网关，统一入口
2. **路由配置**：Path、Method、Header 断言
3. **过滤器**：内置过滤器、自定义过滤器
4. **限流**：集成 Sentinel
5. **跨域**：CorsWebFilter 配置

---

[上一节：13.4 Sentinel 服务熔断](./13-04-Sentinel 服务熔断.md) | [下一节：13.6 Nacos Config 配置中心](./13-06-Nacos Config 配置中心.md)
