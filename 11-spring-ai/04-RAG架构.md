# 84.1 RAG 架构：让 AI 拥有记忆的图书馆（生活类比：开卷考试）

## 一、先问一个问题

**问题**：AI 模型的知识是训练截止日期之前的，如何让它回答最新或私有领域的问题？

### 生活例子：开卷考试

想象两种考试：
- **闭卷考试**：只能凭记忆答题（普通 LLM，知识有限且可能过时）
- **开卷考试**：可以翻阅课本找答案（RAG，先检索再回答）

RAG（Retrieval-Augmented Generation）就是让 AI "翻书"再答题！

## 二、RAG 核心流程

```
用户提问
  ↓
1. 检索（Retrieval）→ 从知识库找到相关文档
  ↓
2. 增强（Augmented）→ 把文档作为上下文拼入 Prompt
  ↓
3. 生成（Generation）→ LLM 基于上下文生成回答
```

| 步骤 | 说明 | 类比 |
|------|------|------|
| 检索 | 根据问题搜索相关文档 | 翻书找章节 |
| 增强 | 将文档拼入 Prompt | 把课本内容抄到草稿纸上 |
| 生成 | LLM 基于上下文回答 | 参考草稿纸答题 |

## 三、Spring AI RAG 实现

### 3.1 文档加载与切分

```java
@Component
public class DocumentLoader {

    private final DocumentReader reader;
    private final DocumentTransformer splitter;

    public DocumentLoader(TikaDocumentReader reader) {
        this.reader = reader;
        this.splitter = new TokenTextSplitter(
            800,   // 每段最大 Token 数
            200,   // 重叠 Token 数
            5,     // 最大重叠段数
            10000, // 最大文档长度
            true   // 保留分隔符
        );
    }

    public List<Document> loadAndSplit(Resource resource) {
        List<Document> docs = reader.get();
        return splitter.apply(docs);
    }
}
```

### 3.2 构建检索器

```java
@Service
public class RAGService {

    private final VectorStore vectorStore;
    private final ChatClient chatClient;

    public RAGService(VectorStore vectorStore, ChatClient.Builder builder) {
        this.vectorStore = vectorStore;
        this.chatClient = builder.build();
    }

    public String ask(String question) {
        // 1. 检索相关文档（Top 4）
        List<Document> docs = vectorStore.similaritySearch(
            SearchRequest.builder()
                .query(question)
                .topK(4)
                .build()
        );

        // 2. 拼接上下文
        String context = docs.stream()
            .map(Document::getText)
            .collect(Collectors.joining("\n\n"));

        // 3. 生成回答
        return chatClient.prompt()
            .system("根据以下参考资料回答问题，如果资料中没有相关内容，请说明。")
            .user("参考资料：\n{context}\n\n问题：{question}")
            .build()
            .call()
            .content();
    }
}
```

### 3.3 索引文档

```java
@Component
public class KnowledgeBaseInitializer {

    private final VectorStore vectorStore;
    private final DocumentLoader loader;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        Resource resource = new ClassPathResource("knowledge/faq.txt");
        List<Document> chunks = loader.loadAndSplit(resource);
        vectorStore.add(chunks);
    }
}
```

## 四、常见疑问

**Q1：RAG 和微调（Fine-tuning）有什么区别？**
A：RAG 是运行时检索外部知识，适合知识频繁更新的场景；微调是修改模型参数，适合改变模型行为风格。两者可结合使用。

**Q2：文档切分大小如何选择？**
A：一般 500-1000 Token，太长会引入噪声，太短会丢失上下文。重叠部分（overlap）建议 10%-20%。

**Q3：检索结果不相关怎么办？**
A：优化 Embedding 模型、调整 topK 参数、添加元数据过滤、使用混合检索（关键词+语义）。

## 五、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| RAG | 检索增强生成 | 检索→增强→生成 |
| VectorStore | 向量存储与检索 | vectorStore.similaritySearch() |
| TokenTextSplitter | 文档切分 | new TokenTextSplitter(800, 200, ...) |
| Document | 文档对象 | 包含 text + metadata |
