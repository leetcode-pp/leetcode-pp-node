const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const { db } = require("../../config/index");
const users = require("./index.json");

async function run() {
  const octokit = new Octokit({ auth: process.env.issueToken });
  const ps = [];
  for (const name in db) {
    if (users[name] && users[name].avatar_url) continue;
    ps.push(
      octokit.rest.users
        .getByUsername({ username: name })
        .then((res) => res.data)
        .then((user) => {
          if (!(name in users)) {
            users[name] = {
              ...user,
              createTime: new Date().getTime(),
            };
          } else {
            //  说明信息不全，我们更新处理了 createTime 之外的字段
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

run().then(() =>
  fs.writeFileSync(__dirname + "/index.json", JSON.stringify(users))
);
