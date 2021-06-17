const router = require("koa-router")();
const fetch = require("node-fetch");
const { getDay } = require("../utils/day");
const { decrypt, encrypt } = require("../utils/crypto");
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

router.all("/api/v1/github/comment-app", async (ctx) => {
  ctx.body = success(
    JSON.parse(
      decrypt(
        "5163624a909f020e009f354521d8217823802591162a9076d7d9bda6ff8e80e8853a28e0a00273dcf6985bbe6afdac46f97d4d90c22e4f88bf7cf92fe3b2fb23a46a3b33ce8495aa082696f7d0cf5b796eb37cd4c2f20a9866e1708cfa"
      )
    )
  );
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
