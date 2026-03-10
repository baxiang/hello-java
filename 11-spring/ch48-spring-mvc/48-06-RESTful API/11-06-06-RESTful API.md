# 48.6 RESTful API：如何设计 API？

## 一、先问一个问题

**什么是 RESTful？为什么需要它？**

### 生活例子：图书馆

```
传统方式：
├── /getBook?id=1（获取）
├── /createBook?name=xxx（创建）
└── /deleteBook?id=1（删除）

RESTful 方式：
├── GET /books/1（获取）
├── POST /books（创建）
└── DELETE /books/1（删除）
```

**RESTful 的好处**：
- 统一规范
- 简洁明了
- 易于理解

## 二、RESTful 原则

### 资源

```
/book     → 书籍资源
/user     → 用户资源
/order    → 订单资源
```

### HTTP 方法

```
GET     → 获取
POST    → 创建
PUT     → 更新（全量）
PATCH   → 更新（部分）
DELETE  → 删除
```

### 示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping              // 获取列表
    public List<User> list() {}
    
    @GetMapping("/{id}")     // 获取单个
    public User get(@PathVariable Long id) {}
    
    @PostMapping             // 创建
    public User create(@RequestBody User user) {}
    
    @PutMapping("/{id}")     // 更新（全量）
    public User update(@PathVariable Long id, 
                       @RequestBody User user) {}
    
    @DeleteMapping("/{id}")  // 删除
    public void delete(@PathVariable Long id) {}
}
```

## 三、@RestController

### 与@Controller 区别

```java
// @Controller：返回页面
@Controller
public class PageController {
    @GetMapping("/user")
    public String page() {
        return "user";  // user.html
    }
}

// @RestController：返回 JSON
@RestController
public class ApiController {
    @GetMapping("/api/user")
    public User user() {
        return user;  // JSON
    }
}
```

## 四、@RequestBody 和@ResponseBody

### @RequestBody

```java
@PostMapping("/user")
public String create(@RequestBody User user) {
    // JSON → User 对象
}
```

### @ResponseBody

```java
@Controller
public class Controller {
    
    @GetMapping("/user")
    @ResponseBody  // 返回 JSON，不是页面
    public User user() {
        return user;
    }
}
```

## 五、统一响应格式

### Result 类

```java
@Data
@AllArgsConstructor
public class Result<T> {
    private Integer code;
    private String message;
    private T data;
    
    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }
    
    public static <T> Result<T> error(String message) {
        return new Result<>(500, message, null);
    }
}
```

### 使用

```java
@RestController
public class UserController {
    
    @GetMapping("/user/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return Result.success(user);
    }
}
```

## 六、小结

| 方法 | 作用 | 示例 |
|------|------|------|
| GET | 获取 | /users/1 |
| POST | 创建 | /users |
| PUT | 更新 | /users/1 |
| DELETE | 删除 | /users/1 |
| @RestController | 返回 JSON | - |
| @RequestBody | 接收 JSON | - |
| @ResponseBody | 返回 JSON | - |

## 七、动手练习

创建一个完整的 RESTful API：

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public Result<List<User>> list() {
        return Result.success(userService.list());
    }
    
    @GetMapping("/{id}")
    public Result<User> get(@PathVariable Long id) {
        return Result.success(userService.get(id));
    }
    
    @PostMapping
    public Result<User> create(@RequestBody User user) {
        return Result.success(userService.save(user));
    }
    
    @PutMapping("/{id}")
    public Result<User> update(@PathVariable Long id, 
                               @RequestBody User user) {
        return Result.success(userService.update(id, user));
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return Result.success(null);
    }
}
```

---

[上一节：48.5 视图解析](./48-05-视图解析/11-06-05-视图解析.md) | 
[下一章：第 12 章 Spring Boot](../ch49-spring-boot-intro/README.md)

## Spring MVC 完成！

通过这 6 节，你学习了：
1. MVC 模式理解
2. Controller 创建
3. 请求映射
4. 数据绑定
5. 视图解析
6. RESTful API 设计

---

[上一节：48.5 视图解析](./48-05-视图解析/11-06-05-视图解析.md)
