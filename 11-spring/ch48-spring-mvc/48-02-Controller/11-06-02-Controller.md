# 48.2 Controller：控制器是什么？

## 一、先问一个问题

**什么是 Controller？它做什么工作？**

### 生活例子：餐厅服务员

```
顾客（用户）
  ↓
点餐（发送请求）
  ↓
服务员（Controller）← 这里
  ↓
厨房（Service）
```

**Controller 的工作**：
1. 接待顾客（接收请求）
2. 记录点餐（解析参数）
3. 通知厨房（调用 Service）
4. 上菜（返回响应）

## 二、Controller 的职责

### Controller 做什么

```java
@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        // 1. 接收参数（id）
        
        // 2. 调用 Service
        User user = userService.getUserById(id);
        
        // 3. 准备数据
        model.addAttribute("user", user);
        
        // 4. 返回视图
        return "user-detail";
    }
}
```

**职责**：
- 接收请求
- 解析参数
- 调用 Service
- 返回响应

### Controller 不做什么

```java
@Controller
public class UserController {
    
    // ❌ 不要在 Controller 里写业务逻辑
    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id) {
        // 错误：直接在 Controller 里操作数据库
        User user = userDao.findById(id);
        return "user-detail";
    }
}
```

**正确做法**：
```java
@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id) {
        // 正确：调用 Service
        User user = userService.getUserById(id);
        return "user-detail";
    }
}
```

## 三、@Controller 注解

### 什么是@Controller？

**生活例子**：员工工牌

```
@Controller
└── 告诉 Spring：我是一个 Controller，请管理我
```

**作用**：
- 标记这是一个 Controller 类
- Spring 会扫描并注册它
- 可以处理 HTTP 请求

### 使用方式

```java
@Controller
@RequestMapping("/user")  // 基础路径
public class UserController {
    
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        // ...
    }
}
```

**访问 URL**：
```
GET /user/123
```

## 四、@RestController

### @Controller vs @RestController

**@Controller**：
```java
@Controller
public class UserController {
    
    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "user-detail";  // 返回页面
    }
}
```

**@RestController**：
```java
@RestController
public class UserController {
    
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return user;  // 返回 JSON
    }
}
```

**区别**：
| @Controller | @RestController |
|------------|-----------------|
| 返回页面 | 返回 JSON |
| 需要 ViewResolver | 不需要 |
| 适合 Web 应用 | 适合 API |

### @RestController = @Controller + @ResponseBody

```java
// 这样写
@RestController
public class UserController {
}

// 等价于
@Controller
@ResponseBody
public class UserController {
}
```

## 五、请求映射

### @RequestMapping

```java
@Controller
@RequestMapping("/user")  // 基础路径
public class UserController {
    
    @RequestMapping("/get")  // 完整路径：/user/get
    public String get() {
        return "get";
    }
}
```

### 简化注解

```java
@Controller
@RequestMapping("/user")
public class UserController {
    
    @GetMapping("/get")     // GET 请求
    public String get() {
        return "get";
    }
    
    @PostMapping("/save")   // POST 请求
    public String save() {
        return "save";
    }
    
    @PutMapping("/update")  // PUT 请求
    public String update() {
        return "update";
    }
    
    @DeleteMapping("/delete") // DELETE 请求
    public String delete() {
        return "delete";
    }
}
```

## 六、接收参数

### @RequestParam（查询参数）

```java
@GetMapping("/search")
public String search(
    @RequestParam String keyword,
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size
) {
    // keyword=手机&page=1&size=10
    // /search?keyword=手机&page=1&size=10
}
```

### @PathVariable（路径参数）

```java
@GetMapping("/user/{id}")
public String getUser(@PathVariable Long id) {
    // /user/123 → id = 123
}
```

### @RequestBody（请求体）

```java
@PostMapping("/user")
public String createUser(@RequestBody User user) {
    // JSON → User 对象
    // {"username": "张三", "age": 18}
}
```

## 七、返回响应

### 返回页面

```java
@Controller
public class PageController {
    
    @GetMapping("/hello")
    public String hello() {
        return "hello";  // hello.html
    }
    
    @GetMapping("/redirect")
    public String redirect() {
        return "redirect:/hello";  // 重定向
    }
}
```

### 返回 JSON

```java
@RestController
public class ApiController {
    
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
        // 自动转为 JSON
        // {"id": 1, "username": "张三"}
    }
}
```

### 统一响应格式

```java
@RestController
public class ApiController {
    
    @GetMapping("/user/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return Result.success(user);
        // {"code": 200, "message": "success", "data": {...}}
    }
}
```

## 八、常见疑问

### Q1：Controller 里能直接操作数据库吗？

**不能**：
```java
// ❌ 错误
@Autowired
private UserDao userDao;

@GetMapping("/user/{id}")
public User getUser(@PathVariable Long id) {
    return userDao.findById(id);  // 不要直接操作 Dao
}
```

**正确**：
```java
// ✅ 正确
@Autowired
private UserService userService;

@GetMapping("/user/{id}")
public User getUser(@PathVariable Long id) {
    return userService.getUserById(id);  // 调用 Service
}
```

### Q2：一个 Controller 可以有多少个方法？

**没有硬性限制**，但建议：
- 10-20 个方法以内
- 太多就拆分
- 按业务模块划分

### Q3：Controller 可以是单例吗？

**是**，Spring 默认单例：
```java
@Controller
public class UserController {
    // 整个容器只有一个实例
    
    // ❌ 不要定义成员变量（线程不安全）
    private int count = 0;
    
    // ✅ 可以用局部变量
    public String method() {
        int count = 0;  // 局部变量，线程安全
    }
}
```

## 九、小结

| 注解 | 作用 | 返回 |
|------|------|------|
| @Controller | 标记 Controller | 页面 |
| @RestController | 标记 REST Controller | JSON |
| @RequestMapping | 映射 URL | - |
| @GetMapping | GET 请求 | - |
| @PostMapping | POST 请求 | - |
| @RequestParam | 查询参数 | - |
| @PathVariable | 路径参数 | - |
| @RequestBody | 请求体 | - |

**Controller 职责**：
1. 接收请求
2. 解析参数
3. 调用 Service
4. 返回响应

## 十、动手练习

1. 创建一个 Controller
2. 定义多个请求映射
3. 接收不同类型的参数
4. 返回不同的响应

```java
@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}
```

---

[上一节：48.1 MVC 概述](./48-01-MVC 概述/11-06-01-MVC 概述.md) | 
[下一节：48.3 请求映射](./48-03-请求映射/11-06-03-请求映射.md)
