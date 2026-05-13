# Java 简介与 JDK

## 一、问题引入

你刚决定学编程，搜了一圈发现语言几十种：Python、C++、Go、Rust……为什么企业级开发大多选 Java？装完 JDK 却分不清 JVM、JRE、JDK 的关系，环境变量怎么配都不对——这些问题不解决，连第一行代码都跑不起来。

## 二、核心概念

### Java 是什么

Java 是一门**面向对象**的编程语言，核心卖点是**跨平台**——一次编译，到处运行。就像一份中文说明书，不管交给中国哪个城市的工人，都能看懂执行。

| 特点 | 说明 | 生活类比 |
|------|------|----------|
| 跨平台 | 字节码在任意平台的 JVM 上运行 | 同一张 DVD，任何品牌的播放器都能放 |
| 面向对象 | 以类和对象组织代码 | 蓝图（类）→ 造出的汽车（对象） |
| 健壮性 | 强类型 + 异常处理 + 垃圾回收 | 汽车安全带 + 气囊 + 自动熄火保护 |
| 多线程 | 内置并发支持 | 餐厅多窗口同时点餐 |

### 应用领域

- **Web 后端**：Spring Boot 是企业开发的事实标准
- **大数据**：Hadoop、Spark、Flink 均基于 JVM
- **Android**：移动端开发（Kotlin 优先，但 Java 仍广泛使用）

### 版本选择

```
2004 → Java 5（泛型、注解、枚举）
2014 → Java 8（Lambda、Stream）        ← 面试必考
2021 → Java 17（LTS）                  ← 上一代主力
2023 → Java 21（LTS）                  ← 当前推荐
2025 → Java 25（LTS，9 月发布）         ← 最新 LTS
```

> 初学者从 Java 21 开始学习，LTS 版本长期维护，不用担心过期。

### JVM / JRE / JDK 的关系

```
┌──────────────────────────────┐
│           JDK                │
│  ┌──────────────────────┐   │
│  │          JRE          │   │
│  │  ┌──────────────┐    │   │
│  │  │     JVM      │    │   │
│  │  └──────────────┘    │   │
│  │  + 核心类库           │   │
│  └──────────────────────┘   │
│  + 开发工具（javac, java）   │
└──────────────────────────────┘
```

| 名称 | 全称 | 包含 | 类比 |
|------|------|------|------|
| JVM | Java Virtual Machine | 字节码→机器码的翻译器 | 翻译官 |
| JRE | Java Runtime Environment | JVM + 类库 | 带翻译官的图书馆 |
| JDK | Java Development Kit | JRE + 开发工具 | 图书馆 + 写作办公室 |

> 开发者只需安装 JDK，JRE 已包含在内。

## 三、代码对比

### JDK 发行版选择

```
❌ 旧项目用 Oracle JDK，商业使用需付费授权
✅ 使用 OpenJDK 或 Amazon Corretto，免费且社区活跃
```

| 发行版 | 许可 | 维护方 | 推荐度 |
|--------|------|--------|--------|
| Oracle JDK | 商业付费 | Oracle | 企业有预算可选 |
| OpenJDK | GPL 开源 | 社区 | 推荐 |
| Amazon Corretto | 免费开源 | AWS | 生产环境推荐 |
| Azul Zulu | 免费开源 | Azul | 可选 |

## 四、实现方式

### macOS 安装

```bash
brew install openjdk@21

# 配置环境变量（写入 ~/.zshrc）
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export PATH=$JAVA_HOME/bin:$PATH

# 验证
java -version   // 输出: openjdk version "21.0.x"
javac -version  // 输出: javac 21.0.x
```

### Windows 安装

1. 下载 JDK 安装包（.exe），运行安装
2. 配置环境变量：
   - 新建 `JAVA_HOME` = `C:\Program Files\Java\jdk-21`
   - 编辑 `Path`，添加 `%JAVA_HOME%\bin`
3. 打开 cmd 验证：

```cmd
java -version
javac -version
```

### Linux 安装

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install openjdk-21-jdk

# CentOS/RHEL
sudo yum install java-21-openjdk-devel
```

### 多版本 JDK 切换

```bash
# macOS：使用 jenv
jenv global 21.0

# Linux：使用 update-alternatives
sudo update-alternatives --config java

# Windows：修改 JAVA_HOME 环境变量指向不同版本
```

## 五、Q&A

**Q：装了 JDK 还需要单独装 JRE 吗？**
A：不需要。JDK 包含 JRE，装了 JDK 就能同时开发和运行。

**Q：`java -version` 能执行但 `javac` 找不到？**
A：说明 JRE 正确但 JDK 的 bin 目录不在 PATH 中。检查 `JAVA_HOME/bin` 是否加入 PATH。

**Q：应该选 Java 17 还是 21？**
A：新项目选 21。17 也完全没问题，但 21 是当前最新的 LTS，包含虚拟线程等新特性。

**Q：Oracle JDK 和 OpenJDK 性能差很多吗？**
A：几乎没差别。Oracle JDK 基于 OpenJDK 构建，核心代码一致。区别主要在商业授权和附加监控工具。

## 六、小结表格

| 要点 | 说明 |
|------|------|
| Java 核心特点 | 跨平台、面向对象、健壮性、多线程 |
| 推荐版本 | Java 21 LTS |
| JDK vs JRE vs JVM | JDK ⊃ JRE ⊃ JVM；开发者装 JDK 即可 |
| 推荐发行版 | OpenJDK 或 Amazon Corretto |
| 环境变量 | JAVA_HOME 指向 JDK 安装路径，PATH 加入 bin 目录 |
