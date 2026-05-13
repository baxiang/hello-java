# 构造方法与 this

## 一、问题引入

创建一个学生对象，属性有 name 和 age。怎样才能一次性把属性设置好，而不是一个个 set？

```java
Student s = new Student();
s.setName("张三");  // ❌ 写三行
s.setAge(18);
s.setSchool("清华");

Student s = new Student("张三", 18, "清华"); // ✅ 一行搞定
```

关键在于**构造方法**——在 `new` 创建对象时自动调用的初始化方法。

## 二、核心概念

### 2.1 构造方法的特点

```java
public class Student {
    String name;
    int age;

    // 构造方法：方法名与类名相同，无返回值
    public Student() { }  // 无参构造

    public Student(String name, int age) { // 有参构造
        this.name = name;
        this.age = age;
    }
}
```

**三个特征**：① 方法名 = 类名；② 无返回值（连 void 都没有）；③ `new` 时自动调用。

> **类比**：构造方法就像工厂流水线的**初始化工位**——产品出厂前必须经过这一步，把零件装好才能交付。不经过初始化工位的产品是不完整的。

### 2.2 this 的含义

`this` 代表**当前对象**——谁调用方法，谁就是当前对象。

```java
public Student(String name, int age) {
    this.name = name;  // this.name = 成员变量，name = 参数
    this.age = age;
}
```

### 2.3 为什么构造方法不能继承

构造方法的作用是初始化**当前类**的字段。子类有自己的字段需要初始化，强行继承父类构造会导致子类字段漏初始化。因此 Java 规定构造方法不属于类的成员，不参与继承。

## 三、代码对比

❌ **参数名与成员变量同名，不加 this**：

```java
public Student(String name, int age) {
    name = name;   // ❌ 两个都是局部变量，成员变量没被赋值
    age = age;     // ❌ 同上
}
```

✅ **用 this 区分成员变量和参数**：

```java
public Student(String name, int age) {
    this.name = name; // ✅ this.name 是成员变量，name 是参数
    this.age = age;
}
```

❌ **只写有参构造，忘记无参构造**：

```java
public class Student {
    public Student(String name) { } // 只有有参构造
}
Student s = new Student(); // ❌ 编译错误：无参构造不存在了
```

✅ **手写无参构造，或确保所有场景用有参构造**：

```java
public Student() { }                           // 方式 1：保留无参构造
public Student(String name) { this.name = name; } // 方式 2：只有一个构造够用
```

## 四、实现方式

### 4.1 默认构造方法

如果一个类什么都没写构造方法，编译器会**自动生成一个无参构造**：

```java
class Student { }  // 等价于
class Student {
    public Student() { } // 编译器自动生成
}
```

但只要**手动写了任意一个构造方法**，默认构造就不再提供。

### 4.2 构造方法重载

同一个类可以有多个构造方法，参数列表必须不同：

```java
public Student() { }
public Student(String name) { this.name = name; }
public Student(String name, int age) {
    this.name = name;
    this.age = age;
}
```

### 4.3 this 调用其他构造（构造链）

```java
public Student() {
    this("未知", 0);          // 调用两个参数的构造
}

public Student(String name, int age) {
    this.name = name;
    this.age = age;
}
```

> **规则**：`this(...)` 必须放在构造方法**第一行**。

### 4.4 this 传递当前对象

```java
class Student {
    String name;

    void register() {
        School.addStudent(this); // 把当前学生对象传过去
    }
}
```

### 4.5 this 返回当前对象（链式调用）

```java
class Builder {
    private String name;
    private int age;

    public Builder name(String name) {
        this.name = name;
        return this; // 返回自己
    }
    public Builder age(int age) {
        this.age = age;
        return this;
    }
    public Student build() {
        return new Student(name, age); // 链式终点：构建目标对象
    }
}

Student s = new Builder().name("张三").age(18).build(); // 终点
```

### 4.6 静态方法不能用 this

```java
public static void print() {
    // System.out.println(this.name); // ❌ 编译错误
    // 静态方法属于类，不属于对象，没有 this
}
```

## 五、Q&A

**Q：构造方法能继承吗？**
A：不能。子类不继承父类构造方法，但子类的构造方法中**会自动调用**父类的无参构造（`super()` 隐式存在）。

**Q：this 和 super 能同时出现在一个构造方法中吗？**
A：不能。`this()` 和 `super()` 都必须放在构造方法第一行，只能选一个。

**Q：构造方法有返回值吗？**
A：没有（void 也没有）。如果写了 `void Student()`，那它只是一个普通方法，不是构造方法。

**Q：构造方法里能写 return 吗？**
A：可以写 `return;`，但不能返回值（因为没有返回类型）。

## 六、小结

| 要点 | 说明 |
|------|------|
| 构造方法特点 | 方法名=类名，无返回值，new 时自动调用 |
| 默认构造 | 手动写了构造后不再自动提供 |
| this.成员变量 | 区分同名成员变量和参数 |
| this() | 调用同类其他构造，必须在第一行 |
| 链式调用 | return this 实现，build() 方法作为终点 |
| 静态方法 | 不能使用 this（无当前对象） |
