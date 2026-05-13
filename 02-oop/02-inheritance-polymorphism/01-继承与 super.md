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
class Dog extends Animal { } // Dog 自动有 name, age, eat()
class Cat extends Animal { } // Cat 也自动有
```

继承让子类**复用父类的成员**，不需要重复定义。

## 二、核心概念

### 2.1 继承的语法

```java
class 父类 { }
class 子类 extends 父类 { }
```

### 2.2 能继承什么

```java
class Parent {
    public int a;       // ✅ 子类可继承
    protected int b;    // ✅ 子类可继承
    int c;              // ✅ 同包子类可继承
    private int d;       // ❌ 不可继承（但子类确实有这个字段，只是访问不到）

    public void m1() { }      // ✅
    protected void m2() { }   // ✅
    void m3() { }            // ✅ 同包
    private void m4() { }     // ❌ 不可继承
}
```

### 2.3 Java 继承的特点

- **单继承**：一个类只能有一个直接父类（但可以多层继承）
- **多层继承**：`A extends B, B extends C` → A 间接继承 C
- **Object 类**：所有类的根父类，没写 `extends` 的默认继承 `Object`

```java
// 等价
class Person { }
class Person extends Object { }
```

### 2.4 super 关键字

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
        System.out.println(this.name);   // 子类的 name
        this.show();                     // 调用自己的 show()（递归）
    }
}
```

### 2.5 构造方法与继承

子类的构造方法中**隐式调用**父类无参构造 `super()`：

```java
class Parent { }
class Child extends Parent {
    public Child() {
        super(); // 隐式调用父类无参构造
    }
}
```

如果父类**没有无参构造**（只有有参构造），子类必须**显式调用**：

```java
class Parent {
    Parent(String name) { } // 没有无参构造
}
class Child extends Parent {
    Child() {
        super("默认"); // ❌ 必须显式调用，否则编译错误
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
        // ...
    }
}
```

## 四、实现方式

### 4.1 继承 is-a 关系

```java
class Animal { void eat() { } }
class Dog extends Animal { void bark() { } }

// Dog is-a Animal，合法
Animal a = new Dog();
```

### 4.2 组合 has-a 关系

```java
class Engine { }
class Car {
    private Engine engine; // Car has-a Engine，用组合而非继承
}
```

**原则**：is-a 用继承（Dog is an Animal），has-a 用组合（Car has an Engine）。

### 4.3 方法重写（Override）

子类重新定义父类已有的方法：

```java
class Animal {
    void eat() { System.out.println("吃东西"); }
}
class Dog extends Animal {
    @Override                      // ✅ 推荐加上，编译器帮你检查拼写
    void eat() { System.out.println("狗吃骨头"); }
}
```

重写规则：**两同两小一大**
- 两同：方法名相同，参数列表相同
- 两小：返回值类型 ≤ 父类，抛出异常 ≤ 父类
- 一大：访问权限 ≥ 父类

```java
class Parent {
    public Object method() { return null; }
}
class Child extends Parent {
    @Override
    public String method() { return ""; } // ✅ String 是 Object 子类，返回类型缩小了
}
```

**不能重写**：final 方法、static 方法（是隐藏而非重写）、private 方法（子类定义的是新方法，不是重写）。

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
| 继承范围 | public/protected/default 成员，private 不可直接访问 |
| 单继承 | 一个类只能有一个直接父类 |
| super | 访问父类成员/方法/构造 |
| 构造顺序 | 父类构造先执行 → 子类构造后执行 |
| super() | 无参 super() 隐式存在，但父类没有无参构造时必须显式写 |
| 方法重写 | 两同两小一大，@Override 检查拼写 |
| is-a vs has-a | 继承 vs 组合 |
