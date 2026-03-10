# 14.8 Mini-Spring 项目

## 一、项目介绍

### 1.1 项目概述

Mini-Spring 是一个简化版的 Spring 框架，通过逐步实现 Spring 的核心功能，帮助深入理解 Spring 的工作原理。

**学习目标**：
- 理解 IOC 容器的实现原理
- 掌握 Bean 的生命周期管理
- 理解依赖注入的实现机制
- 掌握 AOP 的实现原理

### 1.2 功能模块

```
Mini-Spring
├── 第 1 阶段：基础 IOC 容器
│   ├── BeanFactory 接口
│   ├── BeanDefinition 定义
│   └── 单例 Bean 注册表
├── 第 2 阶段：Bean 实例化
│   ├── 构造方法实例化
│   ├── 属性填充
│   └── 初始化方法
├── 第 3 阶段：依赖注入
│   ├── @Autowired 注解
│   ├── @Resource 注解
│   └── 循环依赖解决
├── 第 4 阶段：AOP 支持
│   ├── 动态代理
│   ├── 通知器
│   └── 切点匹配
└── 第 5 阶段：高级特性
    ├── 应用上下文
    ├── 事件机制
    └── 资源加载
```

### 1.3 项目结构

```
minispring/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── example/
│                   └── minispring/
│                       ├── beans/
│                       │   ├── factory/
│                       │   │   ├── BeanFactory.java
│                       │   │   ├── ConfigurableListableBeanFactory.java
│                       │   │   └── support/
│                       │   │       ├── DefaultSingletonBeanRegistry.java
│                       │   │       └── AbstractBeanFactory.java
│                       │   ├── config/
│                       │   │   └── BeanDefinition.java
│                       │   └── exception/
│                       │       └── BeansException.java
│                       ├── context/
│                       │   ├── ApplicationContext.java
│                       │   ├── AnnotationConfigApplicationContext.java
│                       │   └── support/
│                       │       └── AbstractApplicationContext.java
│                       ├── aop/
│                       │   ├── AdvisedSupport.java
│                       │   ├── ProxyFactory.java
│                       │   └── ...
│                       └── test/
│                           └── ...
└── pom.xml
```

## 二、第 1 阶段：基础 IOC 容器

### 2.1 BeanDefinition 定义

```java
package com.example.minispring.beans.config;

/**
 * Bean 定义：存储 Bean 的元数据信息
 */
public class BeanDefinition {
    
    // Bean 的类
    private Class<?> beanClass;
    
    // Bean 的作用域（singleton/prototype）
    private String scope = "singleton";
    
    // 构造参数
    private Object[] constructorArgs;
    
    // 属性值
    private PropertyValues propertyValues = new PropertyValues();
    
    public BeanDefinition() {
    }
    
    public BeanDefinition(Class<?> beanClass) {
        this.beanClass = beanClass;
    }
    
    // Getter 和 Setter
    public Class<?> getBeanClass() {
        return beanClass;
    }
    
    public void setBeanClass(Class<?> beanClass) {
        this.beanClass = beanClass;
    }
    
    public String getScope() {
        return scope;
    }
    
    public void setScope(String scope) {
        this.scope = scope;
    }
    
    public Object[] getConstructorArgs() {
        return constructorArgs;
    }
    
    public void setConstructorArgs(Object[] constructorArgs) {
        this.constructorArgs = constructorArgs;
    }
    
    public PropertyValues getPropertyValues() {
        return propertyValues;
    }
    
    public void setPropertyValues(PropertyValues propertyValues) {
        this.propertyValues = propertyValues;
    }
    
    public boolean isSingleton() {
        return "singleton".equals(scope);
    }
    
    public boolean isPrototype() {
        return "prototype".equals(scope);
    }
}
```

### 2.2 PropertyValues 属性值

```java
package com.example.minispring.beans.config;

import java.util.ArrayList;
import java.util.List;

/**
 * 属性值集合
 */
public class PropertyValues {
    
    private final List<PropertyValue> propertyValueList = new ArrayList<>();
    
    public void addPropertyValue(PropertyValue pv) {
        propertyValueList.add(pv);
    }
    
    public PropertyValue[] getPropertyValues() {
        return propertyValueList.toArray(new PropertyValue[0]);
    }
    
    public PropertyValue getPropertyValue(String propertyName) {
        for (PropertyValue pv : propertyValueList) {
            if (pv.getName().equals(propertyName)) {
                return pv;
            }
        }
        return null;
    }
}

/**
 * 单个属性值
 */
public class PropertyValue {
    
    private final String name;
    private final Object value;
    
    public PropertyValue(String name, Object value) {
        this.name = name;
        this.value = value;
    }
    
    public String getName() {
        return name;
    }
    
    public Object getValue() {
        return value;
    }
}
```

### 2.3 BeanFactory 接口

