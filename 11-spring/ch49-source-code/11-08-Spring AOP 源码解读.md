# 11.8 Spring AOP 源码解读

## 一、AOP 核心概念

### 1.1 AOP 术语

| 术语 | 英文 | 说明 |
|------|------|------|
| 切面 | Aspect | 横切关注点的模块化 |
| 连接点 | Join Point | 程序执行的点（方法执行） |
| 通知 | Advice | 切面在连接点执行的动作 |
| 切点 | Pointcut | 匹配连接点的谓词 |
| 织入 | Weaving | 将切面应用到目标对象 |

### 1.2 通知类型

```
前置通知（Before）     → 方法执行前
后置通知（After）      → 方法执行后（无论成功失败）
返回通知（AfterReturning） → 方法成功返回后
异常通知（AfterThrowing）  → 方法抛出异常后
环绕通知（Around）     → 包围方法执行
```

## 二、Spring AOP 代理机制

### 2.1 两种代理方式

```
JDK 动态代理（基于接口）
    └── 目标类实现接口 → 使用 JDK 代理

CGLIB 代理（基于子类）
    └── 目标类没有接口 → 使用 CGLIB 代理
```

### 2.2 代理创建入口

```java
// AnnotationAwareAspectJAutoProxyCreator
// 继承关系：
AnnotationAwareAspectJAutoProxyCreator
    ← AspectJAwareAdvisorAutoProxyCreator
    ← AbstractAdvisorAutoProxyCreator
    ← AbstractAutoProxyCreator
    ← ProxyProcessorSupport
    ← SmartInstantiationAwareBeanPostProcessor
```

### 2.3 代理创建流程

```java
// AbstractAutoProxyCreator.postProcessAfterInitialization
@Override
public Object postProcessAfterInitialization(Object bean, String beanName) {
    if (bean != null) {
        Object cacheKey = getCacheKey(bean.getClass(), beanName);
        if (!this.earlyProxyReferences.contains(cacheKey)) {
            // 如果需要代理，创建代理
            return wrapIfNecessary(bean, beanName, cacheKey);
        }
    }
    return bean;
}

// wrapIfNecessary 核心方法
protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) {
    // 1. 检查是否已经处理过
    if (StringUtils.hasLength(beanName) && this.targetSourcedBeans.contains(beanName)) {
        return bean;
    }
    
    // 2. 获取增强器（Advisor）
    Object[] specificInterceptors = getAdvicesAndAdvisorsForBean(
        bean.getClass(), beanName, null);
    
    // 3. 如果有增强器，创建代理
    if (specificInterceptors != DO_NOT_PROXY) {
        this.advisedBeans.put(cacheKey, Boolean.TRUE);
        
        // 创建代理
        Object proxy = createProxy(
            bean.getClass(), beanName, specificInterceptors, new SingletonTargetSource(bean));
        
        this.proxyTypes.put(cacheKey, proxy.getClass());
        return proxy;
    }
    
    this.advisedBeans.put(cacheKey, Boolean.FALSE);
    return bean;
}
```

## 三、代理创建源码

### 3.1 createProxy 创建代理

```java
// AbstractAutoProxyCreator.createProxy
protected Object createProxy(Class<?> beanClass, String beanName,
        Object[] specificInterceptors, TargetSource targetSource) {
    
    ProxyFactory proxyFactory = new ProxyFactory();
    
    // 1. 复制配置
    proxyFactory.copyFrom(this);
    
    // 2. 确定代理方式（JDK 或 CGLIB）
    if (!proxyFactory.isProxyTargetClass()) {
        if (shouldProxyTargetClass(beanClass, beanName)) {
            proxyFactory.setProxyTargetClass(true);
        }
        else {
            evaluateProxyInterfaces(beanClass, proxyFactory);
        }
    }
    
    // 3. 添加增强器
    Advisor[] advisors = buildAdvisors(beanName, specificInterceptors);
    proxyFactory.addAdvisors(advisors);
    
    // 4. 设置目标类
    proxyFactory.setTargetSource(targetSource);
    
    // 5. 定制代理工厂
    customizeProxyFactory(proxyFactory);
    
    // 6. 创建代理
    return proxyFactory.getProxy(getProxyClassLoader());
}
```

### 3.2 选择代理方式

