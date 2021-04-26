const router = require("koa-router")();

router.get("/", async (ctx) => {
  await ctx.render("index", {
    title: "欢迎来到 91 天学算法~",
  });
});

module.exports = router;
