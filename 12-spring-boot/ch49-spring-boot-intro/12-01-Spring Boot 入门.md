# 12.1 Spring Boot 入门：为什么它这么简单？

## 一、先问一个问题

**什么是 Spring Boot？为什么需要它？**

### 生活例子：买房

```
买毛坯房（传统 Spring）
├── 自己装修
├── 自己买家具
├── 自己拉网线
└── 耗时 3 个月

买精装房（Spring Boot）
├── 装修好了
├── 家具配了
├── 网线通了
└── 拎包入住
```

**Spring Boot 就是 Spring 的"精装房"**：
- 配置都帮你做好了
- 依赖都帮你管理了
- 启动就能用

## 二、Spring Boot  vs  传统 Spring

### 传统 Spring 的痛点

```xml
<!-- 配置一大堆 -->
<beans>
    <!-- 配置数据源 -->
    <bean id="dataSource" class="...">
        <property name="url" value="..."/>
        <property name="username" value="..."/>
        <property name="password" value="..."/>
    </bean>
    
    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="...">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    
    <!-- 配置 MVC -->
    <mvc:annotation-driven/>
    
    <!-- 配置视图解析器 -->
    <bean class="...">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    
    <!-- 还有几十上百个配置... -->
</beans>
```

**问题**：
- 配置太多，容易出错
- 依赖管理复杂
- 部署麻烦

### Spring Boot 的方式

```java
@SpringBootApplication  // 一个注解搞定
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**配置文件**：
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/db
spring.datasource.username=root
spring.datasource.password=123456
```

**对比**：
- 配置减少 90%
- 依赖自动管理
- 内嵌服务器，直接运行

## 三、核心概念

### 1. 起步依赖（Starter）

**生活例子：套餐**

```
单点（传统依赖管理）
├── 主食
├── 菜品
├── 饮料
└── 自己搭配

套餐（Starter）
└── web 套餐 = Tomcat + Spring MVC + Jackson
```

**常用 Starter**：

| Starter | 作用 | 包含内容 |
|---------|------|----------|
| spring-boot-starter-web | Web 开发 | Tomcat、Spring MVC |
| spring-boot-starter-data-jpa | 数据库 | JPA、Hibernate |
| spring-boot-starter-data-redis | Redis | Redis 客户端 |
| spring-boot-starter-test | 测试 | JUnit、Mockito |
| spring-boot-starter-security | 安全 | Spring Security |

**使用方式**：
```xml
<dependencies>
    <!-- Web 开发，只需这一个 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- 数据库，只需这一个 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
</dependencies>
```

### 2. 自动配置

**生活例子：智能家电**

```
传统家电
├── 手动调温度
├── 手动调风速
└── 麻烦

智能空调
├── 自动检测室温
├── 自动调节
└── 舒服
```

**自动配置原理**：
```
引入 starter
  ↓
Spring Boot 检测 classpath
  ↓
发现 Tomcat 在 classpath 中
  ↓
自动配置 Tomcat
  ↓
发现 MySQL 驱动在 classpath 中
  ↓
自动配置数据源
```

**示例**：
```java
// 你只需要引入依赖
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

// Spring Boot 自动帮你：
// 1. 配置 Tomcat
// 2. 配置 Spring MVC
// 3. 配置消息转换器
// 4. 配置静态资源处理
// ... 等等
```

### 3. 内嵌容器

**传统方式**：
```
开发完成
  ↓
打包成 WAR
  ↓
安装 Tomcat
  ↓
部署 WAR 到 Tomcat
  ↓
启动 Tomcat
```

**Spring Boot 方式**：
```
开发完成
  ↓
打包成 JAR
  ↓
java -jar app.jar
  ↓
完成（Tomcat 内置）
```

## 四、创建第一个项目

### 方式一：Spring Initializr（推荐）

**步骤**：

1. 打开 https://start.spring.io/

2. 填写项目信息
```
Project: Maven
Language: Java
Spring Boot: 3.4.0
Group: com.example
Artifact: demo
Package name: com.example.demo
Packaging: Jar
Java: 17
```

3. 添加依赖
```
✓ Spring Web
✓ Spring Boot DevTools
✓ Lombok
✓ Spring Boot Starter Test
```

4. 点击"Generate"下载项目

5. 解压后导入 IDEA

### 方式二：IDEA 直接创建