```java
// DefaultAopProxyFactory.createAopProxy
@Override
public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {
    // 判断使用 JDK 还是 CGLIB
    if (config.isOptimize() || config.isProxyTargetClass() 
            || hasNoUserSuppliedProxyInterfaces(config)) {
        Class<?> targetClass = config.getTargetClass();
        
        if (targetClass == null) {
            throw new AopConfigException("TargetSource cannot determine target class");
        }
        
        // 目标是接口或代理类 → JDK 动态代理
        if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
            return new JdkDynamicAopProxy(config);
        }
        
        // 目标是普通类 → CGLIB 代理
        return new ObjenesisCglibAopProxy(config);
    }
    else {
        // 默认 JDK 动态代理
        return new JdkDynamicAopProxy(config);
    }
}
```

## 四、JDK 动态代理源码

### 4.1 代理调用

```java
// JdkDynamicAopProxy.invoke
@Override
@Nullable
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    Object oldProxy = null;
    boolean setProxyContext = false;
    
    // 获取目标对象
    TargetSource targetSource = this.advised.targetSource;
    Object target = null;
    
    try {
        // 1. equals 方法特殊处理
        if (!this.equalsDefined && AopUtils.isEqualsMethod(method)) {
            return equals(args[0]);
        }
        // 2. hashCode 方法特殊处理
        else if (!this.hashCodeDefined && AopUtils.isHashCodeMethod(method)) {
            return hashCode();
        }
        // 3. Advised 接口方法处理
        else if (method.getDeclaringClass() == Advised.class) {
            return method.invoke(this.advised, args);
        }
        
        // 4. 获取拦截器链
        List<Object> chain = this.advised.getInterceptorsAndDynamicInterceptionAdvice(
            method, targetClass);
        
        // 5. 调用目标方法
        Object retVal;
        if (chain.isEmpty() && Modifier.isPublic(method.getModifiers())) {
            // 没有拦截器，直接调用
            retVal = method.invoke(target, args);
        }
        else {
            // 有拦截器，创建 MethodInvocation
            retVal = new CglibMethodInvocation(proxy, target, method, args, 
                                               targetClass, chain).proceed();
        }
        
        // 6. 处理返回值
        retVal = processReturnType(proxy, target, method, retVal);
        return retVal;
    }
    finally {
        // 清理
        if (target != null) {
            targetSource.releaseTarget(target);
        }
    }
}
```

### 4.2 拦截器链执行

```java
// ReflectiveMethodInvocation.proceed
@Override
public Object proceed() throws Throwable {
    // 如果拦截器链执行完毕，调用目标方法
    if (this.currentInterceptorIndex == this.interceptorsAndDynamicMethodMatchers.size() - 1) {
        return invokeJoinpoint();
    }
    
    // 获取下一个拦截器
    Object interceptor = this.interceptorsAndDynamicMethodMatchers.get(
        ++this.currentInterceptorIndex);
    
    if (interceptor instanceof InterceptorAndDynamicMethodMatcher) {
        // 动态切点匹配
        InterceptorAndDynamicMethodMatcher dm = 
            (InterceptorAndDynamicMethodMatcher) interceptor;
        if (dm.methodMatcher.matches(this.method, this.targetClass, this.arguments)) {
            return dm.interceptor.invoke(this);
        }
        else {
            // 不匹配，跳过
            return proceed();
        }
    }
    else {
        // 执行拦截器
        return ((MethodInterceptor) interceptor).invoke(this);
    }
}
```

## 五、CGLIB 代理源码

### 5.1 代理类生成

```java
// ObjenesisCglibAopProxy.getProxy
@Override
public Object getProxy(@Nullable ClassLoader classLoader) {
    // 1. 创建 Enhancer
    Enhancer enhancer = new Enhancer();
    enhancer.setSuperclass(this.advised.getTargetClass());
    enhancer.setInterfaces(AopProxyUtils.completeProxiedInterfaces(this.advised));
    
    // 2. 设置回调
    enhancer.setCallbackFilter(new ProxyCallbackFilter(
        this.advised.getConfigurationOnlyCopy(), this.fixedInterceptors));
    enhancer.setCallbackTypeCallbacks(this.advised.getConfigurationOnlyCopy());
    
    // 3. 生成代理类
    Class<?> proxyClass = enhancer.createClass();
    
    // 4. 创建代理实例
    return proxyClass.newInstance();
}
```

### 5.2 方法拦截

