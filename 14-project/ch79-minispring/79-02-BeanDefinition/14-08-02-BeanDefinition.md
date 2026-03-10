# 79.2 BeanDefinition 和 Bean 注册

## 一、BeanDefinition 定义

BeanDefinition 存储 Bean 的元数据信息，是 Spring 容器管理 Bean 的基础。

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
    
    public boolean isSingleton() {
        return "singleton".equals(scope);
    }
    
    public boolean isPrototype() {
        return "prototype".equals(scope);
    }
}
```

**核心要点**：
- `beanClass`：Bean 的类型
- `scope`：作用域（单例/原型）
- 后续可扩展：构造参数、属性值、初始化方法等

## 二、PropertyValues 属性值

存储 Bean 的属性值，用于依赖注入。

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

## 三、BeanFactory 接口

BeanFactory 是 IOC 容器的核心接口，定义了获取 Bean 的方法。

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

**方法说明**：
- `getBean(name)`：根据名称获取 Bean
- `getBean(name, type)`：根据名称和类型获取 Bean
- `containsBean(name)`：检查是否包含 Bean
- `isSingleton(name)`：是否是单例

## 四、Bean 注册表

实现 BeanDefinition 的注册和管理。

```java
package com.example.minispring.beans.factory.support;

import com.example.minispring.beans.config.BeanDefinition;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Bean 定义注册表
 */
public class DefaultListableBeanFactory {
    
    /** Bean 定义注册表 */
    private final Map<String, BeanDefinition> beanDefinitionMap = 
        new ConcurrentHashMap<>();
    
    /**
     * 注册 Bean 定义
     */
    public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition) {
        beanDefinitionMap.put(beanName, beanDefinition);
    }
    
    /**
     * 获取 Bean 定义
     */
    public BeanDefinition getBeanDefinition(String beanName) {
        return beanDefinitionMap.get(beanName);
    }
    
    /**
     * 是否包含 Bean 定义
     */
    public boolean containsBeanDefinition(String beanName) {
        return beanDefinitionMap.containsKey(beanName);
    }
    
    /**
     * 获取所有 Bean 名称
     */
    public String[] getBeanDefinitionNames() {
        return beanDefinitionMap.keySet().toArray(new String[0]);
    }
}
```

## 五、测试代码

```java
package com.example.minispring.test;

import com.example.minispring.beans.config.BeanDefinition;
import com.example.minispring.beans.factory.support.DefaultListableBeanFactory;

public class BeanDefinitionTest {
    
    public static void main(String[] args) {
        // 1. 创建 Bean 工厂
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        
        // 2. 创建 Bean 定义
        BeanDefinition bd = new BeanDefinition(UserService.class);
        bd.setScope("singleton");
        
        // 3. 注册 Bean 定义
        factory.registerBeanDefinition("userService", bd);
        
        // 4. 验证注册
        System.out.println("包含 userService: " + 
            factory.containsBeanDefinition("userService"));
        
        // 5. 获取 Bean 定义
        BeanDefinition retrieved = factory.getBeanDefinition("userService");
        System.out.println("Bean 类型：" + retrieved.getBeanClass().getName());
        System.out.println("作用域：" + retrieved.getScope());
    }
}

class UserService {
    public void sayHello() {
        System.out.println("Hello!");
    }
}
```

## 六、小结

1. **BeanDefinition**：存储 Bean 元数据（类、作用域）
2. **PropertyValues**：存储属性值，用于依赖注入
3. **BeanFactory**：IOC 容器核心接口
4. **Bean 注册表**：管理 BeanDefinition 的注册和查询

## 七、下一步

下一节将实现**单例 Bean 注册表**，学习如何存储和管理单例 Bean 实例。

---

[上一节：79.1 项目概述](../79-01-项目概述/14-08-01-项目概述.md) | 
[下一节：79.3 单例 Bean 注册表](../79-03-单例注册表/14-08-03-单例注册表.md)
