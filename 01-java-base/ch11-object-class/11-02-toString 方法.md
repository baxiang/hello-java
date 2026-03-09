# 11.2 toString 方法

## 一、toString 方法概述

`toString()` 方法返回对象的字符串表示，用于描述对象的信息。

**来源**：Object 类

**默认实现**：返回 `类名@哈希码` 格式

## 二、默认的 toString

### 2.1 默认实现

```java
class Person {
    String name;
    int age;
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p);
        // 输出：Person@15db9742
    }
}
```

### 2.2 Object 类的实现

```java
// Object 类中的 toString 方法
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

## 三、重写 toString

### 3.1 为什么要重写

默认的 toString 没有提供有用的信息，重写后可以：
- 显示对象的属性值
- 便于调试和日志记录
- 方便打印对象信息

### 3.2 重写示例

```java
class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("张三", 18);
        System.out.println(p);
        // 输出：Person{name='张三', age=18}
    }
}
```

### 3.3 自动调用场景

```java
Person p = new Person("张三", 18);

// 以下情况会自动调用 toString()

// 1. 打印
System.out.println(p);

// 2. 字符串拼接
String info = "信息：" + p;

// 3. 字符串格式化
String formatted = String.format("人员：%s", p);

// 4. 字符串转换
String str = String.valueOf(p);
```

## 四、toString 的规范

### 4.1 格式建议

```java
// 推荐格式：类名 { 属性=值，...}
@Override
public String toString() {
    return "Person{name='" + name + "', age=" + age + "}";
}

// 或者使用多行格式（复杂对象）
@Override
public String toString() {
    return "Person{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", gender='" + gender + '\'' +
            '}';
}
```

### 4.2 包含所有重要属性

```java
class Student {
    String id;
    String name;
    int age;
    double score;
    
    @Override
    public String toString() {
        return "Student{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", score=" + score +
                '}';
    }
}
```

### 4.3 排除敏感信息

```java
class User {
    String username;
    String password;  // 敏感信息
    String email;
    
    @Override
    public String toString() {
        // 不显示密码
        return "User{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

## 五、IDE 自动生成

### 5.1 IDEA 生成 toString

1. 右键 → Generate → toString()
2. 选择要包含的字段
3. 选择格式模板
4. 确认生成

### 5.2 生成的代码

```java
@Override
public String toString() {
    return "Person{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", gender='" + gender + '\'' +
            '}';
}
```

### 5.3 Objects.toString（Java 7+）

```java
import java.util.Objects;

class Person {
    String name;
    int age;
    
    @Override
    public String toString() {
        return Objects.toString(name) + ":" + age;
    }
}
```

## 六、应用场景

### 6.1 日志记录

```java
class Order {
    String orderId;
    double amount;
    
    @Override
    public String toString() {
        return "Order{orderId='" + orderId + "', amount=" + amount + "}";
    }
}

// 日志
logger.info("创建订单：" + order);
// 输出：创建订单：Order{orderId='ORD001', amount=100.0}
```

### 6.2 调试输出

```java
List<Person> people = Arrays.asList(
    new Person("张三", 18),
    new Person("李四", 20)
);

// 调试时直接打印
System.out.println(people);
// 输出：[Person{name='张三', age=18}, Person{name='李四', age=20}]
```

### 6.3 集合打印

```java
Map<String, Person> map = new HashMap<>();
map.put("p1", new Person("张三", 18));
map.put("p2", new Person("李四", 20));

System.out.println(map);
// 输出：{p1=Person{name='张三', age=18}, p2=Person{name='李四', age=20}}
```

## 七、综合示例

```java
class Product {
    private String id;
    private String name;
    private double price;
    private int stock;
    
    public Product(String id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                '}';
    }
}

class Order {
    private String orderId;
    private Product product;
    private int quantity;
    
    public Order(String orderId, Product product, int quantity) {
        this.orderId = orderId;
        this.product = product;
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return "Order{" +
                "orderId='" + orderId + '\'' +
                ", product=" + product +  // 自动调用 product.toString()
                ", quantity=" + quantity +
                ", total=" + (product.price * quantity) +
                '}';
    }
}

public class Main {
    public static void main(String[] args) {
        Product p = new Product("P001", "笔记本电脑", 5999, 10);
        Order order = new Order("ORD001", p, 2);
        
        System.out.println(order);
        // 输出：Order{orderId='ORD001', product=Product{id='P001', name='笔记本电脑', price=5999.0, stock=10}, quantity=2, total=11998.0}
    }
}
```

## 八、注意事项

### 8.1 避免循环调用

```java
class A {
    B b;
    
    @Override
    public String toString() {
        return "A{b=" + b + "}";  // 会调用 b.toString()
    }
}

class B {
    A a;
    
    @Override
    public String toString() {
        return "B{a=" + a + "}";  // 会调用 a.toString()，导致无限循环
    }
}
```

### 8.2 处理 null

```java
@Override
public String toString() {
    // ✅ 安全：处理 null
    return "Person{name=" + (name != null ? "'" + name + "'" : "null") + "}";
    
    // 或使用 Objects
    return "Person{name=" + Objects.toString(name, "null") + "}";
}
```

### 8.3 性能考虑

```java
// 使用 StringBuilder 提高性能（复杂对象）
@Override
public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("Person{");
    sb.append("name='").append(name).append('\'');
    sb.append(", age=").append(age);
    sb.append('}');
    return sb.toString();
}
```

## 九、小结

本节要点：
1. **toString()**：返回对象的字符串表示
2. **默认实现**：类名@哈希码
3. **重写**：显示对象属性，便于调试
4. **格式**：类名 { 属性=值，...}
5. **自动调用**：打印、拼接、格式化时

---

[上一节：11.1 Object 类概述](./11-01-Object 类概述.md) | [下一节：11.3 equals 方法](./11-03-equals 方法.md)
