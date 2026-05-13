# 8.4 VSCode 开发 Java

## 一、为什么选择 VSCode

VSCode 是一款轻量级代码编辑器，通过扩展插件可以支持 Java 开发。相比 IDEA 等重型 IDE，VSCode 的优势：

- **轻量快速**：启动快、占用内存少
- **免费开源**：完全免费，社区活跃
- **多语言支持**：一个编辑器处理多种语言（Java + 前端 + DevOps）
- **远程开发**：强大的 Remote SSH / Containers 支持

**适用场景**：
- 学习 Java 基础语法
- 快速查看和编辑代码
- 全栈开发（前后端一体）
- 低配置电脑

## 二、安装与配置

### 2.1 安装 VSCode

下载地址：https://code.visualstudio.com/

### 2.2 安装 Java 扩展包

安装 **Extension Pack for Java**，包含：

| 扩展 | 功能 |
|------|------|
| Language Support for Java | 代码补全、语法检查、导航 |
| Debugger for Java | 调试支持 |
| Test Runner for Java | 运行和调试测试 |
| Maven for Java | Maven 项目支持 |
| Project Manager for Java | 项目视图管理 |
| IntelliCode for Java | AI 辅助代码补全 |

安装步骤：
```
1. 打开 VSCode
2. Ctrl/Cmd + Shift + X 打开扩展面板
3. 搜索 "Extension Pack for Java"
4. 点击 Install
```

### 2.3 安装 JDK

VSCode 需要系统已安装 JDK：

```bash
# macOS
brew install openjdk@21

# Windows（使用 winget）
winget install Microsoft.OpenJDK.21

# 验证安装
java -version
```

### 2.4 配置 JAVA_HOME

```bash
# macOS ~/.zshrc
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export PATH=$JAVA_HOME/bin:$PATH

# Windows（系统环境变量）
# 添加 JAVA_HOME = C:\Program Files\Java\jdk-21
# 在 PATH 中添加 %JAVA_HOME%\bin
```

## 三、创建第一个 Java 项目

### 3.1 简单项目

```
1. Ctrl/Cmd + Shift + P
2. 输入 "Java: Create Java Project"
3. 选择 "No build tools"（简单项目）或 "Maven"
4. 选择项目存放目录
5. 输入项目名称
```

生成的项目结构：

```
my-project/
├── src/
│   └── main/
│       └── java/
│           └── App.java
└── .vscode/
    └── settings.json
```

### 3.2 Maven 项目

```
1. Ctrl/Cmd + Shift + P
2. 输入 "Java: Create Java Project"
3. 选择 "Maven"
4. 选择 archetype（通常选 maven-archetype-quickstart）
5. 输入 groupId 和 artifactId
```

生成的 Maven 项目结构：

```
my-maven-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/example/App.java
│   └── test/
│       └── java/
│           └── com/example/AppTest.java
└── pom.xml
```

### 3.3 打开现有项目

```
1. File → Open Folder
2. 选择包含 pom.xml 或 build.gradle 的项目目录
3. VSCode 会自动识别并加载 Java 项目
```

## 四、编辑与编码

### 4.1 代码补全

VSCode 提供智能代码补全：

```java
public class UserService {
    // 输入 "private" 后按 Ctrl + Space
    private String name;
    
    // 输入 "getN" 后按 Ctrl + Space，自动补全为 getName()
    public String getName() {
        return name;
    }
    
    // 输入 "user." 自动提示可用方法
}
```

### 4.2 代码导航

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| 跳转到定义 | F12 | 跳转到类/方法/变量定义处 |
| 查找引用 | Shift + F12 | 查找所有引用位置 |
| 快速打开 | Ctrl/Cmd + P | 按文件名快速打开 |
| 符号搜索 | Ctrl/Cmd + T | 搜索类、方法、变量 |
| 返回 | Ctrl/Cmd + Alt + - | 返回上一个位置 |
| 前进 | Ctrl/Cmd + Shift + - | 前进到下一个位置 |

### 4.3 重构

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| 重命名 | F2 | 重命名变量/方法/类 |
| 提取方法 | Ctrl/Cmd + . → Extract Method | 将代码块提取为方法 |
| 提取变量 | Ctrl/Cmd + . → Extract Variable | 将表达式提取为变量 |
| 更改签名 | Ctrl/Cmd + . → Change Signature | 修改方法参数 |
| 组织导入 | Ctrl/Cmd + Shift + O | 清理未使用的导入 |

### 4.4 代码模板

```java
// 输入 main 后按 Tab
public static void main(String[] args) {
}

// 输入 sysout 后按 Tab
System.out.println();

// 输入 for 后按 Tab
for (int i = 0; i < args.length; i++) {
}

// 输入 foreach 后按 Tab
for (String arg : args) {
}
```

## 五、运行与调试

### 5.1 运行 Java 文件

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, VSCode!");
    }
}
```

运行方式：
1. 打开文件后，编辑区上方会出现 **▶ Run** 和 **🐛 Debug** 按钮
2. 点击 **▶ Run** 直接运行
3. 右键 → Run Java

### 5.2 调试 Java

```java
public class DebugDemo {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;  // 在此行打断点
        }
        System.out.println("Sum: " + sum);
    }
}
```

调试步骤：
```
1. 在代码行号左侧点击，设置断点（红色圆点）
2. 点击 🐛 Debug 按钮
3. 使用调试工具栏：
   - Continue (F5)：继续执行
   - Step Over (F10)：单步跳过
   - Step Into (F11)：单步进入
   - Step Out (Shift + F11)：跳出方法
   - Restart (Ctrl/Cmd + Shift + F5)：重新启动
   - Stop (Shift + F5)：停止调试
