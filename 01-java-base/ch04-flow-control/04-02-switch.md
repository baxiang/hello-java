# 4.2 switch 分支语句

## 一、switch 基本语法

```java
switch (表达式) {
    case 值 1:
        // 代码块 1
        break;
    case 值 2:
        // 代码块 2
        break;
    case 值 3:
        // 代码块 3
        break;
    default:
        // 默认代码块
}
```

**执行流程**：
1. 计算表达式的值
2. 与各个 case 的值匹配
3. 匹配成功则执行对应代码块
4. 遇到 break 跳出 switch
5. 都不匹配则执行 default

## 二、基本示例

### 2.1 星期判断

```java
public class SwitchDemo {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("星期一");
                break;
            case 2:
                System.out.println("星期二");
                break;
            case 3:
                System.out.println("星期三");
                break;
            case 4:
                System.out.println("星期四");
                break;
            case 5:
                System.out.println("星期五");
                break;
            case 6:
                System.out.println("星期六");
                break;
            case 7:
                System.out.println("星期日");
                break;
            default:
                System.out.println("无效的日期");
        }
    }
}
```

### 2.2 成绩等级

```java
public class GradeSwitch {
    public static void main(String[] args) {
        char grade = 'B';
        
        switch (grade) {
            case 'A':
                System.out.println("优秀");
                break;
            case 'B':
                System.out.println("良好");
                break;
            case 'C':
                System.out.println("中等");
                break;
            case 'D':
                System.out.println("及格");
                break;
            case 'F':
                System.out.println("不及格");
                break;
            default:
                System.out.println("无效等级");
        }
    }
}
```

## 三、穿透性（case 穿透）

### 3.1 不使用 break

```java
public class FallThrough {
    public static void main(String[] args) {
        int month = 3;
        
        switch (month) {
            case 3:
                System.out.println("春季");
                // 没有 break，继续执行
            case 6:
                System.out.println("夏季");
                // 没有 break，继续执行
            case 9:
                System.out.println("秋季");
                break;
            case 12:
                System.out.println("冬季");
                break;
        }
        // 输出：春季 夏季 秋季
    }
}
```

### 3.2 利用穿透性

```java
public class SeasonDemo {
    public static void main(String[] args) {
        int month = 5;
        
        switch (month) {
            // 春季
            case 3:
            case 4:
            case 5:
                System.out.println("春季");
                break;
            
            // 夏季
            case 6:
            case 7:
            case 8:
                System.out.println("夏季");
                break;
            
            // 秋季
            case 9:
            case 10:
            case 11:
                System.out.println("秋季");
                break;
            
            // 冬季
            case 12:
            case 1:
            case 2:
                System.out.println("冬季");
                break;
            
            default:
                System.out.println("无效月份");
        }
    }
}
```

## 四、switch 支持的类型

### 4.1 支持的类型

```java
// byte, short, int, char
int num = 1;
switch (num) { }

char ch = 'A';
switch (ch) { }

// enum 枚举
enum Color { RED, GREEN, BLUE }
Color color = Color.RED;
switch (color) { }

// String（Java 7+）
String day = "MONDAY";
switch (day) { }

// 包装类（Byte, Short, Integer, Long, Character）
Integer x = 10;
switch (x) { }
```

### 4.2 不支持的类型

```java
// ❌ long, float, double 不支持
// long l = 10L;
// switch (l) { }  // 编译错误

// ❌ boolean 不支持
// boolean b = true;
// switch (b) { }  // 编译错误
```

### 4.3 String 类型示例（Java 7+）

```java
public class StringSwitch {
    public static void main(String[] args) {
        String day = "MONDAY";
        
        switch (day) {
            case "MONDAY":
                System.out.println("星期一");
                break;
            case "TUESDAY":
                System.out.println("星期二");
                break;
            case "WEDNESDAY":
                System.out.println("星期三");
                break;
            default:
                System.out.println("其他");
        }
    }
}
```

## 五、switch 表达式（Java 14+）

