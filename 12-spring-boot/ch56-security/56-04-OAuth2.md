# 56.4 OAuth2：第三方登录（生活类比：通行证）

## 一、先问一个问题

**问题**：如何让用户使用微信、GitHub 等第三方账号登录？

### 生活例子

游乐场通行证：
- 在其他乐园买过票（第三方平台注册）
- 凭通行证直接入园（OAuth2 授权登录）
- 无需重新购票（免注册）

OAuth2 就是互联网的"通行证"！

## 二、OAuth2 简介

**OAuth2** 是一种授权框架，允许用户授权第三方应用访问其资源，而无需提供密码。

**核心角色**：
- **Resource Owner（资源所有者）**：用户本人
- **Client（客户端）**：我们的应用
- **Authorization Server（授权服务器）**：GitHub/Google 等
- **Resource Server（资源服务器）**：存放用户信息的服务器

**流程**：
1. 用户点击"使用 GitHub 登录"
2. 跳转到 GitHub 授权页面
3. 用户同意授权
4. 跳转回应用，携带授权码
5. 应用用授权码换取用户信息

## 三、添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
```

## 四、配置文件

在 `application.yml` 中配置 OAuth2 客户端信息：

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: your-client-id
            client-secret: your-client-secret
            scope: read:user,user:email
          google:
            client-id: your-client-id
            client-secret: your-client-secret
            scope: profile,email
```

**配置说明**：
- `client-id` 和 `client-secret`：从第三方平台获取
- `scope`：申请的用户权限范围
- 回调 URL 默认为 `/login/oauth2/code/{registrationId}`

## 五、安全配置

创建配置类来定义安全策略：

```java
@Configuration
@EnableWebSecurity
public class OAuth2Config {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("/home")
                .failureUrl("/login?error=true")
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login")
            );
        
        return http.build();
    }
}
```

**配置说明**：
- `oauth2Login()`：启用 OAuth2 登录功能
- `loginPage()`：自定义登录页面路径
- `defaultSuccessUrl()`：登录成功后的跳转路径
- `failureUrl()`：登录失败后的跳转路径

## 六、自定义用户信息

实现自定义的 OAuth2UserService 来处理用户信息的获取和同步：

```java
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    
    @Autowired
    private UserMapper userMapper;
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) 
            throws OAuth2AuthenticationException {
        OAuth2User oauth2User = new DefaultOAuth2UserService()
            .loadUser(userRequest);
        
        String email = oauth2User.getAttribute("email");
        
        // 检查用户是否存在，不存在则创建
        User user = userMapper.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setUsername(oauth2User.getAttribute("name"));
            userMapper.insert(user);
        }
        
        return oauth2User;
    }
}
```

**实现说明**：
- 从第三方获取用户信息后，查询本地用户表
- 如果用户不存在，自动注册并保存
- 这样可以实现"首次登录即注册"的体验

## 七、常见疑问

**Q1：OAuth2 和 JWT 有什么区别？**

A：OAuth2 是授权框架，用于第三方登录；JWT 是 Token 格式，用于无状态认证。两者可以结合使用：OAuth2 获取用户信息后，签发 JWT 用于后续请求认证。

**Q2：如何获取 GitHub/Google 的 client-id？**

A：在对应平台的开发者控制台创建 OAuth App，配置回调 URL 后获取。

| 平台 | 控制台地址 | 回调 URL 格式 |
|------|----------|--------------|
| GitHub | github.com/settings/developers | http://localhost:8080/login/oauth2/code/github |
| Google | console.cloud.google.com | http://localhost:8080/login/oauth2/code/google |
| 微信 | open.weixin.qq.com | http://localhost:8080/login/oauth2/code/wechat |

**Q3：OAuth2 支持哪些授权模式？**

A：常见模式包括授权码模式（最常用）、隐式模式、密码模式、客户端凭证模式。Web 应用推荐使用授权码模式（Authorization Code）。

## 八、小结

| 概念 | 说明 | 关键配置 |
|------|------|----------|
| OAuth2 | 第三方授权登录 | spring-boot-starter-oauth2-client |
| Registration | 第三方应用配置 | client-id, client-secret |
| oauth2Login | 启用 OAuth2 登录 | defaultSuccessUrl |
| OAuth2UserService | 自定义用户处理 | loadUser() |

## 九、动手练习

1. 在 GitHub 创建 OAuth App 获取 client-id
2. 配置 Spring Boot OAuth2 客户端
3. 实现 GitHub 第三方登录
