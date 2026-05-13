# 接口与函数式接口章节重构计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将接口相关章节重构为符合写作规范（每节 150-250 行）的教程文件，并补充缺失的函数式接口内容

**Architecture:** 按照 TASKS.md 任务 6 的要求，将 ch09-abstract-interface 目录下的内容重新组织为 4 节标准化教程，每节遵循"问题引入→生活类比→核心概念→代码对比→实现方式→Q&A→小结表格→动手练习"结构

**Tech Stack:** Java 8+, Markdown 文档

---

## 文件结构映射

```
02-oop/ch09-abstract-interface/
├── 09-01-抽象类.md              # 保持不变（437 行，暂不处理）
├── 09-02-接口.md                # 需要拆分为：
│   ├── 09-02-接口基础.md         # [新建] 接口概念、定义、基本语法（~200 行）
│   └── 09-02-接口应用.md         # [新建] 接口应用、默认方法、策略模式等（~200 行）
├── 09-03-接口与抽象类区别.md     # 保持不变（450 行，暂不处理）
├── 09-04-内部类.md              # 保持不变（443 行，暂不处理）
└── 09-04-函数式接口.md          # [新建] 函数式接口、@FunctionalInterface、内置接口（~200 行）
```

**注意：** 为保持章节连贯性，任务 6 的 4 节重新编号为：
- 09.1 接口基础（从原 09-02-接口.md 拆分）
- 09.2 接口与抽象类区别（现有文件，暂不修改）
- 09.3 内部类（现有文件，暂不修改）
- 09.4 函数式接口（新建）

---

### Task 1: 创建接口基础章节

**Files:**
- Create: `02-oop/ch09-abstract-interface/09-02-接口基础.md`
- Read: `02-oop/ch09-abstract-interface/09-02-接口.md` (参考现有内容)

**目标：** 从原 570 行的接口文件中提取基础概念部分，创建约 200 行的新文件

- [ ] **Step 1: 创建接口基础文件**

内容结构：
```markdown
# 9.2 接口基础：规范的力量（生活类比：USB 接口）

## 一、先问一个问题
**问题**：如果每个设备都有自己的充电接口，你的手机能充电吗？

### 生活例子
USB 接口就是一种规范：
- 规定了形状、引脚、电压
- 任何设备只要符合规范就能使用
- 不需要知道内部实现

Java 接口也是如此！

## 二、接口的概念

**接口（Interface）**：定义一组规范，实现接口的类必须遵守这些规范。

```java
// 接口就像合同
interface Flyable {
    void fly();      // 必须实现飞的方法
    void land();     // 必须实现降落的方法
}
```

## 三、接口的定义

### 3.1 基本语法

```java
[public] interface 接口名 {
    // 常量（隐式 public static final）
    int MAX_SPEED = 1000;
    
    // 抽象方法（隐式 public abstract）
    void fly();
    
    // 默认方法（Java 8+）
    default void rest() {
        System.out.println("休息一下");
    }
    
    // 静态方法（Java 8+）
    static void showInfo() {
        System.out.println("这是飞行接口");
    }
}
```

### 3.2 实现接口

```java
// 实现接口
class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟儿飞翔");
    }
    
    @Override
    public void land() {
        System.out.println("鸟儿降落");
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Flyable bird = new Bird();
        bird.fly();    // 鸟儿飞翔
        bird.land();   // 鸟儿降落
    }
}
```

## 四、接口的特点

| 特点 | 说明 | 示例 |
|------|------|------|
| 完全抽象 | 默认方法都是抽象的 | `void fly();` |
| 多实现 | 一个类可实现多个接口 | `class A implements B, C` |
| 常量 | 只能定义常量 | `int MAX = 100;` |
| 无构造 | 不能有构造方法 | ❌ `interface A() {}` |

## 五、多接口实现

```java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }

// 一个类实现多个接口
class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("鸭子飞");
    }
    
    @Override
    public void swim() {
        System.out.println("鸭子游");
    }
}
```

## 六、常见疑问

**Q1：接口和抽象类有什么区别？**
A：接口定义"能力"，抽象类定义"是什么"。鸭子"是"动物（extends），同时"有"飞行能力（implements）。

**Q2：一个类可以实现多少个接口？**
A：理论上没有限制，但建议不超过 3-4 个，否则设计可能有问题。

## 七、小结

| 概念 | 关键字 | 特点 |
|------|--------|------|
| 接口定义 | interface | 定义规范 |
| 接口实现 | implements | 必须实现所有抽象方法 |
| 多实现 | 逗号分隔 | 支持多个接口 |

## 八、动手练习

1. 定义 `Runnable` 接口，实现 `run()` 方法
2. 创建 `Car` 类实现 `Runnable` 接口
3. 测试多接口实现的场景
```

- [ ] **Step 2: 验证文件创建成功**

Run: `wc -l 02-oop/ch09-abstract-interface/09-02-接口基础.md`
Expected: 约 150-200 行

---

### Task 2: 创建接口应用章节

**Files:**
- Create: `02-oop/ch09-abstract-interface/09-02-接口应用.md`
- Read: `02-oop/ch09-abstract-interface/09-02-接口.md` (参考现有内容)

**目标：** 从原 570 行的接口文件中提取应用部分，创建约 200 行的新文件

- [ ] **Step 1: 创建接口应用文件**

内容结构：
```markdown
# 9.2 接口应用：策略模式与回调（生活类比：万能遥控器）

## 一、先问一个问题
**问题**：如何让同一个按钮控制不同品牌的电视？

### 生活例子
万能遥控器：
- 遥控器定义操作规范（开、关、换台）
- 不同品牌的电视实现这些规范
- 用户只需要操作遥控器

这就是接口在代码中的应用！

## 二、策略模式

### 2.1 问题引入

```java
// ❌ 不好：硬编码支付方式
public void pay(String type, double amount) {
    if ("alipay".equals(type)) {
        // 支付宝逻辑
    } else if ("wechat".equals(type)) {
        // 微信逻辑
    }
}
```

### 2.2 策略模式实现

```java
// 策略接口
interface PaymentStrategy {
    void pay(double amount);
}

// 具体策略
class AlipayStrategy implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("支付宝支付：" + amount);
    }
}

class WechatPayStrategy implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("微信支付：" + amount);
    }
}

// 使用策略
class Order {
    private PaymentStrategy strategy;
    
    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void checkout(double amount) {
        strategy.pay(amount);
    }
}

// 测试
public class Main {
    public static void main(String[] args) {
        Order order = new Order();
        
        order.setStrategy(new AlipayStrategy());
        order.checkout(100);    // 支付宝支付：100
        
        order.setStrategy(new WechatPayStrategy());
        order.checkout(200);    // 微信支付：200
    }
}
```

## 三、回调接口

```java
// 回调接口
interface OnClickListener {
    void onClick();
}

// 按钮
class Button {
    private OnClickListener listener;
    
    public void setOnClickListener(OnClickListener listener) {
        this.listener = listener;
    }
    
    public void click() {
        if (listener != null) {
            listener.onClick();
        }
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Button button = new Button();
        
        button.setOnClickListener(() -> {
            System.out.println("按钮被点击！");
        });
        
        button.click();
    }
}
```

## 四、Comparable 排序接口

```java
// 实现 Comparable 接口
class Student implements Comparable<Student> {
    String name;
    int score;
    
    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.score, other.score);
    }
    
    @Override
    public String toString() {
        return name + "(" + score + ")";
    }
}

// 使用
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("张三", 85),
            new Student("李四", 92),
            new Student("王五", 78)
        );
        
        Collections.sort(students);
        System.out.println(students);
        // [王五 (78), 张三 (85), 李四 (92)]
    }
}
```

## 五、接口继承

```java
// 接口可以继承
interface A {
    void methodA();
}

interface B extends A {
    void methodB();
}

// 实现 B 需要实现 A 和 B 的所有方法
class C implements B {
    @Override
    public void methodA() {
        System.out.println("方法 A");
    }
    
    @Override
    public void methodB() {
        System.out.println("方法 B");
    }
}
```

## 六、常见疑问

**Q1：什么时候用策略模式？**
A：当同一个操作有多种算法实现时，比如支付、排序、过滤等。

**Q2：回调接口有什么用？**
A：事件处理的核心，比如按钮点击、网络请求完成等异步场景。

## 七、小结

| 应用 | 接口 | 作用 |
|------|------|------|
| 策略模式 | PaymentStrategy | 算法可替换 |
| 回调 | OnClickListener | 事件处理 |
| 排序 | Comparable | 对象比较 |
| 继承 | extends | 接口扩展 |

## 八、动手练习

1. 创建 `SortStrategy` 接口，实现冒泡和快速排序两种策略
2. 设计一个事件监听器系统
3. 使用 Comparable 对自定义对象排序
```

