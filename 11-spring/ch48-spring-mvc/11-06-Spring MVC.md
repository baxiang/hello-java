# 11.6 Spring MVC

## 一、Spring MVC 概述

Spring MVC 是基于 Spring 的 Web 框架，实现了 MVC 设计模式。

**核心组件**：
- DispatcherServlet：前端控制器
- HandlerMapping：处理器映射
- Controller：控制器
- ViewResolver：视图解析器

## 二、工作流程

```
1. 客户端请求
   ↓
2. DispatcherServlet（前端控制器）
   ↓
3. HandlerMapping（查找处理器）
   ↓
4. Controller（处理请求）
   ↓
5. ModelAndView（模型和视图）
   ↓
6. ViewResolver（解析视图）
   ↓
7. 视图渲染
   ↓
8. 返回响应
```

## 三、基本配置

### 3.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.20</version>
</dependency>

<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>
```

### 3.2 web.xml 配置

```xml
<web-app>
    <!-- 前端控制器 -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    
    <!-- 编码过滤器 -->
    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

### 3.3 Spring MVC 配置

```xml
<!-- spring-mvc.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/mvc
           http://www.springframework.org/schema/mvc/spring-mvc.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 扫描 Controller -->
    <context:component-scan base-package="com.example.controller"/>
    
    <!-- 启用 MVC 注解 -->
    <mvc:annotation-driven/>
    
    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    
    <!-- 静态资源 -->
    <mvc:resources mapping="/static/**" location="/static/"/>
</beans>
```

## 四、Controller

### 4.1 基本 Controller

```java
@Controller
@RequestMapping("/user")
public class UserController {
    
    @GetMapping("/list")
    public ModelAndView list() {
        ModelAndView mav = new ModelAndView("user/list");
        mav.addObject("users", userService.findAll());
        return mav;
    }
    
    @GetMapping("/{id}")
    public ModelAndView getById(@PathVariable Long id) {
        ModelAndView mav = new ModelAndView("user/detail");
        mav.addObject("user", userService.findById(id));
        return mav;
    }
}
```

### 4.2 RESTful Controller

```java
@RestController
@RequestMapping("/api/users")
public class UserApiController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.status(201).body(user);
    }
    
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        userService.update(user);
        return user;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 五、请求映射

### 5.1 请求方法

```java
@Controller
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/users")      // GET
    public List<User> list() { }
    
    @PostMapping("/users")     // POST
    public User create(@RequestBody User user) { }
    
    @PutMapping("/users/{id}") // PUT
    public User update(@PathVariable Long id, @RequestBody User user) { }
    
    @DeleteMapping("/users/{id}") // DELETE
    public void delete(@PathVariable Long id) { }
    
    @PatchMapping("/users/{id}") // PATCH
    public User patch(@PathVariable Long id, @RequestBody Map<String, Object> updates) { }
}
```

### 5.2 请求参数

```java
@Controller
@RequestMapping("/api")
public class ParamController {
    
    // 查询参数
    @GetMapping("/users")
    public List<User> list(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String keyword
    ) {
        return userService.search(page, size, keyword);
    }
    
    // 路径参数
    @GetMapping("/users/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    // 请求头
    @GetMapping("/info")
    public String info(@RequestHeader("User-Agent") String userAgent) {
        return "User-Agent: " + userAgent;
    }
    
    // Cookie
    @GetMapping("/session")
    public String session(@CookieValue(value = "sessionId", required = false) String sessionId) {
        return "SessionId: " + sessionId;
    }
    
    // 请求体
    @PostMapping("/users")
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}
```

## 六、数据绑定

### 6.1 表单提交

```java
@Controller
@RequestMapping("/user")
public class UserController {
    
    @GetMapping("/form")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        return "user/form";
    }
    
    @PostMapping("/save")
    public String save(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/user/list";
    }
}
```

### 6.2 数据验证

```java
public class UserDTO {
    
    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 20, message = "用户名长度 2-20")
    private String username;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码长度至少 6 位")
    private String password;
    
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;
    
    // getter/setter
}

@Controller
@RequestMapping("/api/users")
public class UserApiController {
    
    @PostMapping
    public ResponseEntity<User> create(
        @Valid @RequestBody UserDTO dto,
        BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                .stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());
            return ResponseEntity.badRequest().build();
        }
        
        User user = convert(dto);
        userService.save(user);
        return ResponseEntity.status(201).body(user);
    }
}
```

## 七、视图解析

### 7.1 JSP 视图

```jsp
<%-- /WEB-INF/views/user/list.jsp --%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<body>
    <h1>用户列表</h1>
    <table>
        <c:forEach items="${users}" var="user">
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
            </tr>
        </c:forEach>
    </table>
</body>
</html>
```

### 7.2 Thymeleaf 视图

```xml
<!-- 添加依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

