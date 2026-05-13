# Spring AI 集成

> Java 应用集成大语言模型的完整指南

本模块学习如何使用 Spring AI 框架将大语言模型集成到 Java 应用中，涵盖 LLM 模型对接、Prompt 工程、RAG 架构、向量数据库、Function Calling 以及实战项目。

## 文件列表

| 文件 | 主题 |
|------|------|
| 01-SpringAI简介.md | Spring AI 简介：ChatClient、Prompt API |
| 02-LLM模型集成.md | LLM 模型集成：ChatModel、EmbeddingModel、Ollama、流式响应 |
| 03-Prompt工程.md | Prompt 工程：PromptTemplate、Few-shot、BeanOutputConverter |
| 04-RAG架构.md | RAG 架构：VectorStore、文档切分、检索+生成 |
| 05-向量数据库.md | 向量数据库：PgVector、Milvus、元数据过滤 |
| 06-FunctionCalling.md | Function Calling：@Description、多工具编排 |
| 07-AI智能客服.md | AI 智能客服实战：RAG + Function Calling + ChatMemory |

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
