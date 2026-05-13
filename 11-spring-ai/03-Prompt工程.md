# 83.1 Prompt 工程：提问的艺术（生活类比：面试考官）

## 一、先问一个问题

**问题**：为什么同一个 AI，不同的人问出不同的问题，得到的回答质量差异很大？

### 生活例子：面试考官

想象你是一位面试考官：
- 模糊的问题："介绍一下自己" → 候选人泛泛而谈，信息量低
- 具体的问题："请举例说明你在上家公司如何解决一个复杂的技术难题" → 高质量、有深度的回答

Prompt 工程就是"如何问出好问题"的艺术！AI 就像一位能力超强但需要明确指引的候选人。

## 二、Prompt 基础结构

一个完整的 Prompt 由多条消息组成，每种消息有不同的角色：

| 部分 | 说明 | 示例 |
|------|------|------|
| System | 系统指令，定义 AI 角色和行为边界 | "你是一个 Java 专家..." |
| User | 用户输入的具体问题 | "请解释 Spring Boot 的优势" |
| Assistant | AI 历史回复，用于多轮对话上下文 | "Spring Boot 简化了..." |

```java
Prompt prompt = new Prompt(
    List.of(
        new SystemMessage("你是一个专业的 Java 工程师，擅长用通俗语言解释技术概念"),
        new UserMessage("什么是虚拟线程？它和传统线程有什么区别？")
    )
);
```

## 三、PromptTemplate 与变量

使用模板动态生成 Prompt，避免硬编码：

```java
@Service
public class TemplateService {
    
    private final ChatClient chatClient;
    
    public TemplateService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }
    
    public String explainConcept(String concept, String level) {
        PromptTemplate template = new PromptTemplate("""
            你是一个{level}水平的 Java 老师。
            请用简单易懂的方式解释概念：{concept}
            并提供一个实际项目中的代码示例。
            最后总结三个关键要点。
            """);
        
        Map<String, Object> params = Map.of(
            "concept", concept,
            "level", level
        );
        
        Prompt prompt = template.create(params);
        return chatClient.prompt(prompt).call().content();
    }
}
```

## 四、Few-shot Prompting

通过提供示例让 AI 学习期望的输出模式：

```java
public String translateWithExamples(String text) {
    PromptTemplate template = new PromptTemplate("""
        将中文翻译成英文。参考以下示例：
        
        示例 1：
        输入：今天天气很好
        输出：The weather is nice today
        
        示例 2：
        输入：我喜欢编程
        输出：I love programming
        
        示例 3：
        输入：这个项目使用了 Spring Boot 框架
        输出：This project uses the Spring Boot framework
        
        现在翻译：{input}
        只输出翻译结果，不要解释。
        """);
    
    return chatClient.prompt()
        .user(template.render(Map.of("input", text)))
        .call()
        .content();
}
```

## 五、输出解析器

将 AI 的文本响应解析为 Java 对象，方便后续处理：

```java
public record Book(String title, String author, int year) {}

public Book parseBookInfo(String description) {
    BeanOutputConverter<Book> converter = 
        new BeanOutputConverter<>(Book.class);
    
    String format = converter.getFormat();
    
    String response = chatClient.prompt()
        .user("""
            从以下描述中提取书籍信息，以 JSON 格式返回：
            {description}
            
            格式要求：
            {format}
            """.formatted(Map.of("description", description, "format", format)))
        .call()
        .content();
    
    return converter.convert(response);
}
```

## 六、常见疑问

**Q1：System Message 和 User Message 有什么区别？**  
A：System Message 定义 AI 的行为和角色，优先级最高，影响整个对话风格；User Message 是具体的问题或指令。

**Q2：如何提高 Prompt 的质量？**  
A：五个原则：明确具体、提供上下文、使用示例（Few-shot）、指定输出格式、引导分步思考（Chain of Thought）。

**Q3：Output Parser 失败怎么办？**  
A：在 Prompt 中强调格式要求，添加"必须严格遵循格式"等约束；或实现重试机制，在解析失败时重新请求。

## 七、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| Prompt | 输入提示，包含多条消息 | `new Prompt(messages)` |
| PromptTemplate | 模板与变量替换 | `new PromptTemplate("...{var}...")` |
| Few-shot | 通过示例引导 AI 输出 | 在模板中包含示例输入输出对 |
| BeanOutputConverter | 将响应解析为 Java Bean | `new BeanOutputConverter<>(Class)` |
| SystemMessage | 定义 AI 角色和行为 | `new SystemMessage("...")` |
