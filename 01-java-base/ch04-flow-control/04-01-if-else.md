# 4.1 if-else 条件语句

## 一、流程控制概述

流程控制语句用于控制程序的执行顺序，主要有三种结构：

```
流程控制结构
├── 顺序结构：从上到下依次执行
├── 分支结构：if-else、switch
└── 循环结构：for、while、do-while
```

## 二、if 语句

### 2.1 基本语法

```java
if (条件表达式) {
    // 条件为 true 时执行的代码
}
```

### 2.2 示例

```java
public class IfDemo {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("已成年");
        }
        
        int score = 95;
        if (score >= 90) {
            System.out.println("成绩优秀");
        }
    }
}
```

## 三、if-else 语句

### 3.1 基本语法

```java
if (条件表达式) {
    // 条件为 true 时执行
} else {
    // 条件为 false 时执行
}
```

### 3.2 示例

```java
public class IfElseDemo {
    public static void main(String[] args) {
        int age = 16;
        
        if (age >= 18) {
            System.out.println("已成年");
        } else {
            System.out.println("未成年");
        }
        
        // 判断奇偶
        int num = 7;
        if (num % 2 == 0) {
            System.out.println("偶数");
        } else {
            System.out.println("奇数");
        }
    }
}
```

## 四、if-else if-else 语句

### 4.1 基本语法

```java
if (条件 1) {
    // 条件 1 为 true 时执行
} else if (条件 2) {
    // 条件 2 为 true 时执行
} else if (条件 3) {
    // 条件 3 为 true 时执行
} else {
    // 以上条件都为 false 时执行
}
```

### 4.2 示例：成绩等级

```java
public class GradeDemo {
    public static void main(String[] args) {
        int score = 85;
        
        if (score >= 90) {
            System.out.println("优秀");
        } else if (score >= 80) {
            System.out.println("良好");
        } else if (score >= 70) {
            System.out.println("中等");
        } else if (score >= 60) {
            System.out.println("及格");
        } else {
            System.out.println("不及格");
        }
    }
}
```

### 4.3 示例：季节判断

```java
public class SeasonDemo {
    public static void main(String[] args) {
        int month = 5;
        
        if (month >= 3 && month <= 5) {
            System.out.println("春季");
        } else if (month >= 6 && month <= 8) {
            System.out.println("夏季");
        } else if (month >= 9 && month <= 11) {
            System.out.println("秋季");
        } else {
            System.out.println("冬季");
        }
    }
}
```

## 五、嵌套 if 语句

```java
public class NestedIf {
    public static void main(String[] args) {
        int score = 85;
        boolean isMakeup = false;  // 是否补考
        
        if (score >= 60) {
            System.out.println("及格");
            
            // 嵌套判断
            if (score >= 90) {
                System.out.println("获得奖学金资格");
            }
        } else {
            if (isMakeup) {
                System.out.println("可以补考");
            } else {
                System.out.println("需要重修");
            }
        }
    }
}
```

## 六、应用场景

### 6.1 用户登录

```java
public class Login {
    public static void main(String[] args) {
        String username = "admin";
        String password = "123456";
        
        if (username.equals("admin")) {
            if (password.equals("123456")) {
                System.out.println("登录成功");
            } else {
                System.out.println("密码错误");
            }
        } else {
            System.out.println("用户名错误");
        }
    }
}
```

### 6.2 三角形判断

```java
public class Triangle {
    public static void main(String[] args) {
        int a = 3, b = 4, c = 5;
        
        // 判断是否能构成三角形
        if (a + b > c && a + c > b && b + c > a) {
            System.out.println("可以构成三角形");
            
            // 判断三角形类型
            if (a == b && b == c) {
                System.out.println("等边三角形");
            } else if (a == b || b == c || a == c) {
                System.out.println("等腰三角形");
            } else {
                System.out.println("普通三角形");
            }
        } else {
            System.out.println("不能构成三角形");
        }
    }
}
```

### 6.3 票价计算

```java
public class TicketPrice {
    public static void main(String[] args) {
        int age = 25;
        double originalPrice = 100.0;
        double finalPrice;
        
        if (age < 12) {
            finalPrice = originalPrice * 0.5;  // 儿童半价
        } else if (age >= 65) {
            finalPrice = originalPrice * 0.7;  // 老人 7 折
        } else {
            finalPrice = originalPrice;  // 全价
        }
        
        System.out.println("最终票价：" + finalPrice);
    }
}
```

## 七、注意事项

### 7.1 条件表达式必须是布尔值

```java
int x = 5;

// ❌ 错误：int 不能转为 boolean
// if (x) {}

// ✅ 正确
if (x > 0) {}
```

### 7.2 分号问题

```java
int x = 5;

// ❌ 错误：if 后面多了分号
// if (x > 0); {
//     System.out.println("正数");
// }

// ✅ 正确
if (x > 0) {
    System.out.println("正数");
}
```

### 7.3 代码块作用域

```java
if (true) {
    int x = 10;  // x 的作用域在这个代码块内
    System.out.println(x);
}
// System.out.println(x);  // ❌ 错误：x 已超出作用域
```

### 7.4 单行语句可省略大括号

```java
int age = 18;

// 可以省略大括号（不推荐）
if (age >= 18)
    System.out.println("已成年");
else
    System.out.println("未成年");

// 推荐：始终使用大括号
if (age >= 18) {
    System.out.println("已成年");
} else {
    System.out.println("未成年");
}
```

## 八、if-else 与三元运算符

```java
int age = 20;

// if-else
String status;
if (age >= 18) {
    status = "成年";
} else {
    status = "未成年";
}

// 三元运算符（更简洁）
String status2 = age >= 18 ? "成年" : "未成年";
```

## 九、综合示例

```java
public class IfExample {
    public static void main(String[] args) {
        // 1. 判断正负零
        int num = -5;
        if (num > 0) {
            System.out.println("正数");
        } else if (num < 0) {
            System.out.println("负数");
        } else {
            System.out.println("零");
        }
        
        // 2. 闰年判断
        int year = 2026;
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println("闰年");
        } else {
            System.out.println("平年");
        }
        
        // 3. 三个数排序
        int a = 15, b = 5, c = 10;
        int max, mid, min;
        
        if (a >= b && a >= c) {
            max = a;
            if (b >= c) {
                mid = b;
                min = c;
            } else {
                mid = c;
                min = b;
            }
        } else if (b >= a && b >= c) {
            max = b;
            if (a >= c) {
                mid = a;
                min = c;
            } else {
                mid = c;
                min = a;
            }
        } else {
            max = c;
            if (a >= b) {
                mid = a;
                min = b;
            } else {
                mid = b;
                min = a;
            }
        }
        
        System.out.println("从大到小：" + max + ", " + mid + ", " + min);
    }
}
```

## 十、小结

本节要点：
1. **if**：单分支，条件为 true 执行
2. **if-else**：双分支，二选一执行
3. **if-else if-else**：多分支，多选一执行
4. **嵌套 if**：if 语句中包含 if
5. **注意**：条件必须是布尔值，推荐始终使用大括号

---

[下一节：4.2 switch 分支语句](./04-02-switch.md)
