# 2026 年核心内容更新实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 hello-java 教程新增 2026 年核心内容（虚拟线程、模式匹配、Native 编译、AI 集成等），并重命名所有受影响的目录和文件章节号。

**Architecture:** 方案 A — 按现有模块插入新章节。Spring Cloud 目录整体编号 +1，项目目录整体编号 +1，在对应模块中新增章节文件。所有操作通过 git mv 保持历史记录。

**Tech Stack:** Markdown 教程文档、git（文件重命名与提交）

---

### Task 1: 重命名 Spring Cloud 目录（ch59→ch60, ..., ch68→ch69）

**说明**：将 13-spring-cloud 下所有 chXX 目录编号 +1，同时更新目录内的 .md 文件前缀和相对路径引用。

**执行命令**（按顺序，从大到小编号开始避免冲突）：

```bash
cd /Users/baxiang/Documents/hello-java
cd 13-spring-cloud

# 从 ch68 开始反向重命名
git mv ch68-seata ch69-seata
git mv ch67-stream ch68-stream
git mv ch66-sleuth-zipkin ch67-sleuth-zipkin
git mv ch65-nacos-config ch66-nacos-config
git mv ch64-gateway ch65-gateway
git mv ch63-sentinel-hystrix ch64-sentinel-hystrix
git mv ch62-openfeign ch63-openfeign
git mv ch61-loadbalancer ch62-loadbalancer
git mv ch60-nacos-eureka ch61-nacos-eureka
git mv ch59-microservice-intro ch60-microservice-intro
```

重命名目录内文件前缀（每个目录内的 .md 文件）：

```bash
# ch69-seata
git mv "ch69-seata/13-08-Seata 分布式事务.md" "ch69-seata/13-09-Seata 分布式事务.md"
# ch68-stream
git mv "ch68-stream/13-07-消息驱动.md" "ch68-stream/13-08-消息驱动.md"
# ch67-sleuth-zipkin
git mv "ch67-sleuth-zipkin/13-07-链路追踪.md" "ch67-sleuth-zipkin/13-08-链路追踪.md"
# ch66-nacos-config
git mv "ch66-nacos-config/13-06-Nacos Config 配置中心.md" "ch66-nacos-config/13-07-Nacos Config 配置中心.md"
# ch65-gateway
git mv "ch65-gateway/13-05-Gateway API 网关.md" "ch65-gateway/13-06-Gateway API 网关.md"
# ch64-sentinel-hystrix
git mv "ch64-sentinel-hystrix/13-04-Sentinel 服务熔断.md" "ch64-sentinel-hystrix/13-05-Sentinel 服务熔断.md"
# ch63-openfeign
git mv "ch63-openfeign/13-03-OpenFeign 服务调用.md" "ch63-openfeign/13-04-OpenFeign 服务调用.md"
# ch62-loadbalancer
git mv "ch62-loadbalancer/13-03-负载均衡.md" "ch62-loadbalancer/13-03-负载均衡.md"
# ch61-nacos-eureka
git mv "ch61-nacos-eureka/13-02-Nacos 服务注册发现.md" "ch61-nacos-eureka/13-02-Nacos 服务注册发现.md"
# ch60-microservice-intro
git mv "ch60-microservice-intro/13-01-微服务架构概述.md" "ch60-microservice-intro/13-01-微服务架构概述.md"
```

**验证**：
```bash
ls 13-spring-cloud/ch6*-*/ 13-spring-cloud/ch69-*/
```

### Task 2: 重命名项目目录（ch69→ch70, ..., ch79→ch80）

**说明**：将 14-project 下所有 chXX 目录编号 +1，同时更新目录内的 .md 文件前缀。

**执行命令**（反向重命名）：

```bash
cd /Users/baxiang/Documents/hello-java/14-project

git mv ch79-minispring ch80-minispring
git mv ch78-devops ch79-devops
git mv ch77-common-skills ch78-common-skills
git mv ch76-cms ch77-cms
git mv ch75-exam ch76-exam
git mv ch74-dashboard ch75-dashboard
git mv ch73-takeout ch74-takeout
git mv ch72-seckill ch73-seckill
git mv ch71-oa ch72-oa
git mv ch70-mall ch71-mall
git mv ch69-blog ch70-blog
```

更新每个目录内 .md 文件前缀：

