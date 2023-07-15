const fs = require("fs");
const path = require("path");
const name = "chang-you".trim().toLocaleLowerCase();

const us = require("../static/users/index");
// const delta = 3 * 24 * 60 * 60 * 1000;
const delta = 0;

if (!us[name]) {
  console.log("用户名错误");
} else if (us[name].noCheck === false) {
  console.log("用户没有被禁用");
} else {
  us[name].noCheck = false;

  us[name].createTime = new Date().getTime() - delta;

  fs.writeFileSync(
    path.resolve(__dirname, "../static/users/index.json"),
    JSON.stringify(us)
  );
  console.log('success~')
}
