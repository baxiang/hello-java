# 7.4 Virtual Threads（虚拟线程）

## 一、先问一个问题

**为什么 Java 传统线程模型在高并发场景下性能受限？**

生活例子：餐厅服务员 vs 自动化调度系统

- 传统线程 = 每个请求分配一个专属服务员（线程绑定 OS 线程，1-2MB）
- 虚拟线程 = 一个调度员管理成千上万个工作单元（JVM 轻量级调度）

当你开一家小餐厅，每个顾客配一个服务员没问题。但当顾客从 10 人变成 10000 人时，你不可能雇 10000 个服务员。虚拟线程就是那个聪明的调度系统——用极少的人力服务海量顾客。

核心区别：
- 平台线程阻塞时，OS 线程被占用，无法处理其他任务
- 虚拟线程阻塞时，JVM 自动将其"挂起"，把底层线程让给其他虚拟线程使用

## 二、平台线程 vs 虚拟线程

### 2.1 平台线程（Platform Threads）

- 每个线程绑定 OS 线程（1-2MB 内存）
- 阻塞操作浪费 OS 资源
- 线程池通常限制在几百个
- 创建和销毁需要系统调用

```java
// 平台线程池，通常配置核心线程数
ExecutorService pool = Executors.newFixedThreadPool(200);
```

### 2.2 虚拟线程（Virtual Threads）

- 轻量级，内存仅几 KB
- JVM 自动调度到少量平台线程上（称为 carrier threads）
- 可以创建百万级虚拟线程
- Java 21 正式特性（JEP 444）
- 阻塞操作不占用 carrier thread

```java
// 虚拟线程，无需配置线程池大小
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
```

### 对比表

| 特性 | 平台线程 | 虚拟线程 |
|------|----------|----------|
| 内存占用 | 1-2 MB | 几 KB |
| 创建成本 | 高（OS 调用） | 低（JVM 管理） |
| 适合场景 | CPU 密集型 | I/O 密集型 |
| 并发数量 | 几百到几千 | 百万级 |
| 阻塞成本 | 高 | 低（自动卸载） |
| 调度方式 | OS 调度 | JVM 调度 |

## 三、创建虚拟线程

### 3.1 Thread.startVirtualThread()

最简单的方式，直接启动并运行：

```java
Thread.startVirtualThread(() -> {
    System.out.println("Running in virtual thread: " + Thread.currentThread().getName());
});
```

### 3.2 Thread.ofVirtual()

需要更多配置时使用（命名、异常处理等）：

```java
Thread virtualThread = Thread.ofVirtual()
    .name("worker-")
    .unstarted(() -> {
        System.out.println("Virtual thread started");
    });
virtualThread.start();
```

### 3.3 Executors.newVirtualThreadPerTaskExecutor()

批量任务场景的推荐方式：

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10000; i++) {
        executor.submit(() -> {
            Thread.sleep(100);
            return "task completed";
        });
    }
} // try-with-resources 自动等待所有任务完成
```

注意：虚拟线程不需要线程池！每个任务创建新虚拟线程即可，JVM 会自动优化调度。

## 四、高并发场景示例

传统方式需要复杂的线程池调优，虚拟线程可以直接创建：

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = new ArrayList<>();
    for (int i = 0; i < 10000; i++) {
        final int id = i;
        futures.add(executor.submit(() -> {
            // 模拟 I/O 操作
            Thread.sleep(50);
            return "result-" + id;
        }));
    }
    // 收集结果
    for (Future<String> f : futures) {
        System.out.println(f.get());
    }
}
```

### 性能对比

- 10000 个平台线程：~10-20 GB 内存
- 10000 个虚拟线程：~50-100 MB 内存
- 吞吐量提升约 10 倍

虚拟线程的关键机制：
- **Mount/Unmount**：虚拟线程阻塞时从 carrier thread 卸载，恢复时重新挂载
- **FIFO 调度**：默认使用 FIFO 队列调度虚拟线程到 carrier thread
- **阻塞检测**：JVM 自动检测 I/O 阻塞并触发调度切换

## 五、适用与不适用的场景

### 适合虚拟线程

- HTTP 请求处理（Web 服务器）
- 数据库查询
- 文件 I/O
- 微服务间调用

共同特点：大量时间等待外部响应，CPU 利用率低

### 不适合虚拟线程

- CPU 密集型计算（矩阵运算、加密）
- 长时间持有 synchronized 锁的操作
- 需要 ThreadLocal 大量数据的场景

原因：虚拟线程的优势在于 I/O 等待时的调度切换，纯 CPU 任务无法从中受益。

### 注意事项

- `synchronized` 会导致 carrier thread 阻塞，建议使用 `ReentrantLock`
- 大量 ThreadLocal 数据会增加虚拟线程的内存开销
- 虚拟线程的栈是动态增长的，初始仅占几百字节

## 六、与 Reactive 编程的对比

| 方式 | 代码风格 | 调试难度 | 性能 | 学习曲线 |
|------|----------|----------|------|----------|
| 虚拟线程 | 同步风格 | 低 | 高 | 低 |
| Reactive | 异步链式 | 高 | 高 | 高 |

代码对比：

```java
// Reactive（WebFlux）- 异步链式调用
Mono<String> result = webClient.get()
    .uri("/api/data")
    .retrieve()
    .bodyToMono(String.class)
    .flatMap(data -> process(data));

// 虚拟线程（同步风格，同样性能）
String data = httpClient.get("/api/data");
String result = process(data);
```

虚拟线程的核心优势：**用同步代码的风格，获得异步编程的性能**。

迁移建议：
- 现有代码中的 `ExecutorService` 可以直接替换为 `newVirtualThreadPerTaskExecutor()`
- 不需要修改业务逻辑，保持原有的同步代码风格
- 重点关注 `synchronized` 的使用，必要时替换为 `ReentrantLock`

## 七、小结

| 概念 | 说明 |
|------|------|
| 虚拟线程 | JVM 管理的轻量级线程 |
| 适用场景 | I/O 密集型高并发 |
| 不适用 | CPU 密集型、锁竞争 |
| 创建方式 | Thread.ofVirtual() / Executors |
| Java 版本 | Java 21 正式特性（JEP 444） |
| 核心价值 | 同步代码风格 + 异步性能 |
