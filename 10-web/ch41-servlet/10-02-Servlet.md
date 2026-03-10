# 10.2 Servlet

## 一、Servlet 概述

Servlet 是运行在服务器端的 Java 程序，用于处理客户端请求并返回响应。

**作用**：
- 接收客户端请求
- 处理业务逻辑
- 返回响应结果

## 二、Servlet 生命周期

```
1. 加载和实例化
   ↓
2. 初始化（init）
   ↓
3. 处理请求（service）
   ↓
4. 销毁（destroy）
```

## 三、创建 Servlet

### 3.1 继承 HttpServlet

```java
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class HelloServlet extends HttpServlet {
    
    // 初始化（只执行一次）
    @Override
    public void init() throws ServletException {
        System.out.println("Servlet 初始化");
    }
    
    // 处理 GET 请求
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("<h1>Hello, Servlet!</h1>");
    }
    
    // 处理 POST 请求
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doGet(request, response);
    }
    
    // 销毁（只执行一次）
    @Override
    public void destroy() {
        System.out.println("Servlet 销毁");
    }
}
```

### 3.2 配置 Servlet

**web.xml 配置**：

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

**注解配置（Servlet 3.0+）**：

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    // ...
}
```

## 四、HttpServletRequest

### 4.1 获取请求参数

```java
@WebServlet("/param")
public class ParamServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 获取单个参数
        String username = request.getParameter("username");
        
        // 获取多个参数（复选框）
        String[] hobbies = request.getParameterValues("hobbies");
        
        // 获取所有参数
        Map<String, String[]> params = request.getParameterMap();
        
        // 获取请求头
        String userAgent = request.getHeader("User-Agent");
        
        // 获取 Session
        HttpSession session = request.getSession();
        
        response.getWriter().println("Username: " + username);
    }
}
```

### 4.2 请求转发

```java
@WebServlet("/forward")
public class ForwardServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 设置请求属性
        request.setAttribute("message", "Hello from ForwardServlet");
        
        // 转发到另一个 Servlet
        request.getRequestDispatcher("/target").forward(request, response);
    }
}
```

## 五、HttpServletResponse

### 5.1 设置响应

```java
@WebServlet("/response")
public class ResponseServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 设置响应类型
        response.setContentType("text/html;charset=UTF-8");
        
        // 设置响应头
        response.setHeader("Cache-Control", "no-cache");
        
        // 重定向
        // response.sendRedirect("/login.html");
        
        // 输出内容
        PrintWriter out = response.getWriter();
        out.println("<h1>Hello, Response!</h1>");
        out.println("<p>当前时间：" + new Date() + "</p>");
    }
}
```

### 5.2 输出 JSON

```java
@WebServlet("/api/user")
public class UserServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json;charset=UTF-8");
        
        User user = new User(1L, "张三", "zhang@example.com");
        
        // 使用 Gson 或 Jackson 转换
        String json = new Gson().toJson(user);
        response.getWriter().println(json);
    }
}
```

## 六、Session 和 Cookie

### 6.1 Cookie

```java
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
        
        // 删除 Cookie
        // cookie.setMaxAge(0);
    }
}
```

### 6.2 Session

```java
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
        
        // 删除属性
        // session.removeAttribute("username");
        
        // 销毁 Session
        // session.invalidate();
        
        response.getWriter().println("Session ID: " + sessionId);
        response.getWriter().println("Username: " + username);
    }
}
```

### 6.3 登录示例

```java
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

// 登录检查过滤器
@WebFilter("/admin/*")
public class AuthFilter implements Filter {
    
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
}
```

## 七、Filter 过滤器

### 7.1 创建过滤器

```java
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

### 7.2 多个过滤器

```java
// 日志过滤器
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

## 八、Listener 监听器

### 8.1 ServletContextListener

```java
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
        
        // 清理资源
    }
}
```

### 8.2 HttpSessionListener

```java
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

## 九、文件上传

### 9.1 表单

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit" value="上传">
</form>
```

### 9.2 Servlet 处理

```java
@WebServlet("/upload")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024,  // 1MB
    maxFileSize = 10 * 1024 * 1024,   // 10MB
    maxRequestSize = 50 * 1024 * 1024 // 50MB
)
public class UploadServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        Part filePart = request.getPart("file");
        String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
        
        // 保存文件
        String uploadPath = getServletContext().getRealPath("/uploads");
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) uploadDir.mkdirs();
        
        filePart.write(uploadPath + "/" + fileName);
        
        response.getWriter().println("文件上传成功：" + fileName);
    }
}
```

## 十、综合示例

### 10.1 用户管理 Servlet

```java
@WebServlet("/api/users/*")
public class UserApiServlet extends HttpServlet {
    
    private UserDao userDao = new UserDao();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String path = request.getPathInfo();
        
        if (path == null) {
            // 获取所有用户
            List<User> users = userDao.findAll();
            writeJson(response, users);
        } else {
            // 获取单个用户
            Long id = Long.parseLong(path.substring(1));
            User user = userDao.findById(id);
            if (user != null) {
                writeJson(response, user);
            } else {
                response.setStatus(404);
            }
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 创建用户
        User user = new Gson().fromJson(request.getReader(), User.class);
        userDao.insert(user);
        
        response.setStatus(201);
        writeJson(response, user);
    }
    
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String path = request.getPathInfo();
        Long id = Long.parseLong(path.substring(1));
        
        User user = new Gson().fromJson(request.getReader(), User.class);
        user.setId(id);
        userDao.update(user);
        
        writeJson(response, user);
    }
    
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String path = request.getPathInfo();
        Long id = Long.parseLong(path.substring(1));
        userDao.delete(id);
        
        response.setStatus(204);
    }
    
    private void writeJson(HttpServletResponse response, Object obj) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        new Gson().toJson(obj, response.getWriter());
    }
}
```

## 十一、小结

1. **Servlet 生命周期**：init、service、destroy
2. **请求处理**：HttpServletRequest 获取参数、转发
3. **响应处理**：HttpServletResponse 设置响应、重定向
4. **Session/Cookie**：会话管理
5. **Filter**：请求过滤、编码设置
6. **Listener**：应用生命周期监听
7. **文件上传**：@MultipartConfig

---

[上一节：10.1 前端基础](./10-01-前端基础.md) | [下一节：10.3 Tomcat 服务器](./10-03-Tomcat 服务器.md)
