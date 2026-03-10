# 13.6 Nacos Config 配置中心

## 一、配置中心简介

### 1.1 为什么需要配置中心

**问题**：
- 配置分散在各个服务中
- 修改配置需要重启服务
- 配置变更难以管理

**解决方案**：
- 配置集中管理
- 配置动态刷新
- 配置版本控制

### 1.2 Nacos Config 架构

```
┌─────────────┐
│  Nacos      │
│  Config     │
│  Server     │
└──────┬──────┘
       │
       ├──→ 服务 A
       ├──→ 服务 B
       └──→ 服务 C
```

## 二、基本使用

### 2.1 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

### 2.2 配置文件

```yaml
# bootstrap.yml
spring:
  application:
    name: service-user
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        file-extension: yaml
        namespace: public
        group: DEFAULT_GROUP
        prefix: ${spring.application.name}
```

### 2.3 Nacos 配置内容

在 Nacos 控制台创建配置：
- Data ID: service-user.yaml
- Group: DEFAULT_GROUP
- 配置内容:
```yaml
server:
  port: 8081

app:
  name: 用户服务
  version: 1.0.0
  enabled: true
```

### 2.4 使用配置

```java
@RestController
public class ConfigController {
    
    @Value("${app.name}")
    private String appName;
    
    @Value("${app.version}")
    private String version;
    
    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("appName", appName);
        config.put("version", version);
        return config;
    }
}
```

## 三、动态刷新

### 3.1 @RefreshScope

```java
@RestController
@RefreshScope  // 开启配置刷新
public class ConfigController {
    
    @Value("${app.name}")
    private String appName;
    
    @Value("${app.version}")
    private String version;
    
    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("appName", appName);
        config.put("version", version);
        return config;
    }
}
```

### 3.2 配置更新流程

```
1. 修改 Nacos 配置
   ↓
2. Nacos 发送变更通知
   ↓
3. 客户端接收通知
   ↓
4. 重新加载配置
   ↓
5. @RefreshScope Bean 重建
```

## 四、配置共享

### 4.1 共享配置

```yaml
# bootstrap.yml
spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        file-extension: yaml
        # 共享配置
        shared-configs:
          - data-id: common-config.yaml
            refresh: true
          - data-id: datasource-config.yaml
            refresh: true
        # 扩展配置
        extension-configs:
          - data-id: redis-config.yaml
            group: DEFAULT_GROUP
            refresh: true
```

### 4.2 配置优先级

```
优先级从高到低：
1. 服务私有配置（service-user.yaml）
2. 扩展配置（extension-configs）
3. 共享配置（shared-configs）
```

## 五、多环境配置

### 5.1 配置文件命名

```
service-user.yaml          # 默认配置
service-user-dev.yaml      # 开发环境
service-user-test.yaml     # 测试环境
service-user-prod.yaml     # 生产环境
```

### 5.2 激活环境

```yaml
# bootstrap.yml
spring:
  application:
    name: service-user
  profiles:
    active: dev  # 激活开发环境
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        file-extension: yaml
        prefix: ${spring.application.name}
        # 多环境配置
        group: DEFAULT_GROUP
        namespace: ${spring.profiles.active}
```

### 5.3 启动指定环境

```bash
# 开发环境
java -jar service-user.jar --spring.profiles.active=dev

# 生产环境
java -jar service-user.jar --spring.profiles.active=prod
```

## 六、配置加密

### 6.1 配置加密内容

```yaml
# Nacos 配置内容
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/demo
    username: ENC(加密后的用户名)
    password: ENC(加密后的密码)
```

### 6.2 解密配置

```java
@Configuration
public class DecryptConfig {
    
    @Bean
    public PropertySourcesPlaceholderConfigurer configurer() {
        PropertySourcesPlaceholderConfigurer configurer = 
            new PropertySourcesPlaceholderConfigurer();
        
        // 添加解密逻辑
        // ...
        
        return configurer;
    }
}
```

## 七、综合示例

### 7.1 完整配置

```yaml
# bootstrap.yml
spring:
  application:
    name: service-order
  profiles:
    active: dev
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        file-extension: yaml
        namespace: ${spring.profiles.active}
        group: DEFAULT_GROUP
        prefix: ${spring.application.name}
        # 共享配置
        shared-configs:
          - data-id: common-config.yaml
            group: DEFAULT_GROUP
            refresh: true
          - data-id: datasource-config.yaml
            group: DEFAULT_GROUP
            refresh: true
        # 扩展配置
        extension-configs:
          - data-id: redis-config.yaml
            group: DEFAULT_GROUP
            refresh: true
          - data-id: mq-config.yaml
            group: DEFAULT_GROUP
            refresh: true
```

### 7.2 配置类

```java
@Component
@ConfigurationProperties(prefix = "app")
@RefreshScope
public class AppConfig {
    
    private String name;
    private String version;
    private boolean enabled;
    
    // Getter 和 Setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
```

### 7.3 使用配置

```java
@RestController
@RequestMapping("/config")
public class ConfigController {
    
    @Autowired
    private AppConfig appConfig;
    
    @Value("${spring.datasource.url}")
    private String datasourceUrl;
    
    @GetMapping("/info")
    public Result<Map<String, Object>> getConfigInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("app", appConfig);
        info.put("datasource", datasourceUrl);
        return Result.success(info);
    }
    
    @GetMapping("/refresh")
    public Result<String> refresh() {
        return Result.success("配置已刷新");
    }
}
```

## 八、小结

本节要点：
1. **Nacos Config**：集中配置管理
2. **动态刷新**：@RefreshScope
3. **配置共享**：shared-configs、extension-configs
4. **多环境**：dev/test/prod 配置
5. **配置加密**：敏感信息加密

---

[上一节：13.5 Gateway API 网关](./13-05-Gateway API 网关.md) | [下一节：13.7 链路追踪](./13-07-链路追踪.md)
