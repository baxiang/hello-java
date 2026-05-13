# Scanner 输入

## 一、问题引入

你的程序目前只能输出信息，像广播一样单向喊话。但真实应用需要交互——用户输入姓名、选择菜单、填写表单。没有输入能力，程序就是个死物。

Java 提供了 `Scanner` 类来读取键盘输入。看似简单，但新手最容易踩两个坑：`next()` 读不到空格后的内容，`nextInt()` 和 `nextLine()` 混合使用时会"吞掉"输入。搞不清这两个问题，调试一整天都找不到原因。

## 二、核心概念

`Scanner` 是 `java.util` 包下的输入工具类，像一根**吸管**插在输入流上，每次从流中"吸"一段数据出来。

```java
import java.util.Scanner;
```

核心方法：

| 方法 | 读取内容 | 遇空格 | 遇换行 |
|------|----------|--------|--------|
| `nextInt()` | 整数 | 停止 | 停止，换行符留在流中 |
| `nextDouble()` | 小数 | 停止 | 停止，换行符留在流中 |
| `next()` | 一个单词 | 停止 | 停止，换行符留在流中 |
| `nextLine()` | 一整行 | 不停止 | 停止，**消费换行符** |

> 关键区别：`nextLine()` 会吃掉换行符，其他方法把换行符留在流里。

## 三、代码对比

### next() vs nextLine()

```java
// 输入：Zhang San

// ❌ next() 只读一个单词
String name = scanner.next();
System.out.println(name);  // 输出: Zhang（San 丢了）

// ✅ nextLine() 读取整行
String name = scanner.nextLine();
System.out.println(name);  // 输出: Zhang San
```

### nextInt() 后接 nextLine() 的经典陷阱

```java
// ❌ nextLine() 被跳过
System.out.print("年龄：");
int age = scanner.nextInt();      // 输入 18 后按回车
System.out.print("地址：");
String addr = scanner.nextLine(); // 跳过！addr 为空字符串
// 原因：nextInt() 只读了 18，换行符留在流中
// nextLine() 读到换行符，认为是空行

// ✅ 方案一：多调用一次 nextLine() 消耗换行符
int age = scanner.nextInt();
scanner.nextLine();               // 吃掉换行符
String addr = scanner.nextLine(); // 正常读取

// ✅ 方案二：统一用 nextLine()，再手动转换
int age = Integer.parseInt(scanner.nextLine());
String addr = scanner.nextLine(); // 正常读取
```

### 重复创建 Scanner

```java
// ❌ 多次创建，浪费资源且可能导致输入流冲突
Scanner sc1 = new Scanner(System.in);
int a = sc1.nextInt();
Scanner sc2 = new Scanner(System.in);
String b = sc2.nextLine();

// ✅ 一个 Scanner 重复使用
Scanner scanner = new Scanner(System.in);
int a = scanner.nextInt();
String b = scanner.nextLine();
```

## 四、实现方式

### 基本三步走

```java
// 1. 导入
import java.util.Scanner;

// 2. 创建（绑定键盘输入）
Scanner scanner = new Scanner(System.in);

// 3. 读取
System.out.print("请输入姓名：");
String name = scanner.nextLine();
System.out.println("你好，" + name);

// 4. 关闭
scanner.close();
```

### 读取不同类型

```java
Scanner scanner = new Scanner(System.in);

System.out.print("年龄：");
int age = scanner.nextInt();

System.out.print("身高（米）：");
double height = scanner.nextDouble();

System.out.print("是否学生（true/false）：");
boolean isStudent = scanner.nextBoolean();

System.out.println(age + " / " + height + " / " + isStudent);
```

### 实用场景：信息录入

```java
Scanner scanner = new Scanner(System.in);

System.out.print("姓名：");
String name = scanner.nextLine();

System.out.print("年龄：");
int age = Integer.parseInt(scanner.nextLine());  // 统一用 nextLine

System.out.print("地址：");
String address = scanner.nextLine();

System.out.println(name + "，" + age + "岁，住" + address);

scanner.close();
```

### 输入异常处理

```java
Scanner scanner = new Scanner(System.in);

System.out.print("请输入整数：");
try {
    int num = scanner.nextInt();
    System.out.println("你输入了：" + num);
} catch (Exception e) {
    System.out.println("输入错误，请输入整数！");
} finally {
    scanner.close();
}
```

> `nextInt()` 遇到非数字输入会抛 `InputMismatchException`，生产代码需要捕获处理。

## 五、Q&A

**Q：为什么 nextLine() 会被"跳过"？**

A：不是被跳过，是它正常读取了一个空行。`nextInt()` 读取数字后，换行符 `\n` 留在输入缓冲区。`nextLine()` 遇到 `\n` 立刻返回空字符串。解决方案：中间加一次 `nextLine()` 吃掉换行符，或全部用 `nextLine()` + 手动转型。

**Q：Scanner 一定要 close 吗？**

A：理论上应该关闭，但 `System.in` 是系统流，关闭后无法重新打开。简单练习中可以不关；正式项目中用 try-with-resources 确保资源释放。

**Q：next() 和 nextLine() 怎么选？**

A：需要读取含空格的输入（地址、句子）用 `nextLine()`；只读单个单词（用户名、命令）用 `next()`。不确定就用 `nextLine()`，更安全。

**Q：能读取单个字符吗？**

A：Scanner 没有直接读 char 的方法。变通方式：`char c = scanner.next().charAt(0);`——取 next() 返回字符串的第一个字符。

## 六、小结表格

| 要点 | 说明 |
|------|------|
| 使用步骤 | 导入 → 创建 `new Scanner(System.in)` → 读取 → 关闭 |
| nextInt() | 读整数，换行符留在流中 |
| nextDouble() | 读小数，换行符留在流中 |
| next() | 读一个单词（遇空格停止） |
| nextLine() | 读整行（含空格），消费换行符 |
| 混用陷阱 | `nextInt()` 后接 `nextLine()` 会被跳过 |
| 解决方案 | 中间加 `nextLine()` 消耗换行符，或统一用 `nextLine()` + 转型 |
| 异常处理 | `nextInt()` 遇非数字抛 `InputMismatchException` |
| 资源管理 | 用完调用 `close()`，或 try-with-resources |
