# 7.5 封装与 private

## 一、封装概述

### 1.1 什么是封装

封装（Encapsulation）是面向对象的三大特性之一，指隐藏对象的内部细节，只暴露必要的接口给外部使用。

**比喻**：
```
封装就像电视机：
- 内部电路被隐藏（私有属性）
- 只提供按钮和遥控器（公共方法）
- 用户不需要知道内部原理
```

### 1.2 封装的好处

| 好处 | 说明 |
|------|------|
| 提高安全性 | 防止数据被随意修改 |
| 便于修改 | 内部实现改变不影响外部 |
| 便于验证 | 可以对数据进行合法性检查 |
| 降低耦合 | 减少类之间的依赖 |

## 二、private 关键字

### 2.1 访问权限修饰符

Java 提供了四种访问权限：

| 修饰符 | 同类 | 同包 | 子类 | 不同包 |
|--------|------|------|------|--------|
| private | ✅ | ❌ | ❌ | ❌ |
| (default) | ✅ | ✅ | ❌ | ❌ |
| protected | ✅ | ✅ | ✅ | ❌ |
| public | ✅ | ✅ | ✅ | ✅ |

### 2.2 private 的使用

```java
public class Person {
    // 私有属性，只能在本类中访问
    private String name;
    private int age;
    
    // 公共方法，提供给外部访问
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        }
    }
}
```

### 2.3 封装的完整示例

```java
public class Student {
    // 私有属性
    private String name;
    private int age;
    private double score;
    
    // 公共的 getter 和 setter
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        }
    }
    
    public double getScore() {
        return score;
    }
    
    public void setScore(double score) {
        if (score >= 0 && score <= 100) {
            this.score = score;
        }
    }
    
    // 其他公共方法
    public void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁，成绩" + score);
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        
        // ✅ 通过公共方法访问
        s.setName("张三");
        s.setAge(18);
        s.setScore(95.5);
        
        // ❌ 不能直接访问私有属性
        // s.name = "张三";
        // s.age = 18;
        
        s.introduce();
    }
}
```

## 三、Getter 和 Setter 方法

### 3.1 命名规范

```java
// 布尔类型的 getter 用 is 开头
private boolean married;

public boolean isMarried() {
    return married;
}

public void setMarried(boolean married) {
    this.married = married;
}

// 其他类型的 getter 用 get 开头
private String name;

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
```

### 3.2 只读属性

```java
public class Person {
    private String id;  // 身份证号，只读
    private String name;
    
    public Person(String id, String name) {
        this.id = id;
        this.name = name;
    }
    
    // 只有 getter，没有 setter
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

### 3.3 只写属性（少见）

```java
public class User {
    private String password;
    
    // 只有 setter，没有 getter
    public void setPassword(String password) {
        this.password = encrypt(password);  // 加密存储
    }
    
    private String encrypt(String pwd) {
        // 加密逻辑
        return "***";
    }
}
```

## 四、封装的应用场景

### 4.1 数据验证

```java
public class Account {
    private double balance;
    
    public void setBalance(double balance) {
        if (balance < 0) {
            throw new IllegalArgumentException("余额不能为负");
        }
        this.balance = balance;
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("存款金额必须大于 0");
        }
        balance += amount;
    }
    
    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("取款金额必须大于 0");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("余额不足");
        }
        balance -= amount;
    }
    
    public double getBalance() {
        return balance;
    }
}
```

### 4.2 隐藏实现细节

```java
public class Database {
    private String url;
    private String username;
    private String password;
    private Connection connection;
    
    public void connect() {
        // 内部实现可以改变，不影响外部
        connection = DriverManager.getConnection(url, username, password);
    }
    
