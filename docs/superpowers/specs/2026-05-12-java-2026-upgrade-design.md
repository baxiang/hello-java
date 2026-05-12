# Java 2026 学习路线升级设计文档

**日期**: 2026-05-12  
**状态**: 已批准  
**方案**: 渐进式升级 (方案一)

## 概述

按照 "Java 开发 2026" 标准对 `hello-java` 教程进行技术栈升级。
核心策略为：**技术栈版本升级 + 部分章节重构 + 新增 2026 热门主题模块**。

## Java 版本策略

| 阶段 | 模块 | JDK 基线 | 说明 |
|------|------|----------|------|
| 基础篇 (01-06) | Java 基础、OOP、集合、并发 | Java 8/11 | 确保零基础友好，语法稳定 |
| 框架篇 (11-13) | Spring 全家桶 | Java 17 LTS | Spring Boot 3.x 最低要求，企业主流 |
| 进阶篇 (15-17) | AI、可观测性、数据现代化 | Java 21 LTS | 引入虚拟线程、模式匹配等新特性 |

## 模块详细设计

### 1. Java 语言升级

#### 07-java17-21 (原 `07-java8+` 扩展重命名)
- **目标**: 覆盖 Java 8 到 Java 21 LTS 的关键特性，建立双版本基线。
- **章节规划**:
    - `ch35`: Java 8-11 巩固 (var, HTTP Client, 集合工厂方法)
    - `ch36`: Java 17 LTS 核心 (Records, Sealed Classes, Text Blocks, 增强 Switch)
    - `ch37`: Java 21 LTS 核心 (虚拟线程, 模式匹配 instanceof/switch, Sequenced Collections)

#### 06-concurrency (并发模块)
- **调整**: 在末尾新增 `ch30: 虚拟线程 (Java 21)`。
- **内容**: 对比平台线程与虚拟线程，讲解 Structured Concurrency 概念及迁移建议。

### 2. Spring 框架升级

#### 11-spring (Spring Framework)
- **新增**: `ch49: 响应式编程基础与 WebFlux`。
- **内容**: 引入 Reactor 模型，Mono/Flux API，为非阻塞架构铺垫。

#### 12-spring-boot (升级至 3.x)
- **更新**: 所有示例基于 JDK 17 + Spring Boot 3.x。
- **新增/调整**:
    - 集成 Spring Boot Starter Observability (Actuator + Micrometer Tracing)。
    - 数据访问层更新：介绍 Hibernate 6.x 特性及 Jakarta EE 迁移。

#### 13-spring-cloud (微服务)
- **更新**: 升级至 Spring Cloud 2024.0.0+ (对应 Boot 3.2+)。
- **新增**: Service Mesh 集成概览，讨论 Sidecar 模式与 Spring Cloud 的边界及互补。

### 3. AI 与新领域 (2026 核心增量)

#### 15-spring-ai (扩展现有骨架)
- **内容**:
    - LLM 集成 (OpenAI/Ollama/通义千问)
    - RAG 架构 (Retrieval Augmented Generation)
    - Vector Databases (Milvus/Redis Vector)
    - Function Calling 与 AI Agent 开发
    - 实战：AI 智能客服/知识库

#### 16-observability (新增模块)
- **目标**: 解决微服务架构下的监控盲区。
- **章节规划**:
    - `ch88`: 可观测性三大支柱 (Logs, Metrics, Traces)
    - `ch89`: OpenTelemetry 统一标准与实践
    - `ch90`: Grafana + Prometheus 监控实战
    - `ch91`: 分布式链路追踪 (Tempo/Jaeger)

#### 17-data-modern (新增模块)
- **目标**: 数据层现代化演进。
- **章节规划**:
    - `ch92`: R2DBC 与响应式数据库访问
    - `ch93`: JPA/Hibernate 6.x 新特性
    - `ch94`: Testcontainers 集成测试 (替代 Docker-Compose 测试)
    - `ch95`: 多数据源与分库分表进阶

## 写作规范 (遵循现有 TASKS.md)

- **每节 150-250 行**: 易于阅读，按功能拆分。
- **结构**: 问题引入 → 生活类比 → 核心概念 → 代码对比 → 实现方式 → Q&A → 小结表格 → 动手练习。
- **类比**: 使用生活类比解释抽象概念 (如 AI 幻觉 -> "做梦"，虚拟线程 -> "服务员与厨房" 等)。

## 实施计划概览

1. 重命名 `07-java8+` 目录，调整内部结构。
2. 在 `06-concurrency`, `11-spring`, `12-spring-boot` 中新增章节文件。
3. 完善 `15-spring-ai` 的章节内容。
4. 创建 `16-observability` 和 `17-data-modern` 目录及初始文件。
5. 更新 `README.md`, `Java 学习路线大纲.md`, `TASKS.md` 统计信息。
6. 全局检查：确保 Java 版本标注一致，无过时 API 引用。
