# Arrays 工具类

## 一、问题引入

手动写循环排序、查找、填充？Java 已经内置了专业的数组工具类。

```java
// ❌ 手写排序，容易出错
for (int i = 0; i < nums.length - 1; i++) {
    for (int j = 0; j < nums.length - 1 - i; j++) {
        if (nums[j] > nums[j + 1]) { /* 交换 */ }
    }
}

// ✅ 一行搞定
Arrays.sort(nums);
```

> 生活类比：Arrays 就像瑞士军刀，一把工具搞定数组的排序、查找、填充、拷贝等常见操作。

## 二、核心概念

`java.util.Arrays` 是 JDK 提供的数组工具类，所有方法都是静态的，按功能分为：

| 分类 | 核心方法 |
|------|----------|
| 排序 | `sort`、`parallelSort` |
| 查找 | `binarySearch` |
| 填充 | `fill` |
| 拷贝 | `copyOf`、`copyOfRange` |
| 比较 | `equals`、`mismatch` |
| 转字符串 | `toString`、`deepToString` |

```java
import java.util.Arrays;  // 使用前先导入
```

## 三、代码对比

### 排序

```java
int[] nums = {5, 2, 8, 1, 9, 3};

// ❌ 手写冒泡排序，6 行代码
for (int i = 0; i < nums.length - 1; i++)
    for (int j = 0; j < nums.length - 1 - i; j++)
        if (nums[j] > nums[j + 1]) { /* 交换 */ }

// ✅ Arrays.sort，1 行搞定
Arrays.sort(nums);  // [1, 2, 3, 5, 8, 9]
```

### 降序排序

```java
// ❌ 基本类型不能直接降序
int[] nums = {5, 2, 8};  // Arrays.sort 无法降序

// ✅ 使用包装类 + Comparator
Integer[] nums = {5, 2, 8, 1, 9, 3};
Arrays.sort(nums, Collections.reverseOrder());
// 输出: [9, 8, 5, 3, 2, 1]
```

### 打印数组

```java
int[] nums = {1, 2, 3};

// ❌ 直接打印是内存地址
System.out.println(nums);  // [I@15db9742

// ✅ 用 toString
System.out.println(Arrays.toString(nums));  // [1, 2, 3]
```

## 四、实现方式

### 排序

```java
// 全量排序
Arrays.sort(nums);

// 部分排序（索引 1 到 4，不含 4）
Arrays.sort(nums, 1, 4);

// 对象数组排序（字符串按字典序）
String[] strs = {"banana", "apple", "cherry"};
Arrays.sort(strs);
// 输出: [apple, banana, cherry]
```

### 二分查找

```java
int[] nums = {1, 3, 5, 7, 9};  // 必须先排序！

int index = Arrays.binarySearch(nums, 5);   // 2（找到）
int index2 = Arrays.binarySearch(nums, 4);  // -3（未找到，负数）

// 范围查找
int index3 = Arrays.binarySearch(nums, 1, 4, 5);  // 在索引 1~4 范围内查找
```

### 填充

```java
int[] nums = new int[5];

Arrays.fill(nums, 10);           // 全部填充: [10, 10, 10, 10, 10]
Arrays.fill(nums, 1, 4, 99);     // 索引 1~4 填充: [10, 99, 99, 99, 10]
```

### 拷贝

```java
int[] nums = {1, 2, 3, 4, 5};

// 完整拷贝
int[] copy = Arrays.copyOf(nums, nums.length);  // [1, 2, 3, 4, 5]

// 扩容拷贝（多出位置填默认值）
int[] expanded = Arrays.copyOf(nums, 8);  // [1, 2, 3, 4, 5, 0, 0, 0]

// 范围拷贝（索引 1~4，不含 4）
int[] sub = Arrays.copyOfRange(nums, 1, 4);  // [2, 3, 4]
```

### 比较与查找差异

```java
int[] a = {1, 2, 3};
int[] b = {1, 2, 3};

Arrays.equals(a, b);    // true（内容相同）
Arrays.mismatch(a, b);  // -1（完全匹配，无差异）

int[] c = {1, 9, 3};
Arrays.equals(a, c);    // false
Arrays.mismatch(a, c);  // 1（第 1 个位置不同）
```

### 二维数组专用

```java
int[][] matrix = {{1, 2}, {3, 4}};

// ❌ toString 对二维数组无效
Arrays.toString(matrix);  // [[I@..., [I@...]

// ✅ 用 deepToString
Arrays.deepToString(matrix);  // [[1, 2], [3, 4]]
```

## 五、Q&A

**Q：`binarySearch` 返回负数是什么意思？**
A：返回负数表示未找到。插入点 = `-(返回值) - 1`。如返回 -3，说明应插入到索引 2 的位置。

**Q：`Arrays.sort` 底层用的什么算法？**
A：基本类型用双轴快速排序，对象用 TimSort。都是 O(n log n)，远优于手写冒泡的 O(n²)。

**Q：`parallelSort` 和 `sort` 有什么区别？**
A：`parallelSort` 利用多线程并行排序，大数组（>8192 元素）时性能更好，小数组区别不大。

**Q：`Arrays.asList` 返回的 List 能增删吗？**
A：不能。返回的是固定大小的 List，调用 `add`/`remove` 会抛 `UnsupportedOperationException`。

## 六、小结表格

| 方法 | 功能 | 示例 |
|------|------|------|
| `sort(arr)` | 升序排序 | `Arrays.sort(nums)` |
| `sort(arr, from, to)` | 部分排序 | `Arrays.sort(nums, 1, 4)` |
| `binarySearch(arr, key)` | 二分查找 | `Arrays.binarySearch(nums, 5)` |
| `fill(arr, val)` | 填充 | `Arrays.fill(nums, 10)` |
| `copyOf(arr, len)` | 拷贝/扩容 | `Arrays.copyOf(nums, 10)` |
| `copyOfRange(arr, from, to)` | 范围拷贝 | `Arrays.copyOfRange(nums, 1, 4)` |
| `equals(a, b)` | 内容比较 | `Arrays.equals(a, b)` |
| `mismatch(a, b)` | 首个差异位置 | `Arrays.mismatch(a, b)` |
| `toString(arr)` | 转字符串 | `Arrays.toString(nums)` |
| `deepToString(arr)` | 二维转字符串 | `Arrays.deepToString(matrix)` |
