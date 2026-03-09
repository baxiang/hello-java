# 11.3 equals 方法

## 一、equals 方法概述

`equals()` 方法用于判断两个对象是否相等。

**来源**：Object 类

**默认实现**：比较引用（与 `==` 相同）

## 二、默认的 equals

### 2.1 默认实现

```java
class Person {
    String name;
    int age;
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("张三", 18);
        Person p2 = new Person("张三", 18);
        
        System.out.println(p1.equals(p2));  // false
        System.out.println(p1 == p2);       // false
        
        Person p3 = p1;
        System.out.println(p1.equals(p3));  // true
        System.out.println(p1 == p3);       // true
    }
}
```

### 2.2 Object 类的实现

```java
// Object 类中的 equals 方法
public boolean equals(Object obj) {
    return (this == obj);
}
```

**结论**：默认的 equals 比较的是引用地址，与 `==` 相同。

## 三、重写 equals

### 3.1 为什么要重写

默认 equals 比较引用地址，但很多时候我们需要比较对象的内容是否相等。

```java
Person p1 = new Person("张三", 18);
Person p2 = new Person("张三", 18);

// 我们希望 p1 和 p2 相等（内容相同）
// 但默认 equals 返回 false（引用不同）
```

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
    public boolean equals(Object obj) {
        // 1. 检查是否为 null
        if (obj == null) return false;
        
        // 2. 检查是否为同一对象
        if (this == obj) return true;
        
        // 3. 检查类型是否相同
        if (getClass() != obj.getClass()) return false;
        
        // 4. 类型转换
        Person other = (Person) obj;
        
        // 5. 比较属性
        if (age != other.age) return false;
        
        if (name == null) {
            return other.name == null;
        } else {
            return name.equals(other.name);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("张三", 18);
        Person p2 = new Person("张三", 18);
        
        System.out.println(p1.equals(p2));  // true（内容相等）
    }
}
```

## 四、equals 的规范

### 4.1 五大特性

| 特性 | 说明 |
|------|------|
| 自反性 | `x.equals(x)` 必须返回 true |
| 对称性 | 如果 `x.equals(y)` 返回 true，则 `y.equals(x)` 也必须返回 true |
| 传递性 | 如果 `x.equals(y)` 和 `y.equals(z)` 都返回 true，则 `x.equals(z)` 必须返回 true |
| 一致性 | 多次调用 `x.equals(y)` 应该返回相同的结果 |
| 非空性 | `x.equals(null)` 必须返回 false |

### 4.2 实现步骤

```java
@Override
public boolean equals(Object obj) {
    // 1. 检查是否为 null
    if (obj == null) return false;
    
    // 2. 检查是否为同一对象
    if (this == obj) return true;
    
    // 3. 检查类型（两种方式）
    // 方式 1：getClass() 精确匹配
    if (getClass() != obj.getClass()) return false;
    
    // 方式 2：instanceof 允许子类
    // if (!(obj instanceof Person)) return false;
    
    // 4. 类型转换
    Person other = (Person) obj;
    
    // 5. 比较所有重要属性
    // 基本类型用 ==，引用类型用 equals
    return age == other.age && 
           Objects.equals(name, other.name);
}
```

## 五、Objects.equals 工具

### 5.1 简化 null 检查

```java
import java.util.Objects;

class Person {
    String name;
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Person other = (Person) obj;
        
        // 使用 Objects.equals 简化 null 检查
        return Objects.equals(name, other.name);
    }
}
```

### 5.2 Objects.equals 实现

```java
// Objects 类中的 equals 方法
public static boolean equals(Object a, Object b) {
    return (a == b) || (a != null && a.equals(b));
}
```

## 六、equals 与 hashCode

### 6.1 约定

**如果两个对象 equals 相等，则它们的 hashCode 必须相等。**

```java
Person p1 = new Person("张三", 18);
Person p2 = new Person("张三", 18);

// 如果重写了 equals
System.out.println(p1.equals(p2));  // true

// 则 hashCode 也必须相等
System.out.println(p1.hashCode() == p2.hashCode());  // true
```

### 6.2 同时重写

```java
class Person {
    String name;
    int age;
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person other = (Person) obj;
        return age == other.age && Objects.equals(name, other.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

## 七、应用场景

### 7.1 集合查找

```java
List<Person> list = new ArrayList<>();
list.add(new Person("张三", 18));
list.add(new Person("李四", 20));

// 查找
Person target = new Person("张三", 18);
boolean contains = list.contains(target);  // 需要重写 equals
System.out.println(contains);  // true
```

### 7.2 Map 键值

```java
Map<Person, String> map = new HashMap<>();
map.put(new Person("张三", 18), "value1");

// 获取
String value = map.get(new Person("张三", 18));  // 需要重写 equals 和 hashCode
System.out.println(value);  // value1
```

### 7.3 Set 去重

```java
Set<Person> set = new HashSet<>();
set.add(new Person("张三", 18));
set.add(new Person("张三", 18));  // 重复

System.out.println(set.size());  // 1（需要重写 equals 和 hashCode）
```

## 八、综合示例

```java
class Student {
    private String id;
    private String name;
    private int age;
    
    public Student(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    
    @Override
    public boolean equals(Object obj) {
        // 1. 快速检查
        if (this == obj) return true;
        
        // 2. null 检查
        if (obj == null) return false;
        
        // 3. 类型检查
        if (getClass() != obj.getClass()) return false;
        
        // 4. 类型转换
        Student other = (Student) obj;
        
        // 5. 属性比较（学号相同即为同一学生）
        return Objects.equals(id, other.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("S001", "张三", 18);
        Student s2 = new Student("S001", "张三", 18);  // 相同学号
        Student s3 = new Student("S002", "李四", 19);  // 不同学号
        
        System.out.println(s1.equals(s2));  // true（学号相同）
        System.out.println(s1.equals(s3));  // false（学号不同）
        
        // 集合应用
        Set<Student> set = new HashSet<>();
        set.add(s1);
        set.add(s2);  // 不会添加（重复）
        set.add(s3);
        
        System.out.println(set.size());  // 2
    }
}
```

## 九、注意事项

### 9.1 不要比较所有字段

```java
// ❌ 不好：比较了所有字段
@Override
public boolean equals(Object obj) {
    // 比较了 id, name, age, email, phone...
}

// ✅ 好：只比较业务关键字段
@Override
public boolean equals(Object obj) {
    // 只比较 id（学号/工号等唯一标识）
}
```

### 9.2 instanceof vs getClass

```java
// 使用 instanceof（允许子类）
if (!(obj instanceof Person)) return false;

// 使用 getClass（精确匹配）
if (getClass() != obj.getClass()) return false;

// 推荐：使用 getClass 避免对称性问题
```

### 9.3 可变字段作为 equals 条件

```java
// ❌ 不好：使用可变字段
class Person {
    String name;  // 可能改变
    
    @Override
    public boolean equals(Object obj) {
        return Objects.equals(name, ((Person)obj).name);
    }
}

// 如果 name 改变，可能导致集合问题
```

## 十、小结

本节要点：
1. **equals()**：判断对象是否相等
2. **默认实现**：比较引用地址
3. **重写**：比较对象内容
4. **规范**：自反、对称、传递、一致、非空
5. **与 hashCode**：equals 相等则 hashCode 必须相等

---

[上一节：11.2 toString 方法](./11-02-toString 方法.md) | [下一节：11.4 hashCode 方法](./11-04-hashCode 方法.md)
