# 1.4 开发工具介绍

## 一、集成开发环境（IDE）

### 1.1 IntelliJ IDEA（推荐）

**特点**：
- 智能代码提示
- 强大的重构功能
- 丰富的插件生态
- 内置版本控制

**版本选择**：
| 版本 | 价格 | 功能 | 适合人群 |
|------|------|------|----------|
| Community | 免费 | Java SE 开发 | 初学者 |
| Ultimate | 付费 | Java EE、Web | 专业开发者 |

**安装步骤**：
1. 官网下载：https://www.jetbrains.com/idea/
2. 运行安装程序
3. 选择安装路径
4. 创建桌面快捷方式

**常用快捷键**：
```
macOS              Windows/Linux      功能
Ctrl + Space     Ctrl + Space      代码提示
Cmd + Shift + F10 Ctrl + Shift + F10 运行
Cmd + Shift + F9  Ctrl + Shift + F9  调试
Cmd + D           Ctrl + D           复制行
Cmd + /           Ctrl + /           行注释
Cmd + Shift + /   Ctrl + Shift + /   块注释
Cmd + Alt + L     Ctrl + Alt + L     格式化代码
Cmd + N           Alt + Insert       生成代码（Getter/Setter 等）
```

### 1.2 Eclipse

**特点**：
- 免费开源
- 插件丰富
- 跨平台

**安装步骤**：
1. 官网下载：https://www.eclipse.org/downloads/
2. 下载 Eclipse IDE for Java Developers
3. 解压即可使用

### 1.3 VS Code

**特点**：
- 轻量级
- 免费
- 需安装 Java 扩展包

**安装 Java 扩展**：
1. 打开 VS Code
2. 点击扩展图标
3. 搜索 "Extension Pack for Java"
4. 安装

## 二、IDEA 快速入门

### 2.1 创建项目

1. **File** → **New** → **Project**
2. 选择 **New Project**
3. 输入项目名称：`hello-java`
4. 选择 JDK 版本
5. 点击 **Create**

### 2.2 创建类

1. 右键 `src` 目录
2. **New** → **Java Class**
3. 输入类名：`HelloWorld`
4. 回车确认

### 2.3 常用模板

```
psvm + Tab → public static void main(String[] args) {}
sout + Tab → System.out.println();
soutv + Tab → System.out.println("变量 = " + 变量);
fori + Tab → for (int i = 0; i < ; i++) {}
```

### 2.4 项目结构

```
hello-java/
├── src/                    # 源代码目录
│   └── Main.java
├── out/                    # 编译输出目录
├── hello-java.iml          # 项目配置文件
└── .idea/                  # IDEA 配置目录
```

## 三、Maven 简介

### 3.1 什么是 Maven

Maven 是项目管理和构建工具，主要功能：
- 依赖管理
- 项目构建
- 标准化项目结构

### 3.2 安装 Maven

```bash
# macOS
brew install maven

# 验证安装
mvn -version
```

### 3.3 创建 Maven 项目

```bash
# 命令行创建
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=hello-maven \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

### 3.4 POM 文件示例

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>hello-maven</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <dependencies>
        <!-- 添加依赖 -->
    </dependencies>
</project>
```

## 四、Gradle 简介

### 4.1 什么是 Gradle

Gradle 是新一代构建工具，特点：
- 基于 Groovy/Kotlin
- 构建速度更快
- Android 默认构建工具

### 4.2 build.gradle 示例

```groovy
plugins {
    id 'java'
}

repositories {
    mavenCentral()
}

dependencies {
    // 添加依赖
}
```

## 五、Git 版本控制

### 5.1 安装 Git

```bash
# macOS
brew install git

# Windows
# 下载 https://git-scm.com/

# 验证
git --version
```

### 5.2 配置 Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 5.3 常用命令

```bash
git init          # 初始化仓库
git add .         # 添加文件
git commit -m "msg"  # 提交
git push          # 推送
git pull          # 拉取
git status        # 查看状态
git log           # 查看历史
```

## 六、开发环境检查清单

- [ ] JDK 安装并配置环境变量
- [ ] IDE 安装（推荐 IDEA）
- [ ] Maven/Gradle 安装（可选）
- [ ] Git 安装并配置
- [ ] 创建第一个 Java 项目
- [ ] 运行 Hello World

## 七、小结

本节要点：
1. **IDEA** 是最推荐的 Java 开发工具
2. 掌握常用快捷键提高效率
3. Maven/Gradle 用于项目管理
4. Git 用于版本控制

## 八、练习题

1. 安装 IntelliJ IDEA Community 版本
2. 创建第一个 Java 项目并运行 Hello World
3. 练习使用 psvm 和 sout 模板
4. 安装 Git 并配置用户信息

---

[上一节：1.3 Hello World](./01-03-HelloWorld.md) | [下一节：1.5 注释、标识符与关键字](./01-05-Comment-Identifier.md)