```html
<!-- templates/user/list.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <h1>用户列表</h1>
    <table>
        <tr th:each="user : ${users}">
            <td th:text="${user.username}">用户名</td>
            <td th:text="${user.email}">邮箱</td>
        </tr>
    </table>
</body>
</html>
```

## 八、拦截器

### 8.1 创建拦截器

```java
public class AuthInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) throws Exception {
        
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        
        if (user == null) {
            response.sendRedirect("/login");
            return false;
        }
        
        return true;
    }
    
    @Override
    public void postHandle(HttpServletRequest request, 
                         HttpServletResponse response, 
                         Object handler, 
                         ModelAndView modelAndView) throws Exception {
        // 视图渲染前
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, 
                              HttpServletResponse response, 
                              Object handler, 
                              Exception ex) throws Exception {
        // 完成后
    }
}
```

### 8.2 配置拦截器

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor())
            .addPathPatterns("/admin/**")
            .excludePathPatterns("/login", "/register");
        
        registry.addInterceptor(new LogInterceptor())
            .addPathPatterns("/**");
    }
}
```

## 九、全局异常处理

### 9.1 @ControllerAdvice

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    // 处理业务异常
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleBusinessException(
            BusinessException e) {
        Map<String, Object> body = new HashMap<>();
        body.put("code", e.getCode());
        body.put("message", e.getMessage());
        return ResponseEntity.status(400).body(body);
    }
    
    // 处理参数校验异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleValidationException(
            MethodArgumentNotValidException e) {
        Map<String, Object> body = new HashMap<>();
        body.put("code", 400);
        
        List<String> errors = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
        
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }
    
    // 处理其他异常
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleException(Exception e) {
        Map<String, Object> body = new HashMap<>();
        body.put("code", 500);
        body.put("message", "服务器内部错误");
        return ResponseEntity.status(500).body(body);
    }
}
```

## 十、文件上传

### 10.1 配置

```xml
<!-- spring-mvc.xml -->
<bean id="multipartResolver" 
      class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <property name="maxUploadSize" value="10485760"/>  <!-- 10MB -->
</bean>
```

### 10.2 上传处理

```java
@Controller
@RequestMapping("/file")
public class FileController {
    
    @GetMapping("/upload")
    public String showUpload() {
        return "upload";
    }
    
    @PostMapping("/upload")
    @ResponseBody
    public Map<String, Object> upload(
            @RequestParam("file") MultipartFile file) {
        
        Map<String, Object> result = new HashMap<>();
        
        if (file.isEmpty()) {
            result.put("code", 400);
            result.put("message", "文件不能为空");
            return result;
        }
        
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File dest = new File("/path/to/upload/" + fileName);
            file.transferTo(dest);
            
            result.put("code", 200);
            result.put("message", "上传成功");
            result.put("fileName", fileName);
        } catch (IOException e) {
            result.put("code", 500);
            result.put("message", "上传失败");
        }
        
        return result;
    }
}
```

## 十一、综合示例

### 11.1 完整 Controller

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    // 分页查询
    @GetMapping
    public PageResult<Product> list(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) Long categoryId
    ) {
        return productService.search(page, size, keyword, categoryId);
    }
    
    // 获取详情
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.findById(id);
    }
    
    // 创建
    @PostMapping
    public ResponseEntity<Product> create(
        @Valid @RequestBody ProductDTO dto,
        BindingResult result
    ) {
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }
        Product product = convert(dto);
        productService.save(product);
        return ResponseEntity.status(201).body(product);
    }
    
    // 更新
    @PutMapping("/{id}")
    public Product update(
        @PathVariable Long id,
        @Valid @RequestBody ProductDTO dto
    ) {
        Product product = convert(dto);
        product.setId(id);
        productService.update(product);
        return product;
    }
    
    // 删除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // 上传商品图片
    @PostMapping("/{id}/image")
    public ResponseEntity<Map<String, Object>> uploadImage(
        @PathVariable Long id,
        @RequestParam("image") MultipartFile image
    ) {
        String imageUrl = productService.uploadImage(id, image);
        Map<String, Object> result = new HashMap<>();
        result.put("imageUrl", imageUrl);
        return ResponseEntity.ok(result);
    }
}
```

## 十二、小结

1. **工作流程**：DispatcherServlet → HandlerMapping → Controller → ViewResolver
2. **请求映射**：@RequestMapping、@GetMapping、@PostMapping 等
3. **数据绑定**：@RequestParam、@PathVariable、@RequestBody、@ModelAttribute
4. **数据验证**：@Valid、BindingResult
5. **视图解析**：JSP、Thymeleaf
6. **拦截器**：HandlerInterceptor
7. **异常处理**：@ControllerAdvice、@ExceptionHandler
8. **文件上传**：MultipartFile

---

[上一节：11.5 Spring 数据访问](./11-05-Spring 数据访问.md) | [下一章：第 12 章 Spring Boot](../ch49-spring-boot-intro/README.md)
