const router = require("koa-router")();
const solutions = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");

const { success } = require("../utils/request");

router.get("/api/v1/daily-problem", async (ctx) => {
  // 1. 获取当前时间
  // 2. 根据当前时间和活动开始时间计算当前是 Day 几
  // 3. 根据 Day 几 计算出具体返回哪一个题目

  ctx.body = success({
    day: 1,
    title: "66. 加一",
    link: "https://leetcode-cn.com/problems/plus-one",
    tags: ["基础篇", "数组"], // 目前所有 README 都是没有的。因此如果没有的话，你可以先不返回，有的话就返回。后面我慢慢补
    pres: ["数组的遍历(正向遍历和反向遍历)"],
    description: `
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:

输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
示例 2:

输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
    `,
  });
});

router.get("/api/v1/daily-problem/solution", async (ctx) => {
  // 逻辑和上面类似，只是返回值为 Markdown
  ctx.body = success({
    content: decrypt(solutions[1].content),
  });
});

module.exports = router;
