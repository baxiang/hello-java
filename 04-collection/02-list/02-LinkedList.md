# LinkedList

## 一、先问一个问题

**问题**：ArrayList 在中间插入删除要移动大量元素，有没有增删更快的集合？

### 生活例子：手拉手排队

想象一队人手拉手：
- **ArrayList 像排座位**——中间插入一个人，后面所有人都要往后挪
- **LinkedList 像手拉手**——中间插入一个人，只需断开两人牵手，让新人和两边牵手即可

## 二、LinkedList 核心特性

- 基于双向链表
- 随机访问 O(n)，头部增删 O(1)，中间增删 O(n)（需先遍历到位置）
- 同时实现 List 和 Deque 接口，可当栈、队列、双端队列使用
- 线程不安全

```
节点结构：
prev ← [item] → next

链表结构：
null ← [A] ⇄ [B] ⇄ [C] → null
```

## 三、List 操作

```java
LinkedList<String> list = new LinkedList<>();

// 添加
list.add("B");          // 尾部添加
list.addFirst("A");     // 头部添加
list.addLast("C");      // 尾部添加

// 获取
String first = list.getFirst();   // "A"
String last = list.getLast();     // "C"
String item = list.get(1);       // "B"（需遍历，O(n)）

// 删除
list.removeFirst();     // 删除头部
list.removeLast();      // 删除尾部
list.remove("B");       // 删除指定元素
```

## 四、栈操作（后进先出 LIFO）

```java
LinkedList<String> stack = new LinkedList<>();

// 入栈
stack.push("A");
stack.push("B");
stack.push("C");

// 查看栈顶
String top = stack.peek();  // "C"

// 出栈
String pop = stack.pop();   // "C"
// 栈内剩余：[A, B]
```

## 五、队列操作（先进先出 FIFO）

```java
LinkedList<String> queue = new LinkedList<>();

// 入队
queue.offer("A");
queue.offer("B");
queue.offer("C");

// 查看队首
String head = queue.peek();  // "A"

// 出队
String out = queue.poll();   // "A"
// 队列剩余：[B, C]
```

## 六、ArrayList vs LinkedList

| 特性 | ArrayList | LinkedList |
|------|-----------|------------|
| 底层结构 | 动态数组 | 双向链表 |
| 随机访问 | O(1) 快 | O(n) 慢 |
| 头部插入/删除 | O(n) | O(1) |
| 尾部插入/删除 | O(1) 均摊 | O(1) |
| 内存占用 | 较少 | 较多（存前后指针） |
| 缓存友好 | 是 | 否 |

> **实践建议**：90% 的场景用 ArrayList。只有频繁在头部增删时才考虑 LinkedList。

## 七、常见疑问

**Q1：LinkedList 什么时候比 ArrayList 快？**
A：只在已知节点位置时的增删操作（如头尾操作）。但随机位置的增删仍需 O(n) 遍历，不比 ArrayList 快。

**Q2：为什么很少用 LinkedList？**
A：现代 CPU 缓存对连续内存（数组）更友好，ArrayList 的实际性能通常优于 LinkedList，即使理论复杂度更高。

**Q3：用什么代替 LinkedList 做队列？**
A：推荐 `ArrayDeque`，基于循环数组，既可做栈也可做队列，性能优于 LinkedList。

## 八、小结

| 用途 | 方法 | 说明 |
|------|------|------|
| 列表 | add/get/remove | 实现 List 接口 |
| 栈 | push/pop/peek | 后进先出 |
| 队列 | offer/poll/peek | 先进先出 |
| 双端队列 | addFirst/addLast/removeFirst/removeLast | 两端操作 |
