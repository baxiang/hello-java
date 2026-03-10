# 4.1 ArrayList 和 LinkedList

## 一、List 接口

List 是有序集合，允许重复元素，可以通过索引访问。

## 二、ArrayList

### 2.1 特点

- 基于动态数组
- 随机访问快（O(1)）
- 增删慢（需要移动元素）
- 线程不安全

### 2.2 基本使用

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();

// 添加
list.add("A");
list.add("B");
list.add("C");

// 获取
String item = list.get(0);  // "A"

// 修改
list.set(0, "X");

// 删除
list.remove(0);
list.remove("B");

// 大小
int size = list.size();

// 是否包含
boolean contains = list.contains("C");

// 清空
list.clear();
```

### 2.3 遍历

```java
List<String> list = Arrays.asList("A", "B", "C");

// 方式 1：普通 for 循环
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

// 方式 2：增强 for 循环
for (String item : list) {
    System.out.println(item);
}

// 方式 3：迭代器
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}

// 方式 4：Lambda（Java 8+）
list.forEach(System.out::println);
```

## 三、LinkedList

### 3.1 特点

- 基于双向链表
- 随机访问慢（O(n)）
- 增删快（不需要移动元素）
- 可用作栈、队列、双端队列

### 3.2 基本使用

```java
import java.util.LinkedList;

LinkedList<String> list = new LinkedList<>();

// 添加
list.add("A");
list.addFirst("First");
list.addLast("Last");

// 获取
String first = list.getFirst();
String last = list.getLast();

// 删除
list.removeFirst();
list.removeLast();

// 作为栈使用
list.push("A");  // 入栈
String pop = list.pop();  // 出栈

// 作为队列使用
list.offer("A");  // 入队
String poll = list.poll();  // 出队
```

## 四、ArrayList vs LinkedList

| 特性 | ArrayList | LinkedList |
|------|-----------|------------|
| 底层结构 | 动态数组 | 双向链表 |
| 随机访问 | O(1) 快 | O(n) 慢 |
| 头部插入/删除 | O(n) 慢 | O(1) 快 |
| 尾部插入/删除 | O(1) 快 | O(1) 快 |
| 内存占用 | 较少 | 较多（需要存储前后节点） |

## 五、小结

1. **ArrayList**：适合读多写少，随机访问
2. **LinkedList**：适合写多读少，频繁增删

---

[下一节：4.2 HashMap 和 HashSet](./04-02-HashMap 和 HashSet.md)
