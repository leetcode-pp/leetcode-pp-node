const router = require("koa-router")();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const process = require("child_process");

const { getDay } = require("../utils/day");
const { success, fail } = require("../utils/request");
const mySolutions = require("../static/my/solutions.json");
const solutions = require("../static/solution/solutions.json");

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

  if (issue.number !== solutions[getDay()].issue_number) {
    ctx.body = success("只处理当天的打卡信息");
    return;
  }
  if (action === "created" && comment.body.length > 20) {
    mySolutions[comment.user.login][getDay() - 1] = {
      // title: problem.title,
      url: comment.html_url,
      body: comment.body,
    };

    // fs.writeFileSync(
    //   path.resolve(__dirname, "../static/my/solutions.json"),
    //   JSON.stringify(mySolutions)
    // );

    // process.execSync("sh " + path.resolve(__dirname, "../scripts/commit.sh"));
  }

  ctx.body = success(mySolutions[comment.user.login]);
});

module.exports = router;
