const { execSync } = require("child_process");

const old = [
	"static/lectures/lectures-by-id-4.json",
	"static/lectures/lectures-by-id-5.json",
	"static/lectures/lectures-by-id-6.json",
	"static/lectures/lectures-by-id-4.json",
	"static/lectures/lectures-by-id-5.json",
	"static/lectures/lectures-by-id-6.json",
	"static/solution/solutions-4.json",
	"static/solution/solution-5.json",
	"static/solution/solution-6.json",
	"static/my/solutions-4.json",
	"static/my/solutions-5.json",
	"static/my/solutions-6.json",
	"static/users/index-4.json",
	"static/users/index-5.json",
	"static/users/index-6.json",
];

for (const v of old) {
	try {
		execSync(`mv ${v} /Users/luxiaopeng/github/draft/91/backup/${v}`);
	} catch (err) {
		console.log(`已经同步 ${v}， 跳过`);
	}
}
