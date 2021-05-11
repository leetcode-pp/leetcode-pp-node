const router = require("koa-router")();
const { success, fail } = require("../utils/request");
const fetch = require("node-fetch");

router.get("/api/v1/github/content", async (ctx) => {
  const { url } = ctx.query;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `token ${process.env.githubapi || ""}`,
    },
  }).then((res) => res.json());
  if (res.content) {
    ctx.body = success(res);
  } else {
    ctx.body = fail({
      message: "请求失败",
    });
  }
});

module.exports = router;
