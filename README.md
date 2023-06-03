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

## 新一期

- [ ] leetcode-pp-node 和 leetcode-pp 项目中 config 修改 startTime 和 season
- [ ] 新建 users-${season}.js 被更新引入
- [ ] 执行 agenda.js 被将其 copy 到 leetcode-pp 的 91.db.js
- [ ] 执行 prepareNext.js

## 讲师必看

### 同步讲义

当你需要修改讲义或者题解的时候，需要修改本仓库的关联仓库的 91algo-4（在本项目根目录的 91algo-4 文件夹下）。修改完成后，需要**分别** 推送到 91algo-4 和 leetcode-pp-node（本仓库）。

之所以需要推送本仓库，是因为当你修改了 91algo-4 内容，本项目是感知不到的。本项目实际上存储了一个快照的 commit id。因为当你 91algo 有新提交的时候，需要将最新的 commit id 同步到本仓库。

同步的方法有两种：

1. cd 到 91algo-4 执行 git pull
2. 直接在本项目根目录修改，修改后 git submodule 会自动更新， 你需要推送即可（就是上面提到的方法）。

### 关于题解格式

- 需要包含： 题目地址，题目详情，思路，代码，前置知识，推荐理由，标签，难度。
- 建议包含：扩展，多种方法，代码高亮等

代码高亮语法：

````
高亮1到3行
```py {1-3}

```
高亮第4行
```py {4}

```
````
