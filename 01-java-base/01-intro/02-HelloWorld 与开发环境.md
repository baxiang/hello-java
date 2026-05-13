# 1.3 第一个 Java 程序：Hello World

### 一、编写第一个程序

#### 1.1 创建文件

创建文件 `HelloWorld.java`：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

#### 1.2 代码解析

```java
public class HelloWorld {           // 1. 定义公共类，类名必须与文件名相同
    public static void main(String[] args) {  // 2. 主方法，程序入口
        System.out.println("Hello, World!");  // 3. 打印输出语句
    }
}
```

**关键点**：
1. `public class`：定义公共类
2. `main` 方法：程序的入口点
3. `System.out.println()`：控制台输出
4. 每条语句以分号 `;` 结尾
5. 类名必须与文件名相同

### 二、编译与运行

#### 2.1 命令行方式

```bash
# 1. 打开终端，进入文件所在目录
cd /path/to/your/code

# 2. 编译 Java 文件（生成 .class 字节码文件）
javac HelloWorld.java

# 3. 运行程序（不需要 .class 后缀）
java HelloWorld
```

**输出结果**：
```
Hello, World!
```

#### 2.2 使用 IDE（推荐）

**IntelliJ IDEA**：
1. 创建 Java 项目
2. 右键 → New → Java Class
3. 输入类名 `HelloWorld`
4. 输入 `psvm` 回车，自动生成 main 方法
5. 输入 `sout` 回车，自动生成输出语句
6. 点击运行按钮

### 三、Java 程序结构

#### 3.1 完整结构示例

```java
/**
 * 这是一个 Hello World 程序
 * @author YourName
 * @version 1.0
 */
public class HelloWorld {
    
    // 主方法：程序入口
    public static void main(String[] args) {
        // 打印问候语
        System.out.println("Hello, World!");
        
        // 打印多行内容
        System.out.println("欢迎学习 Java！");
        System.out.println("加油！");
    }
}
```

#### 3.2 命名规则

| 类型 | 规则 | 示例 |
|------|------|------|
| 类名 | 大驼峰命名（PascalCase） | `HelloWorld`, `StudentInfo` |
| 方法名 | 小驼峰命名（camelCase） | `main`, `getName` |
| 变量名 | 小驼峰命名 | `age`, `studentName` |
| 常量名 | 全大写，下划线分隔 | `MAX_VALUE`, `PI` |

#### 3.3 文件命名规则

- 文件名必须与 `public` 类名相同
- 扩展名为 `.java`
- 区分大小写

```
✅ 正确：HelloWorld.java 中定义 public class HelloWorld
❌ 错误：HelloWorld.java 中定义 public class hello
```

### 四、常见错误

#### 4.1 编译错误

```java
// 错误 1：类名与文件名不匹配
// 文件名：Hello.java
public class HelloWorld {  // ❌ 错误
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}

// 错误 2：缺少分号
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello")  // ❌ 缺少分号
    }
}

// 错误 3：main 方法拼写错误
public class Hello {
    public static void mian(String[] args) {  // ❌ main 拼错
        System.out.println("Hello");
    }
}
```

#### 4.2 运行错误

```bash
# 错误：找不到或无法加载主类
java HelloWorld  # 确保已编译且类名正确

# 错误：需要 Java SE 21
# 原因：JDK 版本不匹配，检查 JAVA_HOME
```

### 五、练习：修改程序

#### 5.1 练习 1：输出个人信息

```java
public class MyInfo {
    public static void main(String[] args) {
        System.out.println("姓名：张三");
        System.out.println("年龄：18");
        System.out.println("城市：北京");
    }
}
```

#### 5.2 练习 2：输出图形

```java
public class PrintShape {
    public static void main(String[] args) {
        System.out.println("  *  ");
        System.out.println(" *** ");
        System.out.println("*****");
    }
}
```

#### 5.3 练习 3：计算并输出

```java
public class Calculate {
    public static void main(String[] args) {
        System.out.println("1 + 2 = " + (1 + 2));
        System.out.println("10 * 5 = " + (10 * 5));
    }
}
```

### 六、Java 开发流程

```
编写代码 (.java 文件)
    ↓
编译代码 (javac)
    ↓
生成字节码 (.class 文件)
    ↓
运行程序 (java)
    ↓
查看结果
```

### 七、小结

本节要点：
1. Java 程序由类组成，必须包含 `main` 方法
2. 文件名必须与 `public` 类名相同
3. 编译使用 `javac`，运行使用 `java`
4. 语句以分号结尾，区分大小写


---

# 1.4 开发工具介绍

### 一、集成开发环境（IDE）

#### 1.1 IntelliJ IDEA（推荐）

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

#### 1.2 Eclipse

**特点**：
- 免费开源
- 插件丰富
- 跨平台

