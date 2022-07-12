const { execSync } = require("child_process");

const old = [
	"static/lectures/lectures-by-id-4.json",
	"static/lectures/lectures-by-id-5.json",
	"static/lectures/lectures-by-id-6.json",
	"static/lectures/lectures-by-id-7.json",
	"static/lectures/lectures-by-category-4.json",
	"static/lectures/lectures-by-category-5.json",
	"static/lectures/lectures-by-category-6.json",
	"static/lectures/lectures-by-category-7.json",
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

for (let i = 7; i < 8; i++) {
	old.push(`static/lectures/lectures-by-id-${i}.json`);
	old.push(`"static/lectures/lectures-by-category-${i}.json`);
	old.push(`static/solution/solution-${i}.json`);
	old.push(`static/my/solutions-${i}.json`);
	old.push(`static/users/index-${i}.json`);
}

for (const v of old) {
	try {
		execSync(`mv ${v} /Users/luxiaopeng/github/draft/91/backup/${v}`);
	} catch (err) {
		console.log(`已经同步 ${v}， 跳过`);
	}
}
