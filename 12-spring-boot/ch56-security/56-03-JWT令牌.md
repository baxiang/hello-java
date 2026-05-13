# 56.3 JWT 令牌：无状态认证（生活类比：演唱会门票）

## 一、先问一个问题
**问题**：如何实现无状态的 Token 认证？

演唱会门票类比：
- 购票时生成门票（登录生成 JWT）
- 门票自带防伪信息（签名验证）
- 入场只需出示门票（请求携带 Token）
- 无需查购票记录（无状态）

JWT 就是系统的"防伪门票"！

## 二、JWT 简介

**JWT**（JSON Web Token）是一种紧凑的 Token 格式，包含三部分：
- Header：算法和类型
- Payload：用户信息和过期时间
- Signature：签名防篡改

## 三、添加依赖

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

## 四、JwtUtil 工具类

```java
@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    // 生成 Token
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }
    
    // 提取用户名
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    // 验证 Token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) 
                && !isTokenExpired(token));
    }
    
    // 检查是否过期
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
    }
}
```

## 五、JWT 认证过滤器

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) 
                                  throws ServletException, IOException {
        
        String token = extractToken(request);
        
        if (token != null) {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                
                authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request));
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

## 六、安全配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated())
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthenticationFilter, 
                UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

核心配置：`csrf.disable()` 关闭 CSRF，`STATELESS` 不创建 Session，JWT 过滤器插入到认证过滤器之前。

## 七、常见疑问

**Q1：JWT 如何保证安全性？**
A：通过签名防止篡改，设置过期时间限制有效期，敏感信息不存储在 Payload 中。

**Q2：JWT 如何实现登出？**
A：JWT 本身无状态，登出需客户端删除 Token，或在服务端维护黑名单（如 Redis）。

## 八、小结

| 概念 | 说明 | 关键类/方法 |
|------|------|-------------|
| Header | 算法和类型 | HS256 |
| Payload | 用户信息 | Subject, Expiration |
| Signature | 签名验证 | signWith() |
| JwtUtil | Token 工具类 | generateToken, validateToken |
| Filter | 请求拦截 | OncePerRequestFilter |

## 九、动手练习

1. 配置 JWT 密钥和过期时间
2. 实现 JwtUtil 工具类
3. 创建 JWT 认证过滤器并配置到 Security 链
