# 1.5 注释、标识符与关键字

## 一、注释

注释是代码的说明文字，不会被编译执行。

### 1.1 单行注释

使用 `//` 开头：

```java
// 这是单行注释
int age = 18;  // 定义年龄变量
```

### 1.2 多行注释

使用 `/* ... */` 包裹：

```java
/*
 * 这是多行注释
 * 可以写多行内容
 * 常用于临时注释代码
 */
int name = "张三";
```

### 1.3 文档注释

使用 `/** ... */` 包裹，可生成 API 文档：

```java
/**
 * 这是一个学生类
 * @author 张三
 * @version 1.0
 * @since 2026-01-01
 */
public class Student {
    
    /**
     * 主方法
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // ...
    }
}
```

### 1.4 注释最佳实践

```java
// ✅ 好的注释：解释为什么
// 使用快速排序，因为数据量大时性能更好
quickSort(arr);

// ❌ 坏的注释：重复代码
i++;  // i 加 1

// ✅ 好的注释：标记待办
// TODO: 需要优化性能
// FIXME: 这里有 bug 需要修复
// NOTE: 注意边界条件
```

## 二、标识符

### 2.1 什么是标识符

标识符是用于命名类、方法、变量等的字符序列。

### 2.2 命名规则（必须遵守）

| 规则 | 说明 | 示例 |
|------|------|------|
| 组成 | 字母、数字、下划线 `_`、美元符号 `$` | `name`, `age1`, `$money` |
| 开头 | 不能以数字开头 | ✅ `name1` ❌ `1name` |
| 大小写 | 区分大小写 | `Name` ≠ `name` |
| 关键字 | 不能使用 Java 关键字 | ❌ `int`, `class` |
| 长度 | 无限制，建议有意义 | ✅ `studentName` |

### 2.3 命名规范（建议遵守）

| 类型 | 规范 | 示例 |
|------|------|------|
| 类名 | 大驼峰命名（PascalCase） | `Student`, `HelloWorld` |
| 方法名 | 小驼峰命名（camelCase） | `getName`, `calculateSum` |
| 变量名 | 小驼峰命名 | `age`, `studentName` |
| 常量名 | 全大写，下划线分隔 | `MAX_COUNT`, `PI_VALUE` |
| 包名 | 全小写，点号分隔 | `com.example.demo` |

### 2.4 命名示例

```java
// ✅ 好的命名
public class StudentInfo {
    private String studentName;
    private int studentAge;
    public static final int MAX_SCORE = 100;
    
    public void calculateTotalScore() {
        // ...
    }
}

// ❌ 坏的命名
public class student_info {  // 类名不应使用下划线
    private String sN;       // 变量名无意义
    private int a;           // 太简短
    public static final int max = 100;  // 常量应全大写
}
```

## 三、关键字

### 3.1 什么是关键字

关键字是 Java 保留的具有特殊含义的单词，不能用作标识符。

### 3.2 常用关键字分类

#### 访问控制
```
public      - 公共访问权限
protected   - 受保护访问权限
private     - 私有访问权限
```

#### 类、方法、变量修饰符
```
static      - 静态的
final       - 最终的，不可变的
abstract    - 抽象的
synchronized - 同步的
volatile    - 易失的
transient   - 瞬态的
native      - 本地的
strictfp    - 严格浮点
```

#### 程序控制
```
if          - 条件判断
else        - 否则
switch      - 开关语句
case        - 情况
default     - 默认
while       - 当...时
do          - 做
for         - 对于
break       - 跳出
continue    - 继续
return      - 返回
```

#### 异常处理
```
try         - 尝试
catch       - 捕获
finally     - 最终
throw       - 抛出
throws      - 抛出（声明）
```

#### 包相关
```
package     - 包
import      - 导入
```

#### 数据类型
```
byte        - 字节
short       - 短整型
int         - 整型
long        - 长整型
float       - 浮点型
double      - 双精度浮点型
char        - 字符
boolean     - 布尔型
void        - 无返回值
```

#### 其他
```
class       - 类
interface   - 接口
enum        - 枚举
extends     - 继承
implements  - 实现
new         - 创建对象
this        - 当前对象
super       - 父类
instanceof  - 实例判断
```

### 3.3 保留字

以下单词目前未使用，但保留：
```
goto
const
```

### 3.4 特殊字面量

```
true   - 布尔真
false  - 布尔假
null   - 空值
```

> ⚠️ **注意**：`true`、`false`、`null` 不是关键字，但也不能用作标识符

## 四、综合示例

```java
/**
 * 学生信息管理系统
 * @author 张三
 * @version 1.0
 */
package com.example.student;  // 包声明

import java.util.Scanner;  // 导入工具类

// 类名：大驼峰
public class StudentManager {
    
    // 常量：全大写
    public static final int MAX_STUDENTS = 100;
    
    // 变量：小驼峰
    private String studentName;
    private int studentAge;
    
    /**
     * 主方法
     */
    public static void main(String[] args) {
        // 创建 Scanner 对象
        Scanner scanner = new Scanner(System.in);
        
        // 输入学生信息
        System.out.print("请输入姓名：");
        String name = scanner.nextLine();
        
        System.out.print("请输入年龄：");
        int age = scanner.nextInt();
        
        // 输出信息
        System.out.println("姓名：" + name);
        System.out.println("年龄：" + age);
    }
    
    // 方法：小驼峰
    public void printInfo() {
        System.out.println("学生信息");
    }
}
```

## 五、常见错误

### 5.1 命名错误

```java
// ❌ 以数字开头
int 1stPlace = 1;

// ❌ 使用关键字
int class = 1;
int public = 100;

// ❌ 包含非法字符
int student-name = "张三";  // 不能有连字符
int student@name = "李四";  // 不能有@
```

### 5.2 大小写错误

```java
int Age = 18;
System.out.println(age);  // ❌ 找不到符号，Java 区分大小写
```

### 5.3 注释错误

```java
// ❌ 多行注释未闭合
/* 这是注释
System.out.println("Hello");

// ✅ 正确
/* 这是注释 */
System.out.println("Hello");
```

## 六、小结

本节要点：
1. **注释**：单行 `//`、多行 `/* */`、文档 `/** */`
2. **标识符命名规则**：字母数字下划线$，不能数字开头
3. **命名规范**：类名大驼峰、方法变量小驼峰、常量全大写
4. **关键字**：Java 保留单词，不能用作标识符

## 七、练习题

1. 判断以下标识符是否合法：
   - `userName`
   - `123name`
   - `$money`
   - `class`
   - `user_name`
   - `public`

2. 将以下变量名改为符合规范的命名：
   - `int a = 10;`（表示学生年龄）
   - `String S_N = "张三";`（表示学生姓名）
   - `final int max = 100;`（表示最大分数）

3. 为以下代码添加注释：
   ```java
   public class Circle {
       private double radius;
       public double getArea() {
           return Math.PI * radius * radius;
       }
   }
   ```

---

[上一节：1.4 开发工具介绍](./01-04-IDE-Tools.md) | [下一章：第 2 章 变量与数据类型](../02-variable/README.md)
