# 12.1 Spring Boot 入门

## 一、Spring Boot 概述

### 1.1 什么是 Spring Boot

Spring Boot 是由 Pivotal 团队提供的全新框架，用于简化 Spring 应用的创建、配置和部署。

**核心理念**：
- 约定优于配置（Convention over Configuration）
- 开箱即用（Out of the Box）
- 快速开发（Rapid Development）

### 1.2 Spring Boot 的优势

| 优势 | 说明 |
|------|------|
| 快速创建 | 快速搭建 Spring 项目 |
| 自动配置 | 根据依赖自动配置 Bean |
| 内嵌容器 | 内置 Tomcat/Jetty，无需 WAR 部署 |
| 简化配置 | 减少 XML 配置 |
| 健康检查 | 内置监控和管理功能 |

### 1.3 Spring Boot 与 Spring 的关系

```
Spring Framework
    ↓
Spring MVC + Spring Security + Spring Data + ...
    ↓
Spring Boot（简化配置和部署）
```

## 二、第一个 Spring Boot 项目

### 2.1 使用 Spring Initializr

访问 https://start.spring.io/ 生成项目。

**项目配置**：
- Project: Maven
- Language: Java
- Spring Boot: 3.4.x
- Group: com.example
- Artifact: demo
- Dependencies: Spring Web

### 2.2 项目结构

```
demo/
├── pom.xml                    # Maven 配置
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java  # 启动类
│   │   └── resources/
│   │       ├── application.properties    # 配置文件
│   │       └── static/                   # 静态资源
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
└── target/
```

### 2.3 pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.0</version>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    
    <dependencies>
        <!-- Web 起步依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- 测试依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2.4 启动类

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // 核心注解
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 2.5 第一个 Controller

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

### 2.6 运行项目

```bash
# 方式 1：使用 Maven
mvn spring-boot:run

# 方式 2：打包后运行
mvn package
java -jar target/demo-0.0.1-SNAPSHOT.jar

# 方式 3：IDE 中直接运行
# 右键 DemoApplication.java → Run
```

访问 http://localhost:8080/hello 查看结果。

## 三、核心注解

### 3.1 @SpringBootApplication

```java
@SpringBootApplication
// 等价于以下三个注解的组合
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
```

| 注解 | 说明 |
|------|------|
| @SpringBootConfiguration | 标记为配置类 |
| @EnableAutoConfiguration | 启用自动配置 |
| @ComponentScan | 组件扫描 |

### 3.2 自动配置原理

```
@SpringBootApplication
    ↓
@EnableAutoConfiguration
    ↓
@Import(AutoConfigurationImportSelector.class)
    ↓
读取 META-INF/spring.factories
    ↓
加载自动配置类
```

## 四、配置文件

### 4.1 application.properties

```properties
# 服务器端口
server.port=8080

# 应用名称
spring.application.name=demo

# 日志级别
logging.level.root=INFO
logging.level.com.example=DEBUG
```

### 4.2 application.yml

```yaml
server:
  port: 8080

spring:
  application:
    name: demo

logging:
  level:
    root: INFO
    com.example: DEBUG
```

### 4.3 多环境配置

```
resources/
├── application.properties       # 公共配置
├── application-dev.properties   # 开发环境
├── application-test.properties  # 测试环境
└── application-prod.properties  # 生产环境
```

```yaml
# application.yml
spring:
  profiles:
    active: dev  # 激活开发环境
```

## 五、起步依赖

### 5.1 常用起步依赖

```xml
<dependencies>
    <!-- Web 开发 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- 数据访问 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- 安全 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- 测试 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>
    
    <!-- 监控 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

### 5.2 依赖传递

```xml
<!-- spring-boot-starter-web 包含 -->
<!-- - spring-webmvc -->
<!-- - spring-web -->
<!-- - tomcat-embed-core -->
<!-- - jackson-databind -->
<!-- - ... -->
```

## 六、综合示例

### 6.1 完整项目结构

```
demo/
├── pom.xml
├── src/main/java/com/example/demo/
│   ├── DemoApplication.java
│   ├── controller/
│   │   └── HelloController.java
│   ├── service/
│   │   └── HelloService.java
│   └── entity/
│       └── User.java
└── src/main/resources/
    └── application.yml
```

### 6.2 启动类

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 6.3 Controller

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/")
    public String index() {
        return "欢迎访问 Spring Boot！";
    }
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
```

### 6.4 配置文件

```yaml
server:
  port: 8080
  servlet:
    context-path: /demo

spring:
  application:
    name: demo
```

访问 http://localhost:8080/demo/hello

## 七、小结

本节要点：
1. **Spring Boot**：简化 Spring 应用开发
2. **核心注解**：@SpringBootApplication
3. **项目结构**：启动类、Controller、配置文件
4. **起步依赖**：简化依赖管理
5. **运行方式**：mvn spring-boot:run 或 java -jar

---

[下一节：12.2 配置文件](./12-02-配置文件.md)
