# 第 6 部分：多线程与并发

## 章节目录

| 章节 | 内容 | 核心知识点 |
|------|------|------------|
| [26.1 线程基础](./ch26-thread-base/06-01-线程基础.md) | 创建线程、线程状态 | Thread、Runnable、Callable |
| [26.2 线程安全](./ch27-thread-safe/06-02-线程安全.md) | synchronized、Lock | 锁机制、volatile |
| [26.3 线程通信](./ch28-thread-communication/06-03-线程通信.md) | wait/notify | 生产者消费者 |
| [26.4 线程池](./ch29-thread-pool/06-04-线程池.md) | ThreadPoolExecutor | 线程池参数、拒绝策略 |
| [26.5 并发工具类](./ch30-advanced/06-05-并发工具类.md) | CountDownLatch、CyclicBarrier | 并发工具 |
| [26.6 原子类](./ch31-atomic/06-06-原子类.md) | AtomicInteger、LongAdder | CAS、原子操作 |
| [26.7 并发集合](./ch32-concurrent-collections/06-07-并发集合.md) | ConcurrentHashMap、BlockingQueue | 线程安全集合 |
| [26.8 CompletableFuture](./ch33-completablefuture/06-08-CompletableFuture.md) | 异步编程 | 异步任务编排 |

## 学习路线

```
第 1 步：线程基础      → 创建线程、线程状态
    ↓
第 2 步：线程安全      → synchronized、Lock、volatile
    ↓
第 3 步：线程通信      → wait/notify、生产者消费者
    ↓
第 4 步：线程池        → ThreadPoolExecutor、参数配置
    ↓
第 5 步：并发工具类    → CountDownLatch、CyclicBarrier
    ↓
第 6 步：原子类        → AtomicInteger、CAS
    ↓
第 7 步：并发集合      → ConcurrentHashMap、BlockingQueue
    ↓
第 8 步：CompletableFuture → 异步编程
```

## 并发编程核心概念

```
线程创建
├── Thread
├── Runnable
└── Callable

线程安全
├── synchronized
├── Lock
└── volatile

线程通信
├── wait/notify
├── Condition
└── BlockingQueue

线程池
├── ThreadPoolExecutor
├── Executors
└── ForkJoinPool

并发工具
├── CountDownLatch
├── CyclicBarrier
├── Semaphore
└── Phaser

原子类
├── AtomicInteger
├── AtomicReference
└── LongAdder

并发集合
├── ConcurrentHashMap
├── CopyOnWriteArrayList
└── BlockingQueue

异步编程
├── Future
├── CompletableFuture
└── ExecutorService
```

---

[上一部分：第 5 部分 异常处理与 IO](../05-exception-io/README.md) | 
[下一节：26.1 线程基础](./ch26-thread-base/06-01-线程基础.md)
