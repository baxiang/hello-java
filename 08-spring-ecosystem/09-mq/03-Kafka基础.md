# 54.3 Kafka 基础：高吞吐消息（生活类比：高速公路）

## 一、先问一个问题

**问题**：如何处理每秒百万级的消息？

### 生活例子：高速公路

想象一条繁忙的高速公路：

- **多车道并行**（分区并行处理）— 每个车道独立行驶，互不干扰
- **车流不断**（高吞吐）— 车辆持续驶入，通行量大
- **按顺序行驶**（分区有序）— 同一车道内的车辆保持先后顺序
- **出入口固定**（Topic 订阅）— 车辆从指定入口进入，从指定出口驶出

Kafka 就是消息世界的"高速公路"！

## 二、添加依赖

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

## 三、配置文件

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    consumer:
      group-id: demo-group
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
```

## 四、配置类

```java
@Configuration
public class KafkaConfig {
    
    @Bean
    public ProducerFactory<String, String> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        return new DefaultKafkaProducerFactory<>(config);
    }
    
    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
    
    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG, "demo-group");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(config);
    }
    
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = 
            new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }
}
```

## 五、生产者与消费者

### 5.1 消息生产者

```java
@Service
public class KafkaProducer {
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    // 发送消息
    public void send(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
    
    // 发送消息带 key
    public void sendWithKey(String topic, String key, String message) {
        kafkaTemplate.send(topic, key, message);
    }
    
    // 发送消息带回调
    public void sendWithCallback(String topic, String message) {
        kafkaTemplate.send(topic, message)
            .addCallback(
                success -> System.out.println("发送成功"),
                failure -> System.out.println("发送失败：" + failure.getMessage())
            );
    }
}
```

### 5.2 消息消费者

```java
@Component
public class KafkaConsumer {
    
    @KafkaListener(topics = "demo-topic", groupId = "demo-group")
    public void consume(String message) {
        System.out.println("收到消息：" + message);
    }
    
    @KafkaListener(topics = "demo-topic", groupId = "demo-group")
    public void consumeWithKey(ConsumerRecord<String, String> record) {
        System.out.println("key: " + record.key());
        System.out.println("value: " + record.value());
        System.out.println("partition: " + record.partition());
        System.out.println("offset: " + record.offset());
    }
}
```

## 六、常见疑问

**Q1：Kafka 和 RabbitMQ 有什么区别？**

| 维度 | Kafka | RabbitMQ |
|------|-------|----------|
| 吞吐量 | 极高（百万级/秒） | 中等（万级/秒） |
| 适用场景 | 日志收集、流处理 | 复杂路由、事务消息 |
| 消息顺序 | 分区有序 | 队列有序 |
| 消息持久化 | 磁盘顺序写 | 内存+磁盘 |

**Q2：partition 和 offset 是什么？**

- **partition**：Topic 的分区，用于并行处理。就像高速公路的车道，每条车道独立通行。
- **offset**：消息在分区中的位置，用于记录消费进度。就像车辆在车道上的位置编号。

## 七、小结

| 概念 | 说明 | 关键配置 |
|------|------|----------|
| Topic | 消息主题 | 生产者发送到 Topic |
| Partition | 分区 | 并行处理，提高吞吐 |
| Offset | 偏移量 | 记录消费位置 |
| Group | 消费组 | 负载均衡 |
| KafkaTemplate | 发送消息 | send() |
| @KafkaListener | 监听消息 | topics, groupId |
