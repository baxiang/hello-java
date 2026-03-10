# 10.3 Tomcat 服务器

## 一、Tomcat 概述

Tomcat 是 Apache 软件基金会开发的开源 Web 服务器，用于运行 Servlet 和 JSP。

**特点**：
- 轻量级
- 开源免费
- 易于使用
- 支持 Servlet 和 JSP

## 二、安装 Tomcat

### 2.1 下载

```bash
# 官网下载
https://tomcat.apache.org/

# 选择版本
# Tomcat 9.x - 支持 Servlet 4.0
# Tomcat 10.x - 支持 Servlet 5.0
```

### 2.2 解压

```bash
# macOS/Linux
tar -xzf apache-tomcat-9.0.x.tar.gz

# Windows
# 解压 zip 文件
```

### 2.3 目录结构

```
tomcat/
├── bin/           # 启动/停止脚本
├── conf/          # 配置文件
├── lib/           # 依赖库
├── logs/          # 日志文件
├── webapps/       # Web 应用目录
├── work/          # 工作目录
└── temp/          # 临时目录
```

### 2.4 启动和停止

```bash
# macOS/Linux
cd tomcat/bin
./startup.sh      # 启动
./shutdown.sh     # 停止

# Windows
cd tomcat\bin
startup.bat       # 启动
shutdown.bat      # 停止

# 或直接运行
catalina.sh start
catalina.sh stop
```

### 2.5 验证

```
访问 http://localhost:8080
看到 Tomcat 欢迎页面表示成功
```

## 三、配置 Tomcat

### 3.1 修改端口

```xml
<!-- conf/server.xml -->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />

<!-- 修改为 80 端口 -->
<Connector port="80" protocol="HTTP/1.1" ... />
```

### 3.2 配置用户

```xml
<!-- conf/tomcat-users.xml -->
<tomcat-users>
    <role rolename="manager-gui"/>
    <role rolename="admin-gui"/>
    <user username="admin" password="admin123" 
          roles="manager-gui,admin-gui"/>
</tomcat-users>
```

### 3.3 虚拟主机

```xml
<!-- conf/server.xml -->
<Host name="www.example.com" appBase="webapps/example">
    <Alias>example.com</Alias>
</Host>
```

### 3.4 上下文配置

```xml
<!-- conf/Catalina/localhost/myapp.xml -->
<Context docBase="/path/to/myapp">
    <Resource name="jdbc/mydb" 
              type="javax.sql.DataSource"
              driverClassName="com.mysql.cj.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/mydb"
              username="root"
              password="123456"
              maxTotal="20"
              maxIdle="10"/>
</Context>
```

## 四、部署 Web 应用

### 4.1  WAR 包部署

```bash
# 打包 WAR
mvn package

# 复制 WAR 到 webapps
cp target/myapp.war tomcat/webapps/

# Tomcat 会自动解压并部署
```

### 4.2 目录部署

```bash
# 创建应用目录
mkdir tomcat/webapps/myapp

# 复制文件
cp -r src/main/webapp/* tomcat/webapps/myapp/
cp target/classes tomcat/webapps/myapp/WEB-INF/
cp target/dependency/*.jar tomcat/webapps/myapp/WEB-INF/lib/
```

### 4.3 配置部署

```xml
<!-- conf/Catalina/localhost/myapp.xml -->
<Context docBase="/path/to/myapp" path="/myapp"/>
```

### 4.4 Manager 部署

```
1. 访问 http://localhost:8080/manager/html
2. 输入用户名密码
3. 上传 WAR 文件或管理应用
```

## 五、日志配置

### 5.1 日志目录

```
tomcat/logs/
├── catalina.YYYY-MM-DD.log    # Catalina 日志
├── localhost.YYYY-MM-DD.log   # 应用日志
├── manager.YYYY-MM-DD.log     # Manager 日志
└── host-manager.YYYY-MM-DD.log # Host Manager 日志
```

### 5.2 日志配置

```properties
# conf/logging.properties

# 控制台输出
handlers = java.util.logging.ConsoleHandler

# 文件输出
handlers = org.apache.juli.FileHandler

# 日志级别
.level = INFO
org.apache.catalina.core.ContainerBase.level = INFO
```

## 六、性能优化

### 6.1 JVM 配置

```bash
# bin/setenv.sh (Linux/Mac)
# bin/setenv.bat (Windows)

export JAVA_OPTS="-Xms512m -Xmx1024m"
export JAVA_OPTS="$JAVA_OPTS -XX:MaxMetaspaceSize=256m"
export JAVA_OPTS="$JAVA_OPTS -XX:+UseG1GC"
```

### 6.2 连接器配置

```xml
<!-- conf/server.xml -->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           maxThreads="200"
           minSpareThreads="25"
           acceptCount="100"
           compression="on"
           compressionMinSize="2048"
           compressableMimeType="text/html,text/xml,text/plain,application/json"/>
```

### 6.3 会话配置

