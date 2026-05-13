# 41.1 Servlet 概述：Java Web 的基石（生活类比：餐厅服务员）

## 一、先问一个问题

**问题**：当你在浏览器输入网址后，服务器是如何响应的？

### 生活例子

餐厅服务员：
- 顾客点单（发送请求）
- 服务员接单（接收请求）
- 厨房做菜（处理业务）
- 服务员上菜（返回响应）

Servlet 就是服务器端的"服务员"！

## 二、什么是 Servlet

**Servlet**：运行在服务器端的 Java 程序，用于处理客户端请求并返回响应。

```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("<h1>Hello, Servlet!</h1>");
    }
}
```

## 三、Servlet 生命周期

Servlet 从创建到销毁经历四个阶段：

```
1. 加载和实例化
   ↓
2. 初始化（init）- 只执行一次
   ↓
3. 处理请求（service）- 每次请求执行
   ↓
4. 销毁（destroy）- 只执行一次
```

### 3.1 生命周期方法

```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LifeServlet extends HttpServlet {
    
    // 初始化（只执行一次）
    @Override
    public void init() throws ServletException {
        System.out.println("Servlet 初始化");
    }
    
    // 处理 GET 请求
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        System.out.println("处理请求");
        response.getWriter().println("Hello");
    }
    
    // 销毁（只执行一次）
    @Override
    public void destroy() {
        System.out.println("Servlet 销毁");
    }
}
```

## 四、配置 Servlet

### 4.1 注解配置（推荐）

```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("<h1>Hello!</h1>");
    }
}
```

### 4.2 web.xml 配置（传统）

```xml
<web-app>
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.example.HelloServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
```

## 五、常见疑问

**Q1：Servlet 和普通 Java 类有什么区别？**
A：Servlet 继承 HttpServlet，运行在 Web 容器（如 Tomcat）中，能接收 HTTP 请求。

**Q2：为什么 init 和 destroy 只执行一次？**
A：Servlet 在容器启动时创建，整个应用生命周期中只有一个实例。

**Q3：@WebServlet 和 web.xml 有什么区别？**
A：功能相同。@WebServlet 是 Servlet 3.0+ 的注解方式，更简洁；web.xml 是传统配置方式。

## 六、小结

| 概念 | 说明 | 方法/注解 |
|------|------|-----------|
| 初始化 | 只执行一次 | init() |
| 处理请求 | 每次请求执行 | doGet()/doPost() |
| 销毁 | 只执行一次 | destroy() |
| 配置 | 映射 URL | @WebServlet |

## 七、动手练习

1. 创建第一个 HelloServlet，访问 `/hello` 输出欢迎信息
2. 在 init 和 destroy 方法中打印日志，观察执行时机
3. 分别使用注解和 web.xml 配置同一个 Servlet
