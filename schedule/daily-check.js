const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");
const mySolutions = require("../static/my/solutions.json");
const meta = require("../static/meta.json");

const octokit = new Octokit({ auth: process.env.issueToken });

const MS_PER_HOUR = 1 * 60 * 60 * 1000;
const TODAY = getDay(new Date().getTime() - MS_PER_HOUR); // 获取今天‘的题目。 为了照顾一些人， 我们凌晨一点统计昨天的，而不是当天的。

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
async function run(d, issue_number) {
  const problem = solutions[d];

  if (problem && problem.issue_number) {
    const comments = await getAllPages(1, issue_number || problem.issue_number);
    if (!comments) return;
    comments.forEach((comment) => {
      const login = comment.user.login.toLowerCase();
      if (!(login in mySolutions)) {
        mySolutions[login] = Array(91);
      }
      // 由于下面的一行代码，导致了会插入一个完全空的行。这就是因为打过卡，但是都不是当天打的
      if (comment.body.length < 20) return;
      if (
        mySolutions[login][d - 1] &&
        mySolutions[login][d - 1].onTime !== void 0
      )
        return; // 如果打卡过或者补卡过就不同步了
      // 由于索引从 1 开始，因此需要再减去 1。

      mySolutions[login][d - 1] = {
        // title: problem.title,
        url: comment.html_url,
        body: comment.body,
        // 只有当天的才标记为 onTime。防止创建一个空白的 comment，之后再编辑
        onTime: getDay(new Date(comment.created_at).getTime()) <= d, // 有可能早出题，防止早打卡的人没被统计进去，所以用 <= 。
      };
    });
    meta.dailyCheck.lastUpdateTime = new Date().getTime();

    fs.writeFileSync(
      path.resolve(__dirname, "../static/meta.json"),
      JSON.stringify(meta)
    );

    fs.writeFileSync(
      path.resolve(__dirname, "../static/my/solutions.json"),
      JSON.stringify(mySolutions)
    );
  }
}

// 仅更新当天的
const lastUpdateTime = meta.dailyCheck ? meta.dailyCheck.lastUpdateTime : -1;
if (TODAY - getDay(lastUpdateTime) < 1) {
  run(TODAY);
} else {
  // 更新历史所有的，每天仅全量更新一次
  // 1. 记录打卡数据
  // 2. 修正之前的数据错误
  // 3. 登记补卡信息
  // for (let d = Math.min(TODAY - 7 , 1); d <= TODAY; d++) { 同步一周时间以加快时间
  for (let d = 1; d <= TODAY; d++) {
    run(d);
  }
}


module.exports = {
  run
}