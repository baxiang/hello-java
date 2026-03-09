# 2.5 Scanner 键盘输入

## 一、Scanner 简介

Scanner 是 Java 提供的用于获取用户输入的类，位于 `java.util` 包中。

```java
import java.util.Scanner;  // 导入 Scanner 类
```

## 二、基本使用步骤

### 2.1 三步走

```java
// 1. 导入 Scanner 类
import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        // 2. 创建 Scanner 对象
        Scanner scanner = new Scanner(System.in);
        
        // 3. 获取输入
        System.out.print("请输入你的姓名：");
        String name = scanner.next();
        
        System.out.println("你好，" + name + "！");
        
        // 关闭 scanner（可选）
        scanner.close();
    }
}
```

## 三、常用输入方法

### 3.1 方法总览

| 方法 | 说明 | 示例 |
|------|------|------|
| `nextInt()` | 读取整数 | `int age = scanner.nextInt();` |
| `nextDouble()` | 读取小数 | `double price = scanner.nextDouble();` |
| `next()` | 读取字符串（不含空格） | `String name = scanner.next();` |
| `nextLine()` | 读取一行（含空格） | `String line = scanner.nextLine();` |
| `nextBoolean()` | 读取布尔值 | `boolean flag = scanner.nextBoolean();` |

### 3.2 读取整数

```java
Scanner scanner = new Scanner(System.in);

System.out.print("请输入年龄：");
int age = scanner.nextInt();

System.out.print("请输入工资：");
long salary = scanner.nextLong();

System.out.println("年龄：" + age);
System.out.println("工资：" + salary);
```

### 3.3 读取小数

```java
Scanner scanner = new Scanner(System.in);

System.out.print("请输入身高（米）：");
double height = scanner.nextDouble();

System.out.print("请输入体重（公斤）：");
float weight = scanner.nextFloat();

System.out.println("身高：" + height + "米");
System.out.println("体重：" + weight + "公斤");
```

### 3.4 读取字符串

```java
Scanner scanner = new Scanner(System.in);

// next()：读取一个单词（遇到空格停止）
System.out.print("请输入姓名：");
String name = scanner.next();

// nextLine()：读取一行（可以包含空格）
System.out.print("请输入地址：");
String address = scanner.nextLine();

System.out.println("姓名：" + name);
System.out.println("地址：" + address);
```

### 3.5 读取布尔值

```java
Scanner scanner = new Scanner(System.in);

System.out.print("是否是学生（true/false）：");
boolean isStudent = scanner.nextBoolean();

System.out.println("是学生：" + isStudent);
```

## 四、next() 与 nextLine() 的区别

### 4.1 对比示例

```java
Scanner scanner = new Scanner(System.in);

// next() - 只读取一个单词
System.out.print("请输入姓名：");
String name = scanner.next();
// 输入：Zhang San
// 输出：Zhang（只读取到空格前）

// nextLine() - 读取整行
System.out.print("请输入地址：");
String address = scanner.nextLine();
// 输入：北京市朝阳区
// 输出：北京市朝阳区（完整读取）
```

### 4.2 混合使用的陷阱

```java
Scanner scanner = new Scanner(System.in);

System.out.print("请输入年龄：");
int age = scanner.nextInt();  // 输入：18

System.out.print("请输入姓名：");
String name = scanner.nextLine();  // ⚠️ 会跳过！

// 问题：nextInt() 只读取数字，留下换行符
// nextLine() 读取了换行符，认为是空行

// ✅ 解决方案 1：多用一次 nextLine()
int age = scanner.nextInt();
scanner.nextLine();  // 消耗换行符
String name = scanner.nextLine();

// ✅ 解决方案 2：统一使用 nextLine()
int age = Integer.parseInt(scanner.nextLine());
String name = scanner.nextLine();
```

## 五、综合示例

### 5.1 学生信息录入

