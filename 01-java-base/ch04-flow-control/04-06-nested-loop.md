# 4.6 嵌套循环

## 一、嵌套循环概述

嵌套循环是指在一个循环体内包含另一个循环。

```java
// 外层循环
for (int i = 0; i < 3; i++) {
    // 内层循环
    for (int j = 0; j < 3; j++) {
        System.out.println("i = " + i + ", j = " + j);
    }
}
```

**执行次数**：外层循环次数 × 内层循环次数

## 二、基本示例

### 2.1 双重 for 循环

```java
public class NestedFor {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.println("i = " + i + ", j = " + j);
            }
        }
        /*
        输出：
        i = 1, j = 1
        i = 1, j = 2
        i = 1, j = 3
        i = 2, j = 1
        i = 2, j = 2
        i = 2, j = 3
        i = 3, j = 1
        i = 3, j = 2
        i = 3, j = 3
        */
    }
}
```

### 2.2 执行流程分析

```java
public class FlowAnalysis {
    public static void main(String[] args) {
        int count = 0;
        
        for (int i = 1; i <= 3; i++) {
            System.out.println("外层第 " + i + " 轮");
            
            for (int j = 1; j <= 2; j++) {
                System.out.println("  内层第 " + j + " 轮");
                count++;
            }
        }
        
        System.out.println("总执行次数：" + count);  // 6
    }
}
```

## 三、打印图形

### 3.1 矩形

```java
public class Rectangle {
    public static void main(String[] args) {
        // 5 行 5 列的星号矩形
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        /*
        输出：
        * * * * * 
        * * * * * 
        * * * * * 
        * * * * * 
        * * * * * 
        */
    }
}
```

### 3.2 直角三角形

```java
public class RightTriangle {
    public static void main(String[] args) {
        // 内层循环次数随外层变化
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        /*
        输出：
        * 
        * * 
        * * * 
        * * * * 
        * * * * * 
        */
    }
}
```

### 3.3 倒直角三角形

```java
public class InverseTriangle {
    public static void main(String[] args) {
        for (int i = 5; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        /*
        输出：
        * * * * * 
        * * * * 
        * * * 
        * * 
        * 
        */
    }
}
```

### 3.4 等腰三角形

```java
public class IsoscelesTriangle {
    public static void main(String[] args) {
        int rows = 5;
        
        for (int i = 1; i <= rows; i++) {
            // 打印空格
            for (int j = 1; j <= rows - i; j++) {
                System.out.print(" ");
            }
            // 打印星号
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
        /*
        输出：
            *
           ***
          *****
         *******
        *********
        */
    }
}
```

### 3.5 菱形

```java
public class Diamond {
    public static void main(String[] args) {
        int n = 5;
        
        // 上半部分
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        // 下半部分
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
        /*
        输出：
            *
           ***
          *****
         *******
        *********
         *******
          *****
           ***
            *
        */
    }
}
```

## 四、九九乘法表

```java
public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "×" + i + "=" + (i * j) + "\t");
            }
            System.out.println();
        }
        /*
        输出：
        1×1=1	
        1×2=2	2×2=4	
        1×3=3	2×3=6	3×3=9	
        1×4=4	2×4=8	3×4=12	4×4=16	
        1×5=5	2×5=10	3×5=15	4×5=20	5×5=25	
        1×6=6	2×6=12	3×6=18	4×6=24	5×6=30	6×6=36	
        1×7=7	2×7=14	3×7=21	4×7=28	5×7=35	6×7=42	7×7=49	
        1×8=8	2×8=16	3×8=24	4×8=32	5×8=40	6×8=48	7×8=56	8×8=64	
        1×9=9	2×9=18	3×9=27	4×9=36	5×9=45	6×9=54	7×9=63	8×9=72	9×9=81	
        */
    }
}
```

## 五、三层嵌套循环

### 5.1 基本示例

```java
public class ThreeLevelLoop {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                for (int k = 1; k <= 3; k++) {
                    System.out.println("i = " + i + ", j = " + j + ", k = " + k);
                }
            }
        }
        // 总执行次数：3 × 3 × 3 = 27
    }
}
```

### 5.2 打印立方体

```java
public class Cube {
    public static void main(String[] args) {
        int size = 3;
        
        for (int i = 0; i < size; i++) {
            System.out.println("第 " + (i + 1) + " 层：");
            for (int j = 0; j < size; j++) {
                for (int k = 0; k < size; k++) {
                    System.out.print("* ");
                }
                System.out.println();
            }
            System.out.println();
        }
    }
}
```

## 六、应用场景

### 6.1 查找素数

```java
public class PrimeFinder {
    public static void main(String[] args) {
        int count = 0;
        
        outer:
        for (int i = 2; i <= 100; i++) {
            for (int j = 2; j <= Math.sqrt(i); j++) {
                if (i % j == 0) {
                    continue outer;
                }
            }
            System.out.print(i + " ");
            count++;
            if (count % 10 == 0) {
                System.out.println();
            }
        }
    }
}
```

### 6.2 冒泡排序

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {5, 3, 8, 1, 9};
        
        // 外层控制轮数
        for (int i = 0; i < arr.length - 1; i++) {
            // 内层进行相邻比较
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        
        // 输出排序结果
        for (int num : arr) {
            System.out.print(num + " ");  // 1 3 5 8 9
        }
    }
}
```

### 6.3 二维数组遍历

```java
public class Array2D {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

### 6.4 组合问题

```java
public class Combination {
    public static void main(String[] args) {
        // 1、2、3、4 能组成多少个互不相同且无重复数字的三位数
        int count = 0;
        
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 4; j++) {
                for (int k = 1; k <= 4; k++) {
                    if (i != j && i != k && j != k) {
                        System.out.println(i * 100 + j * 10 + k);
                        count++;
                    }
                }
            }
        }
        
        System.out.println("共 " + count + " 个");  // 24 个
    }
}
```

## 七、性能考虑

### 7.1 时间复杂度

```
单层循环：O(n)
双重循环：O(n²)
三层循环：O(n³)
```

### 7.2 优化建议

```java
// ❌ 低效：内层循环条件每次都计算
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr.length; j++) {
        // ...
    }
}

// ✅ 高效：提取到外部
int len = arr.length;
for (int i = 0; i < len; i++) {
    for (int j = 0; j < len; j++) {
        // ...
    }
}
```

## 八、综合示例

```java
public class NestedLoopExample {
    public static void main(String[] args) {
        // 1. 打印杨辉三角
        int rows = 10;
        int[][] triangle = new int[rows][];
        
        for (int i = 0; i < rows; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = 1;
            triangle[i][i] = 1;
            
            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
        
        // 输出
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print(triangle[i][j] + " ");
            }
            System.out.println();
        }
        
        // 2. 打印空心菱形
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                if (k == 1 || k == 2 * i - 1 || i == n) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}
```

## 九、小结

本节要点：
1. **嵌套循环**：外层控制行，内层控制列
2. **执行次数**：各层循环次数相乘
3. **常见应用**：打印图形、排序、二维数组
4. **优化**：减少不必要的计算
5. **注意**：使用标签跳出多层循环

---

[上一节：4.5 break 与 continue](./04-05-break-continue.md) | [下一章：第 5 章 数组](../ch05-array/README.md)
