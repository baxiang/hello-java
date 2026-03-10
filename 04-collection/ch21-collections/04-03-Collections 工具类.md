# 4.3 Collections 工具类

## 一、Collections 类概述

Collections 是集合工具类，提供了一系列静态方法用于操作集合。

**主要功能**：
- 排序
- 查找
- 同步（线程安全）
- 不可变集合

## 二、排序操作

### 2.1 sort 排序

```java
import java.util.*;

List<Integer> list = Arrays.asList(5, 2, 8, 1, 9);
Collections.sort(list);
System.out.println(list);  // [1, 2, 5, 8, 9]

// 自定义排序（降序）
Collections.sort(list, Comparator.reverseOrder());
System.out.println(list);  // [9, 8, 5, 2, 1]

// 自定义比较器
List<String> names = Arrays.asList("Bob", "Alice", "Charlie");
Collections.sort(names, (a, b) -> b.compareTo(a));  // 按长度降序
```

### 2.2 shuffle 随机打乱

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
Collections.shuffle(list);
System.out.println(list);  // 随机顺序
```

### 2.3 reverse 反转

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
Collections.reverse(list);
System.out.println(list);  // [5, 4, 3, 2, 1]
```

### 2.4 rotate 旋转

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
Collections.rotate(list, 2);  // 向右旋转 2 位
System.out.println(list);  // [4, 5, 1, 2, 3]

Collections.rotate(list, -2);  // 向左旋转 2 位
System.out.println(list);  // [1, 2, 3, 4, 5]
```

### 2.5 swap 交换

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
Collections.swap(list, 0, 4);  // 交换索引 0 和 4
System.out.println(list);  // [5, 2, 3, 4, 1]
```

## 三、查找操作

### 3.1 binarySearch 二分查找

```java
// 列表必须已排序
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

// 查找存在的元素
int index = Collections.binarySearch(list, 3);
System.out.println(index);  // 2

// 查找不存在的元素
int index2 = Collections.binarySearch(list, 6);
System.out.println(index2);  // -6（负数表示插入点）

// 自定义比较器
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
int index3 = Collections.binarySearch(names, "Bob", String::compareTo);
```

### 3.2 max 和 min

```java
List<Integer> list = Arrays.asList(5, 2, 8, 1, 9);

Integer max = Collections.max(list);
System.out.println(max);  // 9

Integer min = Collections.min(list);
System.out.println(min);  // 1

// 自定义比较器
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
String longest = Collections.max(names, Comparator.comparingInt(String::length));
System.out.println(longest);  // "Charlie"
```

### 3.3 frequency 统计频率

```java
List<String> list = Arrays.asList("A", "B", "A", "C", "A");
int count = Collections.frequency(list, "A");
System.out.println(count);  // 3
```

### 3.4 disjoint 判断是否不相交

```java
List<Integer> list1 = Arrays.asList(1, 2, 3);
List<Integer> list2 = Arrays.asList(4, 5, 6);
List<Integer> list3 = Arrays.asList(3, 4, 5);

boolean disjoint1 = Collections.disjoint(list1, list2);  // true
boolean disjoint2 = Collections.disjoint(list1, list3);  // false
```

## 四、填充和替换

### 4.1 fill 填充

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
Collections.fill(list, 0);
System.out.println(list);  // [0, 0, 0, 0, 0]
```

### 4.2 copy 复制

```java
List<Integer> src = Arrays.asList(1, 2, 3);
List<Integer> dest = new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0));

Collections.copy(dest, src);
System.out.println(dest);  // [1, 2, 3, 0, 0]
```

### 4.3 replaceAll 替换

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "A", "C"));
Collections.replaceAll(list, "A", "X");
System.out.println(list);  // [X, B, X, C]
```

### 4.4 replace 替换指定元素

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
Collections.replace(list, "B", "X");
System.out.println(list);  // [A, X, C]
```

## 五、同步集合

### 5.1 synchronizedList

```java
List<String> list = Collections.synchronizedList(new ArrayList<>());

// 遍历时需要手动同步
synchronized (list) {
    for (String s : list) {
        System.out.println(s);
    }
}
```

### 5.2 synchronizedMap

```java
Map<String, Integer> map = Collections.synchronizedMap(new HashMap<>());