```java
import java.util.Scanner;

public class StudentInfo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== 学生信息录入 ===");
        
        // 输入基本信息
        System.out.print("请输入姓名：");
        String name = scanner.nextLine();
        
        System.out.print("请输入年龄：");
        int age = scanner.nextInt();
        
        System.out.print("请输入身高（米）：");
        double height = scanner.nextDouble();
        
        System.out.print("请输入成绩：");
        double score = scanner.nextDouble();
        
        scanner.nextLine();  // 消耗换行符
        
        System.out.print("请输入家庭地址：");
        String address = scanner.nextLine();
        
        // 输出信息
        System.out.println("\n=== 学生信息 ===");
        System.out.println("姓名：" + name);
        System.out.println("年龄：" + age);
        System.out.println("身高：" + height + "米");
        System.out.println("成绩：" + score);
        System.out.println("地址：" + address);
        
        scanner.close();
    }
}
```

### 5.2 简单计算器

```java
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== 简单计算器 ===");
        
        System.out.print("请输入第一个数：");
        double num1 = scanner.nextDouble();
        
        System.out.print("请输入第二个数：");
        double num2 = scanner.nextDouble();
        
        System.out.print("请选择运算（+ - * /）：");
        char operator = scanner.next().charAt(0);
        
        double result = 0;
        
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                System.out.println("无效的运算符！");
                return;
        }
        
        System.out.println("结果：" + result);
        
        scanner.close();
    }
}
```

### 5.3 用户登录

```java
import java.util.Scanner;

public class Login {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 预设的正确用户名和密码
        String correctUser = "admin";
        String correctPwd = "123456";
        
        System.out.println("=== 用户登录 ===");
        
        System.out.print("请输入用户名：");
        String username = scanner.nextLine();
        
        System.out.print("请输入密码：");
        String password = scanner.nextLine();
        
        // 验证
        if (username.equals(correctUser) && password.equals(correctPwd)) {
            System.out.println("登录成功！欢迎，" + username);
        } else {
            System.out.println("用户名或密码错误！");
        }
        
        scanner.close();
    }
}
```

## 六、异常处理

### 6.1 输入类型不匹配

```java
Scanner scanner = new Scanner(System.in);

try {
    System.out.print("请输入整数：");
    int num = scanner.nextInt();
    System.out.println("你输入的是：" + num);
} catch (Exception e) {
    System.out.println("输入错误！请输入整数。");
}
```

### 6.2 安全使用 Scanner

```java
Scanner scanner = null;
try {
    scanner = new Scanner(System.in);
    System.out.print("请输入：");
    String input = scanner.nextLine();
    System.out.println("你输入的是：" + input);
} catch (Exception e) {
    System.out.println("发生错误：" + e.getMessage());
} finally {
    if (scanner != null) {
        scanner.close();
    }
}
```

## 七、注意事项

### 7.1 及时关闭资源

```java
// 推荐：使用完关闭 Scanner
Scanner scanner = new Scanner(System.in);
// ... 使用 scanner
scanner.close();
```

### 7.2 不要重复创建

```java
// ❌ 不好
Scanner scanner1 = new Scanner(System.in);
int a = scanner1.nextInt();

Scanner scanner2 = new Scanner(System.in);  // 重复创建
String b = scanner2.nextLine();

// ✅ 好
Scanner scanner = new Scanner(System.in);
int a = scanner.nextInt();
String b = scanner.nextLine();
```

## 八、小结

本节要点：
1. **Scanner** 用于获取键盘输入
2. **常用方法**：nextInt()、nextDouble()、next()、nextLine()
3. **next() vs nextLine()**：前者不含空格，后者含空格
4. **混合使用**：注意换行符问题
5. **关闭资源**：使用完后调用 close()

## 九、练习题

1. 编写程序：输入两个整数，输出它们的和、差、积、商

2. 编写程序：输入圆的半径，计算并输出周长和面积

3. 编写程序：输入员工的姓名、基本工资、奖金，计算并输出：
   - 应发工资（基本工资 + 奖金）
   - 扣除 10% 的税后实发工资

4. 改进登录程序：允许用户有 3 次输入机会

---

[上一节：2.4 常量与 final](./02-04-常量与 final.md) | [下一章：第 3 章 运算符](../ch03-operator/README.md)
