# 12.11 Spring Boot Native 编译

## 一、为什么需要 Native 编译

生活类比：预制菜 vs 现做菜
- **JIT（运行时编译）**：就像现做菜，客人点单后开始做，边做边优化口味，启动慢但峰值性能高
- **AOT（提前编译）**：就像预制菜，提前把所有食材准备好封装好，上菜极快，但少了临场发挥的空间

Spring Boot 传统应用在 JVM 上运行需要较长的启动时间，对于云函数（Serverless）、容器编排、命令行工具等场景，启动速度直接影响用户体验和资源成本。Native Image 技术通过 AOT 编译将 Java 代码转换为本地可执行文件，让启动时间从秒级降到毫秒级。

### 1.1 传统 JVM 启动流程

```
启动 → 加载类 → 解析字节码 → JIT 编译 → 热点优化
（3-10 秒，取决于应用规模）
```

JVM 启动时需要：
1. 初始化虚拟机环境
2. 加载类文件并解析字节码
3. 解释执行，同时收集热点信息
4. JIT 编译器将热点代码编译为机器码
5. 持续优化，直到达到峰值性能

### 1.2 Native Image 启动流程

```
启动 → 直接执行机器码
（0.05-0.2 秒，快 50-100 倍）
```

Native Image 在编译期完成：
1. 静态分析所有可达代码
2. 将字节码编译为机器码
3. 预先计算反射、代理等信息
4. 生成独立可执行文件，无需 JVM

## 二、GraalVM vs OpenJDK

| 特性 | GraalVM Native Image | OpenJDK (JIT) |
|------|---------------------|---------------|
| 启动时间 | 毫秒级（50-200ms） | 秒级（2-10s） |
| 内存占用 | 极低（20-50MB） | 较高（200-500MB） |
| 峰值性能 | 略低（无 JIT 动态优化） | 最高（持续优化） |
| 编译时间 | 较长（1-5 分钟） | 无 |
| 适用场景 | 云函数、容器、CLI 工具 | 长期运行的微服务 |
| 内存分配 | 静态确定 | 动态垃圾回收 |
| 热更新 | 不支持 | 支持 |

选择建议：如果应用需要频繁启停（如 Serverless 场景），优先选择 Native Image；如果是长期运行的后端服务，OpenJDK 的 JIT 优化能提供更好的峰值性能。

## 三、环境准备

### 3.1 安装 GraalVM

GraalVM 是 Oracle 开发的高性能 JDK 发行版，包含 Native Image 构建工具。

```bash
# macOS（使用 Homebrew）
brew install --cask graalvm/tap/graalvm-jdk-21

# Linux（使用 SDKMAN）
sdk install java 21-graal
sdk use java 21-graal

# 设置 JAVA_HOME（macOS）
export JAVA_HOME=/Library/Java/JavaVirtualMachines/graalvm-21.jdk/Contents/Home

# 设置 JAVA_HOME（Linux）
export JAVA_HOME=~/.sdkman/candidates/java/21-graal

# 安装 native-image 工具（GraalVM 22.3+ 已内置）
# 旧版本需要手动安装
gu install native-image
```

### 3.2 验证安装

```bash
java -version
# 输出示例：
# java version "21.0.1" 2023-10-17
# Java(TM) SE Runtime Environment Oracle GraalVM 21.0.1+12.1
# GraalVM: Oracle GraalVM JDK 21.0.1

native-image --version
# 输出示例：
# native-image 21.0.1 2023-10-17
```

## 四、Spring Boot 项目配置

### 4.1 添加依赖插件

Spring Boot 3.x 内置了对 GraalVM Native Image 的支持，只需添加构建插件即可。

```xml
<build>
    <plugins>
        <!-- Spring Boot Maven Plugin -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>

        <!-- GraalVM Native Image 插件 -->
        <plugin>
            <groupId>org.graalvm.buildtools</groupId>
            <artifactId>native-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

如果项目使用 Spring Boot 2.7.x，需要额外添加依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.experimental</groupId>
        <artifactId>spring-native</artifactId>
        <version>0.12.1</version>
    </dependency>
</dependencies>
```

### 4.2 本地构建 Native Image

```bash
# 编译为本地可执行文件
mvn -Pnative native:compile

# 构建产物位于 target 目录
./target/myapp
```

构建过程会输出大量日志，显示类分析、代码编译、资源打包的进度。首次构建通常需要 1-5 分钟。

### 4.3 Docker 构建（推荐）

使用 Docker 构建可以避免本地安装 GraalVM，同时保证构建环境的一致性。

```bash
# 使用 Buildpacks 构建 Docker 镜像
mvn spring-boot:build-image -Pnative

# 运行生成的容器
docker run --rm -p 8080:8080 myapp:latest
```

