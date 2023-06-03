const startTime = new Date("2023-06-10T00:00:00.000+08:00");
// const { users } = require("./users-5");
const { users } = require("./users-10");
const us = require("../static/users/index");

const whitelist = [
  "unclegem",
  "feikerwu",
  "threedayaaaaa",
  "suukii",
  "azl397985856",
  "bltnever",
];

// const S7 = []

const userList = whitelist
  .concat(users)
  .map((name) => ({ login: name, next: true }))
  .filter((user) => {
    if (user.login in us) {
      // 过滤 7 天没有打卡的
      return !us[user.login].noCheck;
    }
    return true;
    // return user.login in us && (!us[user.login].noCheck || S7.includes(user.login))
  });
// .concat(
//   S7.map((name) => ({
//     login: name,
//     next: true
//   }))
// )

const db = userList.reduce((acc, curr) => {
  acc[curr.login] = curr;
  return acc;
}, {});

const leetcodeConfig = {
  baseUrl: "https://leetcode-cn.com",
  submitUrl: "https://leetcode-cn.com/problems/$slug/submit/",
  loginUrl: "https://leetcode-cn.com/accounts/login/",
  allProblem: "https://leetcode-cn.com/api/problems/all/",
  _91UsernameCookieName: "login", // 在91网站中存lc用户名的cookie的键名
  _91PwdCookieName: "password", // 在91网站中存lc密码的cookie的键名
  lcSeesionCookieName: "LEETCODE_SESSION", // lc存seesionid的 cookie键名
  lcCsrftokenCookieName: "csrftoken", // lc存csrf的 cookie键名
};
const season = 11;
module.exports = {
  leetcodeConfig,
  season,
  owner: "leetcode-pp",
  repo: `91alg-${season}-daily-check`,
  startTime: startTime.getTime(),
  secret: process.env.secret,
  clientId: "c16b80e7b58a5a007157",
  db,
  whitelist,
};
