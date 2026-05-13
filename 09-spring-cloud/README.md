# Spring Cloud 微服务

本模块学习 Spring Cloud 微服务架构，包括服务注册发现、负载均衡、服务调用、熔断降级、API 网关、配置中心、链路追踪、消息驱动和分布式事务，掌握微服务架构的核心技术。

## 文件列表

| 文件 | 主题 |
|------|------|
| 01-微服务架构概述.md | 微服务架构概述：单体与微服务对比、优缺点、Spring Cloud/Alibaba 简介 |
| 02-Nacos 服务注册发现.md | 服务注册与发现：注册中心概念、Nacos 安装与使用、服务提供者与消费者 |
| 03-负载均衡.md | 负载均衡：客户端负载均衡、Spring Cloud LoadBalancer、负载均衡策略 |
| 04-OpenFeign 服务调用.md | 服务调用：OpenFeign 简介、声明式调用、超时与重试、日志配置、性能优化 |
| 05-Sentinel 服务熔断.md | 服务熔断与降级：雪崩效应、Sentinel 流控/熔断规则、Hystrix（了解） |
| 06-Gateway API 网关.md | API 网关：网关作用、Spring Cloud Gateway、路由配置、过滤器、限流与鉴权、整合 Nacos |
| 07-Nacos Config 配置中心.md | 配置中心：Nacos Config 使用、配置动态刷新、配置加密 |
| 08-链路追踪.md | 服务链路追踪：链路追踪概念、Sleuth、Zipkin、SkyWalking |
| 09-消息驱动.md | 消息驱动：Spring Cloud Stream 概述、绑定器、整合 RabbitMQ/Kafka、消息分区 |
| 10-Seata 分布式事务.md | 分布式事务：CAP/BASE 理论、Seata 简介、AT/TCC 模式、实战案例 |

## 学习目标

- 理解微服务架构的优势与挑战
- 掌握 Nacos 服务注册发现与配置中心
- 熟练使用 OpenFeign 进行服务间调用
- 掌握 Sentinel 熔断降级与 Gateway 网关
- 了解链路追踪、消息驱动与分布式事务方案
