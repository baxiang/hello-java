# HashMap

## 一、先问一个问题

**问题**：如何通过一个唯一标识快速找到对应的数据？

### 生活例子：字典

查字典时：通过"字"（key）找到"释义"（value）。HashMap 就是 Java 的字典——通过 key 快速查找 value，O(1) 时间复杂度。

## 二、HashMap 核心特性

- 基于哈希表（数组 + 链表 + 红黑树）
- key 唯一，value 可重复
- 允许一个 null key 和多个 null value
- 无序（不保证插入顺序）
- 线程不安全
- 默认容量 16，负载因子 0.75

## 三、基本操作

```java
Map<String, Integer> map = new HashMap<>();

// 添加
map.put("张三", 18);
map.put("李四", 20);
map.put("王五", 22);

// 获取
Integer age = map.get("张三");             // 18
Integer val = map.getOrDefault("赵六", 0); // 0

// 修改（put 相同 key 会覆盖）
map.put("张三", 19);

// 删除
map.remove("王五");

// 判断
boolean hasKey = map.containsKey("张三");
boolean hasVal = map.containsValue(18);
int size = map.size();
```

## 四、遍历方式

```java
Map<String, Integer> map = Map.of("A", 1, "B", 2, "C", 3);

// 1. entrySet（推荐，性能最好）
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// 2. keySet
for (String key : map.keySet()) {
    System.out.println(key + " = " + map.get(key));
}

// 3. values（只需值时）
for (Integer value : map.values()) {
    System.out.println(value);
}

// 4. Lambda
map.forEach((k, v) -> System.out.println(k + " = " + v));
```

## 五、高级方法

```java
Map<String, Integer> map = new HashMap<>();

// putIfAbsent：不存在才添加
map.putIfAbsent("A", 1);

// compute：计算新值
map.compute("A", (k, v) -> v == null ? 1 : v + 1);

// computeIfAbsent：不存在时计算
map.computeIfAbsent("B", k -> 0);

// merge：合并
map.merge("A", 1, Integer::sum);

// replace：替换
map.replace("A", 100);
map.replace("A", 1, 100);  // 只有当前值是 1 才替换
```

## 六、HashMap 原理

```
结构：数组 + 链表 + 红黑树（Java 8+）

put 流程：
1. 计算 key 的 hashCode → 定位桶位置
2. 桶为空 → 直接存入
3. 桶不为空 → 遍历链表/红黑树
   - key 相同（equals）→ 覆盖 value
   - key 不同 → 追加到链表/红黑树

树化条件：链表长度 > 8 且数组长度 > 64 → 转红黑树
退化条件：红黑树节点 < 6 → 转回链表

扩容：元素数量 > 容量 × 0.75 → 容量翻倍
```

## 七、常见疑问

**Q1：HashMap 的 key 可以是自定义对象吗？**
A：可以，但必须重写 hashCode 和 equals。否则即使内容相同，也会被视为不同的 key。

**Q2：HashMap 和 Hashtable 的区别？**
A：Hashtable 线程安全（synchronized 方法），不允许 null key/value，已过时。推荐用 HashMap + ConcurrentHashMap。

**Q3：负载因子为什么是 0.75？**
A：时间和空间的平衡。太小浪费内存，太大哈希冲突增多。0.75 是经验最优值。

## 八、小结

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| put | O(1) 均摊 | 哈希定位 + 链表/红黑树 |
| get | O(1) | 哈希定位 + 查找 |
| remove | O(1) | 哈希定位 + 删除 |
| 遍历 | O(n) | 遍历所有桶 |
