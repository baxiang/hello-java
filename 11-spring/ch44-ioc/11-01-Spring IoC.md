# 11.1 Spring IoC 容器

## 一、Spring 简介

Spring 是一个轻量级的 Java 开发框架，核心特性：
- **IoC**（控制反转）：依赖注入
- **AOP**（面向切面）：横切关注点分离

## 二、IoC 容器

### 2.1 什么是 IoC

控制反转（Inversion of Control）：将对象的创建和依赖关系交给 Spring 容器管理。

**传统方式**：
```java
public class UserService {
    private UserDao userDao = new UserDaoImpl();
}
```

**Spring 方式**：
```java
public class UserService {
    @Autowired
    private UserDao userDao;
}
```

### 2.2 Bean 的定义

```java
@Component  // 通用组件
public class UserService {
    // ...
}

@Service    // 服务层
public class OrderService {
    // ...
}

@Repository // 数据访问层
public class UserDao {
    // ...
}

@Controller // 控制层
public class UserController {
    // ...
}
```

## 三、依赖注入

### 3.1 自动装配

```java
@Service
public class OrderService {
    
    // 方式 1：字段注入（推荐）
    @Autowired
    private UserDao userDao;
    
    // 方式 2：构造器注入
    private final ProductDao productDao;
    
    @Autowired
    public OrderService(ProductDao productDao) {
        this.productDao = productDao;
    }
    
    // 方式 3：Setter 注入
    private PaymentDao paymentDao;
    
    @Autowired
    public void setPaymentDao(PaymentDao paymentDao) {
        this.paymentDao = paymentDao;
    }
}
```

### 3.2 @Qualifier 指定 Bean

```java
@Service
public class OrderService {
    
    @Autowired
    @Qualifier("alipayServiceImpl")
    private PaymentService paymentService;
}
```

### 3.3 @Resource（JSR-250）

```java
@Service
public class OrderService {
    
    @Resource(name = "userDaoImpl")
    private UserDao userDao;
}
```

## 四、Bean 作用域

```java
@Component
@Scope("singleton")  // 单例（默认）
public class SingletonBean {
}

@Component
@Scope("prototype")  // 原型（每次创建新实例）
public class PrototypeBean {
}

@Component
@Scope("request")    // 请求作用域（Web）
public class RequestBean {
}

@Component
@Scope("session")    // 会话作用域（Web）
public class SessionBean {
}
```

## 五、Bean 生命周期

```
实例化 → 属性赋值 → 初始化 → 使用 → 销毁
```

```java
@Component
public class MyBean implements InitializingBean, DisposableBean {
    
    // 构造方法
    public MyBean() {
        System.out.println("1. 实例化");
    }
    
    // 属性赋值后
    @PostConstruct
    public void init() {
        System.out.println("2. 初始化");
    }
    
    // 销毁前
    @PreDestroy
    public void destroy() {
        System.out.println("3. 销毁");
    }
    
    @Override
    public void afterPropertiesSet() {
        System.out.println("InitializingBean 初始化");
    }
    
    @Override
    public void destroy() {
        System.out.println("DisposableBean 销毁");
    }
}
```

## 六、配置类

### 6.1 @Configuration

```java
@Configuration
public class AppConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://localhost:3306/demo");
        ds.setUsername("root");
        ds.setPassword("123456");
        return ds;
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

### 6.2 @ComponentScan

```java
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
}
```

### 6.3 @PropertySource

```java
@Configuration
@PropertySource("classpath:app.properties")
public class AppConfig {
    
    @Value("${app.name}")
    private String appName;
}
```

## 七、小结

1. **IoC**：控制反转，依赖注入
2. **注解**：@Component、@Autowired、@Bean
3. **作用域**：singleton、prototype、request、session
4. **生命周期**：实例化→属性赋值→初始化→使用→销毁

---

[下一节：11.2 Spring AOP](./11-02-Spring AOP.md)
