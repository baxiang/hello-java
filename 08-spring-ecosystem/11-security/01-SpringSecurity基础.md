# 56.1 Spring Security 基础：安全卫士（生活类比：小区门禁）

## 一、先问一个问题

**问题**：如何保护 Web 应用的接口不被未授权访问？

### 生活例子

小区门禁：
- 大门保安检查身份（认证 Authentication）
- 门禁卡决定能进哪些楼（授权 Authorization）
- 不同业主有不同权限（角色 Role）

Spring Security 就是应用的"门禁系统"！它负责验证来访者是谁，以及允许他们访问哪些资源。

在没有安全框架之前，我们需要手动编写过滤器、拦截器来处理登录校验和权限判断，代码散落在各个地方，维护成本高且容易遗漏。Spring Security 提供了一套完整的解决方案，通过配置即可实现认证、授权、CSRF 防护、会话管理等功能。

## 二、添加依赖

在 `pom.xml` 中引入 Spring Security 起步依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

添加后 Spring Boot 会自动配置默认的安全规则，所有接口都需要认证才能访问。

## 三、基本配置 — URL 授权

创建配置类定义访问规则：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()      // 公开访问
                .requestMatchers("/admin/**").hasRole("ADMIN")  // 需要 ADMIN 角色
                .anyRequest().authenticated()                   // 其他需要认证
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .logout(logout -> logout
                .permitAll()
            );
        
        return http.build();
    }
}
```

- `permitAll()` — 任何人都可以访问
- `hasRole("ADMIN")` — 需要 ADMIN 角色，框架会自动加 `ROLE_` 前缀
- `authenticated()` — 只要登录即可，不限角色

`.requestMatchers()` 按从上到下的顺序匹配，第一个匹配的规则生效。因此要把最具体的规则写在前面，`anyRequest()` 放在最后作为兜底。

## 四、内存用户配置

开发阶段可以用内存用户快速验证功能：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder().encode("password"))
            .roles("USER")
            .build();
        
        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("admin"))
            .roles("ADMIN")
            .build();
        
        return new InMemoryUserDetailsManager(user, admin);
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.permitAll())
            .logout(logout -> logout.permitAll());
        
        return http.build();
    }
}
```

## 五、常见疑问

**Q1：添加依赖后为什么所有接口都需要登录？**

A：Spring Security 默认开启安全保护，默认规则要求所有请求都经过认证。可以通过 `SecurityFilterChain` 配置放行公开接口。

**Q2：PasswordEncoder 是做什么的？**

A：用于密码加密存储。`BCryptPasswordEncoder` 使用 BCrypt 算法，每次加密同一明文产生的密文不同，但验证时能正确匹配。数据库中绝不应存储明文密码。

**Q3：`hasRole("ADMIN")` 和 `hasAuthority("ROLE_ADMIN")` 有什么区别？**

A：两者等价。`hasRole` 会自动添加 `ROLE_` 前缀，写起来更简洁。

**Q4：默认登录页面长什么样？**

A：Spring Security 提供了一个内置的登录页面，路径为 `/login`。启动项目后访问任意受保护接口会自动跳转到该页面。也可以用自己的登录页替换，通过 `.loginPage("/my-login")` 指定。

## 六、小结

| 概念 | 说明 | 关键代码 |
|------|------|----------|
| 认证 | 验证用户身份 | `formLogin()` |
| 授权 | 控制访问权限 | `hasRole()`, `permitAll()` |
| UserDetailsService | 加载用户详情 | `InMemoryUserDetailsManager` |
| PasswordEncoder | 密码加密 | `BCryptPasswordEncoder` |
| SecurityFilterChain | 安全过滤链配置 | `authorizeHttpRequests()` |
