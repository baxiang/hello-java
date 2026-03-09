# 2.4 常量与 final 关键字

## 一、什么是常量

常量是在程序运行过程中**值不能改变**的量。

```
变量：值可以改变
常量：值不能改变
```

## 二、final 关键字

### 2.1 基本语法

```java
final 数据类型 常量名 = 值;
```

### 2.2 示例

```java
public class FinalDemo {
    public static void main(String[] args) {
        // 定义常量
        final int MAX_AGE = 150;
        final double PI = 3.14159;
        final String COMPANY = "阿里巴巴";
        
        System.out.println("最大年龄：" + MAX_AGE);
        System.out.println("圆周率：" + PI);
        System.out.println("公司：" + COMPANY);
        
        // ❌ 错误：常量不能修改
        // MAX_AGE = 200;  // 编译错误
        // PI = 3.14;      // 编译错误
    }
}
```

## 三、常量的命名规范

### 3.1 命名规则

```java
// ✅ 推荐：全大写，单词间用下划线分隔
final int MAX_COUNT = 100;
final double MIN_PRICE = 0.01;
final String DEFAULT_NAME = "未知";

// ❌ 不推荐
final int maxCount = 100;     // 像变量
final int MaxCount = 100;     // 像类名
```

### 3.2 常量 vs 变量

```java
public class ConstantVsVariable {
    public static void main(String[] args) {
        // 常量：不能修改
        final int DAYS_IN_WEEK = 7;
        
        // 变量：可以修改
        int day = 1;
        day = 2;
        day = 3;
        
        System.out.println("一周天数：" + DAYS_IN_WEEK);
        System.out.println("今天：" + day);
    }
}
```

## 四、final 的使用场景

### 4.1 修饰变量（常量）

```java
// 成员常量
public class Student {
    final String SCHOOL_NAME = "清华大学";  // 实例常量
    static final String CITY = "北京";      // 类常量
    
    public void study() {
        // 局部常量
        final int PASS_SCORE = 60;
        System.out.println("及格线：" + PASS_SCORE);
    }
}
```

### 4.2 修饰方法

```java
public class Parent {
    // final 方法不能被子类重写
    public final void show() {
        System.out.println("父类方法");
    }
}

public class Child extends Parent {
    // ❌ 错误：不能重写 final 方法
    // public void show() { }
}
```

### 4.3 修饰类

```java
// final 类不能被继承
public final class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}

// ❌ 错误：不能继承 final 类
// public class MyMath extends MathUtils { }
```

## 五、常量的好处

### 5.1 提高可读性

```java
// ❌ 不好：魔术数字
if (score >= 60) {
    System.out.println("及格");
}

// ✅ 好：使用常量
final int PASS_LINE = 60;
if (score >= PASS_LINE) {
    System.out.println("及格");
}
```

### 5.2 便于维护

```java
// 定义常量
final double TAX_RATE = 0.13;

// 多处使用
double price1 = 100 * (1 + TAX_RATE);
double price2 = 200 * (1 + TAX_RATE);
double price3 = 300 * (1 + TAX_RATE);

// 修改税率只需改一处
// final double TAX_RATE = 0.09;
```

### 5.3 避免错误

```java
// 常量防止意外修改
final int MAX_RETRY = 3;
int retry = 0;

while (retry < MAX_RETRY) {
    // ...
    retry++;
    // MAX_RETRY 不会被意外修改
}
```

## 六、static final 组合

### 6.1 类常量

```java
public class Constants {
    // 实例常量：每个对象一份
    final int INSTANCE_CONST = 1;
    
    // 类常量：所有对象共享
    static final int CLASS_CONST = 2;
    
    // 最常用的方式
    public static final double PI = 3.14159;
    public static final int MAX_VALUE = 100;
}

// 使用
System.out.println(Constants.PI);
```

### 6.2 系统常量

```java
// Math 类中的常量
double pi = Math.PI;
double e = Math.E;

// Integer 类中的常量
int max = Integer.MAX_VALUE;
int min = Integer.MIN_VALUE;

// System 类中的常量
PrintStream out = System.out;
InputStream in = System.in;
```

## 七、综合示例

```java
/**
 * 圆的计算器
 */
public class CircleCalculator {
    
    // 圆周率常量
    public static final double PI = 3.1415926535;
    
    // 默认半径
    public static final double DEFAULT_RADIUS = 1.0;
    
    public static void main(String[] args) {
        double radius = 5.0;
        
        // 计算周长
        double circumference = 2 * PI * radius;
        
        // 计算面积
        double area = PI * radius * radius;
        
        System.out.println("半径：" + radius);
        System.out.println("周长：" + circumference);
        System.out.println("面积：" + area);
        
        // 使用默认半径
        double defaultC = 2 * PI * DEFAULT_RADIUS;
        System.out.println("默认圆周长：" + defaultC);
    }
}
```

## 八、注意事项

### 8.1 final 必须初始化

```java
// ❌ 错误：final 变量必须初始化
// final int x;

// ✅ 正确
final int x = 10;

// ✅ 正确：可以在构造方法中初始化
public class Demo {
    final int y;
    
    public Demo() {
        y = 20;
    }
}
```

### 8.2 final 修饰引用类型

```java
// final 修饰引用，引用不能改，但对象内容可以改
final StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // ✅ 可以修改内容
// sb = new StringBuilder();  // ❌ 不能修改引用

// 数组同理
final int[] arr = {1, 2, 3};
arr[0] = 100;  // ✅ 可以修改元素
// arr = new int[5];  // ❌ 不能修改引用
```

## 九、小结

本节要点：
1. **常量**：值不能改变的量
2. **final**：修饰常量、方法、类
3. **命名规范**：全大写，下划线分隔
4. **static final**：类常量，通过类名访问
5. **好处**：提高可读性、便于维护、避免错误

## 十、练习题

1. 定义以下常量：
   - 一年的月份数（12）
   - 一周的天数（7）
   - 光速（299792458 m/s）
   - 水的沸点（100℃）

2. 指出以下代码的错误：
```java
final int x;
x = 10;
x = 20;

final int[] arr = {1, 2, 3};
arr = {4, 5, 6};
```

3. 改进以下代码，使用常量：
```java
public class Circle {
    public double calculateArea(double r) {
        return 3.14159 * r * r;
    }
    
    public double calculateCircumference(double r) {
        return 2 * 3.14159 * r;
    }
}
```

---

[上一节：2.3 类型转换](./02-03-类型转换.md) | [下一节：2.5 Scanner 键盘输入](./02-05-Scanner.md)
