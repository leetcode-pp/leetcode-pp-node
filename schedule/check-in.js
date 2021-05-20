const { getDay } = require("../utils/day");
const us = require("../static/users/index");
const mySolutions = require("../static/my/solutions.json");

// 下面代码没有考虑一个人中途加入，那么他没有加入之前也会被统计为未打卡。
const allUsers = JSON.parse(JSON.stringify(us));

function run(n) {
  // 返回目前为止满勤的人（连续七天可获取补签卡）
  function fullCheckIn(from = 1, to = getDay()) {
    const users = [];
    const day = to;
    const DAYS_TO_GET_CARD = 7;

    for (const name in mySolutions) {
      const solutions = mySolutions[name];
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
              name,
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
      if (getDay(allUsers[name].createTime <= n)) {
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

  console.log(`no check within ${n} days`, diff(allUsers, checkWithinNDays(n)));
  console.log(`full check`, fullCheckIn());
}

run(7);
