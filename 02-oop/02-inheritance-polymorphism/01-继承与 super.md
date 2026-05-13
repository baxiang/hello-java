# 继承与 super

## 一、问题引入

Dog、Cat、Bird 都要有 name、age、eat() 方法，难道要各写一遍？

```java
class Dog {
    String name;
    int age;
    void eat() { }
}
class Cat {
    String name;  // ❌ 重复
    int age;      // ❌ 重复
    void eat() { } // ❌ 重复
}
```

✅ **用继承，抽取共性到父类**：

```java
class Animal {        // 父类
    String name;
    int age;
    void eat() { }
}
class Dog extends Animal { void bark() { } }
class Cat extends Animal { void meow() { } }
```

继承让子类**复用父类的成员**，不需要重复定义。

## 二、核心概念

### 2.1 继承的语法与特点

```java
class 子类 extends 父类 { }
```

- **单继承**：一个类只能有一个直接父类（但可以多层继承）
- **多层继承**：`A extends B, B extends C` → A 间接继承 C
- **Object 类**：所有类的根父类，没写 `extends` 的默认继承 `Object`

> **为什么 Java 只支持单继承？** 如果允许一个类继承两个父类，当两个父类有同名方法时，子类不知道该用哪个（菱形继承问题）。Java 选择牺牲多继承的灵活性，换取代码的确定性和简洁性。

> **类比**：继承就像**基因遗传**——子女继承父母的基因（属性和能力），但一个人只有一对亲生父母（单继承）。如果需要多种能力，可以通过"学习"（实现接口）获得。

### 2.2 能继承什么

```java
class Parent {
    public int a;       // ✅ 子类可继承
    protected int b;    // ✅ 子类可继承
    int c;              // ✅ 同包子类可继承
    private int d;       // ❌ 不可直接访问（子类对象内存中包含该字段，但无法读写）

    public void m1() { }      // ✅
    protected void m2() { }   // ✅
    void m3() { }            // ✅ 同包
    private void m4() { }     // ❌ 子类不可访问
}
```

### 2.3 super 关键字

`super` 代表**父类部分**，用于访问父类成员。

| 用法 | 作用 |
|------|------|
| `super.属性` | 访问父类成员（当子类有同名遮蔽时） |
| `super.方法()` | 调用父类被重写的方法 |
| `super()` | 调用父类构造方法 |

```java
class Parent {
    String name = "父类";
    void show() { System.out.println("父类"); }
}

class Child extends Parent {
    String name = "子类";

    void show() {
        System.out.println(super.name);  // 父类的 name
        super.show();                    // 调用父类的 show()
    }
}
```

### 2.4 构造方法与继承

子类的构造方法中**隐式调用**父类无参构造 `super()`：

```java
class Parent { }
class Child extends Parent {
    public Child() {
        super(); // 隐式调用父类无参构造
    }
}
```

如果父类**没有无参构造**，子类必须**显式调用**：

```java
class Parent {
    Parent(String name) { } // 没有无参构造
}
class Child extends Parent {
    Child() {
        super("默认"); // ✅ 必须显式调用，否则编译错误
    }
}
```

## 三、代码对比

❌ **子类试图访问父类 private 成员**：

```java
class Parent {
    private int money = 1000;
}
class Child extends Parent {
    void buy() {
        money -= 100; // ❌ 编译错误
    }
}
```

✅ **通过父类的公共或受保护方法间接访问**：

```java
class Parent {
    private int money = 1000;
    public int getMoney() { return money; } // ✅ 提供访问入口
}
class Child extends Parent {
    void buy() {
        int m = getMoney(); // ✅ 通过继承来的方法
    }
}
```

❌ **忘记在子类构造中调用父类有参构造**：

```java
class Parent {
    private String name;
    Parent(String name) { this.name = name; }
}
class Child extends Parent {
    Child(String name, int age) {
        // ❌ 隐式 super() 找不到无参构造
    }
}
```

✅ **显式调用父类有参构造**：

```java
class Child extends Parent {
    Child(String name, int age) {
        super(name); // ✅ 显式调用
    }
}
```

## 四、实现方式

### 4.1 方法重写（Override）

子类重新定义父类已有的方法：

```java
class Animal {
    void eat() { System.out.println("吃东西"); }
}
class Dog extends Animal {
    @Override                      // ✅ 推荐加上，编译器帮你检查
    void eat() { System.out.println("狗吃骨头"); }
}
```

重写规则：**两同两小一大**
- 两同：方法名相同，参数列表相同
- 两小：返回值类型 ≤ 父类，抛出异常 ≤ 父类
- 一大：访问权限 ≥ 父类

**@Override 的价值**——拼写错误时编译器直接报错：

```java
class Dog extends Animal {
    @Override
    void eet() { } // ❌ 编译错误：父类没有 eet() 方法，防止拼写错误
}
```

**不能重写**：final 方法、static 方法（是隐藏而非重写）、private 方法（子类定义的是新方法，不是重写）。

### 4.2 继承 vs 组合

```java
// is-a → 继承
class Dog extends Animal { } // Dog is an Animal

// has-a → 组合
class Engine { }
class Car {
    private Engine engine; // Car has an Engine
}
```

**原则**：is-a 用继承，has-a 用组合。Effective Java 推荐"组合优先于继承"——继承耦合度高（子类依赖父类实现细节），组合耦合度低。

## 五、Q&A

**Q：private 方法能被重写吗？**
A：不能。private 方法对子类不可见，子类定义同名方法只是定义了一个新方法，不是重写。

**Q：构造方法执行顺序是怎样的？**
A：子类 new → 先执行 `super()` 调用父类构造 → 父类构造执行完毕 → 子类构造继续。

**Q：static 方法能被重写吗？**
A：不能。static 方法属于类，子类定义同名 static 方法是**隐藏**（Shadow），不是重写。

**Q：为什么要尽量用组合而不是继承？**
A：继承耦合度高（子类依赖父类的实现细节），组合耦合度低。Effective Java 提出了"组合优先于继承"的原则。

## 六、小结

| 要点 | 说明 |
|------|------|
| 继承语法 | `class 子类 extends 父类` |
| 单继承 | 一个类只能有一个直接父类，避免菱形继承问题 |
| 继承范围 | public/protected/default 可继承，private 不可直接访问 |
| super | 访问父类成员/方法/构造 |
| 构造顺序 | 父类构造先执行 → 子类构造后执行 |
| super() | 无参 super() 隐式存在，父类没有无参构造时必须显式写 |
| 方法重写 | 两同两小一大，@Override 防止拼写错误 |
| 继承 vs 组合 | is-a 用继承，has-a 用组合，组合优先 |
