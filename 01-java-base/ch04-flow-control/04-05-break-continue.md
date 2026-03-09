# 4.5 break 与 continue

## 一、break 语句

### 1.1 基本用法

break 用于跳出循环或 switch 语句。

```java
// 在循环中
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // 跳出循环
    }
    System.out.println(i);  // 输出 0-4
}
```

### 1.2 在 for 循环中

```java
public class BreakFor {
    public static void main(String[] args) {
        // 找到第一个能被 7 整除的数
        for (int i = 1; i <= 100; i++) {
            if (i % 7 == 0) {
                System.out.println("找到：" + i);  // 7
                break;
            }
        }
    }
}
```

### 1.3 在 while 循环中

```java
public class BreakWhile {
    public static void main(String[] args) {
        int sum = 0;
        int i = 1;
        
        while (true) {
            sum += i;
            if (sum > 100) {
                break;
            }
            i++;
        }
        
        System.out.println("累加和超过 100，i = " + i);
    }
}
```

### 1.4 在 switch 中

```java
public class BreakSwitch {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("星期一");
                break;  // 跳出 switch
            case 2:
                System.out.println("星期二");
                break;
            case 3:
                System.out.println("星期三");
                break;
            default:
                System.out.println("其他");
        }
    }
}
```

## 二、continue 语句

### 2.1 基本用法

continue 用于跳过本次循环，继续下一次循环。

```java
// 跳过偶数，只打印奇数
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过本次循环
    }
    System.out.println(i);  // 输出 1,3,5,7,9
}
```

### 2.2 在 for 循环中

```java
public class ContinueFor {
    public static void main(String[] args) {
        // 打印 1-10，跳过 5
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                continue;
            }
            System.out.print(i + " ");  // 1 2 3 4 6 7 8 9 10
        }
    }
}
```

### 2.3 在 while 循环中

```java
public class ContinueWhile {
    public static void main(String[] args) {
        int i = 0;
        
        while (i < 10) {
            i++;
            if (i % 2 == 0) {
                continue;  // 跳过偶数
            }
            System.out.print(i + " ");  // 1 3 5 7 9
        }
    }
}
```

### 2.4 注意事项

```java
// ❌ 错误：continue 后语句无法执行
for (int i = 0; i < 10; i++) {
    continue;
    System.out.println(i);  //  unreachable code
}

// ❌ 错误：while 中 continue 可能导致死循环
int i = 0;
while (i < 10) {
    if (i % 2 == 0) {
        continue;  // i 没有更新，死循环
    }
    i++;
}

// ✅ 正确
int i = 0;
while (i < 10) {
    i++;
    if (i % 2 == 0) {
        continue;
    }
    System.out.print(i + " ");
}
```

## 三、break vs continue

### 3.1 对比示例

```java
public class BreakVsContinue {
    public static void main(String[] args) {
        System.out.println("使用 break:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break;  // 跳出循环
            }
            System.out.print(i + " ");  // 1 2 3 4
        }
        
        System.out.println("\n使用 continue:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                continue;  // 跳过本次
            }
            System.out.print(i + " ");  // 1 2 3 4 6 7 8 9 10
        }
    }
}
```

### 3.2 图示

```
break:          continue:
循环开始        循环开始
  ↓              ↓
条件判断        条件判断
  ↓              ↓
执行体          执行体
  ↓              ↓
遇到 break      遇到 continue
  ↓              ↓
跳出循环 ─────→  跳过剩余代码
                ↓
              继续下一次循环
```

## 四、带标签的 break 和 continue

### 4.1 标签语法

```java
标签名: 循环语句 {
    // 可以使用 break 标签名 或 continue 标签名
}
```

### 4.2 带标签的 break

