const fs = require("fs");
const path = require("path");
const mySolutions = require("../static/my/solutions.json");

for (const name in mySolutions) {
  for (const i in mySolutions[name]) {
    const solution = mySolutions[name][i];
    if (solution && solution.body.length < 100) {
      console.log(solution);
      mySolutions[name][i] = null;
    }

    if (
      solution &&
      solution.body.includes("129. 求根节点到叶节点数字之和") &&
      !solution.onTime
    ) {
      console.log(slution);
    }
  }
}

fs.writeFileSync(
  path.resolve(__dirname, "../static/my/solutions.json"),
  JSON.stringify(mySolutions)
);
