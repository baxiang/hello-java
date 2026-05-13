# TreeSet

## 一、先问一个问题

**问题**：如何让集合自动按顺序排列，并支持范围查询？

### 生活例子：自动排序的书架

普通书架（HashSet）：书放上去位置随机，找书要一本本翻。自动排序书架（TreeSet）：每放一本书，自动插到正确位置，找书时可以按范围查找。

## 二、TreeSet 核心特性

- 基于红黑树（TreeMap）实现
- 元素唯一且自动排序
- 查找/添加/删除均为 O(log n)
- 不允许 null 元素（需要比较）
- 元素必须实现 Comparable 或提供 Comparator

## 三、基本操作

```java
// 自然排序（升序）
Set<Integer> set = new TreeSet<>();
set.add(5);
set.add(1);
set.add(3);
set.add(2);
set.add(4);

// 自动排序遍历
for (Integer i : set) {
    System.out.println(i);  // 1, 2, 3, 4, 5
}

// 自定义排序（降序）
Set<Integer> desc = new TreeSet<>(Comparator.reverseOrder());
desc.addAll(Arrays.asList(5, 1, 3, 2, 4));
// 遍历结果：5, 4, 3, 2, 1
```

## 四、范围查询

TreeSet 的独特优势——高效的范围查询：

```java
TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 3, 5, 7, 9));

// 查找元素
Integer first = set.first();          // 1
Integer last = set.last();            // 9
Integer higher = set.higher(5);       // 7（大于 5 的最小值）
Integer lower = set.lower(5);         // 3（小于 5 的最大值）

// 范围查询
set.subSet(3, 7);      // [3, 5]（>=3 且 <7）
set.headSet(5);        // [1, 3]（<5）
set.tailSet(5);        // [5, 7, 9]（>=5）
```

## 五、自定义排序

```java
// 方式 1：实现 Comparable
class Student implements Comparable<Student> {
    String name;
    int score;

    @Override
    public int compareTo(Student o) {
        return Integer.compare(this.score, o.score);
    }
}

// 方式 2：传入 Comparator
Set<Student> students = new TreeSet<>(
    Comparator.comparingInt((Student s) -> s.score)
              .thenComparing(s -> s.name)
);
```

## 六、NavigableSet 导航方法

```java
TreeSet<String> set = new TreeSet<>(Arrays.asList("A", "C", "E", "G"));

// 向下导航
set.ceiling("D");   // "E"（>= "D" 的最小值）
set.floor("D");     // "C"（<= "D" 的最大值）
set.higher("C");    // "E"（> "C" 的最小值）
set.lower("C");     // "A"（< "C" 的最大值）

// 反转视图
NavigableSet<String> desc = set.descendingSet();
// [G, E, C, A]
```

## 七、常见疑问

**Q1：TreeSet 和 HashSet 怎么选？**
A：不需要排序用 HashSet（O(1) 更快），需要排序或范围查询用 TreeSet（O(log n)）。

**Q2：TreeSet 为什么不能存 null？**
A：插入元素时需要调用 compareTo 比较，null 比较会抛 NullPointerException。

**Q3：添加元素时抛 ClassCastException？**
A：元素没有实现 Comparable，且 TreeSet 没有提供 Comparator。两者至少提供其一。

## 八、小结

| 方法 | 说明 |
|------|------|
| first()/last() | 首尾元素 |
| higher(e)/lower(e) | 大于/小于 e 的最近元素 |
| subSet(from, to) | 范围查询 [from, to) |
| headSet(e)/tailSet(e) | < e / >= e 的子集 |
| descendingSet() | 反转视图 |
