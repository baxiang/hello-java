# 11.7 Spring IOC 源码解读

## 一、Spring 容器启动流程

### 1.1 整体流程

```
1. 创建容器对象
   ↓
2. 读取配置文件/注解
   ↓
3. 解析 Bean 定义
   ↓
4. 注册 Bean 定义
   ↓
5. 实例化 Bean
   ↓
6. 依赖注入
   ↓
7. 初始化 Bean
   ↓
8. 注册销毁回调
```

### 1.2 核心类图

```
BeanFactory (接口)
    ↑
ApplicationContext (接口)
    ↑
AbstractApplicationContext (抽象类)
    ↑
AnnotationConfigApplicationContext (实现类)
```

## 二、容器启动源码分析

### 2.1 创建容器

```java
// 用户代码
AnnotationConfigApplicationContext context = 
    new AnnotationConfigApplicationContext(AppConfig.class);
```

### 2.2 构造方法调用链

```java
// 1. 调用构造方法
public AnnotationConfigApplicationContext(Class<?>... componentClasses) {
    this();  // 调用无参构造
    register(componentClasses);  // 注册配置类
    refresh();  // 刷新容器（核心）
}

// 2. 无参构造
public AnnotationConfigApplicationContext() {
    this.reader = new AnnotatedBeanDefinitionReader(this);
    this.scanner = new ClassPathBeanDefinitionScanner(this);
}
```

### 2.3 register 注册配置类

```java
public void register(Class<?>... componentClasses) {
    for (Class<?> componentClass : componentClasses) {
        // 将配置类解析为 BeanDefinition
        this.reader.register(componentClass);
    }
}

// AnnotatedBeanDefinitionReader.register
private <T> void doRegisterBean(Class<T> beanClass, String name,
        Class<? extends Annotation>[] qualifiers, Supplier<T> supplier,
        BeanDefinitionCustomizer[] customizers) {
    
    // 创建 BeanDefinition
    AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(beanClass);
    
    // 解析 @Scope
    ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
    abd.setScope(scopeMetadata.getScopeName());
    
    // 解析 @Lazy, @Primary, @DependsOn, @Role, @Description
    AnnotationConfigUtils.processCommonDefinitionAnnotations(abd, metadata);
    
    // 注册 BeanDefinition 到注册表
    BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, name);
    BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, getRegistry());
}
```

### 2.4 refresh 刷新容器（核心）

```java
// AbstractApplicationContext.refresh
@Override
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        // 1. 准备刷新
        prepareRefresh();
        
        // 2. 获取 BeanFactory
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
        
        // 3. 准备 BeanFactory
        prepareBeanFactory(beanFactory);
        
        try {
            // 4. 后置处理 BeanFactory
            postProcessBeanFactory(beanFactory);
            
            // 5. 调用 BeanFactory 后置处理器（核心）
            invokeBeanFactoryPostProcessors(beanFactory);
            
            // 6. 注册 Bean 后置处理器
            registerBeanPostProcessors(beanFactory);
            
            // 7. 初始化消息源
            initMessageSource();
            
            // 8. 初始化事件多播器
            initApplicationEventMulticaster();
            
            // 9. 留给子类的模板方法
            onRefresh();
            
            // 10. 注册事件监听器
            registerListeners();
            
            // 11. 实例化剩余的单例 Bean（核心）
            finishBeanFactoryInitialization(beanFactory);
            
            // 12. 完成刷新
            finishRefresh();
        }
        catch (BeansException ex) {
            destroyBeans();
            cancelRefresh(ex);
            throw ex;
        }
    }
}
```

## 三、Bean 实例化源码

### 3.1 finishBeanFactoryInitialization

```java
protected void finishBeanFactoryInitialization(ConfigurableListableBeanFactory beanFactory) {
    // 实例化所有剩余的非懒加载单例 Bean
    beanFactory.preInstantiateSingletons();
}

// DefaultListableBeanFactory.preInstantiateSingletons
@Override
public void preInstantiateSingletons() throws BeansException {
    for (String beanName : this.beanDefinitionNames) {
        BeanDefinition bd = getMergedLocalBeanDefinition(beanName);
        
        // 只实例化单例、非抽象、非懒加载的 Bean
        if (bd.isSingleton() && !bd.isAbstract() && !bd.isLazyInit()) {
            // 如果是 FactoryBean
            if (isFactoryBean(beanName)) {
                // 获取 FactoryBean
                FactoryBean<?> factory = (FactoryBean<?>) getBean(FACTORY_BEAN_PREFIX + beanName);
                // 是否需要提前初始化
                boolean isEagerInit = factory instanceof SmartFactoryBean &&
                    ((SmartFactoryBean<?>) factory).isEagerInit();
                if (isEagerInit) {
                    getBean(beanName);
                }
            }
            else {
                // 普通 Bean，调用 getBean
                getBean(beanName);
            }
        }
    }
}
```