```java
public class LabeledBreak {
    public static void main(String[] args) {
        outer:  // 外层标签
        for (int i = 1; i <= 3; i++) {
            inner:  // 内层标签
            for (int j = 1; j <= 3; j++) {
                if (j == 2) {
                    break outer;  // 跳出外层循环
                }
                System.out.println("i = " + i + ", j = " + j);
            }
        }
        // 输出：
        // i = 1, j = 1
    }
}
```

### 4.3 带标签的 continue

```java
public class LabeledContinue {
    public static void main(String[] args) {
        outer:
        for (int i = 1; i <= 3; i++) {
            inner:
            for (int j = 1; j <= 3; j++) {
                if (j == 2) {
                    continue outer;  // 继续外层下一次
                }
                System.out.println("i = " + i + ", j = " + j);
            }
        }
        // 输出：
        // i = 1, j = 1
        // i = 2, j = 1
        // i = 3, j = 1
    }
}
```

### 4.4 应用场景

```java
// 查找素数
public class PrimeFinder {
    public static void main(String[] args) {
        outer:
        for (int i = 2; i <= 100; i++) {
            for (int j = 2; j <= Math.sqrt(i); j++) {
                if (i % j == 0) {
                    continue outer;  // 不是素数，继续外层
                }
            }
            System.out.print(i + " ");  // 素数
        }
    }
}
```

## 五、应用场景

### 5.1 搜索数组

```java
public class SearchArray {
    public static void main(String[] args) {
        int[] nums = {12, 45, 67, 23, 89, 34};
        int target = 23;
        int index = -1;
        
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                index = i;
                break;  // 找到后跳出
            }
        }
        
        if (index != -1) {
            System.out.println("找到，索引：" + index);
        } else {
            System.out.println("未找到");
        }
    }
}
```

### 5.2 过滤数据

```java
public class FilterData {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        
        // 打印奇数，跳过偶数
        for (int num : nums) {
            if (num % 2 == 0) {
                continue;
            }
            System.out.print(num + " ");  // 1 3 5 7 9
        }
    }
}
```

### 5.3 输入验证

```java
public class InputValidator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.print("请输入密码：");
            String pwd = scanner.nextLine();
            
            // 验证密码长度
            if (pwd.length() < 6) {
                System.out.println("密码太短");
                continue;
            }
            
            // 验证密码强度
            boolean hasDigit = false;
            for (char c : pwd.toCharArray()) {
                if (Character.isDigit(c)) {
                    hasDigit = true;
                    break;
                }
            }
            
            if (!hasDigit) {
                System.out.println("密码必须包含数字");
                continue;
            }
            
            System.out.println("密码设置成功");
            break;  // 验证通过，跳出循环
        }
    }
}
```

## 六、综合示例

```java
public class BreakContinueExample {
    public static void main(String[] args) {
        // 1. 打印 1-100 内的素数
        System.out.println("1-100 的素数：");
        outer:
        for (int i = 2; i <= 100; i++) {
            for (int j = 2; j <= Math.sqrt(i); j++) {
                if (i % j == 0) {
                    continue outer;
                }
            }
            System.out.print(i + " ");
        }
        System.out.println();
        
        // 2. 找到第一个满足条件的数
        int sum = 0;
        for (int i = 1; ; i++) {
            sum += i;
            if (sum > 1000) {
                System.out.println("累加到 " + i + " 时和超过 1000");
                break;
            }
        }
        
        // 3. 跳过特定值
        for (int i = 1; i <= 20; i++) {
            if (i % 3 == 0 || i % 5 == 0) {
                continue;
            }
            System.out.print(i + " ");
        }
    }
}
```

## 七、小结

本节要点：
1. **break**：跳出循环或 switch
2. **continue**：跳过本次，继续下一次
3. **区别**：break 结束循环，continue 继续循环
4. **标签**：可用于多层嵌套循环
5. **注意**：while 中 continue 要确保更新变量

---

[上一节：4.4 while 与 do-while 循环](./04-04-while.md) | [下一节：4.6 嵌套循环](./04-06-nested-loop.md)
