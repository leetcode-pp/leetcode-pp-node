const fs = require("fs");
const path = require("path");
const name = "zhuzuojun".trim().toLocaleLowerCase();

const us = require("../static/users/index");

if (!us[name]) {
  console.log("用户名错误");
}

us[name].noCheck = false;

us[name].createTime = new Date().getTime();

fs.writeFileSync(
  path.resolve(__dirname, "../static/users/index.json"),
  JSON.stringify(us)
);