**步骤**：

1. File → New → Project

2. 选择 Spring Initializr

3. 填写项目信息

4. 选择依赖

5. 完成

### 项目结构详解

```
demo/
├── pom.xml                    # Maven 配置文件
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java  # 启动类
│   │   └── resources/
│   │       ├── application.properties    # 配置文件
│   │       ├── static/                   # 静态资源（CSS、JS、图片）
│   │       └── templates/                # 模板文件
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java  # 测试类
└── target/                    # 编译输出
```

### 启动类详解

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // 核心注解
public class DemoApplication {

    public static void main(String[] args) {
        // 启动 Spring Boot 应用
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**@SpringBootApplication 是什么？**

```java
// 它等于三个注解的组合
@SpringBootConfiguration  // 配置类
@EnableAutoConfiguration  // 开启自动配置
@ComponentScan            // 组件扫描
```

### 第一个接口

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // 标记这是一个 REST 控制器
public class HelloController {
    
    @GetMapping("/hello")  // 映射 GET 请求
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

**启动项目**：

1. 运行 DemoApplication 的 main 方法

2. 看到日志：
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.4.0)

2024-01-01 12:00:00.000  INFO 12345 --- [           main] c.e.demo.DemoApplication  : Starting DemoApplication...
2024-01-01 12:00:05.000  INFO 12345 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080
2024-01-01 12:00:05.000  INFO 12345 --- [           main] c.e.demo.DemoApplication  : Started DemoApplication in 5.5 seconds
```

3. 打开浏览器访问 http://localhost:8080/hello

4. 看到：`Hello, Spring Boot!`

## 五、配置文件

### application.properties

```properties
# 服务器端口
server.port=8080

# 应用名称
spring.application.name=demo

# 数据库配置
spring.datasource.url=jdbc:mysql://localhost:3306/demo
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# 日志级别
logging.level.root=INFO
logging.level.com.example.demo=DEBUG
```

### application.yml（推荐）

```yaml
server:
  port: 8080

spring:
  application:
    name: demo
  datasource:
    url: jdbc:mysql://localhost:3306/demo
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

logging:
  level:
    root: INFO
    com.example.demo: DEBUG
```

**properties vs yml**：

| 特性 | properties | yml |
|------|------------|-----|
| 语法 | key=value | 缩进 |
| 层级 | 扁平 | 树形 |
| 可读性 | 一般 | 好 |
| 推荐 | - | ✅ |

## 六、运行方式

### 方式一：IDE 运行

```
右键 DemoApplication → Run
```

### 方式二：Maven 命令

```bash
# 编译
mvn clean package

# 运行
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### 方式三：Maven 插件

```bash
# 开发模式（支持热部署）
mvn spring-boot:run
```

## 七、热部署

### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

### IDEA 配置

1. File → Settings → Build → Compiler
2. 勾选 "Build project automatically"

3. Ctrl + Shift + Alt + /
4. 选择 Registry
5. 勾选 "compiler.automake.allow.when.app.running"

### 效果

```
修改代码
  ↓
保存
  ↓
自动重启（几秒）
  ↓
刷新浏览器即可看到效果
```

## 八、小结

| 概念 | 说明 | 类比 |
|------|------|------|
| Starter | 依赖管理 | 套餐 |
| 自动配置 | 自动配置 Bean | 智能家电 |
| 内嵌容器 | 内置 Tomcat | 精装房 |
| @SpringBootApplication | 启动类注解 | 总开关 |

**核心要点**：
- Starter 简化依赖管理
- 自动配置减少配置
- 内嵌容器简化部署

## 九、常见问题

### Q1：端口被占用怎么办？

**解决**：
```properties
# 修改端口
server.port=8081
```

### Q2：如何修改启动 Banner？

**解决**：
```
src/main/resources/banner.txt
```

内容：
```
  _____
 /     \
| () () |
 \  ^  /
  |||||
  |||||
```

### Q3：如何关闭自动配置？

**解决**：
```java
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    SecurityAutoConfiguration.class
})
```

## 十、动手练习

1. 使用 Spring Initializr 创建项目
2. 添加 Spring Web 依赖
3. 创建一个 Hello 接口
4. 启动项目并访问
5. 修改端口为 8081
6. 添加 DevTools 实现热部署

---

[下一节：12.2 配置文件](./12-02-配置文件.md)
