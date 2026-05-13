# 2026 Java 学习路线重构实施计划

> **创建日期**: 2026-05-12
> **目标**: 将 hello-java 教程升级为 2026 年技术栈标准，新增 4 个模块，扩展现有内容

---

## 一、现状分析

### 1.1 当前模块结构（已完成部分编号调整）

| 模块 | 目录 | 章节范围 | 状态 |
|------|------|----------|------|
| Java 基础 | 01-java-base | ch01-ch06 | ✅ 完成 |
| 面向对象 | 02-oop | ch07-ch11 | ✅ 完成 |
| 核心 API | 03-core-api | ch12-ch16 | ✅ 完成 |
| 集合框架 | 04-collection | ch17-ch22 | ✅ 完成 |
| 异常与 IO | 05-exception-io | ch23-ch25 | ✅ 完成 |
| 并发编程 | 06-concurrency | ch26-ch30 | ✅ 完成 |
| Java 8+ | 07-java8+ | ch31-ch44 | ✅ 已扩展至 ch44 |
| 开发工具 | 08-tools | ch35-ch39 | ✅ 完成 |
| 数据库 | 09-database | ch38-ch39 | ✅ 完成 |
| Web 基础 | 10-web | ch40-ch42 | ✅ 完成 |
| Spring | 11-spring | ch43-ch49 | ✅ 完成 |
| Spring Boot | 12-spring-boot | ch49-ch59 | ✅ 已含 ch59 Native |
| Spring Cloud | 13-spring-cloud | ch60-ch69 | ✅ 编号已调整 |
| 项目实战 | 14-project | ch70-ch80 | ✅ 编号已调整 |

### 1.2 编号调整已完成

根据现有计划文档，以下编号调整**已经完成**：
- Spring Cloud: ch59→ch60, ..., ch68→ch69 ✅
- 项目实战: ch69→ch70, ..., ch79→ch80 ✅
- Spring Boot 新增 ch59-native ✅
- Java 8+ 新增 ch42-ch44（虚拟线程、模式匹配、结构化并发）✅

### 1.3 待完成工作

本计划聚焦以下**新增和扩展**工作：

1. **新增 4 个模块**（15-spring-ai、16-cloud-native、17-modern-tools、18-performance）
2. **扩展 4 个现有模块**内容（07-java8+、08-tools、09-database、13-spring-cloud）
3. **更新全局文档**（README.md、TASKS.md、Java 学习路线大纲.md）

---

## 二、新模块结构详细设计

### 2.1 第十五部分：Spring AI 集成（15-spring-ai）

**章节范围**: ch81-ch87（7 章）

| 章节 | 目录 | 主题 | 优先级 |
|------|------|------|--------|
| ch81 | ch81-spring-ai-intro | Spring AI 概述：AI 时代 Java 开发者的机遇、Spring AI 架构、核心概念 | 🔴 Must |
| ch82 | ch82-llm-integration | LLM 接入：OpenAI/通义千问接入、ChatClient 使用、对话历史管理 | 🔴 Must |
| ch83 | ch83-rag | RAG 检索增强生成：Vector Store、文档切分、检索策略、PgVector 集成 | 🔴 Must |
| ch84 | ch84-agent | Agent 开发：Function Calling、工具注册、多 Agent 协作、MCP 协议 | 🔴 Must |
| ch85 | ch85-streaming | 流式响应：SSE 流式输出、Flux 集成、前端实时展示、错误处理 | 🟡 Should |
| ch86 | ch86-prompt-engineering | Prompt 工程：Prompt Template、角色扮演、Few-shot、Chain of Thought | 🟡 Should |
| ch87 | ch87-ai-project | AI 项目实战：知识库问答助手完整项目（RAG + 对话 + 向量检索） | 🔴 Must |

### 2.2 第十六部分：云原生开发（16-cloud-native）

**章节范围**: ch88-ch94（7 章）

