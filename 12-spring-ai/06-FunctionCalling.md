# 86.1 Function Calling：让 AI 调用工具（生活类比：智能助手打电话）

## 一、先问一个问题

**问题**：AI 只能生成文本，如何让它查询数据库、调用 API、执行实际操作？

### 生活例子：智能助手打电话

想象你有一个智能助手：
- 你问："今天北京天气怎么样？"
- 助手自己不知道，但它可以**打电话给气象局查询**
- 然后把查询结果整理后回答你

Function Calling 就是让 AI "打电话查信息"的能力——AI 判断何时需要调用工具，然后使用工具返回的结果生成回答。

## 二、Function Calling 流程

```
用户提问："北京今天天气如何？"
  ↓
1. LLM 判断需要调用工具 → 返回函数调用请求
  ↓
2. Spring AI 执行对应 Java 方法 → 获取结果
  ↓
3. 将结果返回给 LLM → 生成最终回答
```

## 三、定义工具函数

### 3.1 方式一：@Bean 注册

```java
@Configuration
public class ToolConfig {

    @Bean
    @Description("查询指定城市的当前天气")
    public Function<WeatherRequest, WeatherResponse> weatherFunction() {
        return request -> {
            // 调用天气 API（示例）
            String url = "https://api.weather.com/current?city=" + request.city();
            return restTemplate.getForObject(url, WeatherResponse.class);
        };
    }
}

record WeatherRequest(String city) {}
record WeatherResponse(String city, double temperature, String description) {}
```

### 3.2 方式二：ChatClient 内联

```java
@Service
public class SmartAssistant {

    private final ChatClient chatClient;

    public SmartAssistant(ChatClient.Builder builder) {
        this.chatClient = builder
            .defaultFunctions("weatherFunction")
            .build();
    }

    public String ask(String question) {
        return chatClient.prompt()
            .user(question)
            .call()
            .content();
    }
}
```

## 四、多工具编排

AI 可以根据问题自动选择合适的工具：

```java
@Configuration
public class MultiToolConfig {

    @Bean
    @Description("查询订单状态，参数为订单号")
    public Function<OrderQuery, OrderInfo> orderStatusFunction(OrderService orderService) {
        return query -> orderService.getOrder(query.orderId());
    }

    @Bean
    @Description("查询商品库存，参数为商品ID")
    public Function<StockQuery, StockInfo> stockFunction(StockService stockService) {
        return query -> stockService.getStock(query.productId());
    }
}

record OrderQuery(String orderId) {}
record StockQuery(String productId) {}
```

调用时 AI 会自动判断用哪个工具：

```java
// 用户问 "我的订单 ORD001 到哪了？" → AI 自动调用 orderStatusFunction
// 用户问 "商品 P123 还有库存吗？" → AI 自动调用 stockFunction
chatClient.prompt()
    .functions("orderStatusFunction", "stockFunction")
    .user(userMessage)
    .call()
    .content();
```

## 五、常见疑问

**Q1：AI 怎么知道什么时候该调用工具？**
A：通过 `@Description` 注解的描述，AI 判断用户问题是否匹配工具的功能。描述越清晰，判断越准确。

**Q2：工具调用失败怎么办？**
A：可以在 Function 中捕获异常并返回错误信息，AI 会根据错误信息给出替代回答或重试建议。

**Q3：Function Calling 和 RAG 有什么区别？**
A：RAG 是从静态知识库检索信息，Function Calling 是实时调用外部 API 或服务。两者常配合使用。

## 六、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| @Description | 描述工具功能，供 AI 判断 | @Description("查询天气") |
| Function<I,O> | 工具函数定义 | Function<Request, Response> |
| defaultFunctions | 默认绑定的工具 | builder.defaultFunctions("name") |
| .functions() | 按请求动态绑定工具 | prompt().functions("a", "b") |

## 七、动手练习

1. 定义一个"计算器"工具函数，让 AI 处理数学运算
2. 实现查询订单状态的 Function Calling，测试 AI 自动选择工具
3. 组合两个以上工具，观察 AI 如何根据问题选择正确的工具
