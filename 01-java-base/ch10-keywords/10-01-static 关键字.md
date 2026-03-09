# 10.1 static 关键字

## 一、static 概述

`static` 表示"静态的"，用于修饰成员变量、成员方法和代码块。

**特点**：
- 属于类，不属于某个具体对象
- 在类加载时初始化
- 可以通过类名直接访问

## 二、静态变量

### 2.1 定义

```java
class Student {
    String name;           // 实例变量
    int age;               // 实例变量
    static String school;  // 静态变量（类变量）
}
```

### 2.2 使用

```java
public class Main {
    public static void main(String[] args) {
        // 通过类名访问
        Student.school = "清华大学";
        System.out.println(Student.school);
        
        // 通过对象访问（不推荐）
        Student s1 = new Student();
        s1.school = "北京大学";
        
        Student s2 = new Student();
        System.out.println(s2.school);  // 北京大学（共享）
    }
}
```

### 2.3 实例变量 vs 静态变量

```java
class Counter {
    int instanceCount = 0;      // 实例变量
    static int staticCount = 0; // 静态变量
    
    public void increment() {
        instanceCount++;
        staticCount++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        
        c1.increment();
        c2.increment();
        c2.increment();
        
        System.out.println("c1 实例计数：" + c1.instanceCount);  // 1
        System.out.println("c2 实例计数：" + c2.instanceCount);  // 2
        System.out.println("静态计数：" + Counter.staticCount);  // 3
    }
}
```

## 三、静态方法

### 3.1 定义

```java
class MathUtils {
    // 静态方法
    public static int add(int a, int b) {
        return a + b;
    }
    
    // 实例方法
    public int multiply(int a, int b) {
        return a * b;
    }
}
```

### 3.2 使用

```java
public class Main {
    public static void main(String[] args) {
        // 通过类名调用
        int sum = MathUtils.add(10, 20);
        System.out.println(sum);
        
        // 通过对象调用（不推荐）
        MathUtils utils = new MathUtils();
        int product = utils.multiply(5, 6);
    }
}
```

### 3.3 限制

```java
class MyClass {
    static int staticVar = 10;
    int instanceVar = 20;
    
    // 静态方法
    public static void staticMethod() {
        System.out.println(staticVar);  // ✅ 可以访问静态变量
        // System.out.println(instanceVar);  // ❌ 不能访问实例变量
        // instanceMethod();  // ❌ 不能调用实例方法
    }
    
    // 实例方法
    public void instanceMethod() {
        System.out.println(staticVar);   // ✅ 可以访问静态变量
        System.out.println(instanceVar); // ✅ 可以访问实例变量
        staticMethod();  // ✅ 可以调用静态方法
    }
}
```

**原因**：静态方法在类加载时就存在，而实例变量和实例方法需要对象创建后才存在。

## 四、静态代码块

### 4.1 定义

```java
class MyClass {
    static {
        System.out.println("静态代码块执行");
    }
}
```

### 4.2 执行时机

```java
class MyClass {
    // 静态变量
    static int count = 0;
    
    // 静态代码块
    static {
        System.out.println("静态代码块 1");
        count = 10;
    }
    
    // 另一个静态代码块
    static {
        System.out.println("静态代码块 2");
        count += 5;
    }
    
    // 构造方法
    public MyClass() {
        System.out.println("构造方法");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("main 开始");
        
        MyClass obj1 = new MyClass();
        MyClass obj2 = new MyClass();
        
        System.out.println("count = " + MyClass.count);
    }
}

// 输出：
// main 开始
// 静态代码块 1
// 静态代码块 2
// 构造方法
// 构造方法
// count = 15
```

### 4.3 应用场景

```java
class Database {
    static Connection connection;
    
    // 静态代码块初始化
    static {
        try {
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/db",
                "user",
                "password"
            );
            System.out.println("数据库连接已建立");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public static Connection getConnection() {
        return connection;
    }
}
```

## 五、static 应用

### 5.1 工具类

```java
public class StringUtils {
    // 私有构造，防止实例化
    private StringUtils() { }
    
    // 静态方法
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }
    
    public static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static int countChars(String str, char c) {
        int count = 0;
        for (char ch : str.toCharArray()) {
            if (ch == c) count++;
        }
        return count;
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        System.out.println(StringUtils.isEmpty(""));  // true
        System.out.println(StringUtils.reverse("hello"));  // olleh
        System.out.println(StringUtils.countChars("hello", 'l'));  // 2
    }
}
```

### 5.2 单例模式

```java
class Singleton {
    // 静态变量持有唯一实例
    private static Singleton instance;
    
    // 私有构造
    private Singleton() { }
    
    // 静态方法获取实例
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        
        System.out.println(s1 == s2);  // true（同一实例）
    }
}
```

### 5.3 计数器

```java
class Counter {
    private static int count = 0;
    
    public Counter() {
        count++;
    }
    
    public static int getCount() {
        return count;
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        new Counter();
        
        System.out.println("创建了 " + Counter.getCount() + " 个对象");
    }
}
```

## 六、注意事项

### 6.1 静态不能修饰的内容

```java
// ❌ 错误：static 不能修饰局部变量
public void method() {
    // static int x = 10;
}

// ❌ 错误：static 不能修饰类（内部类除外）
// static class MyClass { }

// ❌ 错误：static 不能修饰构造方法
// static MyClass() { }
```

### 6.2 静态内部类

```java
class Outer {
    // ✅ 静态内部类
    static class StaticInner { }
    
    // 非静态内部类
    class Inner { }
}
```

### 6.3 内存泄漏

```java
class Cache {
    // 静态集合可能导致内存泄漏
    private static List<Object> cache = new ArrayList<>();
    
    public static void add(Object obj) {
        cache.add(obj);  // 对象永远不会被回收
    }
}
```

## 七、综合示例

```java
/**
 * 数学工具类
 */
public class MathUtils {
    // 静态常量
    public static final double PI = 3.1415926535;
    public static final double E = 2.7182818284;
    
    // 私有构造，防止实例化
    private MathUtils() { }
    
    // 静态方法
    public static double circleArea(double radius) {
        return PI * radius * radius;
    }
    
    public static double circleCircumference(double radius) {
        return 2 * PI * radius;
    }
    
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    // 静态代码块
    static {
        System.out.println("MathUtils 类已加载");
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        System.out.println("圆面积：" + MathUtils.circleArea(5));
        System.out.println("圆周长：" + MathUtils.circleCircumference(5));
        System.out.println("5! = " + MathUtils.factorial(5));
        System.out.println("17 是素数：" + MathUtils.isPrime(17));
    }
}
```

## 八、小结

本节要点：
1. **静态变量**：类的所有对象共享
2. **静态方法**：不能访问实例成员
3. **静态代码块**：类加载时执行一次
4. **应用**：工具类、单例模式、计数器
5. **注意**：静态方法不能使用 this/super

---

[下一节：10.2 final 关键字](./10-02-final 关键字.md)