| 章节 | 目录 | 主题 | 优先级 |
|------|------|------|--------|
| ch88 | ch88-cloud-native-intro | 云原生概述：12-Factor App、容器化、云原生架构 | 🔴 Must |
| ch89 | ch89-k8s-basics | Kubernetes 基础：Pod/Deployment/Service/Ingress、kubectl 使用 | 🔴 Must |
| ch90 | ch90-k8s-deploy | K8s 部署 Spring Boot：健康检查、ConfigMap/Secret、HPA 自动扩缩容 | 🔴 Must |
| ch91 | ch91-helm | Helm 包管理：Chart 结构、模板语法、Values 配置、Helmfile | 🟡 Should |
| ch92 | ch92-service-mesh | Service Mesh 基础：Istio 简介、Sidecar 模式、流量管理、可观测性 | 🟢 Nice |
| ch93 | ch93-serverless | Serverless 开发：AWS Lambda/阿里云函数计算、事件驱动、冷启动优化 | 🟡 Should |
| ch94 | ch94-observability | 可观测性：Prometheus + Grafana、OpenTelemetry、日志聚合（ELK） | 🟡 Should |

### 2.3 第十七部分：现代工具链（17-modern-tools）

**章节范围**: ch95-ch100（6 章）

| 章节 | 目录 | 主题 | 优先级 |
|------|------|------|--------|
| ch95 | ch95-ai-ide | AI 辅助 IDE：Cursor/Copilot 使用技巧、AI 代码补全、智能重构 | 🔴 Must |
| ch96 | ch96-github-actions | GitHub Actions CI/CD：Workflow 编写、缓存策略、Docker 构建、多环境部署 | 🔴 Must |
| ch97 | ch97-modern-maven | 现代 Maven：Maven Wrapper、依赖管理优化、BOM、多模块最佳实践 | 🟡 Should |
| ch98 | ch98-container-dev | 容器化开发：Docker Compose 进阶、Dev Container、Jib 构建镜像 | 🟡 Should |
| ch99 | ch99-api-design | API 设计：OpenAPI/Swagger 3.0、API 版本管理、Mock 服务、契约测试 | 🟡 Should |
| ch100 | ch100-code-quality | 代码质量：SonarQube、Checkstyle、SpotBugs、Git Hooks、PR 模板 | 🟢 Nice |

### 2.4 第十八部分：性能优化（18-performance）

**章节范围**: ch101-ch106（6 章）

| 章节 | 目录 | 主题 | 优先级 |
|------|------|------|--------|
| ch101 | ch101-jvm-modern | 现代 JVM 调优：JDK21+ GC 选择、ZGC/Shenandoah、内存模型、JFR 分析 | 🔴 Must |
| ch102 | ch102-virtual-threads-perf | 虚拟线程性能：高并发场景调优、ThreadLocal 注意事项、synchronized 替代方案 | 🔴 Must |
| ch103 | ch103-graalvm-native | GraalVM Native Image：AOT 编译优化、Native Hints、反射处理、第三方库适配 | 🔴 Must |
| ch104 | ch104-spring-boot-perf | Spring Boot 性能优化：启动加速、懒加载、缓存策略、连接池调优 | 🔴 Must |
| ch105 | ch105-cloud-auto-scaling | 云原生自动扩缩容：HPA/VPA、KEDA、水平扩展策略、成本优化 | 🟡 Should |
| ch106 | ch106-benchmark | 性能基准测试：JMH 使用、压测工具（wrk/JMeter）、性能分析报告 | 🟡 Should |

---

## 三、现有模块扩展内容

### 3.1 07-java8+ 扩展（已完成，需验证）

| 新增章节 | 目录 | 状态 |
|----------|------|------|
| ch35 | ch35-java11 | ✅ 已存在 |
| ch36 | ch36-java17 | ✅ 已存在 |
| ch37 | ch37-java21 | ✅ 已存在 |
| ch38 | ch38-date-time | ✅ 已存在 |
| ch39 | ch39-module | ✅ 已存在 |
| ch40 | ch40-gc | ✅ 已存在 |
| ch41 | ch41-best-practices | ✅ 已存在 |
| ch42 | ch42-virtual-threads | ✅ 已存在 |
| ch43 | ch43-pattern-matching | ✅ 已存在 |
| ch44 | ch44-structured-concurrency | ✅ 已存在 |

