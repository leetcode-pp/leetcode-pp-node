# leetcode-pp-node

[力扣加加](https://leetcode-solutions.cn) 官网后端。

使用 koa2 结合 Github Actions 开发。目前采用静态 JSON 存放题解，讲义，用户信息等数据，后期使用数据库承载内容。

## TODOS

- 在 91 网站直接提交代码到力扣中，获取执行结果并在 91 中展示
- 当天的题目提交代码通过视为打卡。（不管是否打卡，只要提交都有一条记录）
- 可以直接在 91 网站写题解，只有提交通过才能写题解。 并且提交自动带入模板（见刷题插件中的题解模板）
- 管理员可以精选题解， 精选的题解靠前显示，并增加精选标识。（题解表增加是否精选字段，是否官方字段）
- 增加页面。 题解区，这里可以看到所有的题解（考虑放到打卡标签）
- 我的页面增加补签卡数量显示，增加是否全勤显示
- 可以补卡， 当用户补卡后，也算打卡（打卡表插入一条记录）
- 网站增加数据库支持，使用 mongodb 替换原来的 static 文件夹下的 JSON，因此需要接入 mongodb
- 对接微信登录，微信支付

## 数据库表设计

### 打卡表

- 打卡时间
- 打卡的题目 id（或者打的是第几天的卡）
- 代码（或者 submitid ，可以直接跳到力扣中查看）

### 题解表

- id
- day
- title
- tags
- content
- selected
- official

### 讲义表

- id
- title
- desc
- type: basic, topic, advance
- cover

### 用户表

- name
- login

## 注意

- 数据库表字段都需要有以下四个字段

creator,createtime,updator, updatetime