```bash
# ch80-minispring
cd ch80-minispring
git mv "79-01-项目概述" "80-01-项目概述"
git mv "79-02-BeanDefinition" "80-02-BeanDefinition"
git mv "79-03-单例注册表" "80-03-单例注册表"
git mv "79-04-Bean 实例化" "80-04-Bean 实例化"
git mv "79-05-属性填充" "80-05-属性填充"
git mv "79-06-Bean 初始化" "80-06-Bean 初始化"
git mv "79-07-AOP 支持" "80-07-AOP 支持"
git mv "79-08-应用上下文" "80-08-应用上下文"
cd ..

# ch79-devops
cd ch79-devops
git mv "78-01-Linux 基础" "79-01-Linux 基础"
git mv "78-02-Docker 基础" "79-02-Docker 基础"
git mv "78-03-Docker Compose" "79-03-Docker Compose"
git mv "78-04-CI-CD" "79-04-CI-CD"
git mv "78-05-监控告警" "79-05-监控告警"
cd ..

# ch78-common-skills
cd ch78-common-skills
git mv "77-01-代码规范" "78-01-代码规范"
git mv "77-02-Git 工作流" "78-02-Git 工作流"
git mv "77-03-接口文档" "78-03-接口文档"
git mv "77-04-单元测试" "78-04-单元测试"
git mv "77-05-日志规范" "78-05-日志规范"
cd ..

# ch77-cms
cd ch77-cms
git mv "76-01-项目概述" "77-01-项目概述"
git mv "76-02-栏目管理" "77-02-栏目管理"
git mv "76-03-内容管理" "77-03-内容管理"
git mv "76-04-模板引擎" "77-04-模板引擎"
git mv "76-05-静态化" "77-05-静态化"
cd ..

# ch76-exam
cd ch76-exam
git mv "75-01-项目概述" "76-01-项目概述"
git mv "75-02-题库管理" "76-02-题库管理"
git mv "75-03-试卷管理" "76-03-试卷管理"
git mv "75-04-在线考试" "76-04-在线考试"
git mv "75-05-自动阅卷" "76-05-自动阅卷"
cd ..

# ch75-dashboard
cd ch75-dashboard
git mv "74-01-项目概述" "75-01-项目概述"
git mv "74-02-数据采集" "75-02-数据采集"
git mv "74-03-图表展示" "75-03-图表展示"
git mv "74-04-实时更新" "75-04-实时更新"
git mv "74-05-大屏适配" "75-05-大屏适配"
cd ..

# ch74-takeout
cd ch74-takeout
git mv "73-01-微服务拆分" "74-01-微服务拆分"
git mv "73-02-用户服务" "74-02-用户服务"
git mv "73-03-商家服务" "74-03-商家服务"
git mv "73-04-订单服务" "74-04-订单服务"
git mv "73-05-服务治理" "74-05-服务治理"
git mv "73-06-分布式事务" "74-06-分布式事务"
cd ..

# ch73-seckill
cd ch73-seckill
git mv "72-01-秒杀架构" "73-01-秒杀架构"
git mv "72-02-Redis 预减库存" "73-02-Redis 预减库存"
git mv "72-03-RabbitMQ 异步" "73-03-RabbitMQ 异步"
git mv "72-04-Sentinel 限流" "73-04-Sentinel 限流"
git mv "72-05-分布式锁" "73-05-分布式锁"
git mv "72-06-性能优化" "73-06-性能优化"
cd ..

# ch72-oa
cd ch72-oa
git mv "71-01-项目概述" "72-01-项目概述"
git mv "71-02-权限模块" "72-02-权限模块"
git mv "71-03-考勤模块" "72-03-考勤模块"
git mv "71-04-审批流程" "72-04-审批流程"
git mv "71-05-公告管理" "72-05-公告管理"
git mv "71-06-数据权限" "72-06-数据权限"
cd ..

# ch71-mall
cd ch71-mall
git mv "70-01-项目概述" "71-01-项目概述"
git mv "70-02-商品模块" "71-02-商品模块"
git mv "70-03-购物车" "71-03-购物车"
git mv "70-04-订单模块" "71-04-订单模块"
git mv "70-05-搜索模块" "71-05-搜索模块"
git mv "70-06-优化与压测" "71-06-优化与压测"
cd ..

# ch70-blog
cd ch70-blog
git mv "69-01-项目概述" "70-01-项目概述"
git mv "69-02-数据库设计" "70-02-数据库设计"
git mv "69-03-用户模块" "70-03-用户模块"
git mv "69-04-文章模块" "70-04-文章模块"
git mv "69-05-评论模块" "70-05-评论模块"
git mv "69-06-部署上线" "70-06-部署上线"
cd ..
```

### Task 3: 更新目录内 .md 文件的章节前缀

重命名子目录后，需要更新子目录内 .md 文件的章节前缀编号：

