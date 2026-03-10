# 4.2 HashMap 和 HashSet

## 一、Map 接口

Map 是键值对集合，键唯一，值可重复。

**常用实现类**：
- HashMap：基于哈希表，无序
- LinkedHashMap：基于哈希表 + 链表，有序
- TreeMap：基于红黑树，按 key 排序
- Hashtable：线程安全（不推荐）

## 二、HashMap

### 2.1 特点

- 基于哈希表实现
- 允许 null 键和 null 值
- 无序（不保证插入顺序）
- 线程不安全
- 初始容量 16，负载因子 0.75

### 2.2 基本使用

```java
import java.util.HashMap;
import java.util.Map;

// 创建
Map<String, Integer> map = new HashMap<>();

// 添加
map.put("张三", 18);
map.put("李四", 20);
map.put("王五", 22);

// 获取
Integer age = map.get("张三");  // 18

// 获取或默认值
Integer value = map.getOrDefault("赵六", 0);  // 0

// 修改
map.put("张三", 19);

// 删除
map.remove("王五");

// 是否包含
boolean hasKey = map.containsKey("张三");
boolean hasValue = map.containsValue(18);

// 大小
int size = map.size();

// 清空
map.clear();
```

### 2.3 遍历

```java
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("B", 2);
map.put("C", 3);

// 方式 1：keySet 遍历 key
for (String key : map.keySet()) {
    System.out.println(key + " = " + map.get(key));
}

// 方式 2：entrySet 遍历键值对（推荐）
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// 方式 3：values 遍历值
for (Integer value : map.values()) {
    System.out.println(value);
}

// 方式 4：Lambda（Java 8+）
map.forEach((k, v) -> System.out.println(k + " = " + v));
```

### 2.4 常用方法

```java
Map<String, Integer> map = new HashMap<>();

// putIfAbsent：不存在才添加
map.putIfAbsent("A", 1);

// compute：计算新值
map.compute("A", (k, v) -> v == null ? 1 : v + 1);

// computeIfAbsent：不存在时计算
map.computeIfAbsent("B", k -> 0);

// computeIfPresent：存在时计算
map.computeIfPresent("A", (k, v) -> v + 1);

// merge：合并
map.merge("A", 1, Integer::sum);

// replace：替换
map.replace("A", 100);
map.replace("A", 1, 100);  // 只有当前值是 1 才替换

// getOrDefault：获取或默认值
Integer value = map.getOrDefault("X", 0);
```

### 2.5 HashMap 原理

```
HashMap 结构：
- 数组 + 链表 + 红黑树（Java 8+）
- 当链表长度 > 8 且数组长度 > 64 时，链表转红黑树
- 当红黑树节点 < 6 时，转回链表

哈希冲突解决：
- 链地址法（拉链法）
- 相同 hash 的元素放在同一位置的链表中

扩容机制：
- 当元素数量 > 容量 * 负载因子 时扩容
- 扩容为原来的 2 倍
- 重新计算 hash 并分配位置
```

## 三、HashSet

### 3.1 特点

- 基于 HashMap 实现
- 元素唯一，不允许重复
- 允许 null 元素
- 无序
- 线程不安全

### 3.2 基本使用

```java
import java.util.HashSet;
import java.util.Set;

// 创建
Set<String> set = new HashSet<>();

// 添加
set.add("A");
set.add("B");
set.add("C");
set.add("A");  // 重复，添加失败

// 删除
set.remove("B");

// 是否包含
boolean contains = set.contains("A");

// 大小
int size = set.size();

// 清空
set.clear();

// 遍历
for (String s : set) {
    System.out.println(s);
}
```

### 3.3 集合运算

```java
Set<Integer> set1 = new HashSet<>();
set1.addAll(Arrays.asList(1, 2, 3, 4, 5));

Set<Integer> set2 = new HashSet<>();
set2.addAll(Arrays.asList(4, 5, 6, 7, 8));

// 并集
Set<Integer> union = new HashSet<>(set1);
union.addAll(set2);  // [1, 2, 3, 4, 5, 6, 7, 8]

// 交集
Set<Integer> intersection = new HashSet<>(set1);
intersection.retainAll(set2);  // [4, 5]

// 差集
Set<Integer> difference = new HashSet<>(set1);
difference.removeAll(set2);  // [1, 2, 3]
```

### 3.4 去重原理

