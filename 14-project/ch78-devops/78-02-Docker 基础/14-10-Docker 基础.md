# 78.2 Docker 基础：如何容器化部署？

## 一、先问一个问题

**什么是 Docker？**

### 生活例子：集装箱

```
传统部署
└── 每台服务器单独配置 → 麻烦

Docker 部署
└── 打包成镜像 → 到处运行
```

**Docker 优势**：
- 一次构建，到处运行
- 环境一致
- 快速部署

## 二、Docker 安装

### Ubuntu 安装

```bash
# 安装 Docker
sudo apt update
sudo apt install docker.io

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

## 三、常用命令

### 镜像操作

```bash
docker pull nginx              # 拉取镜像
docker images                  # 查看镜像
docker rmi image_id            # 删除镜像
docker build -t myapp .        # 构建镜像
```

### 容器操作

```bash
docker run -d -p 8080:80 nginx  # 运行容器
docker ps                       # 查看容器
docker stop container_id        # 停止容器
docker start container_id       # 启动容器
docker rm container_id          # 删除容器
docker logs container_id        # 查看日志
docker exec -it container_id bash  # 进入容器
```

## 四、Dockerfile

### 示例

```dockerfile
# 基础镜像
FROM openjdk:17-jdk-slim

# 工作目录
WORKDIR /app

# 复制文件
COPY target/myapp.jar app.jar

# 暴露端口
EXPOSE 8080

# 启动命令
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -d -p 8080:8080 myapp:1.0
```

## 五、小结

| 操作 | 命令 | 说明 |
|------|------|------|
| 拉取镜像 | docker pull | 下载镜像 |
| 构建镜像 | docker build | 构建镜像 |
| 运行容器 | docker run | 运行容器 |
| 查看容器 | docker ps | 查看容器 |
| 查看日志 | docker logs | 查看日志 |

**核心要点**：
- Docker 安装
- 常用命令
- Dockerfile 编写

---

[上一节：78.1 Linux 基础](./78-01-Linux 基础/14-10-Linux 基础.md) | 
[下一节：78.3 Docker Compose](./78-03-Docker Compose/14-10-Docker Compose.md)
