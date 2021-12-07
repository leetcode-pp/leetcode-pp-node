const startTime = new Date("2021-09-10T00:00:00.000+08:00");
const { users } = require("./users-5");
const { users: S6 } = require("./users-6")
const us = require("../static/users/index");

const userList = [].concat(
  users.map((name) => ({
    login: name,
  }))
).filter(user => {
  return user.login in us && (!us[user.login].noCheck || user.login in S6)
}).concat(
  S6.map((name) => ({
    login: name,
    next: true
  }))
)

const db = userList.reduce((acc, curr) => {
  acc[curr.login] = curr;
  return acc;
}, {})

console.log(db.azl397985856)

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


module.exports = {
  leetcodeConfig,
  owner: "leetcode-pp",
  repo: "91alg-5-daily-check",
  startTime: startTime.getTime(),
  secret: process.env.secret,
  clientId: "c16b80e7b58a5a007157",
  db,
};
