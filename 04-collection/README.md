# 第四部分：集合框架

> 掌握 Java 集合体系，高效存储和管理数据

## 📚 章节列表

| 章节 | 标题 | 内容 |
|------|------|------|
| [第 17 章](./ch17-collection-overview/) | 集合框架概述 | 集合体系、Collection 接口、泛型基础 |
| [第 18 章](./ch18-list/) | List 集合 | ArrayList、LinkedList、Vector、遍历方式 |
| [第 19 章](./ch19-set/) | Set 集合 | HashSet、LinkedHashSet、TreeSet、哈希表原理 |
| [第 20 章](./ch20-map/) | Map 集合 | HashMap、LinkedHashMap、TreeMap、遍历方式 |
| [第 21 章](./ch21-collections/) | Collections 工具类 | 排序、查找、同步集合 |
| [第 22 章](./ch22-advanced/) | 高级集合特性 | 泛型进阶、不可变集合、性能对比 |

## 🎯 学习目标

- [ ] 理解集合框架体系结构
- [ ] 掌握 ArrayList 和 LinkedList 的区别与应用
- [ ] 掌握 HashMap 的原理和使用
- [ ] 理解 HashSet 和 HashMap 的关系
- [ ] 掌握泛型的使用
- [ ] 能够根据场景选择合适的集合

## 📊 集合选择指南

```
需要索引访问？→ List
  ├─ 频繁查询 → ArrayList
  └─ 频繁增删 → LinkedList

不允许重复？→ Set
  ├─ 无序 → HashSet
  ├─ 有序 → LinkedHashSet
  └─ 排序 → TreeSet

键值对存储？→ Map
  ├─ 无序 → HashMap
  ├─ 有序 → LinkedHashMap
  └─ 排序 → TreeMap
```

## 🔗 下一步

完成本部分后，继续学习 [第五部分：异常处理与 IO](../05-exception-io/)
