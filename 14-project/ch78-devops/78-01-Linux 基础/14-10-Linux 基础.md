# 78.1 Linux 基础：常用命令有哪些？

## 一、先问一个问题

**为什么要学 Linux？**

### 生活例子：服务器操作系统

```
Windows 服务器
└── 图形界面，易用

Linux 服务器
└── 命令行，高效，稳定
```

**Linux 优势**：
- 稳定可靠
- 开源免费
- 服务器首选

## 二、常用命令

### 文件操作

```bash
# 查看文件
ls -la           # 列出文件
pwd              # 当前目录
cd /path         # 切换目录

# 文件操作
touch file.txt   # 创建文件
rm file.txt      # 删除文件
cp src dst       # 复制文件
mv src dst       # 移动文件

# 查看内容
cat file.txt     # 查看文件
tail -f log.log  # 实时查看日志
```

### 权限管理

```bash
chmod 755 file   # 修改权限
chown user:group file  # 修改所有者
```

### 进程管理

```bash
ps aux           # 查看进程
kill PID         # 杀死进程
top              # 实时进程
```

### 网络命令

```bash
netstat -tlnp    # 查看端口
curl http://...  # 发送请求
ping host        # 测试连通性
```

### 压缩解压

```bash
tar -czvf archive.tar.gz dir/    # 压缩
tar -xzvf archive.tar.gz         # 解压
zip -r archive.zip dir/          # zip 压缩
unzip archive.zip                # zip 解压
```

## 三、Vim 编辑器

### 基本操作

```
vim file.txt

# 命令模式
i      # 进入插入模式
ESC    # 退出插入模式
:wq    # 保存退出
:q!    # 不保存退出
dd     # 删除行
yy     # 复制行
p      # 粘贴
```

## 四、小结

| 类别 | 命令 | 作用 |
|------|------|------|
| 文件 | ls/cd/pwd | 文件操作 |
| 权限 | chmod/chown | 权限管理 |
| 进程 | ps/kill/top | 进程管理 |
| 网络 | netstat/curl | 网络操作 |
| 压缩 | tar/zip | 压缩解压 |

**核心要点**：
- 文件操作命令
- 权限管理
- 进程管理

---

[上一节：14.9 项目通用技能](../ch77-common-skills/README.md) | 
[下一节：78.2 Docker 基础](./78-02-Docker 基础/14-10-Docker 基础.md)
