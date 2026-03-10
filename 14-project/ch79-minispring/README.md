# 14.8 Mini-Spring 项目

## 项目概述

Mini-Spring 是一个简化版的 Spring 框架，通过逐步实现 Spring 的核心功能，帮助深入理解 Spring 的工作原理。

## 章节目录

按照**知识递进关系**组织的章节结构：

| 章节 | 内容 | 核心知识点 | 前置依赖 |
|------|------|------------|----------|
| [79.1 项目概述](./79-01-项目概述/14-08-01-项目概述.md) | 项目介绍、学习路线 | 了解项目目标 | 无 |
| [79.2 BeanDefinition](./79-02-BeanDefinition/14-08-02-BeanDefinition.md) | Bean 定义和注册 | BeanDefinition、BeanFactory | 79.1 |
| [79.3 单例注册表](./79-03-单例注册表/14-08-03-单例注册表.md) | 三级缓存 | 循环依赖解决 | 79.2 |
| [79.4 Bean 实例化](./79-04-Bean 实例化/14-08-04-Bean 实例化.md) | 创建 Bean 对象 | InstantiationStrategy | 79.3 |
| [79.5 属性填充](./79-05-属性填充/14-08-05-属性填充.md) | 依赖注入 | populateBean | 79.4 |
| [79.6 Bean 初始化](./79-06-Bean 初始化/14-08-06-Bean 初始化.md) | 初始化方法 | InitializingBean | 79.5 |
| [79.7 AOP 支持](./79-07-AOP 支持/14-08-07-AOP 支持.md) | 动态代理 | ProxyFactory、Advice | 79.6 |
| [79.8 应用上下文](./79-08-应用上下文/14-08-08-应用上下文.md) | ApplicationContext | 完整应用 | 79.7 |

## 学习路线

```
第 1 步：BeanDefinition      → Bean 的元数据定义
    ↓
第 2 步：单例注册表          → 存储和管理 Bean 实例
    ↓
第 3 步：Bean 实例化         → 创建 Bean 对象
    ↓
第 4 步：属性填充           → 依赖注入
    ↓
第 5 步：Bean 初始化         → 调用初始化方法
    ↓
第 6 步：AOP 支持            → 动态代理
    ↓
第 7 步：应用上下文         → 完整的 Spring 容器
```

## 学习建议

1. **按顺序学习**：每个章节依赖前一章的知识
2. **动手实践**：每学完一节，自己实现一遍
3. **对比 Spring**：与 Spring 源码对比理解
4. **理解原理**：不仅要会用，更要理解为什么

## 知识地图

```
Mini-Spring 核心流程

注册 BeanDefinition
    ↓
从 BeanFactory 获取 Bean
    ↓
getSingleton (检查缓存)
    ↓
createBean (创建 Bean)
    ↓
├── instantiateBean (实例化)
├── populateBean (属性填充)
└── initializeBean (初始化)
    ↓
addSingleton (注册到缓存)
    ↓
返回 Bean 实例
```

---

[上一节：14.7 DevOps 与部署](../ch78-devops/14-07-DevOps 与部署.md) | 
[下一节：79.1 项目概述](./79-01-项目概述/14-08-01-项目概述.md)
