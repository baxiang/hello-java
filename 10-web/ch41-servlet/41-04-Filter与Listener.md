# 41.4 Filter 与 Listener：请求的守门员（生活类比：安检门）

## 一、先问一个问题
**问题**：如何统一处理所有请求的编码问题，而不必在每个 Servlet 中重复代码？

### 生活例子
安检门：
- 每个人进入前必须通过安检（Filter 拦截请求）
- 安检员检查违禁品（编码设置、权限检查）
- 通过后才能进入（继续处理请求）

Filter 就是 Web 应用的"安检门"！

## 二、Filter 过滤器

### 2.1 创建过滤器

```java
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/*")
public class EncodingFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("过滤器初始化");
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        // 设置编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        
        // 继续过滤链
        chain.doFilter(request, response);
    }
    
    @Override
    public void destroy() {
        System.out.println("过滤器销毁");
    }
}
```

### 2.2 日志过滤器

```java
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter("/*")
public class LogFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        System.out.println("请求：" + req.getMethod() + " " + req.getRequestURI());
        
        long start = System.currentTimeMillis();
        chain.doFilter(request, response);
        long end = System.currentTimeMillis();
        
        System.out.println("耗时：" + (end - start) + "ms");
    }
}
```

### 2.3 多个过滤器的执行顺序

```
请求 → Filter A → Filter B → Servlet → Filter B → Filter A → 响应
```

## 三、Listener 监听器

### 3.1 ServletContextListener 应用生命周期

```java
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class AppListener implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("应用启动");
        
        // 初始化全局配置
        ServletContext context = sce.getServletContext();
        context.setAttribute("appName", "My Web App");
        context.setAttribute("startTime", System.currentTimeMillis());
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("应用关闭");
    }
}
```

### 3.2 HttpSessionListener 在线人数统计

```java
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@WebListener
public class SessionListener implements HttpSessionListener {
    
    private static int onlineCount = 0;
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        onlineCount++;
        System.out.println("Session 创建，在线人数：" + onlineCount);
        
        se.getSession().getServletContext()
            .setAttribute("onlineCount", onlineCount);
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        onlineCount--;
        System.out.println("Session 销毁，在线人数：" + onlineCount);
        
        se.getSession().getServletContext()
            .setAttribute("onlineCount", onlineCount);
    }
}
```

## 四、Filter vs Listener

| 特性 | Filter | Listener |
|------|--------|----------|
| 作用 | 拦截请求 | 监听事件 |
| 触发时机 | 请求/响应前后 | 应用/Session 生命周期变化 |
| 用途 | 编码、权限、日志 | 初始化、统计在线人数 |
| 接口 | Filter | ServletContextListener, HttpSessionListener |

## 五、常见疑问

**Q1：多个 Filter 的执行顺序是怎样的？**
A：按注解声明顺序或 web.xml 配置顺序。请求从上到下，响应从下到上。

**Q2：Listener 能访问请求数据吗？**
A：不能。Listener 监听的是生命周期事件，不是请求。需要使用 Filter 拦截请求。

## 六、小结

| 概念 | 接口 | 用途 | 常用场景 |
|------|------|------|----------|
| Filter | Filter | 拦截请求 | 编码、权限、日志 |
| ServletContextListener | ServletContextListener | 应用生命周期 | 初始化配置 |
| HttpSessionListener | HttpSessionListener | Session 生命周期 | 在线人数统计 |

## 七、动手练习

1. 创建编码过滤器，统一设置 UTF-8
2. 创建日志过滤器，记录请求方法和路径
3. 使用 HttpSessionListener 实现在线人数统计
