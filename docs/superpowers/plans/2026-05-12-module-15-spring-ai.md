# Module 15: Spring AI 集成实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建 Spring AI 模块，涵盖 LLM 集成、RAG 架构、向量数据库和 AI Agent 开发，帮助 Java 开发者掌握 2026 年 AI 应用开发技能

**Architecture:** 按照 7 个章节循序渐进，从基础集成到实战项目，每章 150-250 行，遵循"问题引入→生活类比→核心概念→代码实现→Q&A→小结→练习"结构

**Tech Stack:** Spring Boot 3.x, Spring AI, OpenAI/Local LLM, Vector Databases (Milvus/PGVector), Java 21

---

## 模块结构

```
15-spring-ai/
├── ch81-spring-ai-intro/      # 81.1 Spring AI 简介与环境搭建
├── ch82-llm-integration/      # 81.2 LLM 模型集成 (OpenAI/本地)
├── ch83-prompt-engineering/   # 81.3 Prompt 工程与模板
├── ch84-rag-architecture/     # 81.4 RAG 架构 (检索增强生成)
├── ch85-vector-database/      # 81.5 向量数据库集成
├── ch86-function-calling/     # 81.6 Function Calling 与工具调用
└── ch87-ai-agent/             # 81.7 实战：AI 智能客服系统
```

---

### Task 1: 创建 Spring AI 简介章节

**Files:**
- Create: `15-spring-ai/ch81-spring-ai-intro/15-01-SpringAI简介.md`
- Create: `15-spring-ai/README.md`

**Content Focus:**
- Spring AI 项目简介与定位
- 核心概念：Model、Prompt、Output
- 环境搭建 (Spring Boot 3.x + Spring AI)
- 第一个 AI 对话示例
- 生活类比：AI 是"超级实习生"

**Requirements:**
- ~200 lines
- Chinese content
- Code: Maven dependency, application.yml, simple ChatClient example

---

### Task 2: 创建 LLM 模型集成章节

**Files:**
- Create: `15-spring-ai/ch82-llm-integration/15-02-LLM模型集成.md`

**Content Focus:**
- 支持的模型提供商 (OpenAI, Ollama, Alibaba Cloud)
- ChatModel vs EmbeddingModel
- 切换不同模型提供商
- 本地模型部署 (Ollama)
- 流式响应处理

**Requirements:**
- ~200 lines
- Code: ChatClient builder, Ollama config, Streaming example

---

### Task 3: 创建 Prompt 工程章节

**Files:**
- Create: `15-spring-ai/ch83-prompt-engineering/15-03-Prompt工程.md`

**Content Focus:**
- Prompt 基础结构
- PromptTemplate 与变量替换
- System/User/Assistant 消息角色
- Few-shot prompting
- 输出解析器 (Output Parser)

**Requirements:**
- ~200 lines
- Code: PromptTemplate examples, BeanOutputConverter

---

### Task 4: 创建 RAG 架构章节

**Files:**
- Create: `15-spring-ai/ch84-rag-architecture/15-04-RAG架构.md`

**Content Focus:**
- RAG 原理：Retrieve → Augment → Generate
- DocumentReader (PDF, Text, Web)
- DocumentSplitter
- Embedding 过程
- 增强 Prompt 构建

**Requirements:**
- ~250 lines
- Diagram explanation, Code: RAG pipeline setup

---

### Task 5: 创建向量数据库集成章节

**Files:**
- Create: `15-spring-ai/ch85-vector-database/15-05-向量数据库.md`

**Content Focus:**
- 向量数据库概念
- 支持的 Vector Store (Milvus, PGVector, Chroma)
- VectorStore 接口使用
- 相似度搜索
- 实战：文档问答系统

**Requirements:**
- ~200 lines
- Code: VectorStore config, similarity search, integration with RAG

---

### Task 6: 创建 Function Calling 章节

**Files:**
- Create: `15-spring-ai/ch86-function-calling/15-06-FunctionCalling.md`

**Content Focus:**
- Function Calling 概念与用途
- @Tool 注解定义工具
- Tool 注册与发现
- Agent 循环
- 实战：天气查询 Agent

**Requirements:**
- ~200 lines
- Code: @Tool definition, ToolCallback registration, agent loop

---

### Task 7: 创建实战项目章节

**Files:**
- Create: `15-spring-ai/ch87-ai-agent/15-07-AI智能客服.md`

**Content Focus:**
- 项目架构设计
- 知识库构建 (RAG)
- 工具集成 (订单查询、退款)
- 对话历史管理
- 部署与优化

**Requirements:**
- ~250 lines
- Complete project structure, key code snippets

---

## 验证标准

1. 每个文件 150-250 行
2. 所有代码基于 Spring AI 1.0+ / Spring Boot 3.2+
3. 包含完整的生活类比和 Q&A
4. 代码示例可运行 (提供最小配置)

---

**Execution:** Start with Task 1 and proceed sequentially.