Docker 构建的优势：
- 无需本地安装 GraalVM
- 构建缓存可复用，后续构建更快
- 直接生成可部署的容器镜像

## 五、Native Hints 配置

AOT 编译需要静态分析代码，而 Java 的反射、动态代理、资源加载等运行时行为无法被自动分析，需要通过 Hints 显式告知编译器。

### 5.1 反射注册

```java
import org.springframework.native.annotation.NativeHint;
import org.springframework.aot.hint.annotation.RegisterReflectionForBinding;

@RegisterReflectionForBinding({User.class, Order.class})
public class MyConfig {
    // 这些类在运行时会被反射访问（如 JSON 序列化）
    // 注册后 Native Image 编译会保留它们的反射元数据
}
```

常见需要注册反射的场景：
- JSON 序列化/反序列化的实体类
- MyBatis 的 Mapper 接口和结果映射
- JPA 实体类

### 5.2 资源文件配置

```yaml
spring:
  aot:
    enabled: true

# application.yml 中配置资源模式
spring:
  native:
    hints:
      resources:
        patterns:
          - "static/**"
          - "templates/**"
          - "META-INF/services/*"
```

也可以通过注解方式注册：

```java
@NativeHint(resources = @ResourceHint(patterns = "static/**"))
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### 5.3 动态代理注册

```java
@JdkProxyHint(types = {UserService.class, OrderService.class})
public class ProxyConfig {
    // 注册需要在运行时创建的动态代理
}
```

## 六、限制与最佳实践

### 6.1 已知限制

| 限制 | 说明 | 解决方案 |
|------|------|----------|
| 反射 | 默认不包含反射元数据 | 使用 @RegisterReflectionForBinding |
| 动态代理 | 运行时无法动态生成代理类 | 使用 @JdkProxyHint 预注册 |
| 资源文件 | 不会自动打包到镜像中 | 配置 resource patterns |
| 第三方库 | 部分库未适配 Native Image | 使用官方提供的 native hints |
| 编译时间 | AOT 编译耗时较长 | 使用 Docker 缓存增量构建 |
| 类加载 | 不支持运行时动态类加载 | 避免使用 Class.forName() |

### 6.2 最佳实践

1. **使用构造函数注入**：字段注入依赖反射，构造函数注入可被静态分析

```java
// 推荐：构造函数注入
@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}

// 不推荐：字段注入（依赖反射）
@Service
public class UserService {
    @Autowired
    private UserRepository repository;
}
```

2. **避免过度使用反射**：减少运行时类查找和动态调用

3. **使用 spring-aot 插件预计算**：Spring Boot 3.x 会自动生成 AOT 处理代码

4. **定期测试 native 构建**：确保每次大版本升级后 native 构建仍能正常工作

5. **合理拆分依赖**：移除不必要的 starter，减少编译时间和镜像体积

## 七、性能对比

以下是一个典型 Spring Boot REST API 应用的性能测试结果：

| 指标 | 传统 JVM (OpenJDK 21) | Native Image (GraalVM 21) | 改善幅度 |
|------|----------------------|--------------------------|----------|
| 启动时间 | 3.2s | 0.08s | 快 40 倍 |
| 首次响应 | 0.5s | 0.01s | 快 50 倍 |
| 内存占用 | 256MB | 45MB | 减少 82% |
| 峰值 TPS | 10000 | 8500 | 降低 15% |
| 镜像体积 | 180MB (JRE) | 85MB (可执行文件) | 减少 53% |

数据说明：
- 测试环境：macOS M2 Pro，16GB 内存
- 应用规模：20 个 Controller，15 个 Service，使用 Spring Data JPA
- 压测工具：wrk，持续 60 秒，100 并发连接

Native Image 在启动速度和内存占用上有显著优势，适合以下场景：
- Serverless 函数计算（冷启动优化）
- Kubernetes 容器编排（快速扩缩容）
- CLI 命令行工具（即时响应）
- 边缘计算设备（资源受限）

## 八、小结

Spring Boot Native 编译通过 GraalVM AOT 技术将 Java 应用转换为本地可执行文件，带来以下核心价值：

| 对比项 | 传统方式 | Native 编译 |
|--------|----------|-------------|
| 启动方式 | JVM 解释 + JIT | 直接执行机器码 |
| 启动时间 | 秒级 | 毫秒级 |
| 内存占用 | 较高 | 极低 |
| 适用场景 | 长运行服务 | 快速启停场景 |

关键要点：
- Spring Boot 3.x 原生支持 GraalVM，配置简单
- 反射、动态代理、资源文件需要显式注册 Hints
- Docker 构建是推荐的构建方式
- 峰值性能略低于 JIT，但启动速度提升显著