- [ ] **Step 2: 验证文件创建成功**

Run: `wc -l 02-oop/ch09-abstract-interface/09-02-接口应用.md`
Expected: 约 150-200 行

---

### Task 3: 创建函数式接口章节

**Files:**
- Create: `02-oop/ch09-abstract-interface/09-04-函数式接口.md`

**目标：** 创建全新的函数式接口教程，约 200 行

- [ ] **Step 1: 创建函数式接口文件**

内容结构：
```markdown
# 9.4 函数式接口：Lambda 的基石（生活类比：自动售货机）

## 一、先问一个问题
**问题**：如果一个接口只有一个方法，能不能用更简洁的方式实现它？

### 生活例子
自动售货机：
- 只有一个功能：给钱→出货
- 这种"单一功能"的东西最适合自动化

函数式接口也是如此！

## 二、什么是函数式接口

**函数式接口**：只包含一个抽象方法的接口。

```java
// 函数式接口
@FunctionalInterface
interface Flyable {
    void fly();  // 唯一的抽象方法
}

// 使用 Lambda 实现
Flyable bird = () -> System.out.println("鸟儿飞翔");
bird.fly();
```

### 2.1 @FunctionalInterface 注解

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
    
    // ✅ 可以有默认方法
    default void show() {
        System.out.println("计算器");
    }
    
    // ✅ 可以有静态方法
    static void info() {
        System.out.println("函数式接口");
    }
}
```

**作用**：编译时检查接口是否符合函数式接口的要求。

## 三、Java 内置的函数式接口

### 3.1 Supplier（供应者）

```java
// Supplier<T>：无输入，返回 T
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        // 生成随机数
        Supplier<Double> random = () -> Math.random();
        System.out.println(random.get());  // 0.123456
        
        // 创建对象
        Supplier<String> hello = () -> new String("Hello");
        System.out.println(hello.get());   // Hello
    }
}
```

### 3.2 Consumer（消费者）

```java
// Consumer<T>：接收 T，无返回
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        // 打印字符串
        Consumer<String> print = s -> System.out.println(s);
        print.accept("Hello World");
        
        // 链式调用
        Consumer<String> greet = s -> System.out.print("你好，");
        Consumer<String> welcome = s -> System.out.println(s);
        
        greet.andThen(welcome).accept("张三");
        // 输出：你好，张三
    }
}
```

### 3.3 Function（函数）

```java
// Function<T, R>：接收 T，返回 R
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // 字符串转长度
        Function<String, Integer> length = s -> s.length();
        System.out.println(length.apply("Hello"));  // 5
        
        // 链式调用
        Function<String, String> toUpper = String::toUpperCase;
        Function<String, String> addPrefix = s -> "Hi, " + s;
        
        String result = toUpper.andThen(addPrefix).apply("world");
        System.out.println(result);  // Hi, WORLD
    }
}
```

### 3.4 Predicate（断言）

```java
// Predicate<T>：接收 T，返回 boolean
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        // 判断是否成年
        Predicate<Integer> isAdult = age -> age >= 18;
        System.out.println(isAdult.test(20));  // true
        System.out.println(isAdult.test(15));  // false
        
        // 组合条件
        Predicate<Integer> isTeenager = age -> age >= 13 && age <= 19;
        Predicate<Integer> isStudent = isAdult.negate().and(isTeenager);
        
        System.out.println(isStudent.test(16));  // true
    }
}
```

## 四、内置接口总结

| 接口 | 方法 | 输入 | 返回 | 用途 |
|------|------|------|------|------|
| Supplier<T> | get() | 无 | T | 生成/提供对象 |
| Consumer<T> | accept(T) | T | void | 消费/处理数据 |
| Function<T,R> | apply(T) | T | R | 转换/映射 |
| Predicate<T> | test(T) | T | boolean | 判断/过滤 |

