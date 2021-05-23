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
  }
}

fs.writeFileSync(
  path.resolve(__dirname, "../static/my/solutions.json"),
  JSON.stringify(mySolutions)
);