**安装步骤**：
1. 官网下载：https://www.eclipse.org/downloads/
2. 下载 Eclipse IDE for Java Developers
3. 解压即可使用

#### 1.3 VS Code

**特点**：
- 轻量级
- 免费
- 需安装 Java 扩展包

**安装 Java 扩展**：
1. 打开 VS Code
2. 点击扩展图标
3. 搜索 "Extension Pack for Java"
4. 安装

### 二、IDEA 快速入门

#### 2.1 创建项目

1. **File** → **New** → **Project**
2. 选择 **New Project**
3. 输入项目名称：`hello-java`
4. 选择 JDK 版本（推荐 Java 21）
5. 点击 **Create**

#### 2.2 创建类

1. 右键 `src` 目录
2. **New** → **Java Class**
3. 输入类名：`HelloWorld`
4. 回车确认

#### 2.3 常用模板

```
psvm + Tab → public static void main(String[] args) {}
sout + Tab → System.out.println();
soutv + Tab → System.out.println("变量 = " + 变量);
fori + Tab → for (int i = 0; i < ; i++) {}
```

#### 2.4 项目结构

```
hello-java/
├── src/                    # 源代码目录
│   └── Main.java
├── out/                    # 编译输出目录
├── hello-java.iml          # 项目配置文件
└── .idea/                  # IDEA 配置目录
```

### 三、Maven 简介

#### 3.1 什么是 Maven

Maven 是项目管理和构建工具，主要功能：
- 依赖管理
- 项目构建
- 标准化项目结构

#### 3.2 安装 Maven

```bash
# macOS
brew install maven

# 验证安装
mvn -version
```

#### 3.3 创建 Maven 项目

```bash
# 命令行创建
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=hello-maven \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

#### 3.4 POM 文件示例

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

### 四、Gradle 简介

#### 4.1 什么是 Gradle

Gradle 是新一代构建工具，特点：
- 基于 Groovy/Kotlin
- 构建速度更快
- Android 默认构建工具

#### 4.2 build.gradle 示例

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

### 五、Git 版本控制

#### 5.1 安装 Git

```bash
# macOS
brew install git

# Windows
# 下载 https://git-scm.com/

# 验证
git --version
```

#### 5.2 配置 Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 5.3 常用命令

```bash
git init          # 初始化仓库
git add .         # 添加文件
git commit -m "msg"  # 提交
git push          # 推送
git pull          # 拉取
git status        # 查看状态
git log           # 查看历史
```

### 六、开发环境检查清单

- [ ] JDK 安装并配置环境变量
- [ ] IDE 安装（推荐 IDEA）
- [ ] Maven/Gradle 安装（可选）
- [ ] Git 安装并配置
- [ ] 创建第一个 Java 项目
- [ ] 运行 Hello World

### 七、小结

本节要点：
1. **IDEA** 是最推荐的 Java 开发工具
2. 掌握常用快捷键提高效率
3. Maven/Gradle 用于项目管理
4. Git 用于版本控制


---

# 1.5 注释、标识符与关键字

### 一、注释

注释是代码的说明文字，不会被编译执行。

#### 1.1 单行注释

使用 `//` 开头：

```java
// 这是单行注释
int age = 18;  // 定义年龄变量
```

#### 1.2 多行注释

使用 `/* ... */` 包裹：

```java
/*
 * 这是多行注释
 * 可以写多行内容
 * 常用于临时注释代码
 */
int name = "张三";
```

#### 1.3 文档注释

使用 `/** ... */` 包裹，可生成 API 文档：

```java
/**
 * 这是一个学生类
 * @author 张三
 * @version 1.0
 * @since 2026-01-01
 */
public class Student {
    
    /**
     * 主方法
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // ...
    }
}
```

#### 1.4 注释最佳实践

```java
// ✅ 好的注释：解释为什么
// 使用快速排序，因为数据量大时性能更好
quickSort(arr);

// ❌ 坏的注释：重复代码
i++;  // i 加 1

// ✅ 好的注释：标记待办
// TODO: 需要优化性能
// FIXME: 这里有 bug 需要修复
// NOTE: 注意边界条件
```

### 二、标识符

#### 2.1 什么是标识符

标识符是用于命名类、方法、变量等的字符序列。

#### 2.2 命名规则（必须遵守）

| 规则 | 说明 | 示例 |
|------|------|------|
| 组成 | 字母、数字、下划线 `_`、美元符号 `$` | `name`, `age1`, `$money` |
| 开头 | 不能以数字开头 | ✅ `name1` ❌ `1name` |
| 大小写 | 区分大小写 | `Name` ≠ `name` |
| 关键字 | 不能使用 Java 关键字 | ❌ `int`, `class` |
| 长度 | 无限制，建议有意义 | ✅ `studentName` |