4. 在 VARIABLES 面板查看变量值
5. 在 DEBUG CONSOLE 中执行表达式
```

### 5.3 调试配置

`.vscode/launch.json`：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Launch Current File",
            "request": "launch",
            "mainClass": "${file}"
        },
        {
            "type": "java",
            "name": "Launch MyApp",
            "request": "launch",
            "mainClass": "com.example.MyApp",
            "args": "--server.port=8081",
            "env": {
                "SPRING_PROFILES_ACTIVE": "dev"
            }
        }
    ]
}
```

## 六、测试支持

### 6.1 运行单元测试

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    
    @Test
    void testAdd() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }
    
    @Test
    void testDivideByZero() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class, () -> {
            calc.divide(10, 0);
        });
    }
}
```

运行方式：
1. 测试方法上方会出现 **▶ Run Test** 和 **🐛 Debug Test**
2. 点击运行单个测试
3. 使用 **Test Explorer** 面板管理所有测试

### 6.2 测试面板

打开方式：
```
1. 左侧活动栏点击试管图标
2. 或 Ctrl/Cmd + Shift + P → "Test: Focus on Test Explorer View"
```

功能：
- 查看所有测试用例
- 按状态筛选（通过/失败/跳过）
- 批量运行测试
- 查看测试输出和错误信息

## 七、Maven 集成

### 7.1 Maven 视图

左侧活动栏的 Maven 图标提供：
- 项目依赖树
- Maven 生命周期命令（clean、compile、test、package、install）
- 自定义 Goals 执行

### 7.2 常用 Maven 命令

在终端或 Maven 视图中执行：

```bash
# 清理并编译
mvn clean compile

# 运行测试
mvn test

# 打包
mvn package

# 安装到本地仓库
mvn install

# 跳过测试打包
mvn package -DskipTests

# 运行 Spring Boot 应用
mvn spring-boot:run
```

### 7.3 pom.xml 编辑支持

- 依赖自动补全（搜索 Maven Central）
- 版本提示和更新
- 依赖冲突可视化
- 快捷键：Ctrl/Cmd + 点击依赖跳转到源码

## 八、常用扩展推荐

### 8.1 Java 开发必备

| 扩展 | 说明 |
|------|------|
| Extension Pack for Java | Java 核心功能包 |
| Spring Boot Extension Pack | Spring Boot 开发支持 |
| Lombok Annotations Support | Lombok 注解支持 |

### 8.2 代码质量

| 扩展 | 说明 |
|------|------|
| SonarLint | 代码质量检查 |
| Checkstyle | 代码风格检查 |
| Error Lens | 行内显示错误信息 |

### 8.3 数据库

| 扩展 | 说明 |
|------|------|
| Database Client | 通用数据库客户端 |
| MySQL | MySQL 数据库连接 |

### 8.4 效率工具

| 扩展 | 说明 |
|------|------|
| GitLens | Git 增强 |
| Prettier | 代码格式化 |
| Auto Close Tag | 自动闭合标签 |
| Bracket Pair Colorizer | 括号配对着色 |

## 九、VSCode 设置优化

### 9.1 推荐 settings.json

```json
{
    "java.configuration.updateBuildConfiguration": "automatic",
    "java.compile.nullAnalysis.mode": "automatic",
    "java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
    "java.codeGeneration.hashCodeEquals.useJava7Objects": true,
    "java.debug.settings.onBuildFailureProceed": true,
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000,
    "workbench.iconTheme": "material-icon-theme",
    "terminal.integrated.fontSize": 14
}
```

### 9.2 格式化配置

```json
{
    "[java]": {
        "editor.defaultFormatter": "redhat.java",
        "editor.formatOnSave": true,
        "editor.tabSize": 4
    }
}
```

## 十、远程开发

### 10.1 Remote - SSH

连接到远程服务器开发：

```
1. 安装 "Remote - SSH" 扩展
2. Ctrl/Cmd + Shift + P → "Remote-SSH: Connect to Host"
3. 输入 ssh user@hostname
4. 在远程服务器上安装 VSCode Server（自动完成）
5. 打开远程项目文件夹
```

优势：
- 代码在远程服务器上运行
- 本地只负责编辑
- 适合开发环境在 Linux 服务器的场景

### 10.2 Dev Containers

使用 Docker 容器作为开发环境：

```json
// .devcontainer/devcontainer.json
{
    "name": "Java",
    "image": "mcr.microsoft.com/devcontainers/java:21",
    "features": {
        "ghcr.io/devcontainers/features/java:1": {
            "version": "21",
            "installMaven": true,
            "installGradle": true
        }
    },
    "customizations": {
        "vscode": {
            "extensions": [
                "vscjava.vscode-java-pack"
            ]
        }
    }
}
```

## 十一、VSCode vs IDEA 对比

| 特性 | VSCode | IDEA |
|------|--------|------|
| 启动速度 | 快（1-3 秒） | 慢（10-30 秒） |
| 内存占用 | 低（300-500MB） | 高（1-2GB） |
| 代码补全 | 良好 | 优秀 |
| 重构能力 | 基础 | 强大 |
| 调试功能 | 良好 | 优秀 |
| Spring Boot 支持 | 需要扩展 | 原生支持 |
| 数据库工具 | 需要扩展 | 内置 |
| 价格 | 免费 | 付费（社区版免费） |
| 适合场景 | 轻量开发、全栈、学习 | 企业级 Java 开发 |

## 十二、小结

VSCode 通过扩展可以获得良好的 Java 开发体验：
1. 安装 Extension Pack for Java 获得核心功能
2. 配合 Spring Boot Extension Pack 进行框架开发
3. 利用 Remote 扩展实现远程开发
4. 适合轻量级、全栈、低配置场景
5. 与 IDEA 互补使用