```bash
# 项目目录 - 更新 .md 文件名的前缀编号
cd /Users/baxiang/Documents/hello-java/14-project

# ch80-minispring: 14-08-xx → 14-13-xx
cd ch80-minispring
cd "80-01-项目概述"; git mv "14-08-01-项目概述.md" "14-13-01-项目概述.md"; cd ../..
cd "80-02-BeanDefinition"; git mv "14-08-02-什么是 Bean.md" "14-13-02-什么是 Bean.md"; cd ../..
cd "80-03-单例注册表"; git mv "14-08-03-单例注册表.md" "14-13-03-单例注册表.md"; cd ../..
cd "80-04-Bean 实例化"; git mv "14-08-04-Bean 实例化.md" "14-13-04-Bean 实例化.md"; cd ../..
cd "80-05-属性填充"; git mv "14-08-05-属性填充.md" "14-13-05-属性填充.md"; cd ../..
cd "80-06-Bean 初始化"; git mv "14-08-06-Bean 初始化.md" "14-13-06-Bean 初始化.md"; cd ../..
cd "80-07-AOP 支持"; git mv "14-08-07-AOP 支持.md" "14-13-07-AOP 支持.md"; cd ../..
cd "80-08-应用上下文"; git mv "14-08-08-应用上下文.md" "14-13-08-应用上下文.md"; cd ../..

# ch79-devops: 14-10-xx → 14-12-xx
cd ch79-devops
cd "79-01-Linux 基础"; git mv "14-10-Linux 基础.md" "14-12-01-Linux 基础.md"; cd ../..
cd "79-02-Docker 基础"; git mv "14-10-Docker 基础.md" "14-12-02-Docker 基础.md"; cd ../..
cd "79-03-Docker Compose"; git mv "14-10-Docker Compose.md" "14-12-03-Docker Compose.md"; cd ../..
cd "79-04-CI-CD"; git mv "14-10-CI-CD.md" "14-12-04-CI-CD.md"; cd ../..
cd "79-05-监控告警"; git mv "14-10-监控告警.md" "14-12-05-监控告警.md"; cd ../..

# ch78-common-skills: 14-09-xx → 14-11-xx
cd ch78-common-skills
cd "78-01-代码规范"; git mv "14-09-代码规范.md" "14-11-01-代码规范.md"; cd ../..
cd "78-02-Git 工作流"; git mv "14-09-Git 工作流.md" "14-11-02-Git 工作流.md"; cd ../..
cd "78-03-接口文档"; git mv "14-09-接口文档.md" "14-11-03-接口文档.md"; cd ../..
cd "78-04-单元测试"; git mv "14-09-单元测试.md" "14-11-04-单元测试.md"; cd ../..
cd "78-05-日志规范"; git mv "14-09-日志规范.md" "14-11-05-日志规范.md"; cd ../..

# ch77-cms: 14-08-xx → 14-10-xx
cd ch77-cms
cd "77-01-项目概述"; git mv "14-08-项目概述.md" "14-10-01-项目概述.md"; cd ../..
cd "77-02-栏目管理"; git mv "14-08-栏目管理.md" "14-10-02-栏目管理.md"; cd ../..
cd "77-03-内容管理"; git mv "14-08-内容管理.md" "14-10-03-内容管理.md"; cd ../..
cd "77-04-模板引擎"; git mv "14-08-模板引擎.md" "14-10-04-模板引擎.md"; cd ../..
cd "77-05-静态化"; git mv "14-08-静态化.md" "14-10-05-静态化.md"; cd ../..

# ch76-exam: 14-07-xx → 14-09-xx
cd ch76-exam
cd "76-01-项目概述"; git mv "14-07-项目概述.md" "14-09-01-项目概述.md"; cd ../..
cd "76-02-题库管理"; git mv "14-07-题库管理.md" "14-09-02-题库管理.md"; cd ../..
cd "76-03-试卷管理"; git mv "14-07-试卷管理.md" "14-09-03-试卷管理.md"; cd ../..
cd "76-04-在线考试"; git mv "14-07-在线考试.md" "14-09-04-在线考试.md"; cd ../..
cd "76-05-自动阅卷"; git mv "14-07-自动阅卷.md" "14-09-05-自动阅卷.md"; cd ../..

# ch75-dashboard: 14-06-xx → 14-08-xx
cd ch75-dashboard
cd "75-01-项目概述"; git mv "14-06-项目概述.md" "14-08-01-项目概述.md"; cd ../..
cd "75-02-数据采集"; git mv "14-06-数据采集.md" "14-08-02-数据采集.md"; cd ../..
cd "75-03-图表展示"; git mv "14-06-图表展示.md" "14-08-03-图表展示.md"; cd ../..
cd "75-04-实时更新"; git mv "14-06-实时更新.md" "14-08-04-实时更新.md"; cd ../..
cd "75-05-大屏适配"; git mv "14-06-大屏适配.md" "14-08-05-大屏适配.md"; cd ../..

# ch74-takeout: 14-05-xx → 14-07-xx
cd ch74-takeout
cd "74-01-微服务拆分"; git mv "14-05-微服务拆分.md" "14-07-01-微服务拆分.md"; cd ../..
cd "74-02-用户服务"; git mv "14-05-用户服务.md" "14-07-02-用户服务.md"; cd ../..
cd "74-03-商家服务"; git mv "14-05-商家服务.md" "14-07-03-商家服务.md"; cd ../..
cd "74-04-订单服务"; git mv "14-05-订单服务.md" "14-07-04-订单服务.md"; cd ../..
cd "74-05-服务治理"; git mv "14-05-服务治理.md" "14-07-05-服务治理.md"; cd ../..
cd "74-06-分布式事务"; git mv "14-05-分布式事务.md" "14-07-06-分布式事务.md"; cd ../..

# ch73-seckill: 14-04-xx → 14-06-xx
cd ch73-seckill
cd "73-01-秒杀架构"; git mv "14-04-秒杀架构.md" "14-06-01-秒杀架构.md"; cd ../..
cd "73-02-Redis 预减库存"; git mv "14-04-Redis 预减库存.md" "14-06-02-Redis 预减库存.md"; cd ../..
cd "73-03-RabbitMQ 异步"; git mv "14-04-RabbitMQ 异步.md" "14-06-03-RabbitMQ 异步.md"; cd ../..
cd "73-04-Sentinel 限流"; git mv "14-04-Sentinel 限流.md" "14-06-04-Sentinel 限流.md"; cd ../..
cd "73-05-分布式锁"; git mv "14-04-分布式锁.md" "14-06-05-分布式锁.md"; cd ../..
cd "73-06-性能优化"; git mv "14-04-性能优化.md" "14-06-06-性能优化.md"; cd ../..

# ch72-oa: 14-03-xx → 14-05-xx
cd ch72-oa
cd "72-01-项目概述"; git mv "14-03-项目概述.md" "14-05-01-项目概述.md"; cd ../..
cd "72-02-权限模块"; git mv "14-03-权限模块.md" "14-05-02-权限模块.md"; cd ../..
cd "72-03-考勤模块"; git mv "14-03-考勤模块.md" "14-05-03-考勤模块.md"; cd ../..
cd "72-04-审批流程"; git mv "14-03-审批流程.md" "14-05-04-审批流程.md"; cd ../..
cd "72-05-公告管理"; git mv "14-03-公告管理.md" "14-05-05-公告管理.md"; cd ../..
cd "72-06-数据权限"; git mv "14-03-数据权限.md" "14-05-06-数据权限.md"; cd ../..

# ch71-mall: 14-02-xx → 14-04-xx
cd ch71-mall
cd "71-01-项目概述"; git mv "14-02-项目概述.md" "14-04-01-项目概述.md"; cd ../..
cd "71-02-商品模块"; git mv "14-02-商品模块.md" "14-04-02-商品模块.md"; cd ../..
cd "71-03-购物车"; git mv "14-02-购物车.md" "14-04-03-购物车.md"; cd ../..
cd "71-04-订单模块"; git mv "14-02-订单模块.md" "14-04-04-订单模块.md"; cd ../..
cd "71-05-搜索模块"; git mv "14-02-搜索模块.md" "14-04-05-搜索模块.md"; cd ../..
cd "71-06-优化与压测"; git mv "14-02-优化与压测.md" "14-04-06-优化与压测.md"; cd ../..

# ch70-blog: 14-01-xx → 14-03-xx
cd ch70-blog
cd "70-01-项目概述"; git mv "14-01-项目概述.md" "14-03-01-项目概述.md"; cd ../..
cd "70-02-数据库设计"; git mv "14-01-数据库设计.md" "14-03-02-数据库设计.md"; cd ../..
cd "70-03-用户模块"; git mv "14-01-用户模块.md" "14-03-03-用户模块.md"; cd ../..
cd "70-04-文章模块"; git mv "14-01-文章模块.md" "14-03-04-文章模块.md"; cd ../..
cd "70-05-评论模块"; git mv "14-01-评论模块.md" "14-03-05-评论模块.md"; cd ../..
cd "70-06-部署上线"; git mv "14-01-部署上线.md" "14-03-06-部署上线.md"; cd ../..
```

