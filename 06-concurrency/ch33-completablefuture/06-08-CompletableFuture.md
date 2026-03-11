# 26.8 CompletableFuture：异步编程

## 一、先问一个问题

**什么是异步编程？为什么需要 CompletableFuture？**

### 生活例子：餐厅点餐

```
同步编程
├── 点餐 → 等待 → 取餐 → 吃饭
└── 浪费时间

异步编程
├── 点餐 → 玩手机 → 叫号 → 取餐 → 吃饭
└── 高效利用时间
```

**CompletableFuture**：
- Java 8 引入
- 异步编程
- 链式调用
- 组合多个异步任务

## 二、Future vs CompletableFuture

### Future 的局限

```java
// Future（Java 5）
Future<Integer> future = executor.submit(() -> {
    return 100;
});

// 问题：
// 1. 阻塞获取结果
Integer result = future.get();  // 阻塞

// 2. 无法链式调用
// 3. 无法组合多个任务
// 4. 无法手动完成
```

### CompletableFuture 的优势

```java
// CompletableFuture（Java 8）
CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
    return 100;
});

// 优势：
// 1. 非阻塞
future.thenAccept(result -> System.out.println(result));

// 2. 链式调用
future.thenApply(r -> r * 2).thenAccept(System.out::println);

// 3. 组合任务
CompletableFuture.allOf(future1, future2);

// 4. 手动完成
future.complete(200);
```

## 三、创建 CompletableFuture

### supplyAsync（有返回值）

```java
// 使用默认线程池（ForkJoinPool.commonPool）
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
});

// 使用自定义线程池
ExecutorService executor = Executors.newFixedThreadPool(10);
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
}, executor);
```

### runAsync（无返回值）

```java
CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
    System.out.println("执行任务");
});
```

### completedFuture（直接完成）

```java
CompletableFuture<String> future = CompletableFuture.completedFuture("结果");
```

## 四、处理结果

### thenApply（转换结果）

```java
CompletableFuture<Integer> future = CompletableFuture
    .supplyAsync(() -> "Hello")
    .thenApply(s -> s.length());

// 结果：5
```

### thenAccept（消费结果）

```java
CompletableFuture<Void> future = CompletableFuture
    .supplyAsync(() -> "Hello")
    .thenAccept(s -> System.out.println(s));

// 输出：Hello
```

### thenRun（不关心结果）

```java
CompletableFuture<Void> future = CompletableFuture
    .supplyAsync(() -> "Hello")
    .thenRun(() -> System.out.println("任务完成"));

// 输出：任务完成
```

### thenCompose（链式调用）

```java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> "Hello")
    .thenCompose(s -> CompletableFuture.supplyAsync(() -> s + " World"));

// 结果：Hello World
```

### thenCombine（组合两个任务）

```java
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = future1.thenCombine(future2, (s1, s2) -> s1 + " " + s2);

// 结果：Hello World
```

## 五、异常处理

### exceptionally（异常处理）

```java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> {
        throw new RuntimeException("错误");
    })
    .exceptionally(ex -> "默认值");

// 结果：默认值
```

### handle（无论成功失败）

```java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> {
        throw new RuntimeException("错误");
    })
    .handle((result, ex) -> {
        if (ex != null) {
            return "处理异常：" + ex.getMessage();
        }
        return result;
    });

// 结果：处理异常：错误
```

### whenComplete（完成回调）

```java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> "Hello")
    .whenComplete((result, ex) -> {
        if (ex != null) {
            System.out.println("异常：" + ex.getMessage());
        } else {
            System.out.println("结果：" + result);
        }
    });
```

## 六、组合多个任务

### allOf（等待所有完成）

```java
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "A");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "B");
CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> "C");

CompletableFuture<Void> all = CompletableFuture.allOf(future1, future2, future3);

all.thenRun(() -> {
    try {
        String r1 = future1.get();
        String r2 = future2.get();
        String r3 = future3.get();
        System.out.println(r1 + r2 + r3);  // ABC
    } catch (Exception e) {}
});
```

### anyOf（等待第一个完成）

```java
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
    Thread.sleep(3000);
    return "A";
});

CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
    Thread.sleep(2000);
    return "B";
});

CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> {
    Thread.sleep(1000);
    return "C";
});

CompletableFuture<Object> any = CompletableFuture.anyOf(future1, future2, future3);

any.thenAccept(result -> {
    System.out.println("第一个完成：" + result);  // C
});
```

## 七、实际应用场景

### 场景 1：并行调用多个服务

