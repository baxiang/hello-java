# LinkedHashMap与TreeMap

## 一、先问一个问题

**问题**：HashMap 是无序的，如何让 Map 保持插入顺序或按 key 排序？

### 生活例子：时间轴 vs 排行榜

- **LinkedHashMap** 像时间轴——按你记录的顺序排列
- **TreeMap** 像排行榜——自动按成绩（key）排序

## 二、LinkedHashMap

在 HashMap 基础上用双向链表维护插入/访问顺序：

### 2.1 按插入顺序

```java
Map<String, Integer> map = new LinkedHashMap<>();
map.put("C", 3);
map.put("A", 1);
map.put("B", 2);

// 按插入顺序遍历
for (String key : map.keySet()) {
    System.out.println(key);  // C, A, B
}
```

### 2.2 按访问顺序（LRU 缓存）

```java
// accessOrder = true：按访问顺序排列
Map<String, Integer> map = new LinkedHashMap<>(16, 0.75f, true);
map.put("A", 1);
map.put("B", 2);
map.put("C", 3);
map.get("A");  // 访问 A

// 遍历顺序变为：B, C, A（最近访问的在最后）
```

### 2.3 实现 LRU 缓存

```java
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}

LRUCache<String, Integer> cache = new LRUCache<>(3);
cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
cache.get("A");      // 访问 A
cache.put("D", 4);   // 超出容量，淘汰 B（最久未访问）
```

## 三、TreeMap

基于红黑树，按 key 自然顺序或自定义顺序排序：

### 3.1 自然排序

```java
Map<String, Integer> map = new TreeMap<>();
map.put("C", 3);
map.put("A", 1);
map.put("B", 2);

// 按 key 排序遍历
for (String key : map.keySet()) {
    System.out.println(key);  // A, B, C
}
```

### 3.2 自定义排序

```java
// 降序
Map<String, Integer> desc = new TreeMap<>(Comparator.reverseOrder());

// 按值长度排序
Map<String, Integer> byLength = new TreeMap<>(
    Comparator.comparingInt(String::length)
);
```

### 3.3 范围查询

```java
TreeMap<String, Integer> map = new TreeMap<>();
map.put("A", 1);
map.put("C", 3);
map.put("E", 5);
map.put("G", 7);

// 范围查询
map.subMap("C", "G");      // {C=3, E=5}
map.headMap("E");          // {A=1, C=3}
map.tailMap("E");          // {E=5, G=7}

// 导航方法
map.firstKey();            // "A"
map.lastKey();             // "G"
map.lowerKey("E");         // "C"
map.higherKey("E");        // "G"
map.floorKey("D");         // "C"
map.ceilingKey("D");       // "E"
```

## 四、Map 选型指南

| 需求 | 推荐 |
|------|------|
| 键值对，无需顺序 | HashMap |
| 按插入/访问顺序 | LinkedHashMap |
| 按 key 排序 | TreeMap |
| LRU 缓存 | LinkedHashMap(accessOrder=true) |
| 线程安全 | ConcurrentHashMap |

## 五、常见疑问

**Q1：LinkedHashMap 比 HashMap 慢多少？**
A：几乎无差别，链表只增加少量指针维护开销，查询仍为 O(1)。

**Q2：TreeMap 的 key 可以是 null 吗？**
A：不可以，需要比较 key 排序，null 会抛 NullPointerException。HashMap 和 LinkedHashMap 允许一个 null key。

**Q3：如何实现一个线程安全的 LRU 缓存？**
A：用 `Collections.synchronizedMap` 包装 LinkedHashMap，或使用 Caffeine/Guava Cache。

## 六、小结

| Map | 顺序 | 时间复杂度 | 适用场景 |
|-----|------|-----------|----------|
| HashMap | 无序 | O(1) | 通用 |
| LinkedHashMap | 插入/访问顺序 | O(1) | 保持顺序、LRU |
| TreeMap | key 排序 | O(log n) | 排序、范围查询 |