### 5.1 箭头语法

```java
public class SwitchExpr {
    public static void main(String[] args) {
        int day = 3;
        
        // Java 14+ 新语法
        String result = switch (day) {
            case 1 -> "星期一";
            case 2 -> "星期二";
            case 3 -> "星期三";
            case 4 -> "星期四";
            case 5 -> "星期五";
            case 6 -> "星期六";
            case 7 -> "星期日";
            default -> "无效日期";
        };
        
        System.out.println(result);
    }
}
```

### 5.2 多值匹配

```java
public class MultiCase {
    public static void main(String[] args) {
        int month = 5;
        
        String season = switch (month) {
            case 3, 4, 5 -> "春季";
            case 6, 7, 8 -> "夏季";
            case 9, 10, 11 -> "秋季";
            case 12, 1, 2 -> "冬季";
            default -> "无效月份";
        };
        
        System.out.println(season);
    }
}
```

### 5.3 返回值的 switch

```java
public class SwitchReturn {
    public static void main(String[] args) {
        int score = 85;
        
        // 使用 yield 返回值（Java 14+）
        String grade = switch (score / 10) {
            case 10, 9 -> "优秀";
            case 8 -> "良好";
            case 7, 6 -> "及格";
            default -> "不及格";
        };
        
        System.out.println(grade);
    }
}
```

## 六、if-else vs switch

### 6.1 使用场景对比

| 场景 | 推荐方式 |
|------|----------|
| 范围判断 | if-else |
| 等值判断（少量） | if-else 或 switch |
| 等值判断（多个） | switch |
| 复杂条件 | if-else |
| 枚举匹配 | switch |

### 6.2 示例对比

```java
// if-else 适合范围判断
if (score >= 90) {
    grade = "优秀";
} else if (score >= 80) {
    grade = "良好";
}

// switch 适合等值判断
switch (day) {
    case 1: System.out.println("一"); break;
    case 2: System.out.println("二"); break;
    // ...
}
```

## 七、注意事项

### 7.1 break 的重要性

```java
int x = 1;

// ❌ 忘记 break
switch (x) {
    case 1:
        System.out.println("一");
        // 忘记 break
    case 2:
        System.out.println("二");
        break;
}
// 输出：一 二

// ✅ 正确
switch (x) {
    case 1:
        System.out.println("一");
        break;
    case 2:
        System.out.println("二");
        break;
}
// 输出：一
```

### 7.2 default 的位置

```java
// default 可以在任何位置
switch (x) {
    default:
        System.out.println("默认");
        break;
    case 1:
        System.out.println("一");
        break;
}
```

### 7.3 case 值必须唯一

```java
// ❌ 错误：case 值重复
// switch (x) {
//     case 1:
//     case 1:  // 编译错误
// }
```

## 八、综合示例

```java
public class SwitchExample {
    public static void main(String[] args) {
        // 1. 计算器
        char operator = '+';
        int a = 10, b = 5;
        
        int result = switch (operator) {
            case '+' -> a + b;
            case '-' -> a - b;
            case '*' -> a * b;
            case '/' -> a / b;
            default -> 0;
        };
        System.out.println("结果：" + result);
        
        // 2. 月份天数
        int month = 2;
        int year = 2026;
        
        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> {
                // 闰年判断
                boolean isLeap = (year % 4 == 0 && year % 100 != 0) 
                              || (year % 400 == 0);
                yield isLeap ? 29 : 28;
            }
            default -> 0;
        };
        
        System.out.println(month + "月有 " + days + " 天");
    }
}
```

## 九、小结

本节要点：
1. **基本语法**：switch-case-break-default
2. **break 作用**：跳出 switch，防止穿透
3. **支持类型**：byte/short/int/char/String/枚举
4. **穿透性**：可利用穿透性合并 case
5. **Java 14+**：箭头语法 `->` 和 `yield` 返回值

---

[上一节：4.1 if-else 条件语句](./04-01-if-else.md) | [下一节：4.3 for 循环](./04-03-for.md)
