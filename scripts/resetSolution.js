
const fs = require('fs');
const path = require('path');
const solutions = require("../static/solution/solutions.json");


for (const d in solutions) {
    solutions[d].issue_number = void 0
}

fs.writeFileSync(
    path.resolve(__dirname, "../static/solution/solutions.json"),
    JSON.stringify(solutions)
);