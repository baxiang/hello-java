# 5.5 Arrays 工具类

## 一、Arrays 类概述

`java.util.Arrays` 是 Java 提供的数组工具类，包含丰富的静态方法用于数组操作。

```java
import java.util.Arrays;
```

## 二、排序方法

### 2.1 sort 基本排序

```java
import java.util.Arrays;

public class SortDemo {
    public static void main(String[] args) {
        int[] nums = {5, 2, 8, 1, 9, 3};
        
        // 升序排序
        Arrays.sort(nums);
        
        System.out.println(Arrays.toString(nums));  // [1, 2, 3, 5, 8, 9]
    }
}
```

### 2.2 sort 部分排序

```java
import java.util.Arrays;

public class PartialSort {
    public static void main(String[] args) {
        int[] nums = {5, 2, 8, 1, 9, 3};
        
        // 排序索引 1 到 4（不包含 4）
        Arrays.sort(nums, 1, 4);
        
        System.out.println(Arrays.toString(nums));  // [5, 1, 2, 8, 9, 3]
    }
}
```

### 2.3 sort 对象数组

```java
import java.util.Arrays;

public class SortObjects {
    public static void main(String[] args) {
        String[] strs = {"banana", "apple", "cherry"};
        
        // 字符串按字典序排序
        Arrays.sort(strs);
        
        System.out.println(Arrays.toString(strs));  // [apple, banana, cherry]
    }
}
```

## 三、查找方法

### 3.1 binarySearch 二分查找

```java
import java.util.Arrays;

public class BinarySearchDemo {
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9};
        
        // 查找存在的元素
        int index1 = Arrays.binarySearch(nums, 5);
        System.out.println("索引：" + index1);  // 2
        
        // 查找不存在的元素
        int index2 = Arrays.binarySearch(nums, 4);
        System.out.println("索引：" + index2);  // 负数
        
        // 查找不存在的元素，返回插入点的负值
        // 插入点 = -index - 1
        int insertPos = -index2 - 1;
        System.out.println("应插入位置：" + insertPos);  // 2
    }
}
```

### 3.2 binarySearch 范围查找

```java
import java.util.Arrays;

public class RangeBinarySearch {
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9, 11, 13};
        
        // 在索引 2 到 5 范围内查找
        int index = Arrays.binarySearch(nums, 2, 5, 7);
        System.out.println("索引：" + index);  // 3
    }
}
```

## 四、填充方法

### 4.1 fill 填充整个数组

```java
import java.util.Arrays;

public class FillDemo {
    public static void main(String[] args) {
        int[] nums = new int[5];
        
        // 填充为 10
        Arrays.fill(nums, 10);
        
        System.out.println(Arrays.toString(nums));  // [10, 10, 10, 10, 10]
    }
}
```

### 4.2 fill 部分填充

```java
import java.util.Arrays;

public class PartialFill {
    public static void main(String[] args) {
        int[] nums = new int[10];
        
        // 填充索引 2 到 6（不包含 6）
        Arrays.fill(nums, 2, 6, 99);
        
        System.out.println(Arrays.toString(nums));  // [0, 0, 99, 99, 99, 99, 0, 0, 0, 0]
    }
}
```

## 五、拷贝方法

### 5.1 copyOf 拷贝

```java
import java.util.Arrays;

public class CopyOfDemo {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        
        // 完整拷贝
        int[] copy1 = Arrays.copyOf(nums, nums.length);
        System.out.println(Arrays.toString(copy1));  // [1, 2, 3, 4, 5]
        
        // 扩容拷贝
        int[] copy2 = Arrays.copyOf(nums, 10);
        System.out.println(Arrays.toString(copy2));  // [1, 2, 3, 4, 5, 0, 0, 0, 0, 0]
        
        // 缩容拷贝
        int[] copy3 = Arrays.copyOf(nums, 3);
        System.out.println(Arrays.toString(copy3));  // [1, 2, 3]
    }
}
```

### 5.2 copyOfRange 范围拷贝

```java
import java.util.Arrays;

public class CopyOfRangeDemo {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        
        // 拷贝索引 1 到 4（不包含 4）
        int[] sub = Arrays.copyOfRange(nums, 1, 4);
        
        System.out.println(Arrays.toString(sub));  // [2, 3, 4]
    }
}
```

## 六、比较方法

### 6.1 equals 比较

```java
import java.util.Arrays;

public class EqualsDemo {
    public static void main(String[] args) {
        int[] nums1 = {1, 2, 3};
        int[] nums2 = {1, 2, 3};
        int[] nums3 = {1, 2, 4};
        
        // 比较数组内容
        System.out.println(Arrays.equals(nums1, nums2));  // true
        System.out.println(Arrays.equals(nums1, nums3));  // false
        
        // == 比较的是引用
        System.out.println(nums1 == nums2);  // false
    }
}
```

### 6.2 mismatch 查找不匹配位置

