# 第十三部分：Spring Cloud 微服务

本模块学习 Spring Cloud 微服务架构，包括服务注册发现、负载均衡、服务调用、熔断降级、API 网关、配置中心、链路追踪、消息驱动和分布式事务，掌握微服务架构的核心技术。

## 章节列表

| 章节 | 目录 | 主题 |
|------|------|------|
| 第 59 章 | ch59-microservice-intro | 微服务架构概述：单体与微服务对比、优缺点、Spring Cloud/Alibaba 简介 |
| 第 60 章 | ch60-nacos-eureka | 服务注册与发现：注册中心概念、Nacos 安装与使用、Eureka、服务提供者与消费者 |
| 第 61 章 | ch61-loadbalancer | 负载均衡：客户端负载均衡、Spring Cloud LoadBalancer、负载均衡策略 |
| 第 62 章 | ch62-openfeign | 服务调用：OpenFeign 简介、声明式调用、超时与重试、日志配置、性能优化 |
| 第 63 章 | ch63-sentinel-hystrix | 服务熔断与降级：雪崩效应、Sentinel 流控/熔断规则、Hystrix（了解） |
| 第 64 章 | ch64-gateway | API 网关：网关作用、Spring Cloud Gateway、路由配置、过滤器、限流与鉴权、整合 Nacos |
| 第 65 章 | ch65-nacos-config | 配置中心：Nacos Config 使用、配置动态刷新、配置加密 |
| 第 66 章 | ch66-sleuth-zipkin | 服务链路追踪：链路追踪概念、Sleuth、Zipkin、SkyWalking |
| 第 67 章 | ch67-stream | 消息驱动：Spring Cloud Stream 概述、绑定器、整合 RabbitMQ/Kafka、消息分区 |
| 第 68 章 | ch68-seata | 分布式事务：CAP/BASE 理论、Seata 简介、AT/TCC 模式、实战案例 |

## 学习目标

- 理解微服务架构的优势与挑战
- 掌握 Nacos 服务注册发现与配置中心
- 熟练使用 OpenFeign 进行服务间调用
- 掌握 Sentinel 熔断降级与 Gateway 网关
- 了解链路追踪、消息驱动与分布式事务方案
