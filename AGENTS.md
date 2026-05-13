# AGENTS.md — hello-java

> Java 全栈学习路线教程仓库（纯 Markdown 文档，无可执行代码）

## 仓库性质

- 本仓库是 **中文 Java 教程文档集合**，不含任何可编译/运行的源代码
- 所有内容为 `.md` 文件，按 14 个学习模块组织在编号目录中（`01-java-base/` ~ `14-project/`）

## 目录结构约定

```
NN-topic/                    ← 模块目录，NN 为两位序号
├── chXX-name/               ← 章节子目录，XX 为全局章节号
│   └── NN-XX-标题.md        ← 课程文件，NN=模块号, XX=章节号
```

- 文件名中的模块号与目录序号对应（如 `11-spring/ch48-spring-mvc/11-06-06-RESTful API.md`）
- 部分章节目录下有多个 `.md` 文件，按主题细分

## 写作规范（来自 TASKS.md）

新增或修改课程文件时遵循：

1. **每节 150-250 行**，按功能模块拆分
2. **结构**：问题引入 → 生活类比 → 核心概念 → 代码对比 → 实现方式 → Q&A → 小结表格 → 动手练习
3. 使用生活类比解释抽象概念（类比库见 `TASKS.md`）
4. 代码示例只保留核心部分，保持精简

## 模块一览

| 目录 | 内容 | 章节范围 |
|------|------|----------|
| `01-java-base/` | Java 基础语法 | ch01-ch06 |
| `02-oop/` | 面向对象编程 | ch07-ch11 |
| `03-core-api/` | 核心 API | ch12-ch16 |
| `04-collection/` | 集合框架 | ch17-ch22 |
| `05-exception-io/` | 异常处理与 IO | ch23-ch25 |
| `06-concurrency/` | 多线程与并发 | ch26-ch30 |
| `07-java8+/` | Java 8+ 新特性 | ch31-ch44 |
| `08-tools/` | 开发工具（Maven/Git/IDEA） | ch35-ch37 |
| `09-database/` | 数据库与 JDBC | ch38-ch39 |
| `10-web/` | Web 开发基础 | ch40-ch42 |
| `11-spring/` | Spring Framework | ch43-ch49 |
| `12-spring-boot/` | Spring Boot | ch49-ch58 |
| `13-spring-cloud/` | Spring Cloud 微服务 | ch59-ch68 |
| `14-project/` | 项目实战 | ch69-ch79 |

## 关键文件

- `README.md` — 教程总览与目录索引
- `TASKS.md` — 内容拆分任务清单 + 写作规范 + 生活类比库
- `Java 学习路线大纲.md` — 完整学习路径大纲

## 注意事项

- 教程语言为**中文**，新增内容使用中文编写
- 不生成可执行代码，只编写教程文档
- 修改内容后同步更新 `README.md` 中的对应章节统计（如有变化）
- `.gitignore` 已忽略 Java 编译产物和 IDE 配置文件