```java
import java.util.Arrays;

public class MismatchDemo {
    public static void main(String[] args) {
        int[] nums1 = {1, 2, 3, 4, 5};
        int[] nums2 = {1, 2, 9, 4, 5};
        
        // 查找第一个不匹配的位置
        int index = Arrays.mismatch(nums1, nums2);
        System.out.println("不匹配位置：" + index);  // 2
    }
}
```

## 七、转字符串方法

### 7.1 toString 转字符串

```java
import java.util.Arrays;

public class ToStringDemo {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        
        // 转字符串
        String str = Arrays.toString(nums);
        System.out.println(str);  // [1, 2, 3, 4, 5]
        System.out.println(str.getClass());  // class java.lang.String
    }
}
```

### 7.2 deepToString 二维数组转字符串

```java
import java.util.Arrays;

public class DeepToStringDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        // 二维数组用 deepToString
        String str = Arrays.deepToString(matrix);
        System.out.println(str);  // [[1, 2, 3], [4, 5, 6]]
    }
}
```

## 八、其他方法

### 8.1 asList 数组转列表

```java
import java.util.Arrays;
import java.util.List;

public class AsListDemo {
    public static void main(String[] args) {
        // 数组转列表
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(list);  // [1, 2, 3, 4, 5]
        
        // 注意：返回的列表不能修改大小
        // list.add(6);  // UnsupportedOperationException
    }
}
```

### 8.2 parallelSort 并行排序

```java
import java.util.Arrays;

public class ParallelSort {
    public static void main(String[] args) {
        int[] nums = {5, 2, 8, 1, 9, 3};
        
        // 并行排序（适合大数组）
        Arrays.parallelSort(nums);
        
        System.out.println(Arrays.toString(nums));  // [1, 2, 3, 5, 8, 9]
    }
}
```

### 8.3 setAll 设置元素

```java
import java.util.Arrays;

public class SetAllDemo {
    public static void main(String[] args) {
        int[] nums = new int[5];
        
        // 设置每个元素为索引的平方
        Arrays.setAll(nums, i -> i * i);
        
        System.out.println(Arrays.toString(nums));  // [0, 1, 4, 9, 16]
    }
}
```

## 九、综合示例

```java
import java.util.Arrays;

public class ArraysExample {
    public static void main(String[] args) {
        // 1. 创建数组
        int[] nums = {5, 3, 8, 1, 9, 2};
        System.out.println("原始：" + Arrays.toString(nums));
        
        // 2. 排序
        Arrays.sort(nums);
        System.out.println("排序：" + Arrays.toString(nums));
        
        // 3. 查找
        int index = Arrays.binarySearch(nums, 8);
        System.out.println("8 的索引：" + index);
        
        // 4. 拷贝并扩容
        int[] copy = Arrays.copyOf(nums, 10);
        System.out.println("扩容：" + Arrays.toString(copy));
        
        // 5. 填充
        Arrays.fill(copy, nums.length, copy.length, 0);
        System.out.println("填充：" + Arrays.toString(copy));
        
        // 6. 比较
        int[] nums2 = {1, 2, 3, 5, 8, 9};
        System.out.println("相等：" + Arrays.equals(nums, nums2));
        
        // 7. 范围拷贝
        int[] sub = Arrays.copyOfRange(nums, 1, 4);
        System.out.println("子数组：" + Arrays.toString(sub));
        
        // 8. 并行排序
        int[] large = {9, 7, 5, 3, 1, 8, 6, 4, 2};
        Arrays.parallelSort(large);
        System.out.println("并行排序：" + Arrays.toString(large));
    }
}
```

## 十、方法速查表

| 方法 | 说明 | 示例 |
|------|------|------|
| `sort()` | 排序 | `Arrays.sort(arr)` |
| `binarySearch()` | 二分查找 | `Arrays.binarySearch(arr, key)` |
| `fill()` | 填充 | `Arrays.fill(arr, value)` |
| `copyOf()` | 拷贝 | `Arrays.copyOf(arr, newLen)` |
| `copyOfRange()` | 范围拷贝 | `Arrays.copyOfRange(arr, from, to)` |
| `equals()` | 比较 | `Arrays.equals(arr1, arr2)` |
| `toString()` | 转字符串 | `Arrays.toString(arr)` |
| `deepToString()` | 二维转字符串 | `Arrays.deepToString(arr)` |
| `asList()` | 数组转列表 | `Arrays.asList(1,2,3)` |
| `parallelSort()` | 并行排序 | `Arrays.parallelSort(arr)` |

## 十一、小结

本节要点：
1. **排序**：`sort()`、`parallelSort()`
2. **查找**：`binarySearch()`
3. **填充**：`fill()`
4. **拷贝**：`copyOf()`、`copyOfRange()`
5. **比较**：`equals()`、`mismatch()`
6. **转字符串**：`toString()`、`deepToString()`
7. **转列表**：`asList()`

---

[上一节：5.4 二维数组](./05-04-二维数组.md) | [下一节：5.6 数组常见算法](./05-06-数组常见算法.md)
