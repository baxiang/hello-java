# 11.4 hashCode 方法

## 一、hashCode 方法概述

`hashCode()` 方法返回对象的哈希码（整数），用于哈希表（如 HashMap、HashSet）中快速定位对象。

**来源**：Object 类

**默认实现**：通常基于对象的内存地址计算

## 二、hashCode 的作用

### 2.1 哈希表中的应用

```java
// HashMap 中使用 hashCode 定位桶位置
HashMap<Person, String> map = new HashMap<>();
map.put(new Person("张三", 18), "value1");

// 获取时：
// 1. 计算 hashCode 找到桶位置
// 2. 使用 equals 比较找到具体键
String value = map.get(new Person("张三", 18));
```

### 2.2 哈希码的意义

```
hashCode 的作用：
1. 快速定位：通过 hashCode 快速找到对象所在的桶
2. 减少比较：hashCode 不同则对象一定不相等
3. 提高效率：避免不必要的 equals 比较
```

## 三、hashCode 约定

### 3.1 基本约定

| 约定 | 说明 |
|------|------|
| 一致性 | 同一对象多次调用 hashCode 应返回相同值 |
| equals 相等 | 如果 `x.equals(y)` 返回 true，则 `x.hashCode() == y.hashCode()` |
| equals 不等 | 如果 `x.equals(y)` 返回 false，`x.hashCode()` 不一定等于 `y.hashCode()` |

### 3.2 为什么 equals 相等则 hashCode 必须相等

```java
// 违反约定的后果
Person p1 = new Person("张三", 18);
Person p2 = new Person("张三", 18);

// 假设重写了 equals
System.out.println(p1.equals(p2));  // true

// 但没有重写 hashCode
System.out.println(p1.hashCode());  // 12345
System.out.println(p2.hashCode());  // 67890（不同）

// 放入 HashMap
HashMap<Person, String> map = new HashMap<>();
map.put(p1, "value1");

// 无法获取
System.out.println(map.get(p2));  // null（因为 hashCode 不同，找不到）
```

## 四、重写 hashCode

### 4.1 基本规则

```java
// 参与 equals 比较的字段，都应该参与 hashCode 计算
class Person {
    String name;
    int age;
    
    @Override
    public boolean equals(Object obj) {
        // 比较 name 和 age
        // ...
    }
    
    @Override
    public int hashCode() {
        // 也应该使用 name 和 age 计算
        return Objects.hash(name, age);
    }
}
```

### 4.2 使用 Objects.hash

```java
import java.util.Objects;

class Person {
    String name;
    int age;
    String email;
    
    @Override
    public int hashCode() {
        // 简洁方式（Java 7+）
        return Objects.hash(name, age, email);
    }
}
```

### 4.3 手动计算

```java
class Person {
    String name;
    int age;
    
    @Override
    public int hashCode() {
        int result = 17;  // 初始值
        
        // 基本类型
        result = 31 * result + age;
        
        // 引用类型
        result = 31 * result + (name != null ? name.hashCode() : 0);
        
        return result;
    }
}
```

### 4.4 数组字段的 hashCode

```java
class Student {
    String id;
    int[] scores;
    
    @Override
    public int hashCode() {
        int result = Objects.hash(id);
        
        // 数组使用 Arrays.hashCode
        result = 31 * result + Arrays.hashCode(scores);
        
        return result;
    }
}
```

## 五、hashCode 的计算策略

### 5.1 质数乘法

```java
// 使用质数 31（常用）
int result = 17;
result = 31 * result + field1.hashCode();
result = 31 * result + field2.hashCode();
```

**为什么用 31**：
- 质数，减少冲突
- 可以用位移优化：`31 * i = (i << 5) - i`

### 5.2 字段选择

```java
// ✅ 好：选择参与 equals 的字段
@Override
public int hashCode() {
    return Objects.hash(id, name);  // id 和 name 参与 equals
}

// ❌ 不好：选择了不参与 equals 的字段
@Override
public int hashCode() {
    return Objects.hash(id, name, age);  // age 不参与 equals
}
```

### 5.3 性能考虑

```java
// 缓存 hashCode（不可变对象）
class Person {
    private final String id;
    private final String name;
    private Integer cachedHashCode;  // 缓存
    
    @Override
    public int hashCode() {
        if (cachedHashCode == null) {
            cachedHashCode = Objects.hash(id, name);
        }
        return cachedHashCode;
    }
}
```

