const router = require("koa-router")();
const solutions = require("../static/my/solutions.json");
const officialSolution = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");
const { success, fail } = require("../utils/request");
const { getDay } = require("../utils/day");

router.get("/api/v1/my/solutions", async (ctx) => {
  if (ctx.session.user.login in solutions) {
    ctx.body = success(
      solutions[ctx.session.user.login]
        .map((q, i) => ({
          ...q,
          title: (officialSolution[i + 1] || {}).title || "",
          tags: (officialSolution[i + 1] || {}).tags || [],
          difficulty: (officialSolution[i + 1] || {}).difficulty || "",
        }))
        .slice(0, getDay())
    );
  } else {
    ctx.body = success([]);
  }
});

router.get("/api/v1/my/solutions/:id", async (ctx) => {
  const id = ctx.params.id;
  const solution = solutions[id];
  if (!solution) {
    ctx.body = fail({ message: "您当天木有打卡~" });
  } else {
    ctx.body = success({
      ...solution,
      content: decrypt(solution.content),
    });
  }
});

module.exports = router;
