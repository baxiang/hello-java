# 7.3 Optional 类

## 一、Optional 概述

Optional 是 Java 8 引入的容器类，用于避免空指针异常（NullPointerException）。

**设计目的**：
- 明确表示值存在或不存在
- 避免 null 检查
- 提供函数式编程风格

## 二、创建 Optional

### 2.1 of（值不能为 null）

```java
import java.util.*;

// 值不能为 null，否则抛异常
Optional<String> opt1 = Optional.of("Hello");
// Optional.of(null);  // NullPointerException
```

### 2.2 ofNullable（值可以为 null）

```java
String value = getValue();  // 可能返回 null
Optional<String> opt2 = Optional.ofNullable(value);

// 等价于
Optional<String> opt3 = (value == null) ? Optional.empty() : Optional.of(value);
```

### 2.3 empty（空 Optional）

```java
Optional<String> opt4 = Optional.empty();
```

## 三、获取值

### 3.1 get（不安全）

```java
Optional<String> opt = Optional.of("Hello");
String value = opt.get();  // "Hello"

// ❌ 危险：如果为空抛异常
Optional<String> empty = Optional.empty();
// String value = empty.get();  // NoSuchElementException
```

### 3.2 orElse（提供默认值）

```java
Optional<String> opt = Optional.ofNullable(getValue());

// 如果为空，返回默认值
String value = opt.orElse("Default");
```

### 3.3 orElseGet（懒加载默认值）

```java
// 只在 Optional 为空时执行
String value = opt.orElseGet(() -> {
    System.out.println("计算默认值");
    return "Default";
});
```

### 3.4 orElseThrow（抛异常）

```java
// 如果为空，抛异常
String value = opt.orElseThrow(() -> new RuntimeException("值为空"));

// Java 10+ 简化写法
String value = opt.orElseThrow();  // 抛 NoSuchElementException
```

### 3.5 ifPresent（存在时执行）

```java
// 值存在时执行
opt.ifPresent(value -> {
    System.out.println("值：" + value);
});

// Java 9+ ifPresentOrElse
opt.ifPresentOrElse(
    value -> System.out.println("值：" + value),
    () -> System.out.println("值为空")
);
```

## 四、转换操作

### 4.1 map（转换值）

```java
Optional<String> opt = Optional.of("Hello");

// 转换
Optional<Integer> length = opt.map(String::length);
// 如果 opt 为空，返回空 Optional
```

### 4.2 flatMap（扁平化）

```java
class Person {
    Optional<Address> address;
}

class Address {
    String city;
}

// 错误用法：返回嵌套 Optional
// Optional<Optional<String>> nested = person.map(p -> p.getAddress()).map(a -> a.getCity());

// 正确用法：flatMap 扁平化
Optional<String> city = person
    .flatMap(p -> p.getAddress())
    .map(a -> a.getCity());
```

### 4.3 filter（过滤）

```java
Optional<Integer> opt = Optional.of(10);

// 过滤
Optional<Integer> result = opt.filter(n -> n > 5);
// 如果条件不满足，返回空 Optional
```

## 五、综合示例

### 5.1 链式调用

```java
class Order {
    Optional<User> user;
}

class User {
    Optional<Address> address;
}

class Address {
    String city;
    String street;
}

// 获取订单用户的城市
Optional<String> city = order
    .flatMap(Order::getUser)
    .flatMap(User::getAddress)
    .map(Address::getCity);

// 提供默认值
String cityOrDefault = order
    .flatMap(Order::getUser)
    .flatMap(User::getAddress)
    .map(Address::getCity)
    .orElse("未知城市");
```

### 5.2 避免空指针

```java
// ❌ 传统写法
public String getUserName(User user) {
    if (user != null) {
        String name = user.getName();
        if (name != null) {
            return name.toUpperCase();
        }
    }
    return "UNKNOWN";
}

// ✅ Optional 写法
public String getUserName(User user) {
    return Optional.ofNullable(user)
        .map(User::getName)
        .map(String::toUpperCase)
        .orElse("UNKNOWN");
}
```

### 5.3 方法返回 Optional

```java
// 返回 Optional 而不是 null
public Optional<User> findUser(Long id) {
    User user = userDao.findById(id);
    return Optional.ofNullable(user);
}

// 使用
findUser(1L)
    .ifPresent(user -> System.out.println(user.getName()));

String name = findUser(1L)
    .map(User::getName)
    .orElse("未知用户");
```

### 5.4 集合处理

```java
List<User> users = Arrays.asList(
    new User("张三", Optional.of("北京")),
    new User("李四", Optional.empty()),
    new User("王五", Optional.of("上海"))
);

// 获取所有有地址的用户
List<String> cities = users.stream()
    .flatMap(user -> user.getAddress().stream())
    .collect(Collectors.toList());

// 或者
List<String> cities2 = users.stream()
    .map(User::getAddress)
    .filter(Optional::isPresent)
    .map(Optional::get)
    .collect(Collectors.toList());
```

## 六、注意事项

### 6.1 不要这样做

```java
// ❌ 不要检查 isPresent 后调用 get
if (opt.isPresent()) {
    value = opt.get();
}

// ✅ 应该使用 ifPresent 或 orElse
opt.ifPresent(v -> value = v);
value = opt.orElse(defaultValue);
```

### 6.2 不要将 Optional 用作字段

```java
// ❌ 不推荐
class User {
    private Optional<String> name;
}

// ✅ 推荐
class User {
    private String name;
    
    public Optional<String> getName() {
        return Optional.ofNullable(name);
    }
}
```

### 6.3 不要将 Optional 用作方法参数

```java
// ❌ 不推荐
public void process(Optional<String> value) {
    // ...
}

// ✅ 推荐
public void process(String value) {
    // 使用 null 或重载方法
}

public void process(String value, String defaultValue) {
    // ...
}
```

### 6.4 性能考虑

```java
// ❌ 过度使用 Optional
Optional.ofNullable(value)
    .map(String::trim)
    .filter(s -> !s.isEmpty())
    .orElse("default");

// ✅ 简单场景直接 null 检查
String result = (value != null && !value.trim().isEmpty()) 
    ? value.trim() 
    : "default";
```

## 七、Java 9+ 新特性

### 7.1 ifPresentOrElse

```java
opt.ifPresentOrElse(
    value -> System.out.println("值：" + value),
    () -> System.out.println("值为空")
);
```

### 7.2 or

```java
// Java 9+
Optional<String> opt1 = Optional.empty();
Optional<String> opt2 = opt1.or(() -> Optional.of("default"));
```

### 7.3 stream

```java
// Java 9+
Optional<String> opt = Optional.of("Hello");
List<String> list = opt.stream().collect(Collectors.toList());
```

## 八、小结

1. **创建**：of、ofNullable、empty
2. **获取值**：get、orElse、orElseGet、orElseThrow
3. **转换**：map、flatMap、filter
4. **消费**：ifPresent、ifPresentOrElse
5. **最佳实践**：
   - 用于方法返回值
   - 不用于字段和方法参数
   - 避免 isPresent + get 模式

---

[上一节：7.2 Stream API](./07-02-Stream API.md) | [下一节：7.4 其他新特性](./07-04-其他新特性.md)
