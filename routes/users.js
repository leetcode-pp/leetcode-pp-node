const router = require("koa-router")();

router.get("/api/v1/user", async (ctx) => {
  if (ctx.session && ctx.session.user) {
    ctx.body = ctx.session.body;
  } else {
    ctx.body = {
      success: false,
      code: 91,
      data: null,
      message: "您还没有登录，请先登录~",
    };
  }
});

module.exports = router;
