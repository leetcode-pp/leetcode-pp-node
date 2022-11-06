const fs = require("fs");
const path = require("path");
const mySolutions = require("../static/my/solutions.json");
const solutions = require("../static/solution/solutions.json");
const { season } = require("../config/index");

// 新的一期开始，重启！

function start(season) {
  // 清空不是这一期的打卡数据
  for (const name in mySolutions) {
    const my = [];
    for (solution of mySolutions[name]) {
      if (
        solution &&
        solution.url.startsWith(
          `https://github.com/leetcode-pp/91alg-${season}-daily-check`
        )
      ) {
        my.push(solution);
      } else {
        my.push(null);
      }
    }
    mySolutions[name] = my;
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../static/my/solutions.json"),
    JSON.stringify(mySolutions)
  );
  // 清空 issue_number
  for (const d in solutions) {
    solutions[d].issue_number = void 0;
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../static/solution/solutions.json"),
    JSON.stringify(solutions)
  );
}
// start(season);
module.exports = { start };
