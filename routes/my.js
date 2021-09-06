const router = require("koa-router")();
const solutions = require("../static/my/solutions.json");
const officialSolution = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");
const { success, fail } = require("../utils/request");
const { getDay } = require("../utils/day");

router.get("/api/v1/my/solutions", async (ctx) => {
  ctx.body = success(
    Array(Math.max(0, Math.min(getDay(), 91)))
      .fill(null)
      .map((_, i) => ({
        ...solutions[ctx.session.user.login]?.[i],
        body: void 0,
        title: (officialSolution[i + 1] || {}).title || "",
        tags: (officialSolution[i + 1] || {}).tags || [],
        difficulty: (officialSolution[i + 1] || {}).difficulty || "",
        issue_number: (officialSolution[i + 1] || {}).issue_number || "",
      }))
  );
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
