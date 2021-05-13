const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay, chineseDate } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");

const octokit = new Octokit({ auth: process.env.issueToken });

const currentDay = getDay();
const solution = solutions[currentDay];

// generate content for issues
const generateIssueContent = ({ title, link, pres, description, whys }) => {
  return `# ${title}
  ## 入选理由    
  ${
    (whys || []).reduce((acc, cur, index) => {
      return `${acc}    
  ${index + 1}. ${cur}`;
    }, "") || "暂无"
  }
  ## 题目地址    
  [${link}](${link})
  ## 前置知识    
  ${
    (pres || []).reduce((acc, cur) => {
      return `${acc}    
  - ${cur}`;
    }, "") || "暂无"
  }
  ## 题目描述    
  ${description}
    `;
};

const generateIssueTitle = ({ day, title }) =>
  `【Day ${day} 】${chineseDate().toLocaleDateString("en-CA")} - ${title}`;

async function run(solution) {
  const { data } = await octokit.rest.issues.create({
    owner,
    repo,
    title: generateIssueTitle(solution),
    body: generateIssueContent(solution),
    labels: solution.tags || [],
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