```java
public class UserService {
    
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;
    @Autowired
    private LogService logService;
    
    public UserInfo getUserInfo(Long userId) {
        // 并行调用
        CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> 
            getUserById(userId)
        );
        
        CompletableFuture<List<Order>> orderFuture = CompletableFuture.supplyAsync(() -> 
            orderService.getOrdersByUserId(userId)
        );
        
        CompletableFuture<List<Product>> productFuture = CompletableFuture.supplyAsync(() -> 
            productService.getFavoriteProducts(userId)
        );
        
        // 等待所有完成
        CompletableFuture.allOf(userFuture, orderFuture, productFuture).join();
        
        // 组合结果
        UserInfo info = new UserInfo();
        info.setUser(userFuture.join());
        info.setOrders(orderFuture.join());
        info.setProducts(productFuture.join());
        
        return info;
    }
}
```

### 场景 2：超时处理

```java
public class TimeoutDemo {
    
    public String getDataWithTimeout() {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // 耗时操作
            return fetchData();
        });
        
        try {
            // 设置超时
            return future.get(5, TimeUnit.SECONDS);
        } catch (TimeoutException e) {
            return "超时，返回默认值";
        } catch (Exception e) {
            return "错误：" + e.getMessage();
        }
    }
}
```

### 场景 3：重试机制

```java
public class RetryDemo {
    
    public CompletableFuture<String> fetchDataWithRetry(int maxRetries) {
        return fetchData()
            .exceptionally(ex -> {
                if (maxRetries > 0) {
                    System.out.println("重试..." + (maxRetries));
                    return fetchDataWithRetry(maxRetries - 1).join();
                }
                throw new RuntimeException("重试失败", ex);
            });
    }
    
    private CompletableFuture<String> fetchData() {
        return CompletableFuture.supplyAsync(() -> {
            // 可能失败的操作
            return "数据";
        });
    }
}
```

## 八、小结

| 方法 | 作用 | 返回值 |
|------|------|--------|
| supplyAsync | 异步执行（有返回值） | CompletableFuture<T> |
| runAsync | 异步执行（无返回值） | CompletableFuture<Void> |
| thenApply | 转换结果 | CompletableFuture<U> |
| thenAccept | 消费结果 | CompletableFuture<Void> |
| thenRun | 完成回调 | CompletableFuture<Void> |
| thenCompose | 链式调用 | CompletableFuture<U> |
| thenCombine | 组合两个任务 | CompletableFuture<U> |
| allOf | 等待所有完成 | CompletableFuture<Void> |
| anyOf | 等待第一个完成 | CompletableFuture<Object> |
| exceptionally | 异常处理 | CompletableFuture<T> |
| handle | 完成处理（无论成功失败） | CompletableFuture<T> |

**核心要点**：
- 异步编程，非阻塞
- 链式调用，代码简洁
- 组合多个任务
- 完善的异常处理

## 九、常见问题

### Q1：CompletableFuture 和线程池有什么关系？

```java
// 不指定线程池（使用 ForkJoinPool.commonPool）
CompletableFuture.supplyAsync(() -> "Hello");

// 指定线程池（推荐）
ExecutorService executor = Executors.newFixedThreadPool(10);
CompletableFuture.supplyAsync(() -> "Hello", executor);
```

### Q2：如何获取异步任务的结果？

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "Hello");

// 阻塞获取
String result = future.get();

// 带超时
String result = future.get(5, TimeUnit.SECONDS);

// 非阻塞（推荐）
future.thenAccept(result -> System.out.println(result));
```

### Q3：如何处理异常？

```java
// 方式 1：exceptionally
future.exceptionally(ex -> "默认值");

// 方式 2：handle
future.handle((result, ex) -> {
    if (ex != null) return "默认值";
    return result;
});

// 方式 3：whenComplete
future.whenComplete((result, ex) -> {
    if (ex != null) ex.printStackTrace();
});
```

## 十、动手练习

1. 使用 CompletableFuture 实现异步任务
2. 使用 thenApply 转换结果
3. 使用 thenCombine 组合两个任务
4. 使用 allOf 等待所有任务完成
5. 使用 exceptionally 处理异常

---

[上一节：26.7 并发集合](./06-07-并发集合.md) | 
[下一章：第 7 部分 Java 8+ 新特性](../07-java8+/README.md)

## 多线程与并发完成！

通过这 8 节，你完成了：
1. ✅ 线程基础（创建、状态、方法）
2. ✅ 线程安全（synchronized、Lock、volatile）
3. ✅ 线程通信（wait/notify、Condition）
4. ✅ 线程池（ThreadPoolExecutor）
5. ✅ 并发工具类（CountDownLatch、CyclicBarrier、Semaphore）
6. ✅ 原子类（AtomicInteger、LongAdder）
7. ✅ 并发集合（ConcurrentHashMap、BlockingQueue）
8. ✅ CompletableFuture（异步编程）

---

[上一节：26.7 并发集合](./06-07-并发集合.md)
