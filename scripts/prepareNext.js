const fs = require("fs");
const path = require("path");
const { start } = require("./reset.js");
const { move } = require("./backupStatic");
const { season } = require("../config/index");

function resolve(_path) {
  return path.resolve(path.resolve(process.cwd(), _path));
}

// 1. lectures
fs.writeFileSync(
  resolve(`./static/lectures/lectures-by-id-${season - 1}.json`),
  fs.readFileSync(resolve("./static/lectures/lectures-by-id.json"))
);
fs.writeFileSync(
  resolve(`./static/lectures/lectures-by-category-${season - 1}.json`),
  fs.readFileSync(resolve("./static/lectures/lectures-by-category.json"))
);
// 2. my
fs.writeFileSync(
  resolve(`./static/my/solutions-${season - 1}.json`),
  fs.readFileSync(resolve("./static/my/solutions.json"))
);
// 3. solution
fs.writeFileSync(
  resolve(`./static/solution/solution-${season - 1}.json`),
  fs.readFileSync(resolve("./static/solution/solutions.json"))
);
// 4. users
fs.writeFileSync(
  resolve(`./static/users/index-${season - 1}.json`),
  fs.readFileSync(resolve("./static/users/index.json"))
);

// 新建
fs.writeFileSync(
  resolve(`./config/users-${season}.js`),
  fs.readFileSync(`./config/users-${season - 1}.js`)
);

move(season);
start(season);

