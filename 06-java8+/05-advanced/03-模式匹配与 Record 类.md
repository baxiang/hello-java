# 7.5 模式匹配与 Record 类

Java 14-21 引入了多项语言增强特性，让代码更简洁、更安全。

## 一、Record 类

### 1.1 什么是 Record
Record 是 Java 16 正式引入的不可变数据载体类，解决"只存储数据的类要写大量样板代码"的痛点。

**代码对比** - 传统方式 vs Record：

```java
// 传统方式（30+ 行）
public final class Point {
    private final int x;
    private final int y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int x() { return x; }
    public int y() { return y; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }
    @Override public int hashCode() { return Objects.hash(x, y); }
    @Override public String toString() {
        return "Point[x=" + x + ", y=" + y + "]";
    }
}

// Record 方式（1 行声明）
public record Point(int x, int y) {}
```

Record 自动生成了构造器、访问器、equals、hashCode 和 toString，代码量大幅减少。

### 1.2 Record 特性

Record 有以下核心特性：

| 特性 | 说明 |
|------|------|
| 隐式 final | Record 类不能被继承 |
| 字段不可变 | 所有字段都是 final，没有 setter |
| 自动生成方法 | 构造器、访问器、equals、hashCode、toString |
| 可自定义方法 | 可以添加业务方法 |
| 可添加验证 | 通过紧凑构造器进行参数校验 |

**自定义方法和构造器验证**：

```java
public record User(Long id, String name, String email) {

    // 紧凑构造器（Compact Constructor）- 用于参数验证
    public User {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }

    // 自定义业务方法
    public String displayName() {
        return name + " (" + email + ")";
    }
}

// 使用
User user = new User(1L, "张三", "zhang@example.com");
System.out.println(user.name());        // 访问器方法，不是 getName()
System.out.println(user.displayName()); // 张三 (zhang@example.com)
```

注意：Record 的访问器方法名与字段名相同（如 `name()`），而不是 JavaBean 风格的 `getName()`。

### 1.3 使用场景

Record 适用于以下场景：

- **DTO 数据传输对象**：替代传统的 VO/DTO 类
- **方法返回多个值**：替代 Map 或数组
- **不可变配置对象**：数据库连接配置、API 响应封装

```java
// 替代多返回值
public record Result<T>(T data, String error, int code) {}

public Result<User> getUser(Long id) {
    User user = userDao.findById(id);
    return user != null
        ? new Result<>(user, null, 200)
        : new Result<>(null, "Not found", 404);
}
```

## 二、Pattern Matching for instanceof

### 2.1 传统方式 vs 新模式

Java 16 引入 instanceof 模式匹配，消除冗余的类型转换：

```java
// 传统（啰嗦）
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// 新模式（Java 16+）
if (obj instanceof String s) {
    System.out.println(s.length());  // s 已在 if 块中可用
}
```

### 2.2 组合条件

模式变量可在同一表达式的后续条件中使用：

```java
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}
```

变量 `s` 的绑定范围是 `&&` 后面的条件和整个 if 块。

## 三、switch 表达式增强

### 3.1 箭头语法（Java 14+）

```java
// 箭头语法 - 不需要 break，不会穿透
String result = switch (day) {
    case MONDAY, FRIDAY -> "忙碌";
    case SUNDAY -> "休息";
    default -> "普通";
};
```

### 3.2 switch 模式匹配（Java 21+）

```java
String format(Object obj) {
    return switch (obj) {
        case Integer i -> "数字: " + i;
        case String s   -> "字符串: " + s;
        case Double d   -> "浮点: " + d;
        case null       -> "空值";
        default         -> "未知类型";
    };
}
```

switch 按声明顺序匹配，第一个匹配成功的分支执行。

### 3.3 密封类配合 switch

密封类与 switch 模式匹配结合，实现编译期穷举检查：

```java
public sealed interface Shape permits Circle, Rectangle, Triangle {}
public record Circle(double radius) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
public record Triangle(double base, double height) implements Shape {}

double area(Shape shape) {
    return switch (shape) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.width() * r.height();
        case Triangle t  -> 0.5 * t.base() * t.height();
    };
}
```

所有子类被覆盖时不需要 default，新增子类时编译器会提示，这是密封类的类型安全保障。

## 四、Sealed Classes（密封类）

### 4.1 概念

密封类（Java 17 正式引入）用于限制哪些类可以继承当前类，提供比 public/protected/private 更精细的继承控制。

```java
public sealed class Vehicle permits Car, Truck, Motorcycle {}

// final 子类 - 不能再被继承
public final class Car extends Vehicle {}

// sealed 子类 - 可以继续密封，指定自己的 permits 列表
public sealed class Truck extends Vehicle permits Pickup {}
public final class Pickup extends Truck {}

// non-sealed 子类 - 解除密封，允许任何类继承
public non-sealed class Motorcycle extends Vehicle {}
```

### 4.2 修饰符说明

| 修饰符 | 含义 |
|--------|------|
| `final` | 不可被继承，密封链的终点 |
| `sealed` | 只能由 permits 列表中的类继承，密封链继续 |
| `non-sealed` | 开放继承，任何类都可以继承，密封链在此断开 |

**使用约束**：
- 密封类和其 permits 子类必须在同一个模块（或同一文件）中
- 每个 permits 子类必须选择 final、sealed 或 non-sealed 之一
- 不能是 abstract 类（除非同时是 sealed）

**使用场景**：
- 状态机建模（订单状态只能有指定几种）
- 领域模型的层次控制
- 与 switch 模式匹配配合实现穷举分支

## 五、小结

| 特性 | 引入版本 | 作用 |
|------|----------|------|
| Record 类 | Java 16 | 不可变数据载体类，自动生成样板方法 |
| instanceof 模式匹配 | Java 16 | 简化类型检查和类型转换 |
| switch 表达式 | Java 14 | 箭头语法，支持返回值 |
| switch 模式匹配 | Java 21 | switch 中支持类型模式 |
| Sealed Classes | Java 17 | 限制类的继承范围 |

这些特性共同构成了 Java 现代化的重要一步，让代码更简洁、更安全、更具表达力。Record 负责数据建模，模式匹配简化类型操作，密封类提供继承控制——三者配合使用时效果最佳。
