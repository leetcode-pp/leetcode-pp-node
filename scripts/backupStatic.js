const { execSync } = require("child_process");

function move(season) {
	const old = [];

	for (let i = 4; i < season; i++) {
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
}

module.exports = { move };
