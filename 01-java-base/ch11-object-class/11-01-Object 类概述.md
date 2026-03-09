# 11.1 Object 类概述

## 一、Object 类介绍

`Object` 类是 Java 中所有类的根父类，位于 `java.lang` 包中。

**特点**：
- 所有类都直接或间接继承自 Object
- 如果一个类没有显式继承其他类，则默认继承 Object
- 提供了常用的方法供子类重写

```java
// 以下两个类等价
class MyClass { }
class MyClass extends Object { }
```

## 二、Object 类的常用方法

| 方法 | 说明 | 是否常重写 |
|------|------|------------|
| `toString()` | 返回对象的字符串表示 | ✅ |
| `equals(Object obj)` | 判断对象是否相等 | ✅ |
| `hashCode()` | 返回对象的哈希码 | ✅ |
| `getClass()` | 获取运行时类对象 | ❌ (final) |
| `clone()` | 对象克隆 | ✅ |
| `notify()` | 唤醒等待线程 | ❌ |
| `notifyAll()` | 唤醒所有等待线程 | ❌ |
| `wait()` | 等待其他线程通知 | ❌ |
| `finalize()` | 垃圾回收前调用（已废弃） | ❌ |

## 三、继承关系

```
Object
  ↑
Person
  ↑
Student

// Student 继承 Person，Person 继承 Object
// 所以 Student 也继承了 Object 的所有非私有方法
```

```java
Student s = new Student();
s.toString();    // 继承自 Object
s.equals(obj);   // 继承自 Object
s.hashCode();    // 继承自 Object
s.getClass();    // 继承自 Object
```

## 四、方法速览

### 4.1 toString()

```java
class Person {
    String name;
    int age;
}

Person p = new Person();
System.out.println(p);  
// 输出：Person@15db9742（类名@哈希码）
```

### 4.2 equals()

```java
Person p1 = new Person();
Person p2 = new Person();

System.out.println(p1.equals(p2));  // false（比较引用）
System.out.println(p1 == p2);       // false
```

### 4.3 hashCode()

```java
Person p = new Person();
System.out.println(p.hashCode());  // 输出哈希码
```

### 4.4 getClass()

```java
Person p = new Person();
Class<?> clazz = p.getClass();
System.out.println(clazz.getName());  // 输出类名
```

## 五、小结

本节要点：
1. **Object 类**：所有类的根父类
2. **常用方法**：toString、equals、hashCode、getClass 等
3. **重写**：toString、equals、hashCode 常需要重写

---

[下一节：11.2 toString 方法](./11-02-toString 方法.md)
