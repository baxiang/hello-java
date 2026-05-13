# 82.1 LLM 模型集成：多面手 AI（生活类比：多语种翻译中心）

## 一、先问一个问题
**问题**：如何在不改代码的情况下切换不同的 AI 模型？

### 生活例子：多语种翻译中心
多语种翻译中心：
- 同一个窗口提交需求（统一 API）
- 后台切换不同语种的翻译员（不同模型）
- 翻译质量不同（模型能力差异）
- 紧急任务选快译，专业任务选专家（按场景选型）

Spring AI 让你轻松切换"翻译员"！

## 二、支持的模型提供商

Spring AI 支持多种模型提供商，只需修改配置即可切换：

| 提供商 | 依赖 Starter | 特点 |
|--------|--------------|------|
| OpenAI | spring-ai-openai-spring-boot-starter | GPT-4/3.5，强大 |
| Ollama | spring-ai-ollama-spring-boot-starter | 本地运行，免费 |
| Alibaba | spring-ai-alibaba-spring-boot-starter | 通义千问，中文强 |
| Azure | spring-ai-azure-openai-spring-boot-starter | 企业级，安全 |

## 三、ChatModel 与 EmbeddingModel

### 3.1 ChatModel（对话模型）

用于生成文本响应：

```java
@Service
public class ChatService {
    private final ChatModel chatModel;
    public ChatService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }
    public String chat(String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        ChatResponse response = chatModel.call(prompt);
        return response.getResult().getOutput().getText();
    }
}
```

### 3.2 EmbeddingModel（嵌入模型）

用于文本向量化（语义搜索、RAG）：

```java
@Service
public class EmbeddingService {
    private final EmbeddingModel embeddingModel;
    public EmbeddingService(EmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
    }
    public List<Double> embed(String text) {
        return embeddingModel.embed(text);
    }
    // 比较两个文本的相似度
    public double similarity(String text1, String text2) {
        List<Double> vec1 = embed(text1);
        List<Double> vec2 = embed(text2);
        return cosineSimilarity(vec1, vec2);
    }
}
```

## 四、本地模型部署 (Ollama)

### 4.1 安装 Ollama

```bash
# macOS
brew install ollama

# 拉取模型
ollama pull qwen2.5:latest
```

### 4.2 Spring Boot 配置

```yaml
spring:
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        options:
          model: qwen2.5:latest
          temperature: 0.7
```

### 4.3 使用本地模型

```java
@Configuration
public class OllamaConfig {
    // Spring AI 自动配置 Ollama 客户端
    // 无需额外代码
}
```

## 五、流式响应

对于长文本生成，流式响应可以提供更好的用户体验：

```java
@Service
public class StreamingChatService {
    private final ChatModel chatModel;
    public StreamingChatService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }
    public Flux<String> streamChat(String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return chatModel.stream(prompt)
            .map(resp -> resp.getResult().getOutput().getText());
    }
}
```

### Controller 示例

```java
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private StreamingChatService streamingChatService;
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> stream(@RequestParam String message) {
        return streamingChatService.streamChat(message);
    }
}
```

## 六、常见疑问

**Q1：如何动态切换模型？**
A：可以在配置文件中设置 `spring.ai.openai.chat.options.model`，或通过代码传入 `ChatOptions`。

**Q2：Ollama 和本地部署有什么区别？**
A：Ollama 是一个简化的本地模型运行工具，支持多种开源模型，开箱即用。

**Q3：流式响应和普通响应有什么性能差异？**
A：流式响应不减少总耗时，但用户可以看到实时输出，体验更好。

## 七、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| ChatModel | 对话生成 | chatModel.call(prompt) |
| EmbeddingModel | 文本向量化 | embeddingModel.embed(text) |
| Ollama | 本地模型运行 | ollama pull <model> |
| 流式响应 | 实时输出 | chatModel.stream(prompt) |
| 多提供商 | 切换配置 | spring.ai.xxx.* |

## 八、动手练习

1. 安装 Ollama 并拉取一个本地模型
2. 配置 Spring Boot 使用 Ollama
3. 实现一个流式响应的聊天接口
