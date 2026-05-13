# 8.5 Spring Boot 开发环境

## 一、开发工具选型

Spring Boot 开发可以选择多种 IDE，各有优劣：

| 工具 | 优点 | 缺点 | 适合场景 |
|------|------|------|----------|
| IntelliJ IDEA Ultimate | 功能最强、Spring 原生支持 | 付费、占用资源大 | 企业级开发 |
| IntelliJ IDEA Community | 免费、Java SE 支持好 | 不支持 Spring、数据库工具 | Java 基础学习 |
| VSCode + Spring 扩展 | 轻量、免费、全栈支持 | 需配置扩展、重构能力弱 | 全栈开发、学习 |
| Spring Tool Suite (STS) | 免费、Spring 官方定制 | 体验不如 IDEA | 预算有限团队 |

> **免费开发 Spring Boot 推荐方案**：VSCode + Spring Boot Extension Pack，零成本即可获得完整的 Spring Boot 开发体验（项目创建、属性补全、Bean 导航、调试）。IDEA Community 不含 Spring 支持，开发 Spring Boot 需购买 Ultimate 或改用 VSCode。

## 二、IDEA + Spring Boot

> 以下功能需要 **IDEA Ultimate**。IDEA Community 不支持 Spring Boot 专属功能，建议使用 VSCode + Spring Boot Extension Pack 替代。

### 2.1 Spring Assistant 插件

IDEA 内置 Spring Initializr 支持：

```
1. File → New → Project
2. 选择 Spring Initializr
3. 配置项目信息：
   - Group: com.example
   - Artifact: demo
   - Type: Maven/Gradle
   - Language: Java
   - Packaging: Jar
   - Java Version: 21
4. 选择依赖（Web、JPA、MySQL 等）
5. 完成创建
```

### 2.2 项目结构

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── DemoApplication.java    # 启动类
│   │   │       ├── controller/             # 控制器
│   │   │       ├── service/                # 业务层
│   │   │       ├── repository/             # 数据层
│   │   │       └── entity/                 # 实体类
│   │   └── resources/
│   │       ├── application.yml             # 配置文件
│   │       ├── static/                     # 静态资源
│   │       └── templates/                  # 模板文件
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
├── pom.xml
└── .mvn/
```

### 2.3 Spring Boot 专属功能

IDEA Ultimate 对 Spring Boot 的专属支持：

```
1. application.yml 属性补全和验证
2. @RequestMapping 行号导航（Endpoint 面板）
3. Spring Boot Run Dashboard（运行仪表盘）
4. Bean 依赖关系图
5. Actuator Endpoints 可视化
6. Spring Profiles 切换
```

开启 Run Dashboard：
```
View → Tool Windows → Services
或
Alt + 8
```

## 二-B、VSCode + Spring Boot（免费方案）

VSCode + Spring Boot Extension Pack 是免费开发 Spring Boot 的推荐方案：

### 2B.1 安装 Spring Boot Extension Pack

```
1. 安装 Extension Pack for Java
2. 安装 Spring Boot Extension Pack（包含以下扩展）：
   - Spring Boot Tools：属性补全、Bean 导航
   - Spring Initializr：在 VSCode 中创建 Spring Boot 项目
   - Spring Boot Dashboard：可视化管理应用启动/停止
   - Spring Boot Live Information：实时 Bean 信息
```

### 2B.2 创建 Spring Boot 项目

```
1. Ctrl/Cmd + Shift + P
2. 输入 "Spring Initializr: Create a Maven/Gradle Project"
3. 选择 Spring Boot 版本
4. 选择语言（Java）
5. 输入 groupId、artifactId
6. 选择依赖（Web、JPA、MySQL 等）
7. 选择项目存放目录
```

### 2B.3 VSCode 中的 Spring Boot 功能

```
1. application.yml 属性补全（需要 Spring Boot Tools）
2. @RequestMapping 导航（Ctrl/Cmd + 点击）
3. Bean 依赖查看
4. Spring Boot Dashboard 一键启动/停止
5. Live Reload 支持
```

## 三、Spring Boot DevTools

### 3.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

### 3.2 自动重启

修改 Java 文件后自动重启应用：

```
1. 确保 IDE 开启了自动编译
   IDEA: Settings → Build → Compiler → Build project automatically
   VSCode: settings.json 设置 java.autobuild.enabled = true