### 3.2 getBean 方法

```java
// AbstractBeanFactory.getBean
@Override
public Object getBean(String name) throws BeansException {
    return doGetBean(name, null, null, false);
}

// 核心方法
protected <T> T doGetBean(String name, Class<T> requiredType, 
        Object[] args, boolean typeCheckOnly) throws BeansException {
    
    // 1. 转换 Bean 名称（处理 FactoryBean 的&前缀）
    String beanName = transformedBeanName(name);
    Object bean;
    
    // 2. 尝试从缓存获取单例 Bean
    Object sharedInstance = getSingleton(beanName);
    if (sharedInstance != null && args == null) {
        // 从单例缓存中获取
        bean = getObjectForBeanInstance(sharedInstance, name, beanName, null);
    }
    else {
        // 3. 缓存中没有，创建新实例
        if (isPrototypeCurrentlyInCreation(beanName)) {
            throw new BeanCurrentlyInCreationException(beanName);
        }
        
        // 4. 检查父 BeanFactory
        BeanFactory parentBeanFactory = getParentBeanFactory();
        if (parentBeanFactory != null && !containsBeanDefinition(beanName)) {
            return parentBeanFactory.doGetBean(...);
        }
        
        // 5. 标记 Bean 正在创建
        markBeanAsCreated(beanName);
        
        try {
            // 6. 合并 BeanDefinition
            RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
            
            // 7. 处理依赖的 Bean
            String[] dependsOn = mbd.getDependsOn();
            if (dependsOn != null) {
                for (String dep : dependsOn) {
                    getBean(dep);
                }
            }
            
            // 8. 创建 Bean 实例
            if (mbd.isSingleton()) {
                sharedInstance = getSingleton(beanName, () -> {
                    try {
                        return createBean(beanName, mbd, args);
                    }
                    catch (BeansException ex) {
                        destroySingleton(beanName);
                        throw ex;
                    }
                });
                bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
            }
            else if (mbd.isPrototype()) {
                // 原型 Bean，每次创建新实例
                Object prototypeInstance = createBean(beanName, mbd, args);
                bean = getObjectForBeanInstance(prototypeInstance, name, beanName, mbd);
            }
            else {
                // 其他作用域
                String scopeName = mbd.getScope();
                // ...
            }
        }
        catch (BeansException ex) {
            cleanupAfterBeanCreationFailure(beanName);
            throw ex;
        }
    }
    
    // 9. 检查类型并返回
    if (requiredType != null && !requiredType.isInstance(bean)) {
        throw new BeanNotOfRequiredTypeException(name, requiredType, bean.getClass());
    }
    return (T) bean;
}
```

### 3.3 createBean 创建 Bean

```java
// AbstractAutowireCapableBeanFactory.createBean
@Override
protected Object createBean(String beanName, RootBeanDefinition mbd, Object[] args)
        throws BeanCreationException {
    
    RootBeanDefinition mbdToUse = mbd;
    
    // 1. 解析 Bean 类
    Class<?> resolvedClass = resolveBeanClass(mbd, beanName);
    
    // 2. 处理 lookup-method
    mbdToUse.prepareMethodOverrides();
    
    try {
        // 3. Bean 后置处理器 - 实例化前
        Object bean = resolveBeforeInstantiation(beanName, mbdToUse);
        if (bean != null) {
            return bean;
        }
    }
    catch (Throwable ex) {
        throw new BeanCreationException(...);
    }
    
    try {
        // 4. 真正创建 Bean
        Object beanInstance = doCreateBean(beanName, mbdToUse, args);
        return beanInstance;
    }
    catch (BeanCreationException ex) {
        throw ex;
    }
}
```

### 3.4 doCreateBean 核心方法

```java
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, Object[] args)
        throws BeanCreationException {
    
    BeanWrapper instanceWrapper = null;
    
    // 1. 实例化 Bean
    if (mbd.isSingleton()) {
        instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
    }
    if (instanceWrapper == null) {
        instanceWrapper = createBeanInstance(beanName, mbd, args);
    }
    
    Object exposedObject = bean;
    try {
        // 2. 属性填充（依赖注入）
        populateBean(beanName, mbd, instanceWrapper);
        
        // 3. 初始化 Bean
        exposedObject = initializeBean(beanName, exposedObject, mbd);
    }
    catch (Throwable ex) {
        throw new BeanCreationException(...);
    }
    
    try {
        // 4. 注册销毁回调
        registerDisposableBeanIfNecessary(beanName, bean, mbd);
    }
    catch (BeanDefinitionValidationException ex) {
        throw new BeanCreationException(...);
    }
    
    return exposedObject;
}
```

