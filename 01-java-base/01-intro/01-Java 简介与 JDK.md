# 1.1 Java 简介与发展历史

### 一、Java 是什么

Java 是一门**面向对象**的编程语言，具有**简单、安全、跨平台、多线程**等特点。

#### 1.1 主要特点

| 特点 | 说明 |
|------|------|
| 简单易学 | 语法类似 C++，但去除了复杂的多继承、指针等概念 |
| 面向对象 | 支持封装、继承、多态三大特性 |
| 跨平台 | "一次编写，到处运行"（Write Once, Run Anywhere） |
| 安全性 | 提供安全管理器、字节码验证等机制 |
| 多线程 | 内置多线程支持，可同时执行多个任务 |
| 健壮性 | 强类型检查、异常处理机制、垃圾回收 |

#### 1.2 应用领域

- **Web 开发**：Spring、Spring Boot 等框架
- **移动开发**：Android 应用开发
- **企业级应用**：ERP、CRM 等系统
- **大数据**：Hadoop、Spark 等
- **云计算**：微服务架构

### 二、Java 发展历史

```
1995 年  → Java 1.0 发布
2004 年  → Java 5（泛型、注解、枚举）
2014 年  → Java 8（Lambda、Stream API）
2018 年  → Java 11（LTS 版本）
2021 年  → Java 17（LTS 版本）
2023 年  → Java 21（LTS 版本）
2024 年  → Java 23（非 LTS）
2025 年  → Java 25（LTS 版本，9 月发布）
```

#### 2.1 Java 版本

| 版本 | 类型 | 说明 |
|------|------|------|
| Java 17 | LTS | 广泛使用的 LTS 版本 |
| Java 21 | LTS | 当前主流 LTS 版本（推荐） |
| Java 25 | LTS | 最新 LTS 版本（2025 年 9 月发布） |

> 💡 **建议**：初学者从 Java 21 开始学习，企业项目推荐使用 Java 21 或 Java 25

### 三、Java 三大体系

```
Java 体系
├── Java SE（Standard Edition）     标准版，基础核心
├── Jakarta EE（Enterprise Edition）   企业版，Web 开发（原 Java EE）
└── Java ME（Micro Edition）        微型版，嵌入式设备
```

- **Java SE**：学习基础，本教程重点
- **Jakarta EE**：用于企业级开发
- **Java ME**：用于嵌入式和移动设备

### 四、小结

本节要点：
1. Java 是面向对象的跨平台语言
2. Java 17/21/25 是常用的 LTS 版本
3. Java SE 是学习的基础


---

# 1.2 JDK、JRE、JVM 的区别与安装

### 一、三者的关系

```
┌─────────────────────────────────────┐
│           JDK                        │
│  ┌─────────────────────────────┐    │
│  │           JRE                │    │
│  │  ┌─────────────────────┐    │    │
│  │  │       JVM           │    │    │
│  │  └─────────────────────┘    │    │
│  │  + 类库 (rt.jar 等)          │    │
│  └─────────────────────────────┘    │
│  + 开发工具 (javac, java 等)         │
└─────────────────────────────────────┘
```

#### 1.1 JVM（Java Virtual Machine）

- **Java 虚拟机**，运行 Java 字节码
- 负责将字节码转换为机器码
- 实现跨平台的核心

#### 1.2 JRE（Java Runtime Environment）

- **Java 运行环境**
- 包含：JVM + Java 类库
- 只能运行 Java 程序，不能开发

#### 1.3 JDK（Java Development Kit）

- **Java 开发工具包**
- 包含：JRE + 开发工具
- 用于开发 Java 程序

> 💡 **结论**：开发者只需安装 JDK

### 二、JDK 安装

#### 2.1 下载 JDK

**官方下载**：
- Oracle JDK：https://www.oracle.com/java/technologies/downloads/
- OpenJDK：https://openjdk.org/

**推荐发行版**：
- Oracle JDK（商业使用需付费）
- OpenJDK（免费开源）
- Amazon Corretto（免费，AWS 维护）
- Azul Zulu（免费）

#### 2.2 安装步骤（以 macOS 为例）

```bash
# 1. 使用 Homebrew 安装（推荐）
brew install openjdk@21

# 2. 配置环境变量
# 在 ~/.zshrc 或 ~/.bash_profile 中添加：
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export PATH=$JAVA_HOME/bin:$PATH

# 3. 验证安装
java -version
javac -version
```

#### 2.3 安装步骤（Windows）

1. 下载 JDK 安装包（.exe）
2. 双击运行，选择安装路径
3. 配置环境变量：
   - 新建 `JAVA_HOME` = `C:\Program Files\Java\jdk-21`
   - 编辑 `Path`，添加 `%JAVA_HOME%\bin`
4. 打开 cmd 验证：
   ```cmd
   java -version
   javac -version
   ```

#### 2.4 安装步骤（Linux）

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-21-jdk

# CentOS/RHEL
sudo yum install java-21-openjdk-devel

# 验证
java -version
javac -version
```

### 三、验证安装

```bash
# 查看 Java 版本
java -version

# 查看编译器版本
javac -version

# 查看 Java 安装路径
echo $JAVA_HOME  # macOS/Linux
echo %JAVA_HOME% # Windows
```

**输出示例**：
```
java version "21.0.2" 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 21.0.2+13-LTS)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.2+13-LTS, mixed mode, sharing)
```

### 四、常用开发工具

#### 4.1 IDE 推荐

| 工具 | 说明 | 适合人群 |
|------|------|----------|
| IntelliJ IDEA | 功能强大，智能提示好 | 专业开发者 |
| Eclipse | 免费开源，插件丰富 | 初学者/企业 |
| VS Code | 轻量级，需安装插件 | 前端转 Java |

#### 4.2 文本编辑器

- VS Code（推荐）
- Sublime Text
- Notepad++

### 五、常见问题

#### 5.1 多版本 JDK 切换

```bash
# macOS 使用 jenv
jenv versions
jenv global 17.0

# Windows 修改 JAVA_HOME 环境变量
# Linux 使用 update-alternatives
sudo update-alternatives --config java
```

#### 5.2 常见问题排查

| 问题 | 解决方案 |
|------|----------|
| 找不到 java 命令 | 检查 PATH 环境变量 |
| 版本不匹配 | 确认 JAVA_HOME 设置 |
| 权限不足 | 使用管理员权限安装 |

### 六、小结

本节要点：
1. **JDK** = JRE + 开发工具，开发者必装
2. **JRE** = JVM + 类库，用于运行程序
3. **JVM** = 虚拟机，实现跨平台
4. 推荐安装 Java 21 LTS 版本