2. 修改代码后保存
3. DevTools 检测到 classpath 变化
4. 自动重启（通常 1-3 秒）
```

重启 vs 重载：
```
Base ClassLoader（不变）：Spring 框架、第三方库
Restart ClassLoader（重载）：你的代码、静态资源

Base 加载慢 → 只重载你的代码 → 重启很快
```

### 3.3 LiveReload

浏览器自动刷新：

```
1. DevTools 内置 LiveReload 服务器（端口 35729）
2. 安装浏览器 LiveReload 扩展
3. 修改静态资源（HTML/CSS/JS）后保存
4. 浏览器自动刷新页面
```

### 3.4 配置选项

`application.yml`：

```yaml
spring:
  devtools:
    restart:
      enabled: true                          # 开启自动重启
      additional-paths: src/main/java        # 额外监控路径
      exclude: static/**,templates/**        # 排除路径
      poll-interval: 2s                      # 轮询间隔
      quiet-period: 400ms                    # 静默期
    livereload:
      enabled: true                          # 开启 LiveReload
      port: 35729                            # LiveReload 端口
```

### 3.5 触发重启文件

创建 `.restarttrigger` 文件：

```
1. 在资源目录创建空文件：src/main/resources/.restarttrigger
2. 只有修改此文件时才触发重启
3. 避免频繁修改其他文件导致意外重启
```

## 四、配置文件管理

### 4.1 application.yml vs application.properties

```yaml
# YAML 格式（推荐，更简洁）
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/demo
    username: root
    password: 123456
```

```properties
# Properties 格式（传统）
server.port=8080
server.servlet.context-path=/api

spring.datasource.url=jdbc:mysql://localhost:3306/demo
spring.datasource.username=root
spring.datasource.password=123456
```

### 4.2 多环境配置

```
src/main/resources/
├── application.yml              # 公共配置
├── application-dev.yml          # 开发环境
├── application-test.yml         # 测试环境
└── application-prod.yml         # 生产环境
```

`application.yml`：

```yaml
spring:
  config:
    activate:
      on-profile: dev  # 默认激活 dev
```

切换环境：

```bash
# 方式 1：配置文件
spring.profiles.active=dev

# 方式 2：命令行
java -jar app.jar --spring.profiles.active=prod

# 方式 3：环境变量
export SPRING_PROFILES_ACTIVE=prod

# 方式 4：IDEA 启动配置
# Run → Edit Configurations → Active profiles → 填写 dev
```

### 4.3 配置优先级

从高到低：

```
1. 命令行参数          --server.port=9090
2. 环境变量            SERVER_PORT=9090
3. application-{profile}.yml
4. application.yml
5. @PropertySource 注解
6. 默认配置
```

## 五、调试技巧

### 5.1 条件断点

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // 右键断点 → More → Condition
    // 输入：id > 100
    // 只有 id > 100 时才暂停
    return userService.findById(id);
}
```

### 5.2 异常断点

```
1. Run → View Breakpoints（Ctrl/Cmd + Shift + F8）
2. 点击 + → Java Exception Breakpoints
3. 选择异常类型（如 NullPointerException）
4. 当抛出该异常时自动暂停
```

### 5.3 日志级别动态调整

```java
@RestController
public class LogController {
    
    private static final Logger log = LoggerFactory.getLogger(LogController.class);
    
    @GetMapping("/debug/log")
    public String setLogLevel(@RequestParam String level) {
        // 运行时修改日志级别
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        context.getLogger("com.example").setLevel(Level.valueOf(level.toUpperCase()));
        return "Log level changed to " + level;
    }
}
```

或通过 Actuator：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```yaml
management:
  endpoints:
    web:
      exposure:
        include: loggers
```

```bash
# 查看当前日志级别
curl http://localhost:8080/actuator/loggers/com.example

# 修改日志级别
curl -X POST http://localhost:8080/actuator/loggers/com.example \
  -H "Content-Type: application/json" \
  -d '{"configuredLevel": "DEBUG"}'
```

## 六、热部署方案对比

| 方案 | 速度 | 适用场景 | 缺点 |
|------|------|----------|------|
| DevTools | 快（1-3 秒） | 日常开发 | 不支持新增方法 |
| JRebel | 极快（< 1 秒） | 大型项目 | 付费 |
| Spring Loaded | 快 | Java 8 | 已停止维护 |
| 重启 | 慢（5-30 秒） | 任何情况 | 最慢 |

## 七、接口测试

### 7.1 HTTP Client（IDEA）

IDEA 内置 HTTP 客户端，创建 `.http` 文件：

```http
### 获取用户列表
GET http://localhost:8080/api/users
Accept: application/json

### 创建用户
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "name": "张三",
  "email": "zhangsan@example.com"
}

### 登录
POST http://localhost:8080/api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}

> {%
  client.test("登录成功", function() {
    client.assert(response.status === 200);
    client.assert(response.body.token !== null);
  });
%}
```

### 7.2 VSCode REST Client

安装 REST Client 扩展后，使用方式类似：

```http
### 环境变量
@api = http://localhost:8080

### 获取用户
GET {{api}}/users/1
Accept: application/json
```

### 7.3 cURL 命令

```bash
# GET 请求
curl http://localhost:8080/api/users

# POST 请求（带 JSON）
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","email":"zhangsan@example.com"}'

# 带认证的请求
curl http://localhost:8080/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."

# 上传文件
curl -X POST http://localhost:8080/api/upload \
  -F "file=@/path/to/file.jpg"
```

## 八、常用启动参数

### 8.1 开发常用

```bash
# 指定端口
--server.port=8081

# 指定环境
--spring.profiles.active=dev

# 开启 debug 模式
--debug

# 外部配置文件
--spring.config.location=file:./config/application.yml

# JVM 参数
-Xms512m -Xmx1024m
-XX:+UseG1GC
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```

### 8.2 Maven 启动

```bash
# 基本启动
mvn spring-boot:run

# 指定 profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 传递 JVM 参数
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx1024m"

# 传递应用参数
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

## 九、开发效率提升

### 9.1 Lombok 简化代码

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

```java
@Data                    // getter + setter + toString + equals + hashCode
@NoArgsConstructor       // 无参构造
@AllArgsConstructor      // 全参构造
@Builder                 // 构建器模式
public class User {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
}
```

### 9.2 MapStruct 对象转换

```xml
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>1.5.5.Final</version>
</dependency>
```

```java
@Mapper(componentModel = "spring")
public interface UserConverter {
    
    UserDTO toDTO(User entity);
    
    User toEntity(UserDTO dto);
    
    List<UserDTO> toDTOList(List<User> entities);
}
```

### 9.3 Validation 参数校验

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

```java
@Data
public class UserRequest {
    
    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 20, message = "用户名长度 2-20 位")
    private String name;
    
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @Min(value = 1, message = "年龄最小为 1")
    @Max(value = 150, message = "年龄最大为 150")
    private Integer age;
}

@RestController
@Validated
public class UserController {
    
    @PostMapping("/users")
    public User create(@Valid @RequestBody UserRequest request) {
        // 校验失败自动返回 400
        return userService.create(request);
    }
}
```

## 十、小结

高效的 Spring Boot 开发环境需要：
1. 选择合适的 IDE（IDEA/VSCode）并配置好扩展
2. 使用 DevTools 实现快速热部署
3. 配置多环境配置文件
4. 掌握调试技巧和日志管理
5. 使用 Lombok、Validation 等工具提升编码效率