## 六、equals 和 hashCode 一起重写

### 6.1 完整示例

```java
class Person {
    private String id;
    private String name;
    private int age;
    
    public Person(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person other = (Person) obj;
        return age == other.age && 
               Objects.equals(id, other.id) &&
               Objects.equals(name, other.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, name, age);
    }
}
```

### 6.2 IDE 自动生成

1. 右键 → Generate → equals() and hashCode()
2. 选择参与比较的字段
3. 确认生成

## 七、应用场景

### 7.1 HashMap 键

```java
class Key {
    String value;
    
    public Key(String value) {
        this.value = value;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Key) {
            return Objects.equals(value, ((Key)obj).value);
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

// 使用
HashMap<Key, String> map = new HashMap<>();
map.put(new Key("a"), "value1");
System.out.println(map.get(new Key("a")));  // value1
```

### 7.2 HashSet 去重

```java
class Email {
    String address;
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Email) {
            return Objects.equals(address, ((Email)obj).address);
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(address);
    }
}

// 使用
Set<Email> set = new HashSet<>();
set.add(new Email("a@test.com"));
set.add(new Email("a@test.com"));  // 重复
System.out.println(set.size());  // 1
```

### 7.3 自定义对象作为键

```java
class Coordinate {
    int x, y;
    
    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Coordinate) {
            Coordinate other = (Coordinate) obj;
            return x == other.x && y == other.y;
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return 31 * x + y;
    }
}

// 使用
Map<Coordinate, String> map = new HashMap<>();
map.put(new Coordinate(10, 20), "位置 A");
System.out.println(map.get(new Coordinate(10, 20)));  // 位置 A
```

## 八、常见错误

### 8.1 只重写 equals

```java
// ❌ 错误：只重写 equals，不重写 hashCode
class Person {
    @Override
    public boolean equals(Object obj) {
        // ...
    }
    
    // 没有重写 hashCode
}

// 导致 HashMap/HashSet 无法正常工作
```

### 8.2 使用可变字段

```java
// ❌ 不好：使用可变字段计算 hashCode
class Person {
    String name;  // 可能改变
    
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}

// 如果 name 改变，hashCode 也改变，导致集合问题
```

### 8.3 随机 hashCode

```java
// ❌ 错误：每次返回不同的 hashCode
@Override
public int hashCode() {
    return (int) Math.random();
}

// 导致无法从 HashMap 中获取对象
```

## 九、综合示例

```java
// 商品类
class Product {
    private String sku;      // SKU（唯一标识）
    private String name;
    private double price;
    
    public Product(String sku, String name, double price) {
        this.sku = sku;
        this.name = name;
        this.price = price;
    }
    
    // 只比较 SKU
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Product other = (Product) obj;
        return Objects.equals(sku, other.sku);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(sku);
    }
    
    @Override
    public String toString() {
        return "Product{sku='" + sku + "', name='" + name + "', price=" + price + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        // HashMap 应用
        Map<Product, Integer> inventory = new HashMap<>();
        inventory.put(new Product("SKU001", "笔记本电脑", 5999), 10);
        inventory.put(new Product("SKU002", "手机", 3999), 20);
        
        // 获取库存
        int stock = inventory.get(new Product("SKU001", "电脑", 0));
        System.out.println("库存：" + stock);  // 10
        
        // HashSet 去重
        Set<Product> cart = new HashSet<>();
        cart.add(new Product("SKU001", "笔记本电脑", 5999));
        cart.add(new Product("SKU001", "笔记本电脑", 5999));  // 重复
        
        System.out.println("购物车商品数：" + cart.size());  // 1
    }
}
```

## 十、小结

本节要点：
1. **hashCode()**：返回对象的哈希码
2. **约定**：equals 相等则 hashCode 必须相等
3. **计算**：使用参与 equals 比较的字段
4. **应用**：HashMap、HashSet 等哈希表
5. **一起重写**：equals 和 hashCode 必须一起重写

---

[上一节：11.3 equals 方法](./11-03-equals 方法.md) | [下一章：第 12 章 Spring Boot](../ch12-spring-boot/README.md)
