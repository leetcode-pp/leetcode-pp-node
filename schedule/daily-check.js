const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");
const mySolutions = require("../static/my/solutions.json");
const { get } = require("http");

const octokit = new Octokit({ auth: process.env.issueToken });
function getAllPages(i, issue_number) {
  return octokit.rest.issues
    .listComments({
      owner,
      page: i,
      per_page: 100,
      repo,
      issue_number,
    })
    .then((res) => {
      if (res.data.length > 0)
        return getAllPages(i + 1, issue_number).then((comments) =>
          res.data.concat(comments)
        );
      return [];
    })
    .catch(console.error);
}
async function run(d) {
  const problem = solutions[d];

  if (problem && problem.issue_number) {
    const comments = await getAllPages(1, problem.issue_number);
    comments.forEach((comment) => {
      const login = comment.user.login;
      if (!(login in mySolutions)) {
        mySolutions[login] = Array(91);
      }
      // 由于下面的一行代码，导致了会插入一个完全空的行。这就是因为打过卡，但是都不是当天打的
      if (comment.body.length < 20) return;
      // 由于索引从 1 开始，因此需要再减去 1。
      mySolutions[login][d - 1] = {
        // title: problem.title,
        url: comment.html_url,
        body: comment.body,
        onTime: getDay(new Date(comment.created_at).getTime()) <= d,
      };
    });
    mySolutions["_meta_"] = {
      lastUpdateTime: new Date().getTime(),
    };
    fs.writeFileSync(
      path.resolve(__dirname, "../static/my/solutions.json"),
      JSON.stringify(mySolutions)
    );
  }
}
const MS_PER_HOUR = 1 * 60 * 60 * 1000;
const TODAY = getDay(new Date().getTime() - MS_PER_HOUR); // 获取今天‘的题目。 为了照顾一些人， 我们凌晨一点统计昨天的，而不是当天的。

// 仅更新当天的
if (getDay(TODAT) - getDay(mySolutions["__meta__"].lastUpdateTime) < 1) {
  run(TODAY);
} else {
  // 更新历史所有的，每天仅全量更新一次
  // 1. 记录打卡数据
  // 2. 修正之前的数据错误
  // 3. 登记补卡信息
  for (let d = 1; d <= TODAY; d++) {
    run(d);
  }
}
