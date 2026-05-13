# HelloWorld

## 一、问题引入

JDK 装好了，环境变量也配了——然后呢？怎么从零写出一个能跑的 Java 程序？新手第一次用命令行编译，不是"找不到类"就是"无法加载主类"，连一个 Hello World 都跑不起来，挫败感直接拉满。

## 二、核心概念

### 第一个 Java 程序

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");  // 输出: Hello, World!
    }
}
```

逐行解读：

| 代码 | 含义 |
|------|------|
| `public class HelloWorld` | 定义公共类，类名必须与文件名一致 |
| `public static void main(String[] args)` | 程序入口，JVM 从这里开始执行 |
| `System.out.println(...)` | 向控制台输出一行文字 |
| `;` | 每条语句必须以分号结尾 |

> Java 程序 = 类的集合，程序入口固定为 `main` 方法。就像一栋大楼有很多房间（类），但入口大厅（main）只有一个。

### 编译与运行流程

```
源代码 (.java) → javac 编译 → 字节码 (.class) → java 运行 → 输出结果
```

字节码是 JVM 能理解的中间指令，不是直接给 CPU 执行的机器码。就像乐谱不是声音，但任何品牌的钢琴都能把它弹出来。

## 三、代码对比

### 类名与文件名

```java
// ❌ 文件名 HelloWorld.java，但类名不匹配
public class hello {
    public static void main(String[] args) {
        System.out.println("Hi");
    }
}
// 编译错误: class hello is public, should be declared in a file named hello.java

// ✅ 文件名 HelloWorld.java，类名一致
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hi");
    }
}
```

### main 方法拼写

```java
// ❌ main 拼成 mian——能编译，但运行报错
public static void mian(String[] args) { ... }
// 运行错误: 找不到或无法加载主类

// ✅ 正确拼写
public static void main(String[] args) { ... }
```

### 缺少分号

```java
// ❌ 语句末尾漏分号
System.out.println("Hello")  // 编译错误: 需要 ';'

// ✅ 每条语句加分号
System.out.println("Hello");
```

## 四、实现方式

### 命令行编译运行

```bash
# 1. 进入源文件所在目录
cd /path/to/code

# 2. 编译（生成 HelloWorld.class）
javac HelloWorld.java

# 3. 运行（不加 .class 后缀）
java HelloWorld
// 输出: Hello, World!
```

> `javac` 是编译器，`.java` → `.class`；`java` 是启动器，加载 `.class` 到 JVM 执行。

### 使用 IntelliJ IDEA

1. **File** → **New** → **Project**，选 Java 21，创建项目
2. 右键 `src` → **New** → **Java Class**，输入 `HelloWorld`
3. 输入代码，点击运行按钮

常用代码模板（输入后按 Tab）：

```
psvm → public static void main(String[] args) {}
sout → System.out.println();
```

### 输出多个内容

```java
System.out.println("姓名：张三");   // 输出后换行
System.out.println("年龄：18");
System.out.print("城市：");        // 输出后不换行
System.out.println("北京");
// 输出:
// 姓名：张三
// 年龄：18
// 城市：北京
```

### 字符串拼接

```java
System.out.println("1 + 2 = " + (1 + 2));  // 输出: 1 + 2 = 3
System.out.println("1 + 2 = " + 1 + 2);     // 输出: 1 + 2 = 12（字符串拼接）
```

## 五、Q&A

**Q：为什么类名必须和文件名一样？**
A：Java 规定 `public` 类的类名必须与文件名相同，这是 JVM 查找类的依据。一个 `.java` 文件只能有一个 `public` 类，但可以有多个非 public 类。

**Q：`String[] args` 有什么用？**
A：接收命令行参数。`java HelloWorld 张三 18` 执行时，`args[0]` 是 `"张三"`，`args[1]` 是 `"18"`。初学阶段不用管，写上即可。

**Q：编译成功但运行报"找不到或无法加载主类"？**
A：常见原因：(1) 运行时加了 `.class` 后缀；(2) 类名大小写不一致；(3) 包声明与目录结构不匹配；(4) classpath 设置有误。

**Q：`println` 和 `print` 的区别？**
A：`println` 输出后自动换行，`print` 输出后光标留在行尾。

## 六、小结表格

| 要点 | 说明 |
|------|------|
| 程序入口 | `public static void main(String[] args)` |
| 文件名规则 | `public` 类名必须与 `.java` 文件名一致 |
| 编译命令 | `javac 文件名.java` |
| 运行命令 | `java 类名`（不加后缀） |
| 输出语句 | `System.out.println()` 换行，`System.out.print()` 不换行 |
| 语句结尾 | 每条语句必须以 `;` 结尾 |
