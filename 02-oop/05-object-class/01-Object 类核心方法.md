# Object 类核心方法

## 一、问题引入

直接打印一个自定义对象：

```java
class Person {
    String name = "张三";
    int age = 18;
}
System.out.println(new Person());
// 输出：Person@15db9742 ❌ 这是什么鬼？哈希码毫无意义
```

✅ **重写 toString**：

```java
class Person {
    String name = "张三";
    int age = 18;

    @Override
    public String toString() {
        return "Person{name=" + name + ", age=" + age + "}";
    }
}
System.out.println(new Person());
// 输出：Person{name=张三, age=18} ✅
```

同样，两个内容相同的 Person 对象直接用 `==` 或 `equals` 比较：

```java
Person p1 = new Person();
Person p2 = new Person();
System.out.println(p1 == p2);       // false（比较引用）
System.out.println(p1.equals(p2)); // false（默认只比较引用）
// 但内容明明一样，应该相等！
```

这节讲 toString、equals、hashCode 三个最常用的 Object 方法。

## 二、核心概念

### 2.1 Object 类的地位

`Object` 是 Java 所有类的根父类。没写 `extends` 的类默认继承 Object：

```java
class A { }         // 等价于
class A extends Object { }
```

Object 提供了 9 个方法，最核心的三个：

```
toString()    → 对象"长什么样"
equals()     → 对象"是否相等"
hashCode()   → 对象在哈希表中的"位置"
```

### 2.2 toString

**默认实现**：返回 `类名@哈希码`，毫无信息量。

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

**重写原则**：返回有意义的描述，包含所有重要属性：

```java
@Override
public String toString() {
    return "Person{name=" + name + ", age=" + age + "}";
}
```

### 2.3 equals

**默认实现**：和 `==` 一样，只比较引用地址：

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

**何时需要重写**：当"内容相同"比"引用相同"更重要时（比如 Student 按学号判断同一性）。

**重写步骤**（五步检查法）：

```java
@Override
public boolean equals(Object obj) {
    if (obj == null) return false;                    // 1. null 检查
    if (this == obj) return true;                     // 2. 同一对象
    if (getClass() != obj.getClass()) return false;    // 3. 类型检查（用 getClass 而非 instanceof 避免对称性问题）

    Person other = (Person) obj;                        // 4. 强制转型
    return age == other.age && Objects.equals(name, other.name); // 5. 比较属性
}
```

### 2.4 hashCode

**与 equals 的约定**：**两个对象 equals 相等，hashCode 必须相等**。

```java
// 如果重写了 equals，必须同步重写 hashCode
@Override
public int hashCode() {
    return Objects.hash(name, age); // Objects.hash() 简洁
}

// 手动计算（原理）
@Override
public int hashCode() {
    int result = 17;
    result = 31 * result + age;
    result = 31 * result + (name != null ? name.hashCode() : 0);
    return result;
}
```

## 三、代码对比

❌ **只重写 equals，不重写 hashCode**（违反约定）：

```java
@Override public boolean equals(Object o) { /* 按内容比较 */ }
@Override public int hashCode() { return 42; } // ❌ 所有对象 hashCode 一样

// HashMap 行为异常
map.put(p1, "value");
map.get(p2); // ❌ p2 和 p1 equals 相等，但 hashCode 不同 → 找不到
```

✅ **equals 和 hashCode 一起重写**：

```java
@Override public boolean equals(Object o) { /* 按内容比较 */ }
@Override public int hashCode() { return Objects.hash(name, age); }
```

❌ **toString 返回 null 或抛出异常**：

```java
@Override public String toString() {
    return name.toUpperCase(); // ❌ name 为 null 时 NPE
}
```

✅ **安全处理 null**：

```java
@Override public String toString() {
    return "Person{name=" + (name != null ? name : "null") + ", age=" + age + "}";
    // 或
    return "Person{name=" + Objects.toString(name, "null") + ", age=" + age + "}";
}
```

❌ **toString 暴露敏感信息**：

```java
class User {
    private String password;

    @Override
    public String toString() {
        return "User{password=" + password + "}"; // ❌ 打印时泄露密码
    }
}
```

## 四、实现方式

### 4.1 IDEA 自动生成

右键 → Generate → equals() and hashCode() → 选择要包含的字段 → 一键生成。

### 4.2 equals 五大约束

| 约束 | 含义 |
|------|------|
| 自反性 | `x.equals(x)` 必须为 true |
| 对称性 | `x.equals(y) == y.equals(x)` |
| 传递性 | `x.equals(y) && y.equals(z)` → `x.equals(z)` |
| 一致性 | 多次调用结果不变 |
| 非空性 | `x.equals(null)` 必须为 false |

### 4.3 哈希表工作原理（equals 和 hashCode 为什么必须配合）

```
HashMap 查找键的过程：
1. 计算 key.hashCode() → 定位到"桶"
2. 在桶内用 equals() 逐一比较找到具体键

如果 hashCode 不一致：
→ 定位到不同的桶
→ 即使 equals 为 true，也找不到
```

### 4.4 常见陷阱

```java
// ❌ 使用可变字段作为 hashCode 的依据
class Person {
    String name;
    int age;
    @Override public int hashCode() { return Objects.hash(name, age); }
}

Person p = new Person("张三", 18);
map.put(p, "value");
p.age = 20; // 修改后 hashCode 改变 → 从 HashMap 中"消失"了
map.get(p);  // null！
```

**永远不要用可变字段计算 hashCode**。

## 五、Q&A

**Q：getClass() 和 instanceof 选哪个？**
A：通常用 `getClass()` 严格匹配，避免对称性问题（`x.equals(y)` 和 `y.equals(x)` 结果不一致）。只有需要"子类等于父类"时才用 instanceof。

**Q：为什么要用质数 31 计算 hashCode？**
A：减少哈希冲突。31 有良好的散列特性，且编译器可以用位移优化 `31 * i` → `(i << 5) - i`。

**Q：hashCode 返回负数有问题吗？**
A：没有问题。哈希码可以是任意整数，负数完全正常。

**Q：集合存储自定义对象时必须重写 equals 和 hashCode 吗？**
A：如果不需要按内容查找/去重，不重写也能存。但只要涉及到查找、去重、作为 HashMap 的键，就必须重写。

**Q：Objects.equals 和 Objects.hash 是什么？**
A：`Objects.equals(a, b)` = 安全比较（处理 null）；`Objects.hash(a, b, ...)` = 生成哈希码（处理 null）。两个都是 Java 7+ 工具类。

## 六、小结

| 方法 | 默认行为 | 通常需要重写 |
|------|---------|------------|
| toString() | `类名@哈希码` | ✅ 显示有意义的信息 |
| equals() | 比较引用（==） | ✅ 需要按内容比较时 |
| hashCode() | 内存地址相关 | ✅ 重写了 equals 时必须同步重写 |

| 要点 | 说明 |
|------|------|
| equals 重写 | null 检查 → 同一对象 → 类型匹配 → 转型 → 属性比较 |
| hashCode 约定 | equals 相等 → hashCode 必须相等 |
| 哈希表 | hashCode 定位桶，equals 在桶内找对象 |
| 可变字段 | 不能用于 hashCode（会导致集合丢失元素） |
