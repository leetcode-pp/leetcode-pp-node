const fs = require("fs");
const path = require("path");
const mySolutions = require("../static/my/solutions.json");
const solutions = require("../static/solution/solutions.json");

// 新的一期开始，重启！

function start(season) {
	for (const name in solutions) {
		const my = [];
		mySolutions[name] = my;
		for (solution of mySolutions[name]) {
			if (
				solution && solution.url.startsWith(
					`https://github.com/leetcode-pp/91alg-${season - 1}-daily-check`,
				)
			) {
				my.push(solution);
			} else {
				my.push(null);
			}
		}
	}

	fs.writeFileSync(
		path.resolve(__dirname, "../static/my/solutions.json"),
		JSON.stringify(mySolutions),
	);

	for (const d in solutions) {
		solutions[d].issue_number = void 0;
	}

	fs.writeFileSync(
		path.resolve(__dirname, "../static/solution/solutions.json"),
		JSON.stringify(solutions),
	);
}
start();
module.exports = { start };
