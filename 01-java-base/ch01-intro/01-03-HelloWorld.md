# 1.3 第一个 Java 程序：Hello World

## 一、编写第一个程序

### 1.1 创建文件

创建文件 `HelloWorld.java`：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### 1.2 代码解析

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

## 二、编译与运行

### 2.1 命令行方式

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

### 2.2 使用 IDE（推荐）

**IntelliJ IDEA**：
1. 创建 Java 项目
2. 右键 → New → Java Class
3. 输入类名 `HelloWorld`
4. 输入 `psvm` 回车，自动生成 main 方法
5. 输入 `sout` 回车，自动生成输出语句
6. 点击运行按钮

## 三、Java 程序结构

### 3.1 完整结构示例

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

### 3.2 命名规则

| 类型 | 规则 | 示例 |
|------|------|------|
| 类名 | 大驼峰命名（PascalCase） | `HelloWorld`, `StudentInfo` |
| 方法名 | 小驼峰命名（camelCase） | `main`, `getName` |
| 变量名 | 小驼峰命名 | `age`, `studentName` |
| 常量名 | 全大写，下划线分隔 | `MAX_VALUE`, `PI` |

### 3.3 文件命名规则

- 文件名必须与 `public` 类名相同
- 扩展名为 `.java`
- 区分大小写

```
✅ 正确：HelloWorld.java 中定义 public class HelloWorld
❌ 错误：HelloWorld.java 中定义 public class hello
```

## 四、常见错误

### 4.1 编译错误

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

### 4.2 运行错误

```bash
# 错误：找不到或无法加载主类
java HelloWorld  # 确保已编译且类名正确

# 错误：需要 Java SE 17
# 原因：JDK 版本不匹配，检查 JAVA_HOME
```

## 五、练习：修改程序

### 5.1 练习 1：输出个人信息

```java
public class MyInfo {
    public static void main(String[] args) {
        System.out.println("姓名：张三");
        System.out.println("年龄：18");
        System.out.println("城市：北京");
    }
}
```

### 5.2 练习 2：输出图形

```java
public class PrintShape {
    public static void main(String[] args) {
        System.out.println("  *  ");
        System.out.println(" *** ");
        System.out.println("*****");
    }
}
```

### 5.3 练习 3：计算并输出

```java
public class Calculate {
    public static void main(String[] args) {
        System.out.println("1 + 2 = " + (1 + 2));
        System.out.println("10 * 5 = " + (10 * 5));
    }
}
```

## 六、Java 开发流程

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

## 七、小结

本节要点：
1. Java 程序由类组成，必须包含 `main` 方法
2. 文件名必须与 `public` 类名相同
3. 编译使用 `javac`，运行使用 `java`
4. 语句以分号结尾，区分大小写

## 八、练习题

1. 编写程序输出你的姓名、年龄、爱好
2. 编写程序输出一个三角形图案
3. 编写程序输出 1 到 10 的累加和

---

[上一节：1.2 JDK、JRE、JVM](./01-02-JDK-JRE-JVM.md) | [下一节：1.4 开发工具介绍](./01-04-IDE-Tools.md)