```java
package com.example.minispring.beans.factory;

import com.example.minispring.beans.exception.BeansException;

/**
 * Bean 工厂接口：IOC 容器的核心接口
 */
public interface BeanFactory {
    
    /**
     * 获取 Bean
     */
    Object getBean(String name) throws BeansException;
    
    /**
     * 获取 Bean（指定类型）
     */
    <T> T getBean(String name, Class<T> requiredType) throws BeansException;
    
    /**
     * 是否包含指定 Bean
     */
    boolean containsBean(String name);
    
    /**
     * 是否是单例
     */
    boolean isSingleton(String name) throws BeansException;
    
    /**
     * 获取 Bean 类型
     */
    Class<?> getType(String name) throws BeansException;
}
```

### 2.4 单例 Bean 注册表

```java
package com.example.minispring.beans.factory.support;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 单例 Bean 注册表：存储单例 Bean 实例
 */
public class DefaultSingletonBeanRegistry {
    
    /** 一级缓存：完整的单例 Bean */
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>();
    
    /** 二级缓存：早期 Bean 引用（未填充属性） */
    private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap<>();
    
    /**
     * 获取单例 Bean
     */
    public Object getSingleton(String beanName) {
        Object singletonObject = singletonObjects.get(beanName);
        if (singletonObject == null) {
            singletonObject = earlySingletonObjects.get(beanName);
        }
        return singletonObject;
    }
    
    /**
     * 注册单例 Bean
     */
    public void addSingleton(String beanName, Object singletonObject) {
        singletonObjects.put(beanName, singletonObject);
        earlySingletonObjects.remove(beanName);
    }
    
    /**
     * 添加早期 Bean 引用
     */
    public void addEarlyBean(String beanName, Object singletonObject) {
        earlySingletonObjects.put(beanName, singletonObject);
    }
}
```

### 2.5 AbstractBeanFactory 抽象类

```java
package com.example.minispring.beans.factory.support;

import com.example.minispring.beans.config.BeanDefinition;
import com.example.minispring.beans.exception.BeansException;
import com.example.minispring.beans.factory.BeanFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Bean 工厂抽象类：实现 BeanFactory 接口的公共逻辑
 */
public abstract class AbstractBeanFactory extends DefaultSingletonBeanRegistry 
        implements BeanFactory {
    
    /** Bean 定义注册表 */
    private final Map<String, BeanDefinition> beanDefinitionMap = 
        new ConcurrentHashMap<>();
    
    @Override
    public Object getBean(String name) throws BeansException {
        return doGetBean(name);
    }
    
    @Override
    public <T> T getBean(String name, Class<T> requiredType) throws BeansException {
        return (T) getBean(name);
    }
    
    @Override
    public boolean containsBean(String name) {
        return containsBeanDefinition(name);
    }
    
    @Override
    public boolean isSingleton(String name) {
        BeanDefinition bd = getBeanDefinition(name);
        return bd.isSingleton();
    }
    
    @Override
    public Class<?> getType(String name) {
        BeanDefinition bd = getBeanDefinition(name);
        return bd.getBeanClass();
    }
    
    /**
     * 注册 Bean 定义
     */
    public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition) {
        beanDefinitionMap.put(beanName, beanDefinition);
    }
    
    public BeanDefinition getBeanDefinition(String beanName) {
        return beanDefinitionMap.get(beanName);
    }
    
    public boolean containsBeanDefinition(String beanName) {
        return beanDefinitionMap.containsKey(beanName);
    }
    
    /**
     * 获取 Bean 的核心方法
     */
    protected Object doGetBean(String name) {
        // 1. 尝试从缓存获取
        Object sharedInstance = getSingleton(name);
        if (sharedInstance != null) {
            return sharedInstance;
        }
        
        // 2. 缓存中没有，创建 Bean
        BeanDefinition bd = getBeanDefinition(name);
        Object bean = createBean(name, bd);
        
        // 3. 注册到缓存
        addSingleton(name, bean);
        
        return bean;
    }
    
    /**
     * 创建 Bean（由子类实现）
     */
    protected abstract Object createBean(String name, BeanDefinition bd);
}
```

### 2.6 测试代码

```java
package com.example.minispring.test;

import com.example.minispring.beans.config.BeanDefinition;
import com.example.minispring.beans.factory.support.AbstractBeanFactory;
import com.example.minispring.beans.factory.support.DefaultListableBeanFactory;

public class MiniSpringTest {
    
    public static void main(String[] args) {
        // 1. 创建 Bean 工厂
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        
        // 2. 注册 Bean 定义
        BeanDefinition bd = new BeanDefinition(UserService.class);
        factory.registerBeanDefinition("userService", bd);
        
        // 3. 获取 Bean
        UserService userService = (UserService) factory.getBean("userService");
        
        // 4. 使用 Bean
        userService.sayHello();
    }
}

class UserService {
    public void sayHello() {
        System.out.println("Hello, Mini-Spring!");
    }
}
```

