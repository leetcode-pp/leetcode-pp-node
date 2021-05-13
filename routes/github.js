const router = require("koa-router")();
const fetch = require("node-fetch");

const { getDay } = require("../utils/day");
const { success, fail } = require("../utils/request");
const solutions = require("../static/solution/solutions.json");
const mySolutions = require("../database");

router.all("/api/v1/github/content", async (ctx) => {
  const { url, ...params } = ctx.query;
  const dURL = new URL(url);
  Object.keys(params).forEach((key) =>
    dURL.searchParams.append(key, params[key])
  );
  const res = await fetch(dURL, {
    headers: {
      Accept: "application/json",
      Authorization: `token ${process.env.githubapi || ""}`,
    },
  }).then((res) => res.json());

  if (res) {
    ctx.body = success(res);
  } else {
    ctx.body = fail({
      message: "请求失败",
    });
  }
});

router.all("/api/v1/github/webhook", async (ctx) => {
  const { action, comment, issue } = ctx.request.body;
  if (issue.number === solutions[getDay() - 1].issue_number) {
    ctx.body = success("只处理当天的打卡信息");
    return;
  }
  if (action === "created" && comment.body.length > 20) {
    ctx.body = success("收到！");
  }
});

module.exports = router;