### Task 4: 更新 Spring Cloud 目录内 .md 文件的章节前缀

```bash
cd /Users/baxiang/Documents/hello-java/13-spring-cloud

cd "ch69-seata"; git mv "13-09-Seata 分布式事务.md" "13-10-Seata 分布式事务.md"; cd ..
cd "ch68-stream"; git mv "13-08-消息驱动.md" "13-09-消息驱动.md"; cd ..
cd "ch67-sleuth-zipkin"; git mv "13-08-链路追踪.md" "13-09-链路追踪.md"; cd ..
cd "ch66-nacos-config"; git mv "13-07-Nacos Config 配置中心.md" "13-08-Nacos Config 配置中心.md"; cd ..
cd "ch65-gateway"; git mv "13-06-Gateway API 网关.md" "13-07-Gateway API 网关.md"; cd ..
cd "ch64-sentinel-hystrix"; git mv "13-05-Sentinel 服务熔断.md" "13-06-Sentinel 服务熔断.md"; cd ..
cd "ch63-openfeign"; git mv "13-04-OpenFeign 服务调用.md" "13-05-OpenFeign 服务调用.md"; cd ..
# ch62-loadbalancer 文件编号不变（13-03）
# ch61-nacos-eureka 文件编号不变（13-02）
# ch60-microservice-intro 文件编号不变（13-01）
```