### 3.2 08-tools 扩展

| 新增章节 | 目录 | 主题 |
|----------|------|------|
| ch40 | ch40-cursor-copilot | Cursor & Copilot：AI 辅助开发、Prompt 技巧、代码审查 |
| ch41 | ch41-devin-ai-tools | AI 开发工具：Devin、Codeium、Tabnine 对比 |
| ch42 | ch42-github-copilot-cli | GitHub Copilot CLI：终端 AI 助手、Git 辅助 |

### 3.3 09-database 扩展

| 新增章节 | 目录 | 主题 |
|----------|------|------|
| ch40 | ch40-vector-db | 向量数据库：PgVector、Milvus、Chroma、AI 应用数据存储 |
| ch41 | ch41-serverless-db | Serverless 数据库：Neon、Supabase、Aurora Serverless |
| ch42 | ch42-modern-orm | 现代 ORM：MyBatis-Flex、FlexyPool、jOOQ 对比 |

### 3.4 13-spring-cloud 扩展

| 新增章节 | 目录 | 主题 |
|----------|------|------|
| ch70 | ch70-k8s-integration | K8s 集成：Spring Cloud Kubernetes、Service Discovery |
| ch71 | ch71-cloud-native-patterns | 云原生模式：CQRS、Event Sourcing、Saga 模式 |

---

## 四、内容优先级分类

### 🔴 Must-Have（第一阶段：核心内容）

| 模块 | 章节 | 说明 |
|------|------|------|
| 15-spring-ai | ch81-ch84, ch87 | AI 集成核心：LLM 接入、RAG、Agent、完整项目 |
| 16-cloud-native | ch88-ch90 | 云原生基础：概述、K8s 基础、Spring Boot 部署 |
| 17-modern-tools | ch95-ch96 | 现代工具：AI IDE、CI/CD |
| 18-performance | ch101-ch104 | 性能优化：JVM 调优、虚拟线程、GraalVM、Spring Boot |
| 09-database | ch40 | 向量数据库（AI 时代必需） |
| 13-spring-cloud | ch70 | K8s 集成 |

### 🟡 Should-Have（第二阶段：扩展内容）

| 模块 | 章节 | 说明 |
|------|------|------|
| 15-spring-ai | ch85-ch86 | 流式响应、Prompt 工程 |
| 16-cloud-native | ch91, ch93-ch94 | Helm、Serverless、可观测性 |
| 17-modern-tools | ch97-ch99 | 现代 Maven、容器化、API 设计 |
| 18-performance | ch105-ch106 | 云原生扩缩容、基准测试 |
| 08-tools | ch40-ch42 | AI 工具链 |
| 09-database | ch41-ch42 | Serverless DB、现代 ORM |
| 13-spring-cloud | ch71 | 云原生模式 |

### 🟢 Nice-to-Have（第三阶段：锦上添花）

| 模块 | 章节 | 说明 |
|------|------|------|
| 16-cloud-native | ch92 | Service Mesh（Istio） |
| 17-modern-tools | ch100 | 代码质量工具 |

---

## 五、内容迁移策略

### 5.1 编号调整策略

**当前编号状态**：部分调整已完成，需确认以下编号是否已同步更新到所有文档。

| 模块 | 原范围 | 现范围 | 状态 |
|------|--------|--------|------|
| Spring Cloud | ch59-ch68 | ch60-ch69 | ✅ 目录已重命名 |
| 项目实战 | ch69-ch79 | ch70-ch80 | ✅ 目录已重命名 |
| Spring Boot | ch49-ch58 | ch49-ch59 | ✅ ch59 已创建 |
| Java 8+ | ch31-ch41 | ch31-ch44 | ✅ ch42-ch44 已创建 |

### 5.2 新内容创建策略

1. **新建模块目录**：按 `NN-module/` 格式创建
2. **章节目录**：按 `chXX-topic/` 格式创建
3. **文件命名**：按 `NN-XX-标题.md` 格式（模块号-章节号-标题）
4. **内容结构**：遵循 TASKS.md 写作规范（150-250 行/节）

