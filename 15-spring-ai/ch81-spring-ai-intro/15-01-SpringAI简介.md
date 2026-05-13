# 81.1 Spring AI 简介：Java 与 AI 的桥梁（生活类比：翻译官）

## 一、先问一个问题

**问题**：如何在 Java 应用中调用大语言模型（LLM）？

### 生活例子：翻译官

想象你去国外旅行，语言不通：

```
你说中文（Java 代码）
  ↓
翻译官转换语言（API 调用）
  ↓
老外回答（AI 响应）
  ↓
翻译官翻译回来（返回结果）
```

Spring AI 就是 Java 和 AI 模型之间的"翻译官"！

## 二、什么是 Spring AI

**Spring AI** 是 Spring 官方项目，旨在简化 AI 模型在 Spring 应用中的集成。

### 核心特性

- **统一 API**：一套接口，支持多种模型提供商（OpenAI、Ollama、阿里云等）
- **自动配置**：Spring Boot 自动装配，开箱即用
- **无缝集成**：与现有 Spring 生态完美融合
- **多模态支持**：文本、图像、音频等多种模态

### 为什么需要 Spring AI？

```
没有 Spring AI：
└── 手动管理 HTTP 连接
└── 处理不同厂商的 API 差异
└── 自己实现重试、超时等机制

使用 Spring AI：
└── ChatClient 统一接口
└── 自动配置和依赖注入
└── 内置错误处理和重试
```

## 三、核心概念

| 概念 | 说明 | 类比 |
|------|------|------|
| Model | AI 模型（如 GPT-4） | 专家 |
| Prompt | 输入给 AI 的提示词 | 问题 |
| Output | AI 生成的响应 | 回答 |
| ChatClient | 对话客户端 | 对话窗口 |
| Embedding | 文本向量化 | 语义编码 |

## 四、环境搭建

### 4.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>
```

> **提示**：使用 Spring AI BOM 管理版本，确保依赖兼容性。

### 4.2 配置 API Key

```yaml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      chat:
        options:
          model: gpt-4o
          temperature: 0.7
```

> **安全提示**：API Key 通过环境变量注入，不要硬编码在配置文件中。

## 五、第一个 AI 对话

### 5.1 创建对话服务

```java
@Service
public class AIService {
    
    private final ChatClient chatClient;
    
    // 构造函数注入
    public AIService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }
    
    // 简单对话
    public String chat(String message) {
        return chatClient.prompt()
            .user(message)
            .call()
            .content();
    }
}
```

### 5.2 测试代码

```java
@SpringBootTest
class AIServiceTest {
    
    @Autowired
    private AIService aiService;
    
    @Test
    void testChat() {
        String response = aiService.chat("Java 是什么？");
        System.out.println("AI 回答：" + response);
    }
}
```

## 六、常见疑问

**Q1：Spring AI 支持哪些模型提供商？**
A：支持 OpenAI、Ollama（本地模型）、阿里云百炼、Azure OpenAI、Anthropic 等。

**Q2：需要付费才能使用吗？**
A：Spring AI 本身免费开源。模型提供商通常按 Token 收费，Ollama 可本地免费运行。

**Q3：Spring AI 和 LangChain4j 有什么区别？**
A：Spring AI 是 Spring 官方项目，与 Spring Boot 集成更自然；LangChain4j 是社区项目，功能更丰富。推荐根据项目需求选择。

## 七、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| ChatClient | 对话客户端 | chatClient.prompt() |
| Prompt | 输入提示 | .user("问题") |
| Output | 生成结果 | .call().content() |
| 配置 | API Key 和模型 | spring.ai.openai.* |

## 八、动手练习

1. 创建 Spring Boot 项目，添加 Spring AI 依赖
2. 配置 OpenAI 或 Ollama API Key
3. 实现一个简单的问答服务
4. 尝试切换不同的模型提供商，观察 API 差异
