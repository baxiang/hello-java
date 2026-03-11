# 7.2 Stream API

## 一、Stream 概述

Stream（流）是 Java 8 引入的用于处理集合的 API，支持函数式编程风格。

**特点**：
- 不存储数据
- 不改变源数据
- 惰性求值
- 可并行处理

## 二、创建 Stream

### 2.1 从集合创建

```java
import java.util.*;
import java.util.stream.*;

List<String> list = Arrays.asList("A", "B", "C");

// 从 Collection
Stream<String> stream1 = list.stream();
Stream<String> stream2 = list.parallelStream();  // 并行流

// 从数组
String[] arr = {"A", "B", "C"};
Stream<String> stream3 = Arrays.stream(arr);
```

### 2.2 使用 Stream.of

```java
Stream<String> stream = Stream.of("A", "B", "C");
Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5);
```

### 2.3 生成无限流

```java
// iterate（迭代）
Stream<Integer> infinite = Stream.iterate(0, n -> n + 2);
infinite.limit(5).forEach(System.out::println);  // 0, 2, 4, 6, 8

// generate（生成）
Stream<Double> random = Stream.generate(Math::random);
random.limit(3).forEach(System.out::println);
```

### 2.4 范围流

```java
// 整数范围
IntStream.range(0, 5).forEach(System.out::println);  // 0-4
IntStream.rangeClosed(0, 5).forEach(System.out::println);  // 0-5
```

## 三、中间操作

### 3.1 filter（过滤）

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

// 过滤偶数
numbers.stream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);  // 2, 4, 6
```

### 3.2 map（转换）

```java
List<String> words = Arrays.asList("hello", "world");

// 转大写
words.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);  // HELLO, WORLD

// 提取长度
words.stream()
    .map(String::length)
    .forEach(System.out::println);  // 5, 5
```

### 3.3 flatMap（扁平化）

```java
List<List<Integer>> nested = Arrays.asList(
    Arrays.asList(1, 2),
    Arrays.asList(3, 4),
    Arrays.asList(5, 6)
);

// 扁平化
nested.stream()
    .flatMap(List::stream)
    .forEach(System.out::println);  // 1, 2, 3, 4, 5, 6
```

### 3.4 distinct（去重）

```java
List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3);

numbers.stream()
    .distinct()
    .forEach(System.out::println);  // 1, 2, 3
```

### 3.5 sorted（排序）

```java
List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5);

// 自然排序
numbers.stream()
    .sorted()
    .forEach(System.out::println);  // 1, 1, 3, 4, 5

// 自定义排序
numbers.stream()
    .sorted(Comparator.reverseOrder())
    .forEach(System.out::println);  // 5, 4, 3, 1, 1

// 按属性排序
list.stream()
    .sorted(Comparator.comparing(Person::getAge))
    .forEach(System.out::println);
```

### 3.6 limit 和 skip

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// 取前 3 个
numbers.stream().limit(3).forEach(System.out::println);  // 1, 2, 3

// 跳过前 2 个
numbers.stream().skip(2).forEach(System.out::println);  // 3, 4, 5

// 分页
numbers.stream().skip(2).limit(2).forEach(System.out::println);  // 3, 4
```

## 四、终端操作

### 4.1 forEach（遍历）

```java
List<String> list = Arrays.asList("A", "B", "C");
list.stream().forEach(System.out::println);
```

### 4.2 collect（收集）

```java
List<String> list = Arrays.asList("A", "B", "C");

// 收集到 List
List<String> collected = list.stream()
    .collect(Collectors.toList());

// 收集到 Set
Set<String> set = list.stream()
    .collect(Collectors.toSet());

// 收集到 Map
Map<String, Integer> map = list.stream()
    .collect(Collectors.toMap(s -> s, String::length));

// 连接字符串
String joined = list.stream()
    .collect(Collectors.joining(", "));  // "A, B, C"

// 分组
List<Person> people = Arrays.asList(
    new Person("张三", 18),
    new Person("李四", 20),
    new Person("王五", 18)
);

Map<Integer, List<Person>> byAge = people.stream()
    .collect(Collectors.groupingBy(Person::getAge));
```

### 4.3 reduce（归约）

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// 求和
Integer sum = numbers.stream()
    .reduce(0, Integer::sum);  // 15

// 求最大值
Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);  // 5

// 拼接字符串
List<String> words = Arrays.asList("Hello", " ", "World");
String result = words.stream()
    .reduce("", String::concat);  // "Hello World"
```

### 4.4 统计操作

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// 计数
long count = numbers.stream().count();

// 求和
int sum = numbers.stream().mapToInt(Integer::intValue).sum();

// 平均值
OptionalDouble avg = numbers.stream().mapToInt(Integer::intValue).average();

// 最大值
OptionalInt max = numbers.stream().mapToInt(Integer::intValue).max();

// 最小值
OptionalInt min = numbers.stream().mapToInt(Integer::intValue).min();

// 汇总统计
IntSummaryStatistics stats = numbers.stream()
    .mapToInt(Integer::intValue)
    .summaryStatistics();

System.out.println("总数：" + stats.getCount());
System.out.println("总和：" + stats.getSum());
System.out.println("平均：" + stats.getAverage());
System.out.println("最大：" + stats.getMax());
System.out.println("最小：" + stats.getMin());
```

