# HashSet与LinkedHashSet

## 一、先问一个问题

**问题**：如何快速判断一个元素是否已经存在，并自动去重？

### 生活例子：门禁系统

公司门禁系统：
- 员工刷卡进入，系统检查工号是否已存在
- 已存在 → 拒绝重复登记
- 不存在 → 登记成功
- 不关心进入顺序，只关心"在不在"

HashSet 就是一个"门禁系统"——只关心元素是否存在，不允许重复！

## 二、HashSet 核心特性

- 基于 HashMap 实现（值存为 key，value 用固定 Object 占位）
- 元素唯一，不允许重复
- 无序（不保证插入顺序）
- 允许 null 元素
- 查找/添加/删除均为 O(1)

## 三、基本操作

```java
Set<String> set = new HashSet<>();

// 添加
set.add("A");
set.add("B");
set.add("C");
set.add("A");  // 重复，添加失败，返回 false

// 删除
set.remove("B");

// 判断
boolean has = set.contains("A");  // true
int size = set.size();
boolean empty = set.isEmpty();

// 遍历
for (String s : set) {
    System.out.println(s);
}
set.forEach(System.out::println);
```

## 四、去重原理

HashSet 依赖 `hashCode()` 和 `equals()` 判断重复：

```
添加元素流程：
1. 计算 hashCode → 定位桶位置
2. 桶为空 → 直接存入
3. 桶不为空 → equals 比较
   - 相等 → 重复，不存
   - 不相等 → 链表/红黑树存储
```

```java
class Person {
    String name;
    int age;

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person p = (Person) obj;
        return age == p.age && Objects.equals(name, p.name);
    }
}

Set<Person> set = new HashSet<>();
set.add(new Person("张三", 18));
set.add(new Person("张三", 18));  // 重复，不会添加
System.out.println(set.size());   // 1
```

## 五、集合运算

```java
Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
Set<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));

// 并集
Set<Integer> union = new HashSet<>(set1);
union.addAll(set2);         // [1, 2, 3, 4, 5, 6, 7, 8]

// 交集
Set<Integer> inter = new HashSet<>(set1);
inter.retainAll(set2);      // [4, 5]

// 差集
Set<Integer> diff = new HashSet<>(set1);
diff.removeAll(set2);       // [1, 2, 3]
```

## 六、LinkedHashSet

LinkedHashSet 在 HashSet 基础上用链表维护插入顺序：

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

| 特性 | HashSet | LinkedHashSet |
|------|---------|---------------|
| 唯一性 | 是 | 是 |
| 顺序 | 无序 | 按插入顺序 |
| 性能 | O(1) | O(1)（略慢） |
| 内存 | 较少 | 较多（链表指针） |

## 七、常见疑问

**Q1：HashSet 怎么判断两个对象相等？**
A：先比 hashCode，再比 equals。两个都相等才算重复。重写 equals 必须同时重写 hashCode。

**Q2：HashSet 允许存 null 吗？**
A：允许，最多一个 null（因为不能重复）。

**Q3：什么时候用 LinkedHashSet？**
A：需要去重且保持插入顺序时。比如：按顺序展示已选标签（不重复）。

## 八、小结

| 集合 | 特点 | 适用场景 |
|------|------|----------|
| HashSet | 唯一、无序、最快 | 通用去重 |
| LinkedHashSet | 唯一、有序 | 去重 + 保持顺序 |