### Task 5: 提交目录重命名

```bash
cd /Users/baxiang/Documents/hello-java
git add -A
git commit -m "refactor: 重命名章节编号，Spring Cloud ch59→ch60, 项目 ch69→ch70，为新内容腾出空间"
```

### Task 6: 新增 07-java8+ ch42 Virtual Threads

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/07-java8+/ch42-virtual-threads"
```

**文件**：`07-java8+/ch42-virtual-threads/07-04-Virtual Threads.md`

内容结构（约 250 行）：
```markdown
# 7.4 Virtual Threads（虚拟线程）

## 一、先问一个问题
**为什么 Java 传统线程模型在高并发场景下性能受限？**

### 生活例子：餐厅服务员 vs 自动化机器人
对比传统线程（每个线程绑定一个服务员）和虚拟线程（轻量级调度器）。

## 二、平台线程 vs 虚拟线程

### 2.1 平台线程（Platform Threads）
- 每个线程绑定 OS 线程（1-2MB 内存）
- 阻塞操作浪费 OS 资源
- 通常线程池限制在几百个

### 2.2 虚拟线程（Virtual Threads）
- 轻量级，内存仅几 KB
- JVM 自动调度到少量平台线程上
- 可以创建百万级虚拟线程
- Java 21+ 正式特性

### 对比表
| 特性 | 平台线程 | 虚拟线程 |
|------|----------|----------|
| 内存占用 | 1-2 MB | 几 KB |
| 创建成本 | 高（OS 调用） | 低（JVM 管理） |
| 适合场景 | CPU 密集型 | I/O 密集型 |
| 并发数量 | 几百到几千 | 百万级 |
| 阻塞成本 | 高（占用 OS 线程） | 低（自动卸载） |

## 三、创建虚拟线程

### 3.1 Thread.ofVirtual()
```java
// 创建并启动虚拟线程
Thread.startVirtualThread(() -> {
    System.out.println("Running in virtual thread");
});

// 使用 Builder
Thread virtualThread = Thread.ofVirtual()
    .name("worker-")
    .unstarted(() -> {
        // 任务逻辑
    });
virtualThread.start();
```

### 3.2 Executors.newVirtualThreadPerTaskExecutor()
```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // 每个任务自动使用虚拟线程
    for (int i = 0; i < 10000; i++) {
        executor.submit(() -> {
            // 模拟 I/O 操作
            Thread.sleep(100);
            return "done";
        });
    }
}
```

### 3.3 万级并发请求示例
```java
// 传统方式：需要复杂的线程池调优
ExecutorService pool = Executors.newFixedThreadPool(200);

// 虚拟线程：直接创建，JVM 自动调度
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = new ArrayList<>();
    for (int i = 0; i < 10000; i++) {
        final int id = i;
        futures.add(executor.submit(() -> {
            // 模拟 HTTP 请求
            return httpClient.get("/api/resource/" + id);
        }));
    }
    // 收集结果
}
```

## 四、性能对比

### 4.1 内存占用
```
10000 个平台线程：~10-20 GB
10000 个虚拟线程：~50-100 MB
```

### 4.2 吞吐量测试
```
传统线程池（200 线程）：5000 请求/秒
虚拟线程：50000+ 请求/秒（10 倍提升）
```

## 五、适用与不适用的场景

### 适合虚拟线程
- HTTP 请求处理（Web 服务器）
- 数据库查询
- 文件 I/O
- 微服务间调用

### 不适合虚拟线程
- CPU 密集型计算（矩阵运算、加密）
- 长时间持有 synchronized 锁的操作
- 需要线程局部变量（ThreadLocal）大量数据的场景

## 六、与 Reactive 编程的对比

| 方式 | 代码风格 | 调试难度 | 性能 | 学习曲线 |
|------|----------|----------|------|----------|
| 虚拟线程 | 同步风格 | 低（普通调试） | 高 | 低 |
| Reactive | 异步链式 | 高（堆栈复杂） | 高 | 高 |

### 代码对比
```java
// Reactive（WebFlux）
Mono<String> result = webClient.get()
    .uri("/api/data")
    .retrieve()
    .bodyToMono(String.class)
    .flatMap(data -> process(data));

// 虚拟线程（同步风格，同样性能）
String data = httpClient.get("/api/data");
String result = process(data);
```

