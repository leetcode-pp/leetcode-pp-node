const fs = require("fs");
const path = require("path");
const { getDay } = require("../utils/day");
const us = require("../static/users/index");
const mySolutions = require("../static/my/solutions.json");

const allUsers = JSON.parse(JSON.stringify(us));

function run(n) {
  // 返回目前为止满勤的人（连续七天可获取补签卡）
  function fullCheckIn(from = 1, to = getDay()) {
    const users = [];
    const day = to;
    const DAYS_TO_GET_CARD = 7;

    for (const login in mySolutions) {
      const solutions = mySolutions[login];
      let i = from;
      let card = 0; // 补签卡数量
      let continuousDays = 0; // 连续打卡的天数
      while (i <= day) {
        if (!solutions || !solutions[i - 1]) {
          continuousDays = 0;
          if (card > 0) {
            card--;
          } else {
            break;
          }
        } else {
          continuousDays++;
          if (continuousDays == DAYS_TO_GET_CARD) {
            card++;
          }
          if (i == day) {
            users.push({
              login,
              card,
            });
          }
        }
        i++;
      }
    }
    return users;
  }
  // 返回7天内所有已经打卡的
  function checkWithinNDays(n) {
    const users = {};
    const day = getDay();
    if (day <= n) return allUsers;
    for (const name in allUsers) {
      const solutions = mySolutions[name];
      // 如果注册时间不满 n 天，则算打过卡。
      if (day - getDay(allUsers[name].createTime) + 1 <= n) {
        users[name] = true;
        continue;
      }
      let i = day - n;

      let count = 0;

      while (i <= day) {
        if (!solutions || !solutions[i]) {
          count += 1;
        } else {
          count = 0;
        }
        if (count == n) {
          break;
        }
        i++;
      }

      if (count < n) {
        users[name] = true;
      }
    }
    return users;
  }

  function diff(A, B) {
    for (const name in B) {
      delete A[name];
    }
    return Object.keys(A);
  }
  const blacklist = diff(allUsers, checkWithinNDays(n));
  const redlist = fullCheckIn();
  console.log(`no check within ${n} days`, blacklist);
  console.log(`full check`, redlist);

  for (const red of redlist) {
    us[red.login].allCheck = true;
  }
  for (const login of blacklist) {
    us[login].noCheck = true;
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../static/users/index.json"),
    JSON.stringify(us)
  );
}

run(7);
