# 8.3 super 关键字

## 一、super 概述

`super` 关键字用于访问父类的成员（属性、方法、构造方法）。

**super 的三种用法**：
1. 访问父类属性
2. 调用父类方法
3. 调用父类构造方法

## 二、访问父类属性

### 2.1 当子类和父类有相同属性时

```java
class Parent {
    String name = "父类";
}

class Child extends Parent {
    String name = "子类";
    
    public void print() {
        System.out.println(name);      // 子类的 name
        System.out.println(super.name); // 父类的 name
    }
}

// 使用
Child child = new Child();
child.print();
// 输出：
// 子类
// 父类
```

### 2.2 访问父类私有属性

```java
class Parent {
    private int money = 1000;
    
    public int getMoney() {
        return money;
    }
}

class Child extends Parent {
    public void print() {
        // ❌ 错误：不能直接访问父类私有属性
        // System.out.println(super.money);
        
        // ✅ 正确：通过父类的公共方法
        System.out.println(super.getMoney());
    }
}
```

## 三、调用父类方法

### 3.1 基本用法

```java
class Parent {
    public void show() {
        System.out.println("父类的 show");
    }
}

class Child extends Parent {
    @Override
    public void show() {
        System.out.println("子类的 show");
        super.show();  // 调用父类的 show
    }
}

// 使用
Child child = new Child();
child.show();
// 输出：
// 子类的 show
// 父类的 show
```

### 3.2 扩展父类方法

```java
class Phone {
    public void call() {
        System.out.println("打电话");
    }
}

class SmartPhone extends Phone {
    @Override
    public void call() {
        System.out.println("打开摄像头");
        System.out.println("拨号");
        super.call();  // 保留父类功能
    }
}
```

### 3.3 调用父类被重写的方法

```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
    
    public void eatFood() {
        eat();        // 调用自己的 eat（重写后的）
        super.eat();  // 调用父类的 eat
    }
}

// 使用
Dog dog = new Dog();
dog.eatFood();
// 输出：
// 狗吃骨头
// 动物吃东西
```

## 四、调用父类构造方法

### 4.1 super() 语法

```java
class Parent {
    public Parent() {
        System.out.println("父类无参构造");
    }
}

class Child extends Parent {
    public Child() {
        super();  // 调用父类无参构造
        System.out.println("子类无参构造");
    }
}
```

### 4.2 调用父类有参构造

```java
class Parent {
    String name;
    
    public Parent(String name) {
        this.name = name;
        System.out.println("父类有参构造：" + name);
    }
}

class Child extends Parent {
    int age;
    
    public Child(String name, int age) {
        super(name);  // 调用父类有参构造
        this.age = age;
        System.out.println("子类有参构造：" + age);
    }
}
```

### 4.3 默认调用

```java
class Parent {
    public Parent() {
        System.out.println("父类构造");
    }
}

class Child extends Parent {
    public Child() {
        // 默认隐藏了 super()
        System.out.println("子类构造");
    }
}

// 等价于
class Child extends Parent {
    public Child() {
        super();  // 自动调用父类无参构造
        System.out.println("子类构造");
    }
}
```

### 4.4 父类没有无参构造时

```java
class Parent {
    public Parent(String name) {
        // 只有有参构造
    }
}

class Child extends Parent {
    // ❌ 错误：父类没有无参构造，无法默认调用
    // public Child() { }
    
    // ✅ 正确：必须显式调用父类构造
    public Child() {
        super("默认名称");
    }
}
```

## 五、super 与 this 对比

### 5.1 调用构造方法

```java
class Person {
    String name;
    int age;
    
    public Person() {
        this("未知", 0);  // 调用本类其他构造
    }
    
    public Person(String name) {
        this(name, 0);
    }
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    String school;
    
    public Student() {
        super();  // 调用父类构造
    }
    
    public Student(String name, int age, String school) {
        super(name, age);  // 调用父类构造
        this.school = school;  // 初始化本类属性
    }
}
```

### 5.2 访问成员

```java
class Parent {
    String name = "父类";
    public void show() {
        System.out.println("父类 show");
    }
}

class Child extends Parent {
    String name = "子类";
    
    @Override
    public void show() {
        System.out.println("子类 show");
    }
    
    public void print() {
        System.out.println(name);       // 子类 name
        System.out.println(super.name); // 父类 name
        
        show();        // 子类 show
        super.show();  // 父类 show
    }
}
```

### 5.3 对比表

| 特性 | this | super |
|------|------|-------|
| 访问属性 | 本类属性 | 父类属性 |
| 调用方法 | 本类方法 | 父类方法 |
| 调用构造 | 本类其他构造 | 父类构造 |
| 代表对象 | 当前对象 | 父类部分 |

## 六、注意事项

### 6.1 super() 必须在第一行

```java
class Child extends Parent {
    public Child() {
        // ❌ 错误：super() 必须在第一行
        // System.out.println("开始");
        // super();
        
        // ✅ 正确
        super();
        System.out.println("开始");
    }
}
```

### 6.2 不能同时使用 this() 和 super()

```java
class Child extends Parent {
    public Child() {
        // ❌ 错误：this() 和 super() 都必须在第一行
        // this("默认");
        // super();
    }
}
```

### 6.3 静态方法中不能使用 super

```java
class Child extends Parent {
    public static void method() {
        // ❌ 错误：静态方法不能使用 super
        // super.show();
    }
}
```

## 七、综合示例

```java
// 父类：人
class Person {
    protected String name;
    protected int age;
    
    public Person() {
        this("未知", 0);
    }
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁");
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// 子类：学生
class Student extends Person {
    private String studentId;
    private double score;
    
    public Student() {
        super();
        this.studentId = "S000";
        this.score = 0;
    }
    
    public Student(String name, int age, String studentId, double score) {
        super(name, age);  // 调用父类构造
        this.studentId = studentId;
        this.score = score;
    }
    
    @Override
    public void introduce() {
        super.introduce();  // 调用父类方法
        System.out.println("学号：" + studentId + "，成绩：" + score);
    }
    
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +  // 访问父类属性
                ", age=" + age +
                ", studentId='" + studentId + '\'' +
                ", score=" + score +
                '}';
    }
}

// 子类：老师
class Teacher extends Person {
    private String teacherId;
    private String subject;
    private double salary;
    
    public Teacher(String name, int age, String teacherId, String subject, double salary) {
        super(name, age);
        this.teacherId = teacherId;
        this.subject = subject;
        this.salary = salary;
    }
    
    @Override
    public void introduce() {
        super.introduce();
        System.out.println("工号：" + teacherId + "，科目：" + subject + "，工资：" + salary);
    }
    
    // 特有方法
    public void teach() {
        System.out.println(name + " 正在教" + subject);
    }
}

// 使用
public class School {
    public static void main(String[] args) {
        Student student = new Student("张三", 18, "S001", 95.5);
        student.introduce();
        System.out.println(student);
        
        Teacher teacher = new Teacher("李老师", 35, "T001", "数学", 8000);
        teacher.introduce();
        teacher.teach();
        System.out.println(teacher);
    }
}
```

## 八、小结

本节要点：
1. **访问父类属性**：`super.属性名`
2. **调用父类方法**：`super.方法名 ()`
3. **调用父类构造**：`super()` 或 `super(参数)`
4. **位置要求**：`super()` 必须在构造方法第一行
5. **与 this 对比**：this 访问本类，super 访问父类

---

[上一节：8.2 方法重写](./08-02-方法重写.md) | [下一节：8.4 多态概述](./08-04-多态概述.md)