### 4.5 匹配操作

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// 是否包含偶数
boolean anyEven = numbers.stream().anyMatch(n -> n % 2 == 0);  // true

// 是否都是偶数
boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0);  // false

// 是否都不是偶数
boolean noneEven = numbers.stream().noneMatch(n -> n % 2 == 0);  // false

// 查找第一个偶数
Optional<Integer> firstEven = numbers.stream()
    .filter(n -> n % 2 == 0)
    .findFirst();

// 查找任意一个偶数
Optional<Integer> anyEven2 = numbers.stream()
    .filter(n -> n % 2 == 0)
    .findAny();
```

## 五、并行流

### 5.1 创建并行流

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// 创建并行流
numbers.parallelStream()
    .forEach(System.out::println);

// 串行流转并行流
numbers.stream()
    .parallel()
    .forEach(System.out::println);

// 并行流转串行流
numbers.parallelStream()
    .sequential()
    .forEach(System.out::println);
```

### 5.2 性能对比

```java
List<Integer> numbers = IntStream.range(0, 1000000)
    .boxed()
    .collect(Collectors.toList());

// 串行流
long start = System.currentTimeMillis();
numbers.stream()
    .mapToInt(Integer::intValue)
    .sum();
System.out.println("串行：" + (System.currentTimeMillis() - start) + "ms");

// 并行流
start = System.currentTimeMillis();
numbers.parallelStream()
    .mapToInt(Integer::intValue)
    .sum();
System.out.println("并行：" + (System.currentTimeMillis() - start) + "ms");
```

### 5.3 注意事项

```java
// ❌ 错误：并行流中使用有状态操作
List<Integer> list = new ArrayList<>();
numbers.parallelStream()
    .forEach(list::add);  // 线程不安全

// ✅ 正确
List<Integer> list = numbers.parallelStream()
    .collect(Collectors.toList());
```

## 六、综合示例

### 6.1 数据处理

```java
List<Person> people = Arrays.asList(
    new Person("张三", 18, "北京"),
    new Person("李四", 20, "上海"),
    new Person("王五", 18, "北京"),
    new Person("赵六", 25, "上海")
);

// 筛选 18 岁以上，按城市分组
Map<String, List<Person>> byCity = people.stream()
    .filter(p -> p.getAge() >= 18)
    .collect(Collectors.groupingBy(Person::getCity));

// 获取所有名字，用逗号连接
String names = people.stream()
    .map(Person::getName)
    .collect(Collectors.joining(", "));

// 计算平均年龄
double avgAge = people.stream()
    .mapToInt(Person::getAge)
    .average()
    .orElse(0);

// 按年龄分组，统计每组人数
Map<Integer, Long> countByAge = people.stream()
    .collect(Collectors.groupingBy(
        Person::getAge,
        Collectors.counting()
    ));
```

### 6.2 订单处理

```java
List<Order> orders = Arrays.asList(
    new Order(1, "A", 100.0),
    new Order(2, "B", 200.0),
    new Order(3, "A", 150.0)
);

// 计算用户 A 的总订单金额
double totalA = orders.stream()
    .filter(o -> "A".equals(o.getUser()))
    .mapToDouble(Order::getAmount)
    .sum();

// 获取所有订单金额，排序
List<Double> amounts = orders.stream()
    .map(Order::getAmount)
    .sorted(Comparator.reverseOrder())
    .collect(Collectors.toList());

// 按用户分组，计算每个用户的总金额
Map<String, Double> totalByUser = orders.stream()
    .collect(Collectors.groupingBy(
        Order::getUser,
        Collectors.summingDouble(Order::getAmount)
    ));
```

### 6.3 文本处理

```java
String text = "Java is a programming language";

// 统计单词数
long wordCount = Arrays.stream(text.split(" "))
    .count();

// 获取所有单词，转小写，去重
List<String> uniqueWords = Arrays.stream(text.split(" "))
    .map(String::toLowerCase)
    .distinct()
    .collect(Collectors.toList());

// 获取最长的单词
String longest = Arrays.stream(text.split(" "))
    .max(Comparator.comparingInt(String::length))
    .orElse("");
```

## 七、小结

1. **创建 Stream**：集合、数组、Stream.of、generate、iterate
2. **中间操作**：filter、map、flatMap、distinct、sorted、limit、skip
3. **终端操作**：forEach、collect、reduce、统计、匹配
4. **收集器**：toList、toSet、toMap、joining、groupingBy
5. **并行流**：parallelStream，注意线程安全

---

[上一节：7.1 Lambda 表达式](./07-01-Lambda 表达式.md) | [下一节：7.3 Optional 类](./07-03-Optional 类.md)
