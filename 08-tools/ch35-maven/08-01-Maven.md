# 8.1 Maven 项目管理

## 一、Maven 简介

Maven 是项目管理和构建工具，主要功能：
- 依赖管理
- 项目构建
- 标准化项目结构

## 二、POM 文件

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    
    <!-- 项目坐标 -->
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <!-- 项目信息 -->
    <name>Demo Project</name>
    <description>Demo project for Maven</description>
    
    <!-- 属性 -->
    <properties>
        <java.version>11</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <!-- 依赖 -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
            <version>2.7.14</version>
        </dependency>
    </dependencies>
    
    <!-- 构建配置 -->
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

## 三、依赖管理

### 3.1 依赖范围

```xml
<dependencies>
    <!-- compile（默认）：编译、测试、运行都可用 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
        <scope>compile</scope>
    </dependency>
    
    <!-- test：仅测试可用 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <scope>test</scope>
    </dependency>
    
    <!-- provided：编译可用，运行时由容器提供 -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <scope>provided</scope>
    </dependency>
    
    <!-- runtime：测试和运行可用 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

### 3.2 依赖传递

```
A → B → C
A → D

A 依赖 B 和 D，B 依赖 C
则 A 自动拥有 C 的依赖
```

### 3.3 排除依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## 四、常用命令

```bash
# 清理
mvn clean

# 编译
mvn compile

# 测试
mvn test

# 打包
mvn package

# 安装到本地仓库
mvn install

# 部署到远程仓库
mvn deploy

# 跳过测试
mvn package -DskipTests

# 清理并打包
mvn clean package
```

## 五、多模块项目

```
parent/
├── pom.xml（父 POM）
├── common/
│   └── pom.xml
├── service/
│   └── pom.xml
└── web/
    └── pom.xml
```

```xml
<!-- 父 POM -->
<project>
    <packaging>pom</packaging>
    
    <modules>
        <module>common</module>
        <module>service</module>
        <module>web</module>
    </modules>
    
    <dependencyManagement>
        <!-- 统一管理依赖版本 -->
    </dependencyManagement>
</project>
```

## 六、小结

1. **POM**：项目对象模型
2. **坐标**：groupId、artifactId、version
3. **依赖范围**：compile、test、provided、runtime
4. **常用命令**：clean、compile、package、install

---

[下一节：8.2 Git 版本控制](./08-02-Git 版本控制.md)
