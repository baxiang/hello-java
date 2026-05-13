# 54.2 Spring AMQP：消息操作（生活类比：快递公司）

## 一、先问一个问题
**问题**：如何灵活地发送和接收不同类型的消息？

### 生活例子
快递公司的工作流程：
- **普通包裹**（简单消息）— 直接投递
- **保价包裹**（带属性的消息）— 需要填写单据、标注特殊要求
- **定时送达**（延迟消息）— 指定时间才派送
- **签收确认**（手动确认）— 必须收件人签字才算完成

Spring AMQP 就是消息世界的"快递系统"！`RabbitTemplate` 是快递员，`@RabbitListener` 是收件窗口。

## 二、发送消息

### 2.1 发送对象

```java
@Service
public class MessageService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendObject(Object obj) {
        rabbitTemplate.convertAndSend("exchange", "routing", obj);
    }
}
```
`convertAndSend` 自动将对象序列化为消息体，类似快递员帮你打包。```java
@Configuration
public class RabbitConfig {
    
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory factory) {
        RabbitTemplate template = new RabbitTemplate(factory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }
}
```
配置 JSON 转换器后，`convertAndSend` 会自动将对象转为 JSON 格式，接收端也能自动反序列化。

### 2.2 发送带属性的消息

```java
@Service
public class MessageService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendMessage(String message) {
        MessageProperties properties = new MessageProperties();
        properties.setContentType("text/plain");
        properties.setHeader("priority", "high");
        
        Message msg = new Message(message.getBytes(), properties);
        rabbitTemplate.send("exchange", "routing", msg);
    }
}
```
`send` 方法需要手动构建 `Message`，适合需要精细控制消息属性的场景，比如设置优先级、过期时间等。

## 三、接收消息

### 3.1 简单监听

```java
@Component
public class MessageListener {
    
    @RabbitListener(queues = "simple.queue")
    public void handleSimple(String message) {
        System.out.println("收到消息：" + message);
    }
    
    @RabbitListener(queues = "object.queue")
    public void handleObject(User user) {
        System.out.println("收到用户：" + user);
    }
}
```
`@RabbitListener` 自动反序列化消息体为目标类型，方法参数即接收到的数据。可以同时监听多个队列，也可以在方法上使用 `@RabbitHandler` 实现多态分发。

### 3.2 手动确认

```java
@Component
public class MessageListener {
    
    @RabbitListener(queues = "manual.queue")
    public void handleManual(Message message, Channel channel,
                            @Header(AmqpHeaders.DELIVERY_TAG) long tag) 
                            throws IOException {
        try {
            String body = new String(message.getBody());
            System.out.println("收到消息：" + body);
            
            // 业务处理
            processOrder(body);
            
            // 确认消息处理成功
            channel.basicAck(tag, false);
        } catch (Exception e) {
            // 拒绝消息，重新入队
            channel.basicNack(tag, false, true);
        }
    }
}
```
手动确认需要在配置中设置 `acknowledge-mode: manual`。`basicAck` 表示签收成功，`basicNack` 的第三个参数控制是否重新入队。

## 四、延迟消息

```java
@Service
public class MessageService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendDelayMessage(Object obj, int delayMillis) {
        rabbitTemplate.convertAndSend("delay.exchange", "delay.routing", obj,
            message -> {
                message.getMessageProperties().setDelay(delayMillis);
                return message;
            });
    }
}
```
延迟消息需要安装 **RabbitMQ Delayed Message Plugin**，并配置 `x-delayed-message` 类型的交换机。典型场景：订单 30 分钟未支付自动取消。

## 五、常见疑问

**Q1：basicAck 和 basicNack 有什么区别？**
A：`basicAck` 确认消息已成功处理；`basicNack` 拒绝消息，第三个参数 `requeue=true` 时消息重新入队，`false` 时进入死信队列。

**Q2：延迟消息需要什么插件？**
A：需要安装 RabbitMQ Delayed Message Plugin，并在声明交换机时设置 `x-delayed-type` 为 `direct`、`topic` 等。

**Q3：自动确认和手动确认怎么选？**
A：自动确认适合不重要的消息；手动确认适合需要保证处理成功的业务，如订单、支付等。

## 六、小结

| 操作 | 方法 | 说明 |
|------|------|------|
| 发送对象 | `convertAndSend()` | 自动序列化 |
| 发送消息 | `send()` | 手动构建 Message |
| 延迟消息 | `setDelay()` | 需要插件支持 |
| 监听消息 | `@RabbitListener` | 自动反序列化 |
| 手动确认 | `basicAck/basicNack` | 确保处理成功 |
