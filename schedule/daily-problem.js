const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");

const octokit = new Octokit({ auth: process.env.issueToken });

const solution = solutions[getDay()];

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
    pres.reduce((acc, cur) => {
      return `${acc}    
  - ${cur}`;
    }, "") || "暂无"
  }
  ## 题目描述    
  ${description}
    `;
};

const generateIssueTitle = ({ day, tags, title }) =>
  `【${tags ? tags[0] : ""} - Day ${day} 】${new Date().toLocaleDateString(
    "en-CA"
  )} - ${title}`;

async function run() {
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
    JSON.stringify(solutions)
  );
}

run();
