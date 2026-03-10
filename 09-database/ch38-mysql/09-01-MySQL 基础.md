# 9.1 MySQL 基础

## 一、SQL 分类

| 分类 | 说明 | 命令 |
|------|------|------|
| DDL | 数据定义 | CREATE、ALTER、DROP |
| DML | 数据操作 | INSERT、UPDATE、DELETE |
| DQL | 数据查询 | SELECT |
| DCL | 数据控制 | GRANT、REVOKE |

## 二、DDL 数据定义

### 2.1 创建数据库

```sql
CREATE DATABASE demo CHARACTER SET utf8mb4;
USE demo;
```

### 2.2 创建表

```sql
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 修改表

```sql
-- 添加列
ALTER TABLE user ADD COLUMN phone VARCHAR(20);

-- 修改列
ALTER TABLE user MODIFY COLUMN email VARCHAR(200);

-- 删除列
ALTER TABLE user DROP COLUMN phone;
```

### 2.4 删除表

```sql
DROP TABLE IF EXISTS user;
```

## 三、DML 数据操作

### 3.1 插入数据

```sql
-- 插入单条
INSERT INTO user (username, password, email) 
VALUES ('张三', '123456', 'zhang@example.com');

-- 插入多条
INSERT INTO user (username, password) VALUES
('李四', '123456'),
('王五', '123456');
```

### 3.2 更新数据

```sql
UPDATE user 
SET email = 'new@example.com', 
    update_time = NOW()
WHERE id = 1;
```

### 3.3 删除数据

```sql
DELETE FROM user WHERE id = 1;

-- 清空表（更快，重置自增）
TRUNCATE TABLE user;
```

## 四、DQL 数据查询

### 4.1 基本查询

```sql
-- 查询所有
SELECT * FROM user;

-- 查询指定列
SELECT id, username, email FROM user;

-- 条件查询
SELECT * FROM user WHERE age > 18;

-- 排序
SELECT * FROM user ORDER BY create_time DESC;

-- 分页
SELECT * FROM user LIMIT 0, 10;  -- 第 1 页，每页 10 条
SELECT * FROM user LIMIT 10, 10; -- 第 2 页
```

### 4.2 聚合函数

```sql
-- 计数
SELECT COUNT(*) FROM user;

-- 求和
SELECT SUM(amount) FROM orders;

-- 平均
SELECT AVG(score) FROM students;

-- 最大/最小
SELECT MAX(price), MIN(price) FROM products;
```

### 4.3 分组查询

```sql
-- 按分类统计
SELECT category_id, COUNT(*) as cnt
FROM products
GROUP BY category_id
HAVING cnt > 10;
```

### 4.4 多表连接

```sql
-- 内连接
SELECT o.id, o.amount, u.username
FROM orders o
INNER JOIN user u ON o.user_id = u.id;

-- 左连接
SELECT o.id, u.username
FROM user u
LEFT JOIN orders o ON u.id = o.user_id;

-- 右连接
SELECT o.id, u.username
FROM orders o
RIGHT JOIN user u ON o.user_id = u.id;
```

## 五、索引

### 5.1 创建索引

```sql
-- 普通索引
CREATE INDEX idx_username ON user(username);

-- 唯一索引
CREATE UNIQUE INDEX idx_email ON user(email);

-- 复合索引
CREATE INDEX idx_name_age ON user(username, age);
```

### 5.2 查看索引

```sql
SHOW INDEX FROM user;
```

### 5.3 删除索引

```sql
DROP INDEX idx_username ON user;
```

## 六、事务

### 6.1 事务特性（ACID）

| 特性 | 说明 |
|------|------|
| 原子性 | 要么全部成功，要么全部失败 |
| 一致性 | 事务前后数据一致 |
| 隔离性 | 事务之间互不干扰 |
| 持久性 | 事务提交后永久保存 |

### 6.2 事务操作

```sql
-- 开启事务
START TRANSACTION;

-- 执行 SQL
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;
```

### 6.3 隔离级别

| 级别 | 说明 | 问题 |
|------|------|------|
| READ UNCOMMITTED | 读未提交 | 脏读、不可重复读、幻读 |
| READ COMMITTED | 读已提交 | 不可重复读、幻读 |
| REPEATABLE READ | 可重复读（MySQL 默认） | 幻读 |
| SERIALIZABLE | 串行化 | 无 |

## 七、小结

1. **SQL 分类**：DDL、DML、DQL、DCL
2. **基本操作**：增删改查
3. **多表查询**：内连接、左连接、右连接
4. **索引**：提高查询速度
5. **事务**：ACID 特性、隔离级别

---

[下一节：9.2 JDBC](./09-02-JDBC.md)
