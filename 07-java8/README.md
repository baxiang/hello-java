# 第七部分：Java 8+ 新特性

> 掌握现代 Java 编程特性，提高代码质量

## 📚 章节列表

| 章节 | 标题 | 内容 |
|------|------|------|
| [第 31 章](./ch31-lambda/) | Lambda 表达式 | 函数式接口、Lambda 语法、方法引用 |
| [第 32 章](./ch32-stream/) | Stream API | Stream 概述、中间操作、终止操作、并行流 |
| [第 33 章](./ch33-optional/) | Optional 类 | Optional 概述、常用方法、避免空指针 |
| [第 34 章](./ch34-other-features/) | 其他新特性 | 接口默认方法、Java 9-17 新特性概览 |

## 🎯 学习目标

- [ ] 掌握 Lambda 表达式的语法和使用
- [ ] 熟练使用 Stream API 处理集合
- [ ] 理解 Optional 类避免空指针异常
- [ ] 了解 Java 8+ 的其他新特性

## 💡 代码对比

```java
// Java 7 及以前
List<String> result = new ArrayList<>();
for (String s : list) {
    if (s.startsWith("A")) {
        result.add(s.toUpperCase());
    }
}

// Java 8+
List<String> result = list.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

## 🔗 下一步

完成本部分后，继续学习 [第八部分：开发工具与构建](../08-tools/)
