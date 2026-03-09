# 4.4 while 与 do-while 循环

## 一、while 循环

### 1.1 基本语法

```java
while (条件表达式) {
    // 循环体
}
```

**执行流程**：
1. 判断条件表达式
2. 条件为 true，执行循环体
3. 回到步骤 1，直到条件为 false

### 1.2 示例：打印 1 到 10

```java
public class WhileDemo {
    public static void main(String[] args) {
        int i = 1;
        
        while (i <= 10) {
            System.out.println(i);
            i++;
        }
    }
}
```

### 1.3 计算累加和

```java
public class WhileSum {
    public static void main(String[] args) {
        int sum = 0;
        int i = 1;
        
        while (i <= 100) {
            sum += i;
            i++;
        }
        
        System.out.println("1 到 100 的和：" + sum);  // 5050
    }
}
```

## 二、do-while 循环

### 2.1 基本语法

```java
do {
    // 循环体
} while (条件表达式);
```

**执行流程**：
1. 执行循环体
2. 判断条件表达式
3. 条件为 true，回到步骤 1
4. 条件为 false，结束循环

### 2.2 示例

```java
public class DoWhileDemo {
    public static void main(String[] args) {
        int i = 1;
        
        do {
            System.out.println(i);
            i++;
        } while (i <= 10);
    }
}
```

## 三、while vs do-while

### 3.1 关键区别

| 循环类型 | 判断时机 | 最少执行次数 |
|----------|----------|--------------|
| while | 先判断后执行 | 0 次 |
| do-while | 先执行后判断 | 1 次 |

### 3.2 对比示例

```java
public class CompareLoop {
    public static void main(String[] args) {
        int x = 11;
        
        // while：条件不满足，不执行
        while (x <= 10) {
            System.out.println("while: " + x);
            x++;
        }
        // 无输出
        
        x = 11;
        
        // do-while：先执行一次，再判断
        do {
            System.out.println("do-while: " + x);
            x++;
        } while (x <= 10);
        // 输出：do-while: 11
    }
}
```

### 3.3 应用场景

```java
// while：适合不确定次数，可能一次都不执行
int input = scanner.nextInt();
while (input != 0) {
    System.out.println("输入：" + input);
    input = scanner.nextInt();
}

// do-while：适合至少执行一次的场景
do {
    System.out.print("请输入密码：");
    password = scanner.nextLine();
    tries++;
} while (!password.equals(correctPwd) && tries < 3);
```

## 四、死循环

### 4.1 死循环示例

```java
// while 死循环
while (true) {
    System.out.println("无限循环");
}

// do-while 死循环
do {
    System.out.println("无限循环");
} while (true);

// for 死循环
for (;;) {
    System.out.println("无限循环");
}
```

### 4.2 死循环的应用

```java
// 服务器监听
while (true) {
    Socket client = serverSocket.accept();
    // 处理客户端请求
}

// 游戏主循环
while (true) {
    update();   // 更新游戏状态
    render();   // 渲染画面
    sleep(16);  // 控制帧率
}
```

### 4.3 跳出死循环

```java
public class BreakLoop {
    public static void main(String[] args) {
        int count = 0;
        
        while (true) {
            System.out.println("计数：" + count);
            count++;
            
            if (count >= 10) {
                break;  // 跳出循环
            }
        }
    }
}
```

## 五、应用场景

### 5.1 用户输入验证

```java
public class InputValidation {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int input;
        
        // 要求输入 1-100 之间的数
        do {
            System.out.print("请输入 1-100 之间的数：");
            input = scanner.nextInt();
        } while (input < 1 || input > 100);
        
        System.out.println("输入有效：" + input);
    }
}
```

### 5.2 猜数字游戏

```java
public class GuessNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int target = (int) (Math.random() * 100) + 1;
        int guess;
        int attempts = 0;
        
        System.out.println("我想了一个 1-100 之间的数");
        
        do {
            System.out.print("你猜是：");
            guess = scanner.nextInt();
            attempts++;
            
            if (guess > target) {
                System.out.println("太大了");
            } else if (guess < target) {
                System.out.println("太小了");
            }
        } while (guess != target);
        
        System.out.println("恭喜你猜对了！");
        System.out.println("尝试次数：" + attempts);
    }
}
```

### 5.3 累加直到满足条件

```java
public class SumUntil {
    public static void main(String[] args) {
        int sum = 0;
        int i = 1;
        
        // 累加直到和大于 1000
        while (sum <= 1000) {
            sum += i;
            i++;
        }
        
        System.out.println("累加到 " + (i - 1) + " 时和超过 1000");
        System.out.println("和为：" + sum);
    }
}
```

### 5.4 数字反转

```java
public class ReverseNumber {
    public static void main(String[] args) {
        int num = 12345;
        int reversed = 0;
        
        while (num != 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num /= 10;
        }
        
        System.out.println("反转后：" + reversed);  // 54321
    }
}
```

## 六、循环选择指南

| 场景 | 推荐循环 |
|------|----------|
| 确定次数 | for |
| 不确定次数，可能 0 次 | while |
| 不确定次数，至少 1 次 | do-while |
| 遍历数组/集合 | for |
| 复杂条件判断 | while |

## 七、注意事项

### 7.1 忘记更新变量

```java
// ❌ 死循环：忘记 i++
int i = 0;
while (i < 10) {
    System.out.println(i);
}

// ✅ 正确
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
```

### 7.2 分号问题

```java
int i = 0;

// ❌ 错误：while 后面多了分号
while (i < 10); {
    System.out.println(i);
    i++;
}

// ✅ 正确
while (i < 10) {
    System.out.println(i);
    i++;
}
```

### 7.3 do-while 的分号

```java
// ✅ do-while 后面必须有分号
do {
    System.out.println(i);
    i++;
} while (i < 10);
```

## 八、综合示例

```java
public class LoopExample {
    public static void main(String[] args) {
        // 1. 求最大公约数（辗转相除法）
        int a = 48, b = 18;
        int temp;
        
        while (b != 0) {
            temp = a % b;
            a = b;
            b = temp;
        }
        System.out.println("最大公约数：" + a);  // 6
        
        // 2. 斐波那契数列
        int n = 10;
        int f1 = 1, f2 = 1;
        
        System.out.print("斐波那契数列：");
        System.out.print(f1 + " " + f2 + " ");
        
        int i = 2;
        while (i < n) {
            int next = f1 + f2;
            System.out.print(next + " ");
            f1 = f2;
            f2 = next;
            i++;
        }
        System.out.println();
        
        // 3. 统计数字位数
        int num = 12345;
        int count = 0;
        
        do {
            num /= 10;
            count++;
        } while (num != 0);
        
        System.out.println("位数：" + count);  // 5
    }
}
```

## 九、小结

本节要点：
1. **while**：先判断后执行，可能执行 0 次
2. **do-while**：先执行后判断，至少执行 1 次
3. **死循环**：`while(true)`，需用 break 跳出
4. **选择**：确定次数用 for，不确定用 while/do-while
5. **注意**：更新变量、分号位置、作用域

---

[上一节：4.3 for 循环](./04-03-for.md) | [下一节：4.5 break 与 continue](./04-05-break-continue.md)
