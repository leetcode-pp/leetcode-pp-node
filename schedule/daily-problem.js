const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay, chineseDate } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");

const octokit = new Octokit({ auth: process.env.issueToken });

const MS_PER_HOUR = 1 * 60 * 60 * 1000;
const currentDay = getDay(new Date().getTime() + MS_PER_HOUR); // 发布题目。为了照顾一些人， 我们提前一个小时发明天的题目，而不是当天的。
const solution = solutions[currentDay];

// generate content for issues
const generateIssueContent = ({ title, link, pres, description, whys }) => {
  return `# ${title}
  ## 入选理由    
  ${(whys || []).reduce((acc, cur, index) => {
    return `${acc}    
  ${index + 1}. ${cur}`;
  }, "") || "暂无"
    }
  ## 题目地址    
  [${link}](${link})
  ## 前置知识    
  ${(pres || []).reduce((acc, cur) => {
      return `${acc}    
  - ${cur}`;
    }, "") || "暂无"
    }
  ## 题目描述    
  ${description}
    `;
};

const generateIssueTitle = ({ day, title }) =>
  `【Day ${day} 】${chineseDate(
    new Date().getTime() + MS_PER_HOUR
  ).toLocaleDateString("en-CA")} - ${title}`;

async function run(solution) {
  await octokit.rest.issues.listForRepo({
    labels: String(solution.day),
    owner,
    repo
  }).then(async (res) => {
    const { data } = res;
    if (data.length > 0) {
      throw new Error(`Day ${solution.day} has been published.`);
    }
  });
  const { data } = await octokit.rest.issues.create({
    owner,
    repo,
    title: generateIssueTitle(solution),
    body: generateIssueContent(solution),
    labels: (solution.tags || []).concat(String(solution.day)),
  });

  solution.issue_number = data.number;

  fs.writeFileSync(
    path.resolve(__dirname, "../static/solution/solutions.json"),
    JSON.stringify({
      ...solutions,
      [currentDay]: solution,
    })
  );
}

// 当前有题解，并且今天的题目还没发布，就自动创建一个 issue
if (solution && !solution.issue_number) {
  run(solution);
}