### 5.3 内容去重策略

| 旧内容 | 新处理方式 |
|--------|------------|
| 手写排序算法（05-07） | 保留为参考，不作为重点 |
| 旧 JVM 调优（传统 GC） | 移至 18-performance，标注为"传统方式" |
| XML 配置示例 | 简化为历史参考，主教程使用注解方式 |
| IE 浏览器兼容 | 直接删除 |

---

## 六、文档更新清单

### 6.1 必须更新的文档

| 文档 | 更新内容 |
|------|----------|
| README.md | 新增 15-18 模块目录结构、更新课程大纲表格、更新统计数字 |
| TASKS.md | 新增 2026 重构任务记录、更新写作规范（如有变化） |
| Java 学习路线大纲.md | 新增 ch81-ch106 章节内容、更新全局编号引用 |
| AGENTS.md | 更新模块一览表表格 |

### 6.2 各模块 README.md 更新

| 模块 | 更新内容 |
|------|----------|
| 07-java8+/README.md | 确认 ch35-ch44 章节列表完整 |
| 08-tools/README.md | 新增 ch40-ch42 章节 |
| 09-database/README.md | 新增 ch40-ch42 章节 |
| 13-spring-cloud/README.md | 新增 ch70-ch71 章节 |
| 15-spring-ai/README.md | **新建** |
| 16-cloud-native/README.md | **新建** |
| 17-modern-tools/README.md | **新建** |
| 18-performance/README.md | **新建** |

---

## 七、最终模块结构预览

```
hello-java/
├── 01-java-base/          # 第一部分：Java 基础语法        (ch01-ch06)
├── 02-oop/                # 第二部分：面向对象编程          (ch07-ch11)
├── 03-core-api/           # 第三部分：Java 核心 API        (ch12-ch16)
├── 04-collection/         # 第四部分：集合框架             (ch17-ch22)
├── 05-exception-io/       # 第五部分：异常处理与 IO        (ch23-ch25)
├── 06-concurrency/        # 第六部分：多线程与并发         (ch26-ch30)
├── 07-java8+/             # 第七部分：Java 8+ 新特性       (ch31-ch44)
├── 08-tools/              # 第八部分：开发工具与构建       (ch35-ch42)
├── 09-database/           # 第九部分：数据库与 JDBC        (ch38-ch42)
├── 10-web/                # 第十部分：Web 开发基础         (ch40-ch42)
├── 11-spring/             # 第十一部分：Spring Framework   (ch43-ch49)
├── 12-spring-boot/        # 第十二部分：Spring Boot        (ch49-ch59)
├── 13-spring-cloud/       # 第十三部分：Spring Cloud 微服务 (ch60-ch71)
├── 14-project/            # 第十四部分：项目实战           (ch70-ch80)
├── 15-spring-ai/          # 第十五部分：Spring AI 集成     (ch81-ch87)  ⭐ 新增
├── 16-cloud-native/       # 第十六部分：云原生开发         (ch88-ch94)  ⭐ 新增
├── 17-modern-tools/       # 第十七部分：现代工具链         (ch95-ch100) ⭐ 新增
└── 18-performance/        # 第十八部分：性能优化           (ch101-ch106) ⭐ 新增
```

**总计**: 18 个模块，106+ 章节

---

## 八、估算时间表

### 8.1 第一阶段：核心内容（2-3 周）

| 周次 | 任务 | 交付物 |
|------|------|--------|
| 第 1 周 | 15-spring-ai ch81-ch84（4 节） | ~800-1000 行 |
| 第 2 周 | 16-cloud-native ch88-ch90（3 节） | ~600-750 行 |
| 第 2 周 | 17-modern-tools ch95-ch96（2 节） | ~400-500 行 |
| 第 3 周 | 18-performance ch101-ch104（4 节） | ~800-1000 行 |
| 第 3 周 | 09-database ch40（1 节） | ~200 行 |

### 8.2 第二阶段：扩展内容（2 周）