## 三、第 2 阶段：Bean 实例化

### 3.1 InstantiationStrategy 实例化策略

```java
package com.example.minispring.beans.factory.support;

import com.example.minispring.beans.config.BeanDefinition;
import com.example.minispring.beans.exception.BeansException;

/**
 * 实例化策略接口
 */
public interface InstantiationStrategy {
    
    Object instantiate(BeanDefinition beanDefinition) throws BeansException;
}

/**
 * 简单实例化策略（使用无参构造）
 */
public class SimpleInstantiationStrategy implements InstantiationStrategy {
    
    @Override
    public Object instantiate(BeanDefinition beanDefinition) throws BeansException {
        Class<?> beanClass = beanDefinition.getBeanClass();
        try {
            return beanClass.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new BeansException("Failed to instantiate [" + beanClass.getName() + "]", e);
        }
    }
}
```

### 3.2 AbstractAutowireCapableBeanFactory

```java
package com.example.minispring.beans.factory.support;

import com.example.minispring.beans.config.BeanDefinition;
import com.example.minispring.beans.exception.BeansException;

import java.lang.reflect.Constructor;

/**
 * 自动装配 Bean 工厂：处理 Bean 实例化和属性填充
 */
public abstract class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory {
    
    private InstantiationStrategy instantiationStrategy = new SimpleInstantiationStrategy();
    
    @Override
    protected Object createBean(String beanName, BeanDefinition bd) {
        // 1. 实例化 Bean
        Object bean = instantiateBean(beanName, bd);
        
        // 2. 属性填充
        populateBean(beanName, bd, bean);
        
        // 3. 初始化 Bean
        initializeBean(beanName, bean, bd);
        
        return bean;
    }
    
    /**
     * 实例化 Bean
     */
    protected Object instantiateBean(String beanName, BeanDefinition bd) {
        return instantiationStrategy.instantiate(bd);
    }
    
    /**
     * 属性填充
     */
    protected void populateBean(String beanName, BeanDefinition bd, Object bean) {
        // 后续实现依赖注入
    }
    
    /**
     * 初始化 Bean
     */
    protected void initializeBean(String beanName, Object bean, BeanDefinition bd) {
        // 调用初始化方法
        invokeInitMethods(beanName, bean, bd);
    }
    
    /**
     * 调用初始化方法
     */
    protected void invokeInitMethods(String beanName, Object bean, BeanDefinition bd) {
        // 后续实现 InitializingBean 接口和 init-method
    }
}
```

## 四、第 3 阶段：依赖注入

### 4.1 属性填充实现

```java
@Override
protected void populateBean(String beanName, BeanDefinition bd, Object bean) {
    // 1. 获取定义的属性值
    PropertyValues pvs = bd.getPropertyValues();
    
    // 2. 应用属性值
    for (PropertyValue pv : pvs.getPropertyValues()) {
        String propertyName = pv.getName();
        Object value = pv.getValue();
        
        // 3. 设置属性
        try {
            java.lang.reflect.Field field = bean.getClass().getDeclaredField(propertyName);
            field.setAccessible(true);
            field.set(bean, value);
        } catch (Exception e) {
            throw new BeansException("Failed to set property [" + propertyName + "]", e);
        }
    }
}
```

### 4.2 @Autowired 注解支持

```java
package com.example.minispring.beans.annotation;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {
    
    boolean required() default true;
}
```

### 4.3 AutowiredAnnotationBeanPostProcessor

```java
package com.example.minispring.beans.factory.support;

import com.example.minispring.beans.annotation.Autowired;
import com.example.minispring.beans.exception.BeansException;

import java.lang.reflect.Field;

/**
 * @Autowired 注解处理器
 */
public class AutowiredAnnotationBeanPostProcessor implements BeanPostProcessor {
    
    private BeanFactory beanFactory;
    
    public AutowiredAnnotationBeanPostProcessor(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }
    
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // 处理 @Autowired 注解
        Class<?> beanClass = bean.getClass();
        
        // 处理字段注入
        for (Field field : beanClass.getDeclaredFields()) {
            if (field.isAnnotationPresent(Autowired.class)) {
                field.setAccessible(true);
                String fieldName = field.getName();
                
                try {
                    Object fieldValue = beanFactory.getBean(fieldName);
                    field.set(bean, fieldValue);
                } catch (BeansException e) {
                    Autowired autowired = field.getAnnotation(Autowired.class);
                    if (autowired.required()) {
                        throw e;
                    }
                }
            }
        }
        
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        return bean;
    }
}
```

## 五、第 4 阶段：AOP 支持

### 5.1 代理工厂

