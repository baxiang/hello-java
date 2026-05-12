# 2026 年核心内容新增设计

## 概述

为 hello-java 教程新增 2026 年 Java 生态核心内容：Virtual Threads、模式匹配、Record 类、Structured Concurrency、Spring Boot Native 编译、GitHub Actions CI/CD、Kubernetes 基础和 AI 智能助手项目。

## 新增章节

### 07-java8+ 新增 3 章

| 章节 | 目录 | 主题 |
|------|------|------|
| ch42 | ch42-virtual-threads | Virtual Threads（虚拟线程） |
| ch43 | ch43-pattern-matching | 模式匹配与 Record 类 |
| ch44 | ch44-structured-concurrency | Structured Concurrency |

**ch42 Virtual Threads 核心内容**：
- 虚拟线程 vs 平台线程对比
- 创建虚拟线程（Thread.ofVirtual / Executors.newVirtualThreadPerTaskExecutor）
- 高并发场景实践（万级并发请求）
- 性能对比（内存、吞吐量）
- 适用与不适用的场景
- 与 Reactive 编程的对比

**ch43 模式匹配与 Record 类核心内容**：
- Record 类定义、使用场景、不可变性
- Pattern Matching for instanceof
- switch 表达式增强（箭头语法、yield、模式匹配）
- Sealed Classes（密封类）
- 综合案例

**ch44 Structured Concurrency 核心内容**：
- 传统并发的缺陷（线程泄漏、取消困难）
- StructuredTaskScope（fork/join、错误传播）
- ShutdownOnFailure vs ShutdownOnSuccess
- 与虚拟线程配合
- 综合案例

### 12-spring-boot 新增 1 章

| 章节 | 目录 | 主题 |
|------|------|------|
| ch59 | ch59-native | Spring Boot Native 编译 |

**ch59 Native 编译核心内容**：
- GraalVM vs OpenJDK 对比
- AOT 编译原理
- spring-native 集成步骤
- Native Image 构建与优化
- 反射/代理/资源的 native hints
- 性能对比（启动时间、内存占用）
- 限制与最佳实践

### 14-project 新增 3 节

| 章节 | 目录 | 主题 |
|------|------|------|
| ch80 | ch80-github-actions | GitHub Actions CI/CD |
| ch81 | ch81-k8s-basics | Kubernetes 基础 |
| ch82 | ch82-ai-assistant | AI 智能助手项目 |

**ch80 GitHub Actions 核心内容**：
- Workflow 文件结构（.github/workflows/）
- 触发器（push、pull_request、schedule）
- Java/Maven 构建流水线示例
- 缓存策略（Maven 依赖缓存）
- Docker 构建与推送
- 多环境部署（dev/staging/prod）
- 与 Docker Hub/阿里云 ACR 集成

**ch81 Kubernetes 核心内容**：
- K8s 核心概念（Pod、Deployment、Service、Ingress）
- 部署 Spring Boot 应用到 K8s
- Service 类型（ClusterIP、NodePort、LoadBalancer）
- ConfigMap 与 Secret 管理配置
- 健康检查（Readiness/Liveness Probe）
- Helm 基础（Chart、Template、Install）
- 从 Docker Compose 到 K8s 迁移示例

**ch82 AI 智能助手项目核心内容**：
- Spring AI 框架介绍
- 接入 OpenAI/通义千问等 LLM
- ChatClient 对话应用
- 流式响应（Flux<String>）
- RAG（检索增强生成）基础
- Vector Store（PgVector/Chroma）
- Prompt 工程基础
- 完整项目：知识库问答助手

## 章节编号调整

### 现状

```
Spring Boot: ch49-ch58
Spring Cloud: ch59-ch68
项目: ch69-ch79
```

### 调整后

```
Spring Boot: ch49-ch59（新增 ch59 Native）
Spring Cloud: ch60-ch69（原 ch59→ch60, ch60→ch61, ..., ch68→ch69）
项目: ch70-ch82（原 ch69→ch70, ..., ch79→ch80，新增 ch81-ch82）
```

### 需要重命名的目录

**Spring Cloud（10 个目录）**：
- ch59-microservice-intro → ch60-microservice-intro
- ch60-nacos-eureka → ch61-nacos-eureka
- ch61-loadbalancer → ch62-loadbalancer
- ch62-openfeign → ch63-openfeign
- ch63-sentinel-hystrix → ch64-sentinel-hystrix
- ch64-gateway → ch65-gateway
- ch65-nacos-config → ch66-nacos-config
- ch66-sleuth-zipkin → ch67-sleuth-zipkin
- ch67-stream → ch68-stream
- ch68-seata → ch69-seata

**项目（11 个目录）**：
- ch69-blog → ch70-blog
- ch70-mall → ch71-mall
- ch71-oa → ch72-oa
- ch72-seckill → ch73-seckill
- ch73-takeout → ch74-takeout
- ch74-dashboard → ch75-dashboard
- ch75-exam → ch76-exam
- ch76-cms → ch77-cms
- ch77-common-skills → ch78-common-skills
- ch78-devops → ch79-devops
- ch79-minispring → ch80-minispring

### 需要更新的文件内容

所有重命名目录内的 .md 文件需要更新：
1. 文件内引用的目录路径
2. 13-spring-cloud/README.md
3. 14-project/README.md
4. 08-tools/README.md（章节号更新）
5. README.md（全局目录）
6. Java 学习路线大纲.md（全局章节号）
7. TASKS.md（如有章节号引用）

## 执行顺序

1. 重命名 Spring Cloud 目录（ch59→ch60, ..., ch68→ch69）
2. 重命名项目目录（ch69→ch70, ..., ch79→ch80）
3. 新增 07-java8+ ch42-ch44 章节文件
4. 新增 12-spring-boot ch59 native 章节文件
5. 新增 14-project ch81-ch82 章节文件
6. 更新所有受影响的 README.md 和引用文件
7. 更新全局文档（README.md、学习路线大纲.md、TASKS.md）
