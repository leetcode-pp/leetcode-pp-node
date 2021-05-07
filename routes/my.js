const router = require("koa-router")();
const solutions = require("../static/my/solutions.json");
const officialSolution = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");
const { success, fail } = require("../utils/request");

router.get("/api/v1/my/solutions", async (ctx) => {
  if (ctx.session.user.login) {
    ctx.body = success(
      solutions[ctx.session.user.login].map((q, i) => ({
        ...q,
        title: (officialSolution[i + 1] || {}).title || "",
      }))
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