```xml
<!-- conf/context.xml -->
<Context>
    <Manager className="org.apache.catalina.session.PersistentManager"
             saveOnRestart="false">
        <Store className="org.apache.catalina.session.FileStore"
               directory="${catalina.base}/temp"/>
    </Manager>
    
    <!-- 会话超时（分钟） -->
    <SessionTimeout>30</SessionTimeout>
</Context>
```

## 七、安全配置

### 7.1 禁用 AJP 连接器

```xml
<!-- conf/server.xml -->
<!-- 注释掉 AJP 连接器 -->
<!--
<Connector port="8009" protocol="AJP/1.3" 
           redirectPort="8443" />
-->
```

### 7.2 隐藏版本信息

```java
// 创建自定义 Valve
public class ServerInfoValve extends ValveBase {
    @Override
    public void invoke(Request request, Response response) 
            throws IOException, ServletException {
        response.setHeader("Server", "Web Server");
        next.invoke(request, response);
    }
}
```

### 7.3 限制访问

```xml
<!-- conf/web.xml -->
<security-constraint>
    <web-resource-collection>
        <web-resource-name>Admin</web-resource-name>
        <url-pattern>/admin/*</url-pattern>
    </web-resource-collection>
    <auth-constraint>
        <role-name>admin</role-name>
    </auth-constraint>
</security-constraint>
```

## 八、集群配置

### 8.1 Session 复制

```xml
<!-- conf/context.xml -->
<Context>
    <Manager className="org.apache.catalina.ha.session.DeltaManager"
             expireSessionsOnShutdown="false"/>
     
    <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster">
        <Channel className="org.apache.catalina.tribes.group.GroupChannel">
            <Membership className="org.apache.catalina.tribes.membership.McastService"/>
            <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"/>
            <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter"/>
        </Channel>
        <Valve className="org.apache.catalina.ha.tcp.ReplicationValve"/>
        <Deployer className="org.apache.catalina.ha.deploy.FarmWarDeployer"/>
    </Cluster>
</Context>
```

### 8.2 负载均衡

```
客户端
  ↓
Nginx / Apache (负载均衡器)
  ↓
Tomcat 1    Tomcat 2    Tomcat 3
```

## 九、监控和管理

### 9.1 JMX 监控

```bash
# bin/setenv.sh
export JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote"
export JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.port=9999"
export JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.ssl=false"
export JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.authenticate=false"
```

### 9.2 使用 JConsole

```bash
# 连接 Tomcat
jconsole localhost:9999
```

### 9.3 访问日志

```xml
<!-- conf/server.xml -->
<Valve className="org.apache.catalina.valves.AccessLogValve"
       directory="logs"
       prefix="localhost_access_log"
       suffix=".txt"
       pattern="%h %l %u %t &quot;%r&quot; %s %b %D"/>
```

## 十、综合示例

### 10.1 完整部署流程

```bash
# 1. 下载 Tomcat
wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.x/bin/apache-tomcat-9.0.x.tar.gz

# 2. 解压
tar -xzf apache-tomcat-9.0.x.tar.gz
cd apache-tomcat-9.0.x

# 3. 配置用户
vi conf/tomcat-users.xml
# 添加管理员用户

# 4. 配置 JVM
vi bin/setenv.sh
export JAVA_OPTS="-Xms512m -Xmx1024m"

# 5. 启动
./bin/startup.sh

# 6. 部署应用
cp /path/to/myapp.war webapps/

# 7. 查看日志
tail -f logs/catalina.out

# 8. 验证
curl http://localhost:8080/myapp/
```

### 10.2 Docker 部署

```dockerfile
FROM tomcat:9.0-jdk11-openjdk

# 复制应用
COPY myapp.war /usr/local/tomcat/webapps/

# 复制配置
COPY server.xml /usr/local/tomcat/conf/

# 暴露端口
EXPOSE 8080

# 启动
CMD ["catalina.sh", "run"]
```

```bash
# 构建镜像
docker build -t myapp:latest .

# 运行容器
docker run -d -p 8080:8080 myapp:latest
```

## 十一、常见问题

### 11.1 端口被占用

```bash
# 查看端口占用
lsof -i :8080

# 杀死进程
kill -9 <PID>

# 或修改 Tomcat 端口
```

### 11.2 内存不足

```bash
# 增加 JVM 内存
export JAVA_OPTS="-Xms1024m -Xmx2048m"
```

### 11.3 应用无法启动

```bash
# 查看日志
tail -f logs/catalina.out

# 常见问题：
# - 缺少依赖 jar
# - 配置文件错误
# - 端口冲突
# - 权限问题
```

## 十二、小结

1. **安装**：下载、解压、启动
2. **配置**：端口、用户、虚拟主机
3. **部署**：WAR 包、目录、Manager
4. **日志**：catalina、localhost、access log
5. **优化**：JVM、连接器、会话
6. **安全**：禁用 AJP、隐藏版本、限制访问
7. **监控**：JMX、JConsole
8. **集群**：Session 复制、负载均衡

---

[上一节：10.2 Servlet](./10-02-Servlet.md) | [下一章：第 11 章 Spring Framework](../ch43-spring-intro/README.md)
