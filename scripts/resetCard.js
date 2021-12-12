const fs = require('fs');
const path = require('path');
const solutions = require("../static/my/solutions.json");


for (const name in solutions) {
    const my = []
    const mySolutions = solutions[name];
    solutions[name] = my
    for (solution of mySolutions) {
        if (solution && solution.url.startsWith("https://github.com/leetcode-pp/91alg-6-daily-check")) {
            my.push(solution)
        } else {
            my.push(null)
        }
    }
}

fs.writeFileSync(
    path.resolve(__dirname, "../static/my/solutions-6.json"),
    JSON.stringify(solutions)
);