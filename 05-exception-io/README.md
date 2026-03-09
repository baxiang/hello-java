# 第五部分：异常处理与 IO

> 掌握异常处理机制和文件 IO 操作

## 📚 章节列表

| 章节 | 标题 | 内容 |
|------|------|------|
| [第 23 章](./ch23-exception/) | 异常处理 | 异常体系、try-catch-finally、throw、throws、自定义异常 |
| [第 24 章](./ch24-file/) | File 类 | 文件操作、目录操作、文件过滤器 |
| [第 25 章](./ch25-io-stream/) | IO 流 | 字节流、字符流、缓冲流、序列化、NIO 简介 |

## 🎯 学习目标

- [ ] 理解异常处理机制
- [ ] 掌握 try-catch-finally 的使用
- [ ] 掌握 File 类的常用操作
- [ ] 理解 IO 流的分类和使用
- [ ] 掌握对象序列化

## 📊 IO 流体系

```
IO 流
├─ 字节流
│  ├─ InputStream → FileInputStream, BufferedInputStream
│  └─ OutputStream → FileOutputStream, BufferedOutputStream
└─ 字符流
   ├─ Reader → FileReader, BufferedReader
   └─ Writer → FileWriter, BufferedWriter
```

## 🔗 下一步

完成本部分后，继续学习 [第六部分：多线程与并发](../06-concurrency/)
