# 54.1 RabbitMQ 基础：消息中间件（生活类比：邮局系统）

## 一、先问一个问题

**问题**：如何让两个独立系统异步通信？

在传统同步调用中，服务 A 必须等待服务 B 返回结果才能继续执行。如果服务 B 响应慢或宕机，服务 A 也会被阻塞。

引入消息队列后，服务 A 只需将消息投递到队列即可立即返回，服务 B 在合适的时间从队列中取出处理。两者完全解耦。

### 生活例子

邮局系统：
- 寄件人投递信件（生产者发送消息）
- 邮局分拣处理（交换机路由）
- 邮筒暂存（队列存储）
- 收件人取件（消费者接收）

RabbitMQ 就是系统的"邮局"！

### RabbitMQ 核心概念

| 概念 | 说明 |
|------|------|
| Producer | 生产者，发送消息的应用 |
| Consumer | 消费者，接收消息的应用 |
| Queue | 队列，存储消息的缓冲区 |
| Exchange | 交换机，接收生产者消息并路由到队列 |
| Binding | 绑定规则，定义交换机与队列的关系 |
| Routing Key | 路由键，交换机根据它决定消息去向 |

## 二、添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

## 三、配置文件

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    listener:
      simple:
        acknowledge-mode: manual  # 手动确认
```

## 四、配置类

```java
@Configuration
public class RabbitMQConfig {
    
    // 队列
    @Bean
    public Queue orderQueue() {
        return new Queue("order.queue", true);
    }
    
    // 交换机
    @Bean
    public DirectExchange orderExchange() {
        return new DirectExchange("order.exchange");
    }
    
    // 绑定
    @Bean
    public Binding orderBinding(Queue orderQueue, DirectExchange orderExchange) {
        return BindingBuilder.bind(orderQueue)
                .to(orderExchange)
                .with("order.routing");
    }
}
```

## 五、生产者与消费者

### 5.1 消息生产者

```java
@Service
public class OrderProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendOrder(Order order) {
        rabbitTemplate.convertAndSend(
            "order.exchange",
            "order.routing",
            order
        );
    }
}
```

### 5.2 消息消费者

```java
@Component
public class OrderConsumer {
    
    @RabbitListener(queues = "order.queue")
    public void receiveOrder(Order order, Channel channel, 
                            @Header(AmqpHeaders.DELIVERY_TAG) long tag) {
        try {
            System.out.println("收到订单：" + order);
            
            // 业务处理
            // ...
            
            // 手动确认
            channel.basicAck(tag, false);
        } catch (Exception e) {
            try {
                // 拒绝消息，重新入队
                channel.basicNack(tag, false, true);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}
```

## 六、常见疑问

**Q1：交换机和队列是什么关系？**

A：生产者发送消息到交换机，交换机根据路由规则将消息路由到一个或多个队列，消费者从队列中获取消息。

**Q2：手动确认和自动确认有什么区别？**

A：自动确认后消息立即删除；手动确认确保业务处理成功后才删除，失败可以重新入队。

## 七、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| Queue | 消息队列 | new Queue("name", durable) |
| Exchange | 交换机 | DirectExchange, TopicExchange |
| Binding | 绑定关系 | BindingBuilder.bind().to().with() |
| RabbitTemplate | 发送消息 | convertAndSend() |
| @RabbitListener | 监听消息 | 注解在方法上 |
