# 78.3 Docker Compose：如何编排多容器？

## 一、先问一个问题

**如何管理多个容器？**

### 生活例子：乐团指挥

```
单个容器
└── 单独管理 → 麻烦

多个容器
└── 统一编排 → 方便
```

**Docker Compose**：
- 定义多容器
- 一键启动
- 统一管理

## 二、安装 Compose

```bash
# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.11.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

## 三、Compose 文件

### 示例

```yaml
version: '3.8'

services:
  # Web 应用
  web:
    image: myapp:1.0
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/mydb
  
  # MySQL
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
    volumes:
      - mysql_data:/var/lib/mysql
  
  # Redis
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mysql_data:
```

## 四、常用命令

```bash
docker-compose up -d          # 启动所有服务
docker-compose down           # 停止所有服务
docker-compose ps             # 查看服务状态
docker-compose logs web       # 查看 web 日志
docker-compose restart web    # 重启 web 服务
docker-compose build          # 构建镜像
```

## 五、小结

| 命令 | 作用 | 说明 |
|------|------|------|
| up -d | 启动 | 后台启动 |
| down | 停止 | 停止并删除 |
| ps | 查看 | 查看状态 |
| logs | 日志 | 查看日志 |
| build | 构建 | 构建镜像 |

**核心要点**：
- Compose 文件编写
- 多容器管理
- 常用命令

---

[上一节：78.2 Docker 基础](./78-02-Docker 基础/14-10-Docker 基础.md) | 
[下一节：78.4 CI/CD](./78-04-CI-CD/14-10-CI-CD.md)