#### 2.3 命名规范（建议遵守）

| 类型 | 规范 | 示例 |
|------|------|------|
| 类名 | 大驼峰命名（PascalCase） | `Student`, `HelloWorld` |
| 方法名 | 小驼峰命名（camelCase） | `getName`, `calculateSum` |
| 变量名 | 小驼峰命名 | `age`, `studentName` |
| 常量名 | 全大写，下划线分隔 | `MAX_COUNT`, `PI_VALUE` |
| 包名 | 全小写，点号分隔 | `com.example.demo` |

#### 2.4 命名示例

```java
// ✅ 好的命名
public class StudentInfo {
    private String studentName;
    private int studentAge;
    public static final int MAX_SCORE = 100;
    
    public void calculateTotalScore() {
        // ...
    }
}

// ❌ 坏的命名
public class student_info {  // 类名不应使用下划线
    private String sN;       // 变量名无意义
    private int a;           // 太简短
    public static final int max = 100;  // 常量应全大写
}
```

### 三、关键字

#### 3.1 什么是关键字

关键字是 Java 保留的具有特殊含义的单词，不能用作标识符。

#### 3.2 常用关键字分类

##### 访问控制
```
public      - 公共访问权限
protected   - 受保护访问权限
private     - 私有访问权限
```

##### 类、方法、变量修饰符
```
static      - 静态的
final       - 最终的，不可变的
abstract    - 抽象的
synchronized - 同步的
volatile    - 易失的
transient   - 瞬态的
native      - 本地的
strictfp    - 严格浮点
```

##### 程序控制
```
if          - 条件判断
else        - 否则
switch      - 开关语句
case        - 情况
default     - 默认
while       - 当...时
do          - 做
for         - 对于
break       - 跳出
continue    - 继续
return      - 返回
```

##### 异常处理
```
try         - 尝试
catch       - 捕获
finally     - 最终
throw       - 抛出
throws      - 抛出（声明）
```

##### 包相关
```
package     - 包
import      - 导入
```

##### 数据类型
```
byte        - 字节
short       - 短整型
int         - 整型
long        - 长整型
float       - 浮点型
double      - 双精度浮点型
char        - 字符
boolean     - 布尔型
void        - 无返回值
```

##### 其他
```
class       - 类
interface   - 接口
enum        - 枚举
extends     - 继承
implements  - 实现
new         - 创建对象
this        - 当前对象
super       - 父类
instanceof  - 实例判断
```

#### 3.3 保留字

以下单词目前未使用，但保留：
```
goto
const
```

#### 3.4 特殊字面量

```
true   - 布尔真
false  - 布尔假
null   - 空值
```

> ⚠️ **注意**：`true`、`false`、`null` 不是关键字，但也不能用作标识符

### 四、综合示例

```java
/**
 * 学生信息管理系统
 * @author 张三
 * @version 1.0
 */
package com.example.student;  // 包声明

import java.util.Scanner;  // 导入工具类

// 类名：大驼峰
public class StudentManager {
    
    // 常量：全大写
    public static final int MAX_STUDENTS = 100;
    
    // 变量：小驼峰
    private String studentName;
    private int studentAge;
    
    /**
     * 主方法
     */
    public static void main(String[] args) {
        // 创建 Scanner 对象
        Scanner scanner = new Scanner(System.in);
        
        // 输入学生信息
        System.out.print("请输入姓名：");
        String name = scanner.nextLine();
        
        System.out.print("请输入年龄：");
        int age = scanner.nextInt();
        
        // 输出信息
        System.out.println("姓名：" + name);
        System.out.println("年龄：" + age);
    }
    
    // 方法：小驼峰
    public void printInfo() {
        System.out.println("学生信息");
    }
}
```

### 五、常见错误

#### 5.1 命名错误

```java
// ❌ 以数字开头
int 1stPlace = 1;

// ❌ 使用关键字
int class = 1;
int public = 100;

// ❌ 包含非法字符
int student-name = "张三";  // 不能有连字符
int student@name = "李四";  // 不能有@
```

#### 5.2 大小写错误

```java
int Age = 18;
System.out.println(age);  // ❌ 找不到符号，Java 区分大小写
```

#### 5.3 注释错误

```java
// ❌ 多行注释未闭合
/* 这是注释
System.out.println("Hello");

// ✅ 正确
/* 这是注释 */
System.out.println("Hello");
```

### 六、小结

本节要点：
1. **注释**：单行 `//`、多行 `/* */`、文档 `/** */`
2. **标识符命名规则**：字母数字下划线$，不能数字开头
3. **命名规范**：类名大驼峰、方法变量小驼峰、常量全大写
4. **关键字**：Java 保留单词，不能用作标识符
