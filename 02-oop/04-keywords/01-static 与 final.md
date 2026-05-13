# static 与 final

## 一、问题引入

想统计一个类创建了多少个对象，怎么做？

❌ **用实例变量记录**：

```java
class Counter {
    int count = 0; // 每个对象都有一份
    Counter() { count++; }
}
Counter c1 = new Counter(); // c1.count = 1
Counter c2 = new Counter(); // c2.count = 1（不共享！）
```

每个对象的 count 都是独立的，无法统计总数。

✅ **用 static 变量**：

```java
class Counter {
    static int count = 0; // 所有对象共享一份
    Counter() { count++; }
}
Counter c1 = new Counter();
Counter c2 = new Counter();
System.out.println(Counter.count); // 2，所有对象共享
```

`static` 变量属于**类**，不属于任何对象，所有对象共享同一份。

## 二、核心概念

### 2.1 static 变量

```java
class Student {
    static String school = "清华"; // 类变量，所有对象共享
    String name;
}
Student.school = "北大"; // 通过类名访问
Student s1 = new Student();
s1.school = "复旦";      // 也可以通过对象（不推荐）
```

### 2.2 static 方法

```java
class MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}
int sum = MathUtils.add(10, 20); // 通过类名调用，不需要 new
```

**static 方法限制**：不能访问 `this`/`super`，不能访问实例成员（因为 static 方法属于类，不属于对象）：

```java
class Demo {
    int num;
    static void show() {
        // System.out.println(num);    // ❌ 不能访问实例变量
        // this.num;                   // ❌ 没有 this
    }
    void instanceMethod() {
        show();                       // ✅ 可以调用 static 方法
    }
}
```

### 2.3 static 代码块

类加载时执行一次，常用于初始化 static 变量：

```java
class Config {
    static String url;
    static {
        url = loadFromFile(); // 类加载时执行一次
    }
}
```

### 2.4 final 修饰变量

`final` = "最终的，不可改变"：

```java
final int NUM = 10;
NUM = 20; // ❌ 编译错误，不能修改

// final 数组：引用不能变，但元素可以
final int[] arr = {1, 2, 3};
arr = new int[]{4, 5, 6}; // ❌ 引用不能变
arr[0] = 100;              // ✅ 元素可以改
```

### 2.5 final 修饰方法

方法不能被子类重写：

```java
class Parent {
    public final void show() { }
}
class Child extends Parent {
    public void show() { } // ❌ 不能重写 final 方法
}
```

### 2.6 final 修饰类

类不能被继承：

```java
final class String { } // String 是 final 的，不能继承
```

## 三、代码对比

❌ **用实例变量做计数器**：

```java
class Counter {
    int count = 0;
    Counter() { count++; }
}
```

✅ **用 static 变量做计数器**：

```java
class Counter {
    static int count = 0;
    Counter() { count++; }
}
```

❌ **static 方法中访问实例变量**：

```java
static void print() {
    System.out.println(name); // ❌ 编译错误
}
```

✅ **实例方法中访问 static 变量**：

```java
void print() {
    System.out.println(name);    // ✅ 实例变量
    System.out.println(school);  // ✅ static 变量也可以
}
```

❌ **试图修改 final 常量**：

```java
final double PI = 3.14159;
PI = 3.14; // ❌ 编译错误
```

## 四、实现方式

### 4.1 static final 组合（常量）

```java
class Constants {
    public static final double PI = 3.14159;
    public static final int MAX_SIZE = 100;
}
// 命名规范：全大写，下划线分隔
```

### 4.2 工具类（static 方法典型应用）

```java
public final class StringUtils {
    private StringUtils() { } // 私有构造，防止实例化

    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }
    public static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
```

### 4.3 单例模式（static 典型应用）

详见"单例设计模式"章节，核心就是用 static 保证全局唯一实例。

## 五、Q&A

**Q：static 变量在什么时候初始化？**
A：类加载时初始化。可以声明时初始化，也可以在 static 代码块中初始化。

**Q：static 能修饰局部变量吗？**
A：不能。局部变量属于方法，static 属于类。

**Q：final 和 effectively final 的区别？**
A：`final` 是显式声明不可变；`effectively final`（Java 8+）是虽然没有声明 final，但值从未被修改过。Lambda 和局部内部类只能引用 effectively final 的变量。

**Q：String 为什么是 final 的？**
A：安全（防止被篡改）、线程安全（不可变天然线程安全）、可以缓存 hashCode、支持字符串常量池。

**Q：final 参数有什么用？**
A：防止参数在方法内部被意外修改（方法参数默认 effectively final，final 只是显式声明）。

## 六、小结

| 修饰符 | 作用 | 可否被修改 |
|--------|------|-----------|
| `static` 变量 | 类所有，对象共享 | 可以 |
| `final` 变量 | 只赋值一次 | 不能 |
| `static final` 常量 | 类所有，共享，只赋值一次 | 不能 |
| `final` 方法 | 不能被子类重写 | — |
| `final` 类 | 不能被继承 | — |