## 七、小结

| 概念 | 说明 |
|------|------|
| 虚拟线程 | JVM 管理的轻量级线程 |
| 适用场景 | I/O 密集型高并发 |
| 不适用 | CPU 密集型、锁竞争 |
| 创建方式 | Thread.ofVirtual() / Executors |
```

### Task 7: 新增 07-java8+ ch43 模式匹配与 Record 类

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/07-java8+/ch43-pattern-matching"
```

**文件**：`07-java8+/ch43-pattern-matching/07-05-模式匹配与 Record 类.md`

内容结构（约 250 行）：
```markdown
# 7.5 模式匹配与 Record 类

## 一、Record 类

### 1.1 什么是 Record
不可变数据类，自动生成 getter、equals、hashCode、toString。

```java
// 传统方式（30+ 行）
public final class Point {
    private final int x;
    private final int y;
    
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public int x() { return x; }
    public int y() { return y; }
    
    // equals, hashCode, toString...
}

// Record 方式（1 行）
public record Point(int x, int y) {}
```

### 1.2 Record 特性
- 隐式 final，不可继承
- 字段不可变（无 setter）
- 自动生成：构造器、getter、equals、hashCode、toString
- 可以添加自定义方法

```java
public record User(Long id, String name, String email) {
    // 自定义构造器验证
    public User {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
    
    // 自定义方法
    public String displayName() {
        return name + " (" + email + ")";
    }
}
```

### 1.3 使用场景
- DTO 数据传输对象
- 方法返回多个值
- 不可变配置对象

## 二、Pattern Matching for instanceof

### 2.1 传统方式 vs 新模式
```java
// 传统（啰嗦）
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// 新模式（Java 16+）
if (obj instanceof String s) {
    System.out.println(s.length());
}
```

### 2.2 组合条件
```java
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}
```

## 三、switch 表达式增强

### 3.1 箭头语法
```java
// 传统 switch
String result;
switch (day) {
    case MONDAY:
    case FRIDAY:
        result = "忙碌";
        break;
    case SUNDAY:
        result = "休息";
        break;
    default:
        result = "普通";
}

// 箭头语法（Java 14+）
String result = switch (day) {
    case MONDAY, FRIDAY -> "忙碌";
    case SUNDAY -> "休息";
    default -> "普通";
};
```

### 3.2 switch 模式匹配（Java 21+）
```java
String format(Object obj) {
    return switch (obj) {
        case Integer i -> "数字: " + i;
        case String s -> "字符串: " + s;
        case null -> "空值";
        default -> "未知类型";
    };
}
```

### 3.3 密封类配合 switch
```java
// 密封类（Java 17+）
public sealed interface Shape permits Circle, Rectangle, Triangle {}

public record Circle(double radius) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
public record Triangle(double base, double height) implements Shape {}

//  exhaustive switch（编译器确保覆盖所有情况）
double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.width() * r.height();
        case Triangle t -> 0.5 * t.base() * t.height();
    };
}
```

## 四、Sealed Classes（密封类）

### 4.1 概念
限制哪些类可以继承当前类。

```java
public sealed class Vehicle permits Car, Truck, Motorcycle {
    // 只有 Car、Truck、Motorcycle 可以继承
}

public final class Car extends Vehicle {}      // 不能再被继承
public sealed class Truck extends Vehicle permits Pickup {}  // 可继续密封
public non-sealed class Motorcycle extends Vehicle {}        // 开放继承
```

### 4.2 修饰符
- `final`：不可继承
- `sealed`：只能由 permits 列表中的类继承
- `non-sealed`：允许任何类继承（解除密封）

## 五、小结

| 特性 | 引入版本 | 作用 |
|------|----------|------|
| Record 类 | Java 16 | 不可变数据类 |
| instanceof 模式匹配 | Java 16 | 简化类型检查和转换 |
| switch 表达式 | Java 14 | 返回值式 switch |
| switch 模式匹配 | Java 21 | 类型模式 switch |
| Sealed Classes | Java 17 | 限制继承 |
```

### Task 8: 新增 07-java8+ ch44 Structured Concurrency

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/07-java8+/ch44-structured-concurrency"
```

**文件**：`07-java8+/ch44-structured-concurrency/07-06-结构化并发.md`

内容结构（约 250 行）：
```markdown
# 7.6 Structured Concurrency（结构化并发）

## 一、传统并发的缺陷

### 生活例子：餐厅厨房
对比"无组织并发"和"结构化并发"的区别。

### 1.1 线程泄漏
```java
// 问题：如果 getUser 失败， getOrder 不会被取消
Future<User> user = executor.submit(() -> getUser(id));
Future<Order> order = executor.submit(() -> getOrder(id));
// 如果这里抛出异常，user 的线程还在运行！
return new Dashboard(user.get(), order.get());
```