```java
// HashSet 去重依赖 hashCode() 和 equals()

class Person {
    String name;
    int age;
    
    // 必须重写 hashCode 和 equals
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
}

Set<Person> set = new HashSet<>();
set.add(new Person("张三", 18));
set.add(new Person("张三", 18));  // 重复，不会添加
System.out.println(set.size());  // 1
```

## 四、LinkedHashMap 和 LinkedHashSet

### 4.1 LinkedHashMap（按插入顺序）

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

### 4.2 LinkedHashMap（按访问顺序 - LRU 缓存）

```java
// LRU 缓存实现
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);  // accessOrder = true
        this.capacity = capacity;
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;  // 超出容量时删除最旧的
    }
}

// 使用
LRUCache<String, Integer> cache = new LRUCache<>(3);
cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
cache.get("A");  // 访问 A
cache.put("D", 4);  // 超出容量，删除 B（最久未访问）
```

### 4.3 LinkedHashSet

```java
Set<String> set = new LinkedHashSet<>();
set.add("C");
set.add("A");
set.add("B");

// 按插入顺序遍历
for (String s : set) {
    System.out.println(s);  // C, A, B
}
```

## 五、TreeMap 和 TreeSet

### 5.1 TreeMap（按 key 排序）

```java
// 自然排序
Map<String, Integer> map = new TreeMap<>();
map.put("C", 3);
map.put("A", 1);
map.put("B", 2);

// 按 key 排序遍历
for (String key : map.keySet()) {
    System.out.println(key);  // A, B, C
}

// 自定义排序（降序）
Map<String, Integer> map2 = new TreeMap<>(Comparator.reverseOrder());
```

### 5.2 TreeSet（按元素排序）

```java
// 自然排序
Set<Integer> set = new TreeSet<>();
set.add(3);
set.add(1);
set.add(2);

// 排序遍历
for (Integer i : set) {
    System.out.println(i);  // 1, 2, 3
}

// 自定义排序（降序）
Set<Integer> set2 = new TreeSet<>(Comparator.reverseOrder());

// 范围查询
TreeSet<Integer> treeSet = new TreeSet<>(Arrays.asList(1, 2, 3, 4, 5));
System.out.println(treeSet.subSet(2, 5));  // [2, 3, 4]
System.out.println(treeSet.headSet(3));    // [1, 2]
System.out.println(treeSet.tailSet(3));    // [3, 4, 5]
```

## 六、集合选择指南

| 需求 | 推荐集合 |
|------|----------|
| 键值对，无序 | HashMap |
| 键值对，按插入顺序 | LinkedHashMap |
| 键值对，按 key 排序 | TreeMap |
| 唯一元素，无序 | HashSet |
| 唯一元素，按插入顺序 | LinkedHashSet |
| 唯一元素，排序 | TreeSet |
| 线程安全 | ConcurrentHashMap / Collections.synchronizedMap |

## 七、综合示例

```java
public class MapExample {
    public static void main(String[] args) {
        // 1. HashMap 统计词频
        String text = "hello world hello java";
        Map<String, Integer> wordCount = new HashMap<>();
        
        for (String word : text.split(" ")) {
            wordCount.merge(word, 1, Integer::sum);
        }
        System.out.println("词频：" + wordCount);
        
        // 2. LinkedHashMap 保持插入顺序
        Map<String, Integer> linkedMap = new LinkedHashMap<>();
        linkedMap.put("C", 3);
        linkedMap.put("A", 1);
        linkedMap.put("B", 2);
        System.out.println("插入顺序：" + linkedMap.keySet());
        
        // 3. TreeMap 排序
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("C", 3);
        treeMap.put("A", 1);
        treeMap.put("B", 2);
        System.out.println("排序后：" + treeMap.keySet());
        
        // 4. HashSet 去重
        List<String> list = Arrays.asList("A", "B", "A", "C", "B");
        Set<String> unique = new HashSet<>(list);
        System.out.println("去重后：" + unique);
        
        // 5. 集合运算
        Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(3, 4, 5, 6));
        
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("并集：" + union);
        
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("交集：" + intersection);
    }
}
```

## 八、小结

1. **HashMap**：键值对，无序，高效
2. **HashSet**：唯一元素，基于 HashMap
3. **LinkedHashMap/Set**：保持插入顺序
4. **TreeMap/Set**：按顺序排序
5. **选择**：根据需求选择合适的实现

---

[上一节：4.1 ArrayList 和 LinkedList](./04-01-ArrayList 和 LinkedList.md) | [下一节：4.3 Collections 工具类](./04-03-Collections 工具类.md)
