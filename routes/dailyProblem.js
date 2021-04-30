const router = require("koa-router")();
const solutions = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");

const { success, fail } = require("../utils/request");

function getCurrentDay(date) {
  return 1;
}

router.get("/api/v1/daily-problem", async (ctx) => {
  // 1. 如果用户指定了时间，则获取指定时间，否则获取今天
  // 2. 根据上一步计算的时间和活动开始时间计算当前是 Day 几
  // 3. 根据 Day 几 计算出具体返回哪一个题目
  // ！！注意： 如果用户指定的时间大于今天，则返回”题目不存在，仅支持查询历史每日一题“

  const date = ctx.query.date; // 用户指定的实际

  if (date) {
    ctx.body = success({
      day: 2,
      title: "821. 字符的最短距离",
      link: "https://leetcode-cn.com/problems/plus-one",
      tags: ["基础篇", "数组"], // 目前所有 README 都是没有的。因此如果没有的话，你可以先不返回，有的话就返回。后面我慢慢补
      pres: ["数组的遍历(正向遍历和反向遍历)"],
      description: `
给定一个字符串 S 和一个字符 C。返回一个代表字符串 S 中每个字符到字符串 S 中的字符 C 的最短距离的数组。

示例 1:

输入: S = "loveleetcode", C = 'e'
输出: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]
说明:

- 字符串 S 的长度范围为 [1, 10000]。
- C 是一个单字符，且保证是字符串 S 里的字符。
- S 和 C 中的所有字母均为小写字母。
      
      `,
    });
  } else {
    ctx.body = success({
      day: 1,
      title: "66. 加一",
      whys: [
        "1. 由于是大家第一次打卡，因此出一个简单题。虽然是简单题，但是如果将加 1 改为加任意的数字，那么就变成了一个非常常见的面试题",
      ],
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
  }
});

router.get("/api/v1/daily-problem/solution", async (ctx) => {
  // 逻辑和上面类似，只是返回值为 Markdown

  // ！！注意： 如果用户指定的 day 大于今天对应的day，则返回”题解不存在，仅支持查询历史官方题解“

  const day = ctx.query.day || getCurrentDay(); // 用户指定的实际第几天（注意这里的 day 是数字，含义为第 day 天）
  if (day in solutions) {
    ctx.body = success({
      content: decrypt(solutions[day].content),
    });
  } else {
    ctx.body = fail({
      message: "当前暂时没有官方题解，请联系当前讲师进行处理~",
    });
  }
});

module.exports = router;
