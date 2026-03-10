# 7.1 Lambda 表达式

## 一、函数式接口

函数式接口是只有一个抽象方法的接口。

```java
// 内置函数式接口
@FunctionalInterface
interface Runnable {
    void run();
}

@FunctionalInterface
interface Comparator<T> {
    int compare(T o1, T o2);
}

@FunctionalInterface
interface Consumer<T> {
    void accept(T t);
}

@FunctionalInterface
interface Function<T, R> {
    R apply(T t);
}

@FunctionalInterface
interface Supplier<T> {
    T get();
}

@FunctionalInterface
interface Predicate<T> {
    boolean test(T t);
}
```

## 二、Lambda 语法

### 2.1 基本语法

```java
// 无参数，无返回值
Runnable r = () -> System.out.println("Hello");

// 一个参数，无返回值
Consumer<String> c = s -> System.out.println(s);

// 多个参数，有返回值
Comparator<Integer> comp = (a, b) -> a - b;

// 多行代码，需要大括号
Runnable r = () -> {
    System.out.println("Line 1");
    System.out.println("Line 2");
};
```

### 2.2 方法引用

```java
// 静态方法引用
Function<String, Integer> f = Integer::parseInt;

// 实例方法引用
Function<String, Integer> f = str -> str.length();
Function<String, Integer> f2 = String::length;

// 构造方法引用
Supplier<StringBuilder> s = StringBuilder::new;
```

## 三、常用函数式接口

### 3.1 Consumer（消费型）

```java
Consumer<String> c = s -> System.out.println(s);
c.accept("Hello");

// 链式调用
Consumer<String> c1 = s -> System.out.print(s);
Consumer<String> c2 = s -> System.out.println("!");
c1.andThen(c2).accept("Hello");  // Hello!
```

### 3.2 Supplier（供给型）

```java
Supplier<Double> s = Math::random;
Double result = s.get();

// 创建对象
Supplier<List<String>> listSupplier = ArrayList::new;
List<String> list = listSupplier.get();
```

### 3.3 Function（函数型）

```java
Function<String, Integer> f = String::length;
Integer result = f.apply("Hello");  // 5

// 组合
Function<String, String> f1 = String::toUpperCase;
Function<String, String> f2 = s -> s + "!";
String result = f1.andThen(f2).apply("hello");  // HELLO!
```

### 3.4 Predicate（断言型）

```java
Predicate<String> p = s -> s.length() > 5;
boolean result = p.test("Hello");  // false

// 组合
Predicate<String> p1 = s -> s.startsWith("H");
Predicate<String> p2 = s -> s.endsWith("o");
boolean result = p1.and(p2).test("Hello");  // true
```

## 四、小结

1. **Lambda**：简化匿名内部类
2. **函数式接口**：只有一个抽象方法
3. **方法引用**：:: 语法
4. **常用接口**：Consumer、Supplier、Function、Predicate

---

[下一节：7.2 Stream API](./07-02-Stream API.md)