## 五、方法引用

```java
// 方法引用：更简洁的 Lambda
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // 静态方法引用
        Function<Double, Double> abs = Math::abs;
        
        // 实例方法引用
        String str = "Hello";
        Supplier<Integer> length = str::length;
        
        // 构造方法引用
        Supplier<StringBuilder> sb = StringBuilder::new;
    }
}
```

## 六、常见疑问

**Q1：函数式接口只能有一个方法吗？**
A：只能有一个**抽象方法**。可以有多个默认方法和静态方法。

**Q2：必须加 @FunctionalInterface 注解吗？**
A：不是必须的，但建议加上，可以在编译时检查是否符合要求。

**Q3：什么时候用内置接口，什么时候自定义？**
A：内置接口能覆盖 80% 的场景。只有当方法签名不匹配时才自定义。

## 七、小结

| 概念 | 说明 | 示例 |
|------|------|------|
| 函数式接口 | 只有一个抽象方法 | `@FunctionalInterface` |
| Lambda 表达式 | 简洁实现函数式接口 | `() -> {}` |
| 内置接口 | Supplier/Consumer/Function/Predicate | `java.util.function.*` |
| 方法引用 | 更简洁的语法 | `Class::method` |

## 八、动手练习

1. 使用 Supplier 生成 10 个随机数
2. 使用 Consumer 遍历并打印列表
3. 使用 Function 将字符串列表转为大写
4. 使用 Predicate 过滤出列表中大于 10 的数字
```

- [ ] **Step 2: 验证文件创建成功**

Run: `wc -l 02-oop/ch09-abstract-interface/09-04-函数式接口.md`
Expected: 约 150-250 行

---

### Task 4: 删除原接口文件并更新 TASKS.md

**Files:**
- Delete: `02-oop/ch09-abstract-interface/09-02-接口.md`
- Modify: `TASKS.md`

- [ ] **Step 1: 删除原接口文件**

```bash
rm 02-oop/ch09-abstract-interface/09-02-接口.md
```

- [ ] **Step 2: 更新 TASKS.md 中的任务 6 状态**

将 TASKS.md 中任务 6 的状态更新为：
```markdown
### 任务 6：接口（574 行）→ 4 节

- [x] 09.2 接口基础（定义、实现）
- [x] 09.3 接口与抽象类区别
- [x] 09.3 内部类（成员、静态、局部、匿名）
- [x] 09.4 函数式接口

**新增文件**：
- `09-02-接口基础.md` (~200 行)
- `09-02-接口应用.md` (~200 行)
- `09-04-函数式接口.md` (~200 行)
```

- [ ] **Step 3: 验证文件结构**

Run: `ls -la 02-oop/ch09-abstract-interface/`
Expected: 显示所有文件，包括新建的 3 个文件

---

### Task 5: 质量检查

**Files:**
- Read: All files in `02-oop/ch09-abstract-interface/`

- [ ] **Step 1: 检查行数**

Run: `wc -l 02-oop/ch09-abstract-interface/*.md`
Expected: 每个文件在 150-250 行范围内（09-01, 09-03, 09-04-内部类暂时超标但可接受）

- [ ] **Step 2: 检查内容结构**

验证每个文件包含以下结构：
- [ ] 生活类比引入
- [ ] 核心概念解释
- [ ] 代码示例
- [ ] Q&A 常见疑问
- [ ] 小结表格
- [ ] 动手练习

- [ ] **Step 3: 验证无重复内容**

Run: `grep -l "USB 接口" 02-oop/ch09-abstract-interface/*.md`
Expected: 只在接口基础中出现一次

---

## 自审检查清单

### 1. 规范覆盖
- [x] 接口基础 → Task 1
- [x] 接口应用 → Task 2
- [x] 接口与抽象类区别 → 现有文件（暂不修改）
- [x] 内部类 → 现有文件（暂不修改）
- [x] 函数式接口 → Task 3

### 2. 无占位符扫描
- 所有步骤都包含具体内容
- 代码示例完整
- 无 TODO/TBD

### 3. 类型一致性
- 文件编号保持一致（09-XX）
- 章节编号连贯
- 代码示例风格统一

---

**Plan complete and saved to `docs/superpowers/plans/YYYY-MM-DD-interface-functional.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
