# ArrayList

## 一、先问一个问题

**问题**：数组的长度固定，如何实现一个能自动扩容的"动态数组"？

### 生活例子：可伸缩的书架

普通数组像一个固定书架——只能放 10 本书，满了就放不下。ArrayList 像一个可伸缩书架——书满了自动加长，永远装得下。

## 二、ArrayList 核心特性

- 基于动态数组，默认初始容量 10
- 随机访问 O(1)，尾部增删 O(1)，中间增删 O(n)
- 线程不安全（单线程首选）
- 自动扩容为原来的 1.5 倍

## 三、基本操作

```java
List<String> list = new ArrayList<>();

// 添加
list.add("A");
list.add("B");
list.add("C");
list.add(1, "X");  // 在索引 1 处插入

// 获取
String item = list.get(0);  // "A"

// 修改
list.set(0, "Y");

// 删除
list.remove(0);       // 按索引删
list.remove("B");     // 按元素删（删除第一个匹配）

// 判断
int size = list.size();
boolean has = list.contains("C");
boolean empty = list.isEmpty();
```

## 四、遍历方式

```java
List<String> list = Arrays.asList("A", "B", "C");

// 1. 普通 for（需要索引时使用）
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

// 2. 增强 for（最常用）
for (String item : list) {
    System.out.println(item);
}

// 3. 迭代器（需要删除元素时使用）
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("B")) it.remove();  // 安全删除
}

// 4. Lambda（Java 8+，最简洁）
list.forEach(System.out::println);
```

## 五、扩容原理

```
初始：容量 10，元素 [A, B, C]
添加第 11 个元素时：
  1. 创建新数组（容量 = 10 * 1.5 = 15）
  2. 复制旧数组到新数组
  3. 添加新元素
  4. 旧数组被 GC 回收
```

```java
// 指定初始容量（避免频繁扩容）
List<String> list = new ArrayList<>(100);

// 批量添加后 trimToSize（节省内存）
list.trimToSize();
```

## 六、常见疑问

**Q1：ArrayList 和 Arrays.asList 有什么区别？**
A：`Arrays.asList` 返回的列表是固定大小的，不能 add/remove，但可以 set。需要可变列表用 `new ArrayList<>(Arrays.asList(...))`。

**Q2：subList 返回的是什么？**
A：返回原列表的视图，修改视图会影响原列表。如需独立列表：`new ArrayList<>(list.subList(0, 3))`。

**Q3：遍历时删除元素为什么报 ConcurrentModificationException？**
A：for-each 内部使用迭代器，直接调用 list.remove() 会导致迭代器状态不一致。应使用迭代器的 remove() 方法。

## 七、小结

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| get(index) | O(1) | 数组直接访问 |
| add(element) | O(1) 均摊 | 尾部添加 |
| add(index, element) | O(n) | 需要移动元素 |
| remove(index) | O(n) | 需要移动元素 |
| contains(element) | O(n) | 遍历查找 |
