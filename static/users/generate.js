const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const { db } = require("../../config/index");
const users = require("./index.json");

async function run(incremental = true) {
  const octokit = new Octokit({ auth: process.env.issueToken });
  const ps = [];
  for (const name in db) {
    if (users[name] && users[name].avatar_url && incremental) continue;
    ps.push(
      octokit.rest.users
        .getByUsername({ username: name })
        .then((res) => res.data)
        .then((user) => {
          if (incremental && !(name in users)) {
            users[name] = {
              ...user,
              createTime: new Date().getTime(),
            };
          } else {
            //  createTime 字段不能更新，其他都可以更新
            const c = users[name].createTime;
            users[name] = {
              ...user,
              createTime: c,
            };
          }
        })
        .catch(() => console.log(`name ${name} is invalid`))
    );
  }

  return Promise.all(ps);
}
let incremental = true;

// 七天全量更新一次
if (getDay(TODAY) - getDay(meta.dailyCheck.lastUpdateTime) >= 7) {
  incremental = false;
}
run(incremental).then(() =>
  fs.writeFileSync(__dirname + "/index.json", JSON.stringify(users))
);
