const router = require("koa-router")();
const solutions = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");
const mySolutions = require("../static/my/solutions.json");
const users = require("../static/users/index.json");
const { success, fail } = require("../utils/request");
const { getDay } = require("../utils/day");
const { startTime } = require("../config/index");

router.get("/api/v1/daily-problem", async (ctx) => {
  if (ctx.query.date && ctx.query.date > new Date().getTime()) {
    // 活动没有开始，给大家一个体验版本(两道题)
    if (new Date().getTime() - startTime < 0) {
      ctx.body = success(solutions[(Math.random() * 3 + 1) >>> 0]);
    } else {
      ctx.body = fail({
        message: "仅能查询今天之前的题目",
      });
    }
  } else {
    const date = getDay(ctx.query.date || new Date().getTime()); // 用户指定的实际
    if (date in solutions) {
      ctx.body = success(solutions[date]);
    } else {
      ctx.body = fail({
        message: "当前暂时没有每日一题，请联系当前讲师进行处理~",
      });
    }
  }
});

router.get("/api/v1/daily-problem/solution", async (ctx) => {
  // 逻辑和上面类似，只是返回值为 Markdown
  const currentDay = getDay(new Date().getTime());
  const day = ctx.query.day || currentDay; // 用户指定的实际第几天（注意这里的 day 是数字，含义为第 day 天）
  if (day > currentDay) {
    ctx.body = fail({
      message: "仅支持查询历史官方题解",
    });
    return;
  }
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

const A = [];
for (const [login, solution] of Object.entries(mySolutions)) {
  A.push({ count: solution.filter(Boolean).length, ...users[login] });
}

const rankings = A.sort((a, b) => b.count - a.count);

router.get("/api/v1/daily-problem/ranking", async (ctx) => {
  ctx.body = success(rankings);
});

module.exports = router;
