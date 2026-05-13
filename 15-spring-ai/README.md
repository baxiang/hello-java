# 第十五部分：Spring AI 集成

> Java 应用集成大语言模型的完整指南

## 章节概览

| 章节 | 内容 | 核心知识点 |
|------|------|------------|
| [81.1 Spring AI 简介](./ch81-spring-ai-intro/15-01-SpringAI简介.md) | 项目概述与环境搭建 | ChatClient、Prompt API |
| [82.1 LLM 模型集成](./ch82-llm-integration/15-02-LLM模型集成.md) | 多模型支持 | ChatModel、EmbeddingModel、Ollama、流式响应 |
| [83.1 Prompt 工程](./ch83-prompt-engineering/15-03-Prompt工程.md) | 模板、结构化提示 | PromptTemplate、Few-shot、BeanOutputConverter |
| [84.1 RAG 架构](./ch84-rag/15-04-RAG架构.md) | 检索增强生成 | VectorStore、文档切分、检索+生成 |
| [85.1 向量数据库](./ch85-vector-db/15-05-向量数据库.md) | 语义存储与检索 | PgVector、Milvus、元数据过滤 |
| [86.1 Function Calling](./ch86-function-calling/15-06-FunctionCalling.md) | 工具调用 | @Description、多工具编排 |
| [87.1 AI 智能客服实战](./ch87-ai-project/15-07-AI智能客服.md) | 综合项目 | RAG + Function Calling + ChatMemory |

## 学习路线

```
第 1 步：Spring AI 简介    → 环境搭建、第一个对话
    ↓
第 2 步：LLM 模型集成       → 多模型支持
    ↓
第 3 步：Prompt 工程        → 高质量提示词
    ↓
第 4 步：RAG 架构           → 知识库问答
    ↓
第 5 步：向量数据库         → 语义检索
    ↓
第 6 步：Function Calling   → 工具调用
    ↓
第 7 步：实战项目           → AI 智能客服
```

## 学习建议

1. **理解 AI 基础**：了解 LLM 的工作原理和限制
2. **掌握 API**：熟练使用 ChatClient 和 Prompt API
3. **实践 RAG**：构建基于知识库的问答系统
4. **安全合规**：注意数据隐私和 API 使用规范

## 前置知识

- Spring Boot 3.x 基础
- Java 17+（推荐 Java 21）
- 基本的 REST API 概念
