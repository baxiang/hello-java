# 10.2 final 关键字

## 一、final 概述

`final` 表示"最终的"、"不可改变的"，可以修饰类、方法和变量。

## 二、final 修饰变量

### 2.1 基本用法

```java
class MyClass {
    final int NUM = 10;  // 常量
    
    public void method() {
        // NUM = 20;  // ❌ 错误：不能修改 final 变量
    }
}
```

### 2.2 初始化方式

```java
class MyClass {
    // 方式 1：声明时初始化
    final int a = 10;
    
    // 方式 2：构造方法中初始化
    final int b;
    
    public MyClass() {
        b = 20;
    }
    
    // 方式 3：代码块中初始化
    final int c;
    
    {
        c = 30;
    }
}
```

### 2.3 静态常量

```java
class Constants {
    // 命名规范：全大写，下划线分隔
    public static final double PI = 3.14159;
    public static final int MAX_VALUE = 100;
    public static final String DEFAULT_NAME = "未知";
}
```

### 2.4 final 数组

```java
public class Main {
    public static void main(String[] args) {
        final int[] nums = {1, 2, 3};
        
        // ❌ 错误：不能修改引用
        // nums = new int[]{4, 5, 6};
        
        // ✅ 正确：可以修改元素
        nums[0] = 100;
        System.out.println(nums[0]);  // 100
    }
}
```

### 2.5 final 对象

```java
class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        final Person p = new Person("张三", 18);
        
        // ❌ 错误：不能修改引用
        // p = new Person("李四", 20);
        
        // ✅ 正确：可以修改属性
        p.name = "李四";
        p.age = 20;
        
        System.out.println(p.name);  // 李四
    }
}
```

## 三、final 修饰方法

### 3.1 基本用法

```java
class Parent {
    // final 方法不能被子类重写
    public final void show() {
        System.out.println("父类方法");
    }
}

class Child extends Parent {
    // ❌ 错误：不能重写 final 方法
    // @Override
    // public void show() { }
}
```

### 3.2 应用场景

```java
// Object 类中的 final 方法
/*
public final void notify() { }
public final void notifyAll() { }
public final void wait() { }
public final Class<?> getClass() { }
*/
```

## 四、final 修饰类

### 4.1 基本用法

```java
// final 类不能被继承
final class FinalClass {
    // ...
}

// ❌ 错误：不能继承 final 类
// class SubClass extends FinalClass { }
```

### 4.2 常见的 final 类

```java
// Java 中的 final 类
/*
String - 字符串
Integer, Long, Double 等 - 包装类
Math - 数学工具类
BigDecimal - 高精度计算
BigInteger - 大整数
*/
```

### 4.3 为什么 String 是 final

```java
// 1. 安全性：防止被篡改
// 2. 线程安全：不可变，天然线程安全
// 3. 缓存哈希：可以缓存 hashCode
// 4. 常量池：支持字符串常量池

String str = "hello";
// 不能被修改，保证安全
```

## 五、final 与 static

### 5.1 组合使用

```java
class MyClass {
    // 静态常量
    public static final double PI = 3.14159;
    
    // 实例常量
    public final int id;
    
    public MyClass(int id) {
        this.id = id;
    }
}
```

### 5.2 区别

| 特性 | static | final | static final |
|------|--------|-------|--------------|
| 所属 | 类 | 对象/类 | 类 |
| 修改 | 可以 | 不可以 | 不可以 |
| 初始化 | 类加载时 | 使用时 | 类加载时 |

## 六、不可变类设计

### 6.1 设计要点

```java
/**
 * 不可变类设计要点：
 * 1. 类用 final 修饰
 * 2. 所有字段用 private final 修饰
 * 3. 只提供 getter，不提供 setter
 * 4. 构造方法初始化所有字段
 * 5. 如果有引用类型字段，返回副本
 */
```

### 6.2 示例

```java
public final class Person {
    // private final 字段
    private final String name;
    private final int age;
    private final String[] hobbies;
    
    // 构造方法初始化
    public Person(String name, int age, String[] hobbies) {
        this.name = name;
        this.age = age;
        // 防御性拷贝
        this.hobbies = hobbies != null ? hobbies.clone() : null;
    }
    
    // 只有 getter
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // 返回副本
    public String[] getHobbies() {
        return hobbies != null ? hobbies.clone() : null;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Person p = new Person("张三", 18, new String[]{"读书", "运动"});
        
        // 不能修改
        // p.name = "李四";  // ❌
        
        // 获取副本
        String[] hobbies = p.getHobbies();
        hobbies[0] = "游戏";  // 不影响原对象
        
        System.out.println(p);
    }
}
```

## 七、final 参数

### 7.1 基本用法

```java
public class Main {
    // final 参数不能修改
    public void method(final int x) {
        // x = 10;  // ❌ 错误
        System.out.println(x);
    }
    
    // Lambda 表达式中
    public void test() {
        int num = 10;
        Runnable r = () -> {
            // num = 20;  // ❌ 错误
            System.out.println(num);
        };
    }
}
```

## 八、综合示例

```java
// 常量类
public final class Constants {
    private Constants() { }  // 私有构造
    
    public static final double PI = 3.1415926535;
    public static final int MAX_RETRY = 3;
    public static final String VERSION = "1.0.0";
}

// 不可变配置类
public final class Config {
    private final String host;
    private final int port;
    private final int timeout;
    
    public Config(String host, int port, int timeout) {
        this.host = host;
        this.port = port;
        this.timeout = timeout;
    }
    
    public String getHost() { return host; }
    public int getPort() { return port; }
    public int getTimeout() { return timeout; }
    
    @Override
    public String toString() {
        return "Config{host='" + host + "', port=" + port + "}";
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        System.out.println("版本：" + Constants.VERSION);
        System.out.println("最大重试：" + Constants.MAX_RETRY);
        
        Config config = new Config("localhost", 8080, 5000);
        System.out.println(config);
        
        // config.host = "127.0.0.1";  // ❌ 不能修改
    }
}
```

## 九、注意事项

### 9.1 final 不等于不可变

```java
final StringBuilder sb = new StringBuilder("hello");

// ❌ 错误：不能修改引用
// sb = new StringBuilder("world");

// ✅ 正确：可以修改内容
sb.append(" world");
System.out.println(sb);  // hello world
```

### 9.2 初始化时机

```java
class MyClass {
    final int a;  // 空白 final
    
    public MyClass() {
        a = 10;  // 必须在构造方法结束前初始化
    }
}
```

### 9.3 性能优化

```java
// final 方法可能被内联优化
public final int add(int a, int b) {
    return a + b;
}
```

## 十、小结

本节要点：
1. **final 变量**：常量，不能修改
2. **final 方法**：不能被子类重写
3. **final 类**：不能被继承
4. **不可变类**：final 类 + private final 字段 + 只有 getter
5. **注意**：final 引用不能改，但对象内容可以改

---

[上一节：10.1 static 关键字](./10-01-static 关键字.md) | [下一节：10.3 访问控制修饰符](./10-03-访问控制修饰符.md)