    public void disconnect() {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 4.3 计算属性

```java
public class Rectangle {
    private double width;
    private double height;
    
    public double getWidth() {
        return width;
    }
    
    public void setWidth(double width) {
        this.width = width;
    }
    
    public double getHeight() {
        return height;
    }
    
    public void setHeight(double height) {
        this.height = height;
    }
    
    // 计算属性，不需要存储
    public double getArea() {
        return width * height;
    }
    
    public double getPerimeter() {
        return 2 * (width + height);
    }
}
```

## 五、JavaBean 规范

### 5.1 什么是 JavaBean

JavaBean 是一种符合特定规范的 Java 类，常用于封装数据。

**规范**：
1. 类用 public 修饰
2. 属性用 private 修饰
3. 提供公共的 getter 和 setter
4. 提供无参构造方法

### 5.2 JavaBean 示例

```java
public class User implements java.io.Serializable {
    // 1. 私有属性
    private Long id;
    private String username;
    private String email;
    private boolean active;
    
    // 2. 无参构造
    public User() {
    }
    
    // 3. 全参构造（可选）
    public User(Long id, String username, String email, boolean active) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.active = active;
    }
    
    // 4. Getter 和 Setter
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
}
```

## 六、综合示例

```java
/**
 * 员工类
 */
public class Employee {
    // 私有属性
    private String empId;
    private String name;
    private int age;
    private String department;
    private double salary;
    
    // 构造方法
    public Employee() {
    }
    
    public Employee(String empId, String name) {
        this.empId = empId;
        this.name = name;
    }
    
    public Employee(String empId, String name, int age, String department, double salary) {
        this.empId = empId;
        this.name = name;
        setAge(age);
        this.department = department;
        setSalary(salary);
    }
    
    // Getter 和 Setter
    public String getEmpId() {
        return empId;
    }
    
    public void setEmpId(String empId) {
        this.empId = empId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age >= 18 && age <= 65) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("年龄必须在 18-65 之间");
        }
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public double getSalary() {
        return salary;
    }
    
    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        } else {
            throw new IllegalArgumentException("工资不能为负");
        }
    }
    
    // 业务方法
    public void raiseSalary(double percent) {
        if (percent > 0) {
            salary = salary * (1 + percent / 100);
        }
    }
    
    public void transfer(String newDept) {
        this.department = newDept;
    }
    
    // 显示信息
    public void showInfo() {
        System.out.println("工号：" + empId);
        System.out.println("姓名：" + name);
        System.out.println("年龄：" + age);
        System.out.println("部门：" + department);
        System.out.println("工资：" + salary);
    }
}

public class EmployeeDemo {
    public static void main(String[] args) {
        // 创建员工
        Employee emp = new Employee("E001", "张三", 25, "技术部", 10000);
        
        // 显示信息
        emp.showInfo();
        
        // 加薪
        emp.raiseSalary(10);
        System.out.println("加薪后工资：" + emp.getSalary());
        
        // 转部门
        emp.transfer("产品部");
        System.out.println("新部门：" + emp.getDepartment());
        
        // 数据验证
        try {
            emp.setAge(200);  // 会抛出异常
        } catch (IllegalArgumentException e) {
            System.out.println("错误：" + e.getMessage());
        }
    }
}
```

## 七、注意事项

### 7.1 不要过度封装

```java
// ❌ 过度封装：暴露了内部实现
public class Data {
    private int[] data;
    
    public int[] getData() {
        return data;  // 返回了内部数组的引用
    }
}

// ✅ 正确：返回副本
public class Data {
    private int[] data;
    
    public int[] getData() {
        return data.clone();  // 返回副本
    }
}
```

### 7.2 包访问权限

```java
// 同一个包内的类可以访问 default 修饰的成员
class Person {
    String name;  // default 权限
}

// 同包
class Student extends Person {
    void test() {
        name = "张三";  // ✅ 可以访问
    }
}
```

## 八、小结

本节要点：
1. **封装**：隐藏内部细节，暴露公共接口
2. **private**：私有权限，只能在本类访问
3. **Getter/Setter**：提供访问私有属性的方法
4. **JavaBean**：符合规范的 Java 类
5. **好处**：安全、易维护、易扩展

---

[上一节：7.4 this 关键字](./07-04-this 关键字.md) | [下一节：7.6 标准类设计](./07-06-标准类设计.md)
