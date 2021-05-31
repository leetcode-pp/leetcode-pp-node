const router = require("koa-router")();

const { encrypt } = require("../utils/crypto");
const { success, fail } = require("../utils/request");

router.get("/api/v1/user", async (ctx) => {
  if (ctx.session && ctx.session.user) {
    const u = ctx.session.user;
    ctx.body = success({
      ...u,
      token: encrypt(Buffer.from(JSON.stringify(u), "utf8")),
    });
  } else {
    ctx.body = fail({
      code: 91,
      message: "您还没有登录，请先登录~",
    });
  }
});

router.get("/api/v1/user/logout", async (ctx) => {
  if (ctx.session && ctx.session.user) {
    ctx.session = {};
  }
  ctx.cookies.set("token", "");
  ctx.body = success("ok");
});

module.exports = router;