// 遍历时需要手动同步
synchronized (map) {
    for (String key : map.keySet()) {
        System.out.println(key);
    }
}
```

### 5.3 synchronizedSet

```java
Set<String> set = Collections.synchronizedSet(new HashSet<>());
```

## 六、不可变集合

### 6.1 unmodifiableList

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
List<String> unmodifiable = Collections.unmodifiableList(list);

// unmodifiable.add("D");  // UnsupportedOperationException
```

### 6.2 unmodifiableMap

```java
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("B", 2);

Map<String, Integer> unmodifiable = Collections.unmodifiableMap(map);

// unmodifiable.put("C", 3);  // UnsupportedOperationException
```

### 6.3 unmodifiableSet

```java
Set<String> set = new HashSet<>(Arrays.asList("A", "B", "C"));
Set<String> unmodifiable = Collections.unmodifiableSet(set);
```

## 七、其他工具方法

### 7.1 empty 系列

```java
// 空列表
List<String> emptyList = Collections.emptyList();

// 空 Map
Map<String, Integer> emptyMap = Collections.emptyMap();

// 空 Set
Set<String> emptySet = Collections.emptySet();

// 等价于
// Collections.emptyList() == new ArrayList<>(0)
// 但 emptyList() 更高效（复用空实例）
```

### 7.2 singleton 系列

```java
// 单元素列表
List<String> singleList = Collections.singletonList("A");

// 单元素 Map
Map<String, Integer> singleMap = Collections.singletonMap("A", 1);

// 单元素 Set
Set<String> singleSet = Collections.singleton("A");
```

### 7.3 nCopies 创建重复元素列表

```java
List<String> list = Collections.nCopies(5, "A");
System.out.println(list);  // [A, A, A, A, A]

// 初始化固定大小列表
List<Integer> numbers = new ArrayList<>(Collections.nCopies(10, 0));
```

### 7.4 addAll 批量添加

```java
List<String> list = new ArrayList<>();
Collections.addAll(list, "A", "B", "C");
System.out.println(list);  // [A, B, C]
```

## 八、综合示例

```java
public class CollectionsExample {
    public static void main(String[] args) {
        // 1. 排序
        List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        Collections.sort(list);
        System.out.println("排序：" + list);
        
        // 2. 二分查找
        int index = Collections.binarySearch(list, 8);
        System.out.println("8 的索引：" + index);
        
        // 3. 最大值最小值
        System.out.println("最大值：" + Collections.max(list));
        System.out.println("最小值：" + Collections.min(list));
        
        // 4. 反转
        Collections.reverse(list);
        System.out.println("反转：" + list);
        
        // 5. 随机打乱
        Collections.shuffle(list);
        System.out.println("打乱：" + list);
        
        // 6. 频率统计
        List<String> words = Arrays.asList("hello", "world", "hello");
        int count = Collections.frequency(words, "hello");
        System.out.println("hello 出现次数：" + count);
        
        // 7. 不可变集合
        List<String> immutable = Collections.unmodifiableList(
            new ArrayList<>(Arrays.asList("A", "B", "C"))
        );
        
        // 8. 空集合
        List<String> empty = Collections.emptyList();
        System.out.println("空集合大小：" + empty.size());
        
        // 9. 单元素集合
        Map<String, Integer> single = Collections.singletonMap("key", 1);
        System.out.println("单元素 Map：" + single);
        
        // 10. 同步集合
        List<String> syncList = Collections.synchronizedList(new ArrayList<>());
        syncList.add("A");
        syncList.add("B");
    }
}
```

## 九、Java 9+ 不可变集合

```java
// Java 9+ 更简洁的不可变集合
List<String> list = List.of("A", "B", "C");
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("A", 1, "B", 2, "C", 3);

// 注意：这些集合完全不可变，连 null 都不允许
```

## 十、小结

1. **排序**：sort、shuffle、reverse、rotate
2. **查找**：binarySearch、max、min、frequency
3. **填充替换**：fill、copy、replaceAll
4. **同步**：synchronizedList、synchronizedMap
5. **不可变**：unmodifiableList、emptyList、singletonList
6. **Java 9+**：List.of、Set.of、Map.of

---

[上一节：4.2 HashMap 和 HashSet](./04-02-HashMap 和 HashSet.md) | [下一节：4.4 泛型进阶](./04-04-泛型进阶.md)