### 1.2 取消困难
```java
// 取消一个任务需要手动跟踪所有子任务
// 没有结构化的方式确保所有任务都被正确取消
```

## 二、StructuredTaskScope

### 2.1 基本概念
Java 21+ 预览特性，提供结构化并发编程模型。

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<User> userTask = scope.fork(() -> getUser(id));
    Subtask<Order> orderTask = scope.fork(() -> getOrder(id));
    
    scope.join();           // 等待所有任务完成
    scope.throwIfFailed();  // 如果有失败则抛出异常
    
    return new Dashboard(userTask.get(), orderTask.get());
}
// 退出 try 块自动关闭所有任务
```

### 2.2 ShutdownOnFailure vs ShutdownOnSuccess

| 策略 | 行为 | 适用场景 |
|------|------|----------|
| ShutdownOnFailure | 任一失败立即取消所有 | 必须全部成功 |
| ShutdownOnSuccess | 任一成功立即取消所有 | 多路冗余请求 |

### ShutdownOnSuccess 示例
```java
try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
    scope.fork(() -> queryFromCache(id));
    scope.fork(() -> queryFromDatabase(id));
    scope.fork(() -> queryFromRemote(id));
    
    scope.join();
    // 返回第一个成功的结果
    return scope.result();
}
```

## 三、与虚拟线程配合

```java
// 在虚拟线程执行器中使用结构化并发
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            scope.fork(() -> callServiceA());
            scope.fork(() -> callServiceB());
            scope.fork(() -> callServiceC());
            scope.join();
            scope.throwIfFailed();
        }
    }).get();
}
```

## 四、错误传播

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    var task1 = scope.fork(() -> fetchUserProfile(userId));
    var task2 = scope.fork(() -> fetchUserOrders(userId));
    var task3 = scope.fork(() -> fetchUserSettings(userId));
    
    scope.join();
    scope.throwIfFailed();  // 传播第一个失败
    
    // 只有所有任务都成功才会执行到这里
    return new UserProfile(
        task1.get(), task2.get(), task3.get()
    );
} catch (ExecutionException e) {
    // 任一任务失败都会被捕获
    log.error("Failed to load user profile", e);
    throw new ServiceUnavailableException();
}
```

## 五、综合案例：电商详情页

```java
public ProductDetail getProductDetail(Long productId) {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        var product = scope.fork(() -> productService.getById(productId));
        var reviews = scope.fork(() -> reviewService.getByProduct(productId));
        var inventory = scope.fork(() -> inventoryService.getStock(productId));
        var price = scope.fork(() -> pricingService.getCurrentPrice(productId));
        
        scope.join();
        scope.throwIfFailed();
        
        return new ProductDetail(
            product.get(),
            reviews.get(),
            inventory.get(),
            price.get()
        );
    } catch (ExecutionException e) {
        throw new ProductDetailLoadException(productId, e);
    }
}
```

## 六、小结

| 概念 | 说明 |
|------|------|
| StructuredTaskScope | 结构化并发作用域 |
| fork() | 提交子任务 |
| join() | 等待所有任务完成 |
| ShutdownOnFailure | 失败时取消所有任务 |
| ShutdownOnSuccess | 成功时取消所有任务 |
```

### Task 9: 更新 07-java8+/README.md

读取现有 README，更新章节列表，新增 ch42-ch44。

**需要更新的内容**：在章节列表表格中添加：
```markdown
| 第 42 章 | ch42-virtual-threads | Virtual Threads（虚拟线程）：虚拟线程原理、创建方式、高并发场景、性能对比 |
| 第 43 章 | ch43-pattern-matching | 模式匹配与 Record 类：Record 类、模式匹配、switch 增强、密封类 |
| 第 44 章 | ch44-structured-concurrency | Structured Concurrency：结构化并发、StructuredTaskScope、错误传播 |
```

### Task 10: 新增 12-spring-boot ch59 Native 编译

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/12-spring-boot/ch59-native"
```

**文件**：`12-spring-boot/ch59-native/12-11-Spring Boot Native 编译.md`

内容结构（约 250 行）：
```markdown
# 12.11 Spring Boot Native 编译

## 一、为什么需要 Native 编译

### 生活例子：预制菜 vs 现做菜
JIT（运行时编译）vs AOT（提前编译）的区别。

### 1.1 传统 JVM 启动
```
启动 → 加载类 → 解析字节码 → JIT 编译 → 热优化
（3-10 秒）
```

### 1.2 Native Image 启动
```
启动 → 直接执行机器码
（0.05-0.2 秒，快 50-100 倍）
```

## 二、GraalVM vs OpenJDK

| 特性 | GraalVM Native | OpenJDK |
|------|---------------|---------|
| 启动时间 | 毫秒级 | 秒级 |
| 内存占用 | 极低（20-50MB） | 较高（200-500MB） |
| 峰值性能 | 略低（无 JIT 优化） | 最高 |
| 编译时间 | 长（1-5 分钟） | 无 |
| 适用场景 | 云函数、容器、CLI 工具 | 长期运行的服务 |

## 三、环境准备

### 3.1 安装 GraalVM
```bash
# macOS
brew install --cask graalvm/tap/graalvm-jdk-21

