const router = require("koa-router")();
const solutions = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");

const { success, fail } = require("../utils/request");
const { startTime } = require("../config/index");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getDay(date) {
  return ((date - startTime + MS_PER_DAY - 1) / MS_PER_DAY) >> 0;
}

router.get("/api/v1/daily-problem", async (ctx) => {
  // 1. 如果用户指定了时间，则获取指定时间，否则获取今天
  // 2. 根据上一步计算的时间和活动开始时间计算当前是 Day 几
  // 3. 根据 Day 几 计算出具体返回哪一个题目
  // ！！注意： 如果用户指定的时间大于今天，则返回”题目不存在，仅支持查询历史每日一题“

  const date = getDay(ctx.query.date || new Date().getTime()); // 用户指定的实际
  console.log(date);
  if (date in solutions) {
    ctx.body = success(solutions[date]);
  } else {
    ctx.body = fail({
      message: "当前暂时没有每日一题，请联系当前讲师进行处理~",
    });
  }
});

router.get("/api/v1/daily-problem/solution", async (ctx) => {
  // 逻辑和上面类似，只是返回值为 Markdown

  // ！！注意： 如果用户指定的 day 大于今天对应的day，则返回”题解不存在，仅支持查询历史官方题解“

  const day = ctx.query.day || getDay(new Date().getTime()); // 用户指定的实际第几天（注意这里的 day 是数字，含义为第 day 天）
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
