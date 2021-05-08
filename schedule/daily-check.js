const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");
const mySolutions = require("../static/my/solutions.json");

const octokit = new Octokit({ auth: process.env.issueToken });
const problem =
  solutions[getDay(new Date().getTime() + 24 * 60 * 60 * 1000 * 3) - 1]; // 获取昨天的题目

if (problem && problem.issue_number) {
  octokit.rest.issues
    .listComments({
      owner,
      repo,
      issue_number: problem.issue_number,
    })
    .then((res) => {
      res.data.forEach((comment) => {
        const login = comment.user.login;
        if (!(login in mySolutions)) {
          mySolutions[login] = Array(91);
        }
        mySolutions[login][getDay() - 2] = {
          title: problem.title,
          url: comment.html_url,
          body: comment.body,
        }; // getDay() - 1 表示昨天，另外由于索引从 1 开始，因此需要再减去 1。
      });

      fs.writeFileSync(
        path.resolve(__dirname, "../static/my/solutions.json"),
        JSON.stringify(mySolutions)
      );
    });
}