# 设置 JAVA_HOME
export JAVA_HOME=/Library/Java/JavaVirtualMachines/graalvm-21.jdk/Contents/Home

# 安装 native-image 工具
gu install native-image
```

### 3.2 验证安装
```bash
java -version
# 应显示 GraalVM
native-image --version
```

## 四、Spring Boot 项目配置

### 4.1 添加依赖
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.graalvm.buildtools</groupId>
            <artifactId>native-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

### 4.2 构建 Native Image
```bash
# 构建
mvn -Pnative native:compile

# 运行
./target/myapp
```

### 4.3 Docker 构建（推荐）
```bash
# 使用 Buildpacks
mvn spring-boot:build-image -Pnative

# 运行容器
docker run --rm -p 8080:8080 myapp:latest
```

## 五、Native Hints

### 5.1 反射
```java
@RegisterReflectionForBinding({User.class, Order.class})
public class MyConfig {}
```

### 5.2 资源文件
```yaml
spring:
  native:
    hints:
      resources:
        patterns:
          - "static/**"
          - "templates/**"
```

## 六、限制与最佳实践

### 6.1 已知限制
- 反射需要显式注册
- 动态代理需要配置
- 某些第三方库不完全支持
- 编译时间长

### 6.2 最佳实践
- 尽量使用构造函数注入
- 避免过度反射
- 使用 spring-aot 插件预计算
- 定期测试 native 构建

## 七、性能对比

| 指标 | 传统 JVM | Native Image |
|------|----------|--------------|
| 启动时间 | 3.2s | 0.08s |
| 内存占用 | 256MB | 45MB |
| 首次请求延迟 | 0.5s | 0.01s |
| 峰值 TPS | 10000 | 8500 |

## 八、小结
```

### Task 11: 更新 12-spring-boot/README.md

读取现有 README，在章节列表末尾添加 ch59 Native 编译，更新学习目标。

### Task 12: 新增 14-project ch81 GitHub Actions

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/14-project/ch81-github-actions"
```

**文件**：`14-project/ch81-github-actions/14-14-01-GitHub Actions CI-CD.md`

内容结构（约 250 行），涵盖：
- Workflow 文件结构（.github/workflows/）
- 触发器（push、pull_request、schedule）
- Java/Maven 构建流水线
- 缓存策略
- Docker 构建与推送
- 多环境部署

### Task 13: 新增 14-project ch82 Kubernetes 基础

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/14-project/ch82-k8s-basics"
```

**文件**：`14-project/ch82-k8s-basics/14-14-02-Kubernetes 基础.md`

内容结构（约 250 行），涵盖：
- K8s 核心概念（Pod、Deployment、Service、Ingress）
- 部署 Spring Boot 应用到 K8s
- ConfigMap 与 Secret
- 健康检查
- Helm 基础
- 从 Docker Compose 迁移

### Task 14: 新增 14-project ch83 AI 智能助手

**创建目录和文件**：

```bash
mkdir -p "/Users/baxiang/Documents/hello-java/14-project/ch83-ai-assistant"
```

**文件**：`14-project/ch83-ai-assistant/14-14-03-AI 智能助手项目.md`

内容结构（约 250 行），涵盖：
- Spring AI 框架介绍
- 接入 LLM（OpenAI/通义千问）
- ChatClient 对话应用
- 流式响应
- RAG 基础
- Vector Store
- 完整项目：知识库问答助手

### Task 15: 更新 14-project/README.md

读取现有 README，更新章节列表和目录结构，包含新增的 ch81-ch83。

### Task 16: 更新全局文档

更新以下文件中的章节号引用：

**README.md**：
- 更新 13-spring-cloud 章节范围 ch59→ch60
- 更新 14-project 章节范围 ch69→ch70，新增 ch81-ch83
- 更新目录结构树

**Java 学习路线大纲.md**：
- 更新第十三部分章节号（ch59→ch60, ..., ch68→ch69）
- 更新第十四部分章节号（ch69→ch70, ..., ch79→ch80）
- 新增 ch81-ch83 章节内容

**TASKS.md**：
- 如有章节号引用则更新

### Task 17: 最终提交与验证

```bash
cd /Users/baxiang/Documents/hello-java
git add -A
git status  # 验证变更
git commit -m "feat: 新增 2026 年核心内容（虚拟线程、模式匹配、Native 编译、K8s、AI 项目）"
```
