# 41.3 Session 与 Cookie：会话管理（生活类比：会员卡）

## 一、先问一个问题
**问题**：为什么登录后刷新页面，依然保持登录状态？

### 生活例子
会员卡：
- 第一次办卡时记录信息（创建 Session）
- 每次出示会员卡识别身份（Cookie 携带 Session ID）
- 卡过期需要重新办（Session 超时）

Cookie 和 Session 就是 Web 应用的"会员卡"！

## 二、Cookie 客户端存储

### 2.1 创建和读取 Cookie

```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.ServletException;
import java.io.IOException;

@WebServlet("/cookie")
public class CookieServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 创建 Cookie
        Cookie cookie = new Cookie("username", "张三");
        cookie.setMaxAge(60 * 60 * 24);  // 1 天
        cookie.setPath("/");
        response.addCookie(cookie);
        
        // 读取 Cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("username".equals(c.getName())) {
                    response.getWriter().println("欢迎：" + c.getValue());
                }
            }
        }
    }
}
```

### 2.2 删除 Cookie

```java
// 删除 Cookie（设置过期时间为 0）
Cookie cookie = new Cookie("username", "");
cookie.setMaxAge(0);
cookie.setPath("/");
response.addCookie(cookie);
```

## 三、Session 服务器端存储

### 3.1 Session 基本操作

```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import java.io.IOException;

@WebServlet("/session")
public class SessionServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 获取 Session（不存在则创建）
        HttpSession session = request.getSession();
        
        // 设置 Session 属性
        session.setAttribute("username", "张三");
        session.setAttribute("userId", 1L);
        
        // 获取 Session 属性
        String username = (String) session.getAttribute("username");
        
        // Session ID
        String sessionId = session.getId();
        
        // 设置超时时间（秒）
        session.setMaxInactiveInterval(30 * 60);  // 30 分钟
        
        response.getWriter().println("Session ID: " + sessionId);
        response.getWriter().println("Username: " + username);
    }
}
```

### 3.2 销毁 Session

```java
// 删除单个属性
session.removeAttribute("username");

// 销毁整个 Session
session.invalidate();
```

## 四、登录示例

### 4.1 登录 Servlet

```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // 验证用户（实际应从数据库查询）
        if ("admin".equals(username) && "123456".equals(password)) {
            // 创建 Session
            HttpSession session = request.getSession();
            session.setAttribute("user", username);
            session.setMaxInactiveInterval(30 * 60);
            
            // 重定向到首页
            response.sendRedirect("/index.html");
        } else {
            // 返回登录页
            request.setAttribute("error", "用户名或密码错误");
            request.getRequestDispatcher("/login.html").forward(request, response);
        }
    }
}
```

### 4.2 登录检查过滤器

```java
import javax.servlet.annotation.WebFilter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletException;
import java.io.IOException;

@WebFilter("/admin/*")
public class AuthFilter implements Filter {
    
    @Override
    public void init(FilterConfig config) throws ServletException {}
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        HttpSession session = req.getSession(false);
        
        if (session != null && session.getAttribute("user") != null) {
            chain.doFilter(request, response);
        } else {
            res.sendRedirect("/login.html");
        }
    }
    
    @Override
    public void destroy() {}
}
```

## 五、Cookie vs Session

| 特性 | Cookie | Session |
|------|--------|---------|
| 存储位置 | 客户端（浏览器） | 服务器端 |
| 安全性 | 较低（可被篡改） | 较高 |
| 存储大小 | 约 4KB | 无限制 |
| 生命周期 | 可设置过期时间 | 默认 30 分钟 |
| 用途 | 记住用户名等 | 登录状态、购物车 |

## 六、常见疑问

**Q1：Session 是如何识别不同用户的？**
A：通过 Session ID，通常存储在 Cookie 中。每次请求自动携带。

**Q2：Cookie 和 Session 可以同时使用吗？**
A：可以。Cookie 存储非敏感信息（如主题偏好），Session 存储敏感信息（如登录状态）。

## 七、小结

| 概念 | 存储位置 | 用途 | 常用方法 |
|------|----------|------|----------|
| Cookie | 客户端 | 记住偏好 | new Cookie(), getCookies() |
| Session | 服务器 | 登录状态 | getSession(), setAttribute() |
| 超时 | - | 自动失效 | setMaxInactiveInterval() |

## 八、动手练习

1. 实现"记住我"功能，使用 Cookie 保存用户名
2. 创建登录页面，成功后保存用户信息到 Session
3. 实现登录检查，未登录用户跳转到登录页