| 周次 | 任务 | 交付物 |
|------|------|--------|
| 第 4 周 | 15-spring-ai ch85-ch87（3 节） | ~600-750 行 |
| 第 4 周 | 16-cloud-native ch91, ch93-ch94（3 节） | ~600-750 行 |
| 第 5 周 | 17-modern-tools ch97-ch99（3 节） | ~600-750 行 |
| 第 5 周 | 08-tools ch40-ch42（3 节） | ~600-750 行 |
| 第 5 周 | 09-database ch41-ch42（2 节） | ~400-500 行 |

### 8.3 第三阶段：完善与文档（1 周）

| 周次 | 任务 | 交付物 |
|------|------|--------|
| 第 6 周 | 16-cloud-native ch92（1 节） | ~200 行 |
| 第 6 周 | 17-modern-tools ch100（1 节） | ~200 行 |
| 第 6 周 | 13-spring-cloud ch70-ch71（2 节） | ~400-500 行 |
| 第 6 周 | 18-performance ch105-ch106（2 节） | ~400-500 行 |
| 第 6 周 | 全局文档更新 | README/TASKS/AGENTS/大纲 |

### 8.4 总工作量估算

| 类别 | 章节数 | 估算行数 |
|------|--------|----------|
| 新增模块内容 | 26 节 | ~5200-6500 行 |
| 扩展现有模块 | 8 节 | ~1600-2000 行 |
| 文档更新 | - | ~500 行 |
| **总计** | **34 节** | **~7300-9000 行** |

---

## 九、执行顺序与依赖

```
Phase 1 (核心)
├── P1-1: 创建 15-spring-ai 基础框架 + ch81-ch84
├── P1-2: 创建 16-cloud-native 基础框架 + ch88-ch90
├── P1-3: 创建 17-modern-tools 基础框架 + ch95-ch96
├── P1-4: 创建 18-performance 基础框架 + ch101-ch104
└── P1-5: 扩展 09-database ch40

Phase 2 (扩展)
├── P2-1: 完成 15-spring-ai ch85-ch87
├── P2-2: 完成 16-cloud-native ch91,ch93-ch94
├── P2-3: 完成 17-modern-tools ch97-ch99
├── P2-4: 扩展 08-tools ch40-ch42
└── P2-5: 扩展 09-database ch41-ch42

Phase 3 (完善)
├── P3-1: 完成 16-cloud-native ch92
├── P3-2: 完成 17-modern-tools ch100
├── P3-3: 扩展 13-spring-cloud ch70-ch71
├── P3-4: 完成 18-performance ch105-ch106
└── P3-5: 更新全局文档
```

---

## 十、质量检查清单

每节内容创建后验证：

- [ ] 行数在 150-250 行范围内
- [ ] 包含生活类比引入
- [ ] 包含核心概念解释
- [ ] 包含代码对比示例
- [ ] 包含 Q&A 常见疑问
- [ ] 包含小结表格
- [ ] 包含动手练习
- [ ] 文件命名符合 `NN-XX-标题.md` 格式
- [ ] 章节号与目录号一致
- [ ] 无 IE 兼容性内容
- [ ] 代码示例使用 Java 17+ 语法
- [ ] 无 XML 配置优先示例

---

## 十一、风险与注意事项

| 风险 | 应对措施 |
|------|----------|
| 章节编号冲突 | 先创建目录再创建文件，避免编号覆盖 |
| 内容重复 | 虚拟线程内容在 07-java8+ 和 18-performance 可能有重叠，后者侧重性能调优 |
| 技术过时 | 所有新增内容基于 2026 年最新稳定版本 |
| 文档不同步 | 每完成一个阶段立即更新 README 统计 |
| AI 内容变化快 | Spring AI 章节标注"基于 Spring AI 1.0.x"，定期更新 |

---

## 十二、成功标准

1. ✅ 18 个模块全部创建完成
2. ✅ 新增 26 节核心内容
3. ✅ 扩展 8 节现有内容
4. ✅ README.md 完整更新
5. ✅ TASKS.md 新增任务记录
6. ✅ Java 学习路线大纲.md 同步更新
7. ✅ 所有章节符合写作规范（150-250 行）
8. ✅ 无过时内容残留

---

*计划创建完成，等待执行指令。*
