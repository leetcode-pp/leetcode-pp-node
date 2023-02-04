const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const { getDay, chineseDate } = require("../utils/day");
const { owner, repo } = require("../config/index");

const solutions = require("../static/solution/solutions.json");
const meta = require("../static/meta.json");

const octokit = new Octokit({ auth: process.env.issueToken });

const MS_PER_HOUR = 1 * 60 * 60 * 1000;
const currentDay = getDay(new Date().getTime() + MS_PER_HOUR); // 发布题目。为了照顾一些人， 我们提前一个小时发明天的题目，而不是当天的。
const solution = solutions[currentDay];

// generate content for issues
const generateIssueContent = ({ title, link, pres, description, whys }) => {
	return `# ${title}
  ## 入选理由    
  ${
		(whys || []).reduce(
			(acc, cur, index) => {
				return `${acc}    
  ${index + 1}. ${cur}`;
			},
			"",
		) || "暂无"
	}
  ## 题目地址    
  [${link}](${link})
  ## 前置知识    
  ${
		(pres || []).reduce(
			(acc, cur) => {
				return `${acc}    
  - ${cur}`;
			},
			"",
		) || "暂无"
	}
  ## 题目描述    
  ${description}
    `;
};

const generateIssueTitle = ({ day, title }) =>
	`【Day ${day} 】${chineseDate(new Date().getTime() + MS_PER_HOUR).toLocaleDateString(
		"en-CA",
	)} - ${title}`;

async function run(solution) {
	// 假设不注释下面代码，如果 create issue 成功的时候挂了导致没有 commit 成功，以后就永远无法更新 issue_number 了
	// 因此暂时解决方法是前端不根据 issue_number 判断是否创建了 issue，而是无脑相信创建了。
	try {
		await octokit.rest.issues
			.listForRepo({ labels: String(solution.day), owner, repo })
			.then(async (res) => {
				const { data } = res;

				if (data.length > 0) {
					const firstIssue = data[0];
					solution.issue_number = firstIssue.number; // 之前没有更新上（commit 之前挂了导致没 commit 上，一个例子就是 commit 的时候发现要先 git pull 就会挂），这次更新上去

					fs.writeFileSync(
						path.resolve(__dirname, "../static/solution/solutions.json"),
						JSON.stringify({ ...solutions, [currentDay]: solution }),
					);
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
			JSON.stringify({ ...solutions, [currentDay]: solution }),
		);
	} catch (err) {
		console.log('an error occured when creating issue', err);
	}
}
// 当前有题解，并且今天的题目还没发布，就自动创建一个 issue
if (solution && !solution.issue_number) {
	run(solution);
}

// 预打卡
if (meta && !meta.preCard) {
	meta.preCard = true;
	run({
		title: "预打卡",
		link: "此处正常应该是链接",
		description: "让大家熟悉如何打卡",
		day: 0,
		tags: ["预打卡"],
	});
	fs.writeFileSync(
		path.resolve(__dirname, "../static/meta.json"),
		JSON.stringify(meta),
	);
}