```java
// DynamicAdvisedInterceptor.intercept
@Override
public Object intercept(Object proxy, Method method, Object[] args, 
                        MethodProxy methodProxy) throws Throwable {
    Object oldProxy = null;
    boolean setProxyContext = false;
    Object target = null;
    
    try {
        // 1. 获取目标对象
        target = targetSource.getTarget();
        
        // 2. 获取拦截器链
        List<Object> chain = this.advised.getInterceptorsAndDynamicInterceptionAdvice(
            method, targetClass);
        
        // 3. 执行拦截器链
        Object retVal;
        if (chain.isEmpty() && Modifier.isPublic(method.getModifiers())) {
            // 没有拦截器，直接调用
            retVal = methodProxy.invoke(target, args);
        }
        else {
            // 有拦截器，创建 CglibMethodInvocation
            retVal = new CglibMethodInvocation(proxy, target, method, args, 
                                               targetClass, chain, methodProxy).proceed();
        }
        
        // 4. 处理返回值
        retVal = processReturnType(proxy, target, method, retVal);
        return retVal;
    }
    finally {
        // 清理
        if (target != null) {
            targetSource.releaseTarget(target);
        }
    }
}
```

## 六、通知执行源码

### 6.1 环绕通知

```java
// AspectJAroundInterceptor.invoke
@Override
public Object invoke(MethodInvocation invocation) throws Throwable {
    // 获取切面方法
    Method method = getAspectJAdviceMethod();
    Object aspectInstance = getAspectInstance();
    
    // 执行环绕通知
    return method.invoke(aspectInstance, invocation);
}

// 用户切面代码
@Around("execution(* com.example.service.*.*(..))")
public Object around(ProceedingJoinPoint pjp) throws Throwable {
    // 前置逻辑
    System.out.println("前置通知");
    
    // 执行目标方法
    Object result = pjp.proceed();
    
    // 后置逻辑
    System.out.println("后置通知");
    
    return result;
}
```

### 6.2 前置通知

```java
// AspectJMethodBeforeAdvice.before
@Override
public void before(Method method, Object[] args, Object target) throws Throwable {
    // 执行前置通知
    invokeAdviceMethod(getJoinPointMatch(), null, null);
}

// 用户切面代码
@Before("execution(* com.example.service.*.*(..))")
public void before(JoinPoint jp) {
    System.out.println("前置通知：" + jp.getSignature().getName());
}
```

### 6.3 后置通知

```java
// AspectJAfterAdvice.invoke
@Override
public Object invoke(MethodInvocation mi) throws Throwable {
    try {
        return mi.proceed();
    }
    finally {
        // 执行后置通知（无论成功失败）
        invokeAdviceMethod(getJoinPointMatch(), null, null);
    }
}
```

### 6.4 返回通知

```java
// AspectJAfterReturningAdvice.invoke
@Override
public Object invoke(MethodInvocation mi) throws Throwable {
    Object retVal = mi.proceed();
    
    // 执行返回通知（方法成功返回后）
    invokeAdviceMethod(getJoinPointMatch(), retVal, null);
    
    return retVal;
}
```

### 6.5 异常通知

```java
// AspectJAfterThrowingAdvice.invoke
@Override
public Object invoke(MethodInvocation mi) throws Throwable {
    try {
        return mi.proceed();
    }
    catch (Throwable ex) {
        // 执行异常通知
        if (shouldInvokeOnThrowing(ex)) {
            invokeAdviceMethod(getJoinPointMatch(), null, ex);
        }
        throw ex;
    }
}
```

## 七、切点匹配源码

### 7.1 切点解析

```java
// AspectJExpressionPointcut.matches
@Override
public boolean matches(Method method, Class<?> targetClass) {
    // 获取切点表达式
    PointcutExpression pointcutExpression = getPointcutExpression();
    
    // 匹配方法
    return pointcutExpression.matches(method, targetClass);
}
```

### 7.2 切点表达式解析

```java
// AspectJExpressionPointcut.getPointcutExpression
private PointcutExpression getPointcutExpression() {
    // 解析 execution 表达式
    // execution(* com.example.service.*.*(..))
    //       ↑    ↑          ↑    ↑ ↑
    //    返回值  类        方法 参数
    
    return factory.getExpressionFactory().createExpression(
        getExpression(), sjpNames);
}
```

## 八、小结

1. **代理机制**：JDK 动态代理（接口）和 CGLIB 代理（子类）
2. **代理创建**：AbstractAutoProxyCreator.postProcessAfterInitialization
3. **拦截器链**：MethodInvocation.proceed() 链式调用
4. **通知类型**：Before、After、AfterReturning、AfterThrowing、Around
5. **切点匹配**：AspectJExpressionPointcut 解析 execution 表达式

---

[上一节：11.7 Spring IOC 源码解读](./11-07-Spring IOC 源码解读.md) | [下一章：第 12 章 Spring Boot](../ch49-spring-boot-intro/README.md)
