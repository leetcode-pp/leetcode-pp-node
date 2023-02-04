const fs = require("fs");
const path = require("path");
const mySolutions = require("../static/my/solutions.json");
const solutions = require("../static/solution/solutions.json");
const meta = require("../static/meta.json");
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

  // 清空 meta
  fs.writeFileSync(
    path.resolve(__dirname, "../static/meta.json"),
    JSON.stringify({
      ...meta,
      users: { lastUpdateTime: -1 },
      dailyCheck: {
        lastUpdateTime: -1,
        lastFulllyUpdateTime: -1,
      },
      checkIn: { lastUpdateTime: -1 },
      // lectures: {
      //   lastUpdateTime: 1652878368502,
      //   intro: { lastUpdateTime: 1673259935703 },
      //   basic: { lastUpdateTime: 1673259935707 },
      //   topic: { lastUpdateTime: 1673800051084 },
      //   advance: { lastUpdateTime: 1673259935713 },
      // },
      preCard: false,
    })
  );
}
// start(season);
module.exports = { start };
