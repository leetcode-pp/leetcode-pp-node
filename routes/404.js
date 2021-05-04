const router = require("koa-router")();
const fetch = require("node-fetch");
router.get("*", async (ctx) => {
  ctx.body = await fetch("https://leetcode-solution.cn/91").then((res) =>
    res.text()
  );
});

module.exports = router;