## 四、依赖注入源码

### 4.1 populateBean 属性填充

```java
protected void populateBean(String beanName, RootBeanDefinition mbd, BeanWrapper bw) {
    PropertyValues pvs = mbd.getPropertyValues();
    
    // 1. 调用 BeanPostProcessor 的 postProcessProperties
    for (BeanPostProcessor bp : getBeanPostProcessors()) {
        pvs = bp.postProcessProperties(pvs, bw.getWrappedInstance(), beanName);
    }
    
    // 2. 应用属性值
    if (pvs != null) {
        applyPropertyValues(beanName, mbd, bw, pvs);
    }
}
```

### 4.2 @Autowired 注入原理

```java
// AutowiredAnnotationBeanPostProcessor.postProcessProperties
public PropertyValues postProcessProperties(PropertyValues pvs, Object bean, String beanName) {
    // 查找 @Autowired 注解
    InjectionMetadata metadata = findAutowiringMetadata(beanName, bean.getClass(), pvs);
    try {
        // 执行注入
        metadata.inject(bean, beanName, pvs);
    }
    catch (Throwable ex) {
        throw new BeanCreationException(...);
    }
    return pvs;
}

// 注入方法
private void inject(Object bean, String beanName, PropertyValues pvs) throws Throwable {
    Field field = (Field) this.member;
    Object value = resolveFieldValue(field, bean, beanName);
    field.set(bean, value);
}
```

## 五、Bean 初始化源码

### 5.1 initializeBean

```java
protected Object initializeBean(String beanName, Object bean, RootBeanDefinition mbd) {
    // 1. 调用 Aware 接口方法
    invokeAwareMethods(beanName, bean);
    
    Object wrappedBean = bean;
    
    // 2. BeanPostProcessor 前置处理
    wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
    
    try {
        // 3. 调用初始化方法
        invokeInitMethods(beanName, wrappedBean, mbd);
    }
    catch (Throwable ex) {
        throw new BeanCreationException(...);
    }
    
    // 4. BeanPostProcessor 后置处理
    wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
    
    return wrappedBean;
}
```

### 5.2 调用初始化方法

```java
protected void invokeInitMethods(String beanName, Object bean, RootBeanDefinition mbd)
        throws Throwable {
    
    // 1. 检查是否实现 InitializingBean
    boolean isInitializingBean = (bean instanceof InitializingBean);
    if (isInitializingBean) {
        // 调用 afterPropertiesSet
        ((InitializingBean) bean).afterPropertiesSet();
    }
    
    // 2. 调用自定义 init-method
    String initMethodName = mbd.getInitMethodName();
    if (initMethodName != null && !("afterPropertiesSet".equals(initMethodName) && isInitializingBean)) {
        invokeCustomInitMethod(beanName, bean, mbd);
    }
}
```

## 六、循环依赖解决

### 6.1 三级缓存

```java
// DefaultSingletonBeanRegistry
/** 一级缓存：完整的单例 Bean */
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

/** 二级缓存：早期 Bean 引用（未填充属性） */
private final Map<String, Object> earlySingletonObjects = new HashMap<>(16);

/** 三级缓存：Bean 工厂，用于创建 AOP 代理 */
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16);
```

### 6.2 解决流程

```
A 依赖 B，B 依赖 A

1. 创建 A，实例化后放入三级缓存
2. A 注入 B，发现 B 不存在
3. 创建 B，实例化后放入三级缓存
4. B 注入 A，从三级缓存获取 A 的早期引用
5. B 创建完成，放入一级缓存
6. A 获取 B，完成创建，放入一级缓存
```

### 6.3 getSingleton 源码

```java
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
    // 1. 从一级缓存获取
    Object singletonObject = this.singletonObjects.get(beanName);
    
    // 2. 一级缓存没有，检查二级缓存
    if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
        singletonObject = this.earlySingletonObjects.get(beanName);
        
        // 3. 二级缓存没有，检查三级缓存
        if (singletonObject == null && allowEarlyReference) {
            ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
            if (singletonFactory != null) {
                singletonObject = singletonFactory.getObject();
                // 从三级缓存移到二级缓存
                this.earlySingletonObjects.put(beanName, singletonObject);
                this.singletonFactories.remove(beanName);
            }
        }
    }
    return singletonObject;
}
```

## 七、小结

1. **容器启动**：refresh 方法是核心
2. **Bean 实例化**：createBean → doCreateBean
3. **依赖注入**：populateBean 属性填充
4. **Bean 初始化**：Aware → BPP 前置 → init → BPP 后置
5. **循环依赖**：三级缓存解决单例循环依赖

---

[上一节：11.6 Spring MVC](./11-06-Spring MVC.md) | [下一节：11.8 Spring AOP 源码解读](./11-08-Spring AOP 源码解读.md)