```java
package com.example.minispring.aop;

import java.lang.reflect.Proxy;

/**
 * 代理工厂：创建 AOP 代理
 */
public class ProxyFactory {
    
    private Object target;
    private Class<?>[] interfaces;
    private Advice advice;
    
    public ProxyFactory(Object target) {
        this.target = target;
        this.interfaces = target.getClass().getInterfaces();
    }
    
    public void addAdvice(Advice advice) {
        this.advice = advice;
    }
    
    public Object getProxy() {
        return Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            interfaces,
            (proxy, method, args) -> {
                // 执行环绕通知
                if (advice instanceof MethodInterceptor) {
                    return ((MethodInterceptor) advice).invoke(
                        new MethodInvocation(target, method, args)
                    );
                }
                return method.invoke(target, args);
            }
        );
    }
}
```

### 5.2 通知接口

```java
package com.example.minispring.aop;

/**
 * 通知接口
 */
public interface Advice {
}

/**
 * 方法拦截器（环绕通知）
 */
public interface MethodInterceptor extends Advice {
    
    Object invoke(MethodInvocation invocation) throws Throwable;
}

/**
 * 方法调用
 */
public class MethodInvocation {
    
    private Object target;
    private java.lang.reflect.Method method;
    private Object[] args;
    
    public MethodInvocation(Object target, java.lang.reflect.Method method, Object[] args) {
        this.target = target;
        this.method = method;
        this.args = args;
    }
    
    public Object proceed() throws Exception {
        return method.invoke(target, args);
    }
    
    public java.lang.reflect.Method getMethod() {
        return method;
    }
    
    public Object[] getArguments() {
        return args;
    }
}
```

## 六、第 5 阶段：应用上下文

### 6.1 ApplicationContext 接口

```java
package com.example.minispring.context;

import com.example.minispring.beans.factory.BeanFactory;

/**
 * 应用上下文接口：扩展 BeanFactory
 */
public interface ApplicationContext extends BeanFactory {
    
    /**
     * 获取 Bean 名称数组
     */
    String[] getBeanDefinitionNames();
}
```

### 6.2 AnnotationConfigApplicationContext

```java
package com.example.minispring.context;

import com.example.minispring.beans.config.BeanDefinition;
import com.example.minispring.beans.factory.support.DefaultListableBeanFactory;

import java.util.Set;

/**
 * 注解配置应用上下文
 */
public class AnnotationConfigApplicationContext 
        extends AbstractApplicationContext {
    
    public AnnotationConfigApplicationContext(Class<?> componentClass) {
        refresh();
    }
    
    @Override
    protected void refresh() {
        // 1. 扫描包，注册 Bean 定义
        scanPackages();
        
        // 2. 实例化所有非懒加载的单例 Bean
        finishBeanFactoryInitialization();
    }
    
    private void scanPackages() {
        // 扫描 @Component、@Service、@Controller 等注解
        // 注册 Bean 定义到 BeanFactory
    }
    
    private void finishBeanFactoryInitialization() {
        DefaultListableBeanFactory beanFactory = 
            (DefaultListableBeanFactory) getBeanFactory();
        
        String[] beanNames = beanFactory.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            BeanDefinition bd = beanFactory.getBeanDefinition(beanName);
            if (!bd.isPrototype()) {
                beanFactory.getBean(beanName);
            }
        }
    }
}
```

## 七、综合示例

### 7.1 完整使用示例

```java
package com.example.minispring.test;

import com.example.minispring.beans.annotation.Autowired;
import com.example.minispring.beans.annotation.Component;
import com.example.minispring.context.AnnotationConfigApplicationContext;

@Component
class UserService {
    
    @Autowired
    private UserDao userDao;
    
    public void createUser() {
        userDao.insert();
        System.out.println("用户创建成功");
    }
}

@Component
class UserDao {
    
    public void insert() {
        System.out.println("插入用户数据");
    }
}

public class MiniSpringDemo {
    
    public static void main(String[] args) {
        // 创建应用上下文
        AnnotationConfigApplicationContext context = 
            new AnnotationConfigApplicationContext("com.example");
        
        // 获取 Bean
        UserService userService = context.getBean(UserService.class);
        
        // 使用 Bean
        userService.createUser();
        
        // 关闭上下文
        context.close();
    }
}
```

## 八、小结

1. **IOC 容器**：BeanFactory、ApplicationContext
2. **Bean 定义**：BeanDefinition、PropertyValues
3. **Bean 实例化**：InstantiationStrategy
4. **依赖注入**：@Autowired、BeanPostProcessor
5. **AOP 支持**：ProxyFactory、Advice、MethodInterceptor
6. **应用上下文**：AnnotationConfigApplicationContext

---

[上一节：14.7 DevOps 与部署](./14-07-DevOps 与部署.md) | [下一章：第 15 章 附录](../appendix/README.md)
