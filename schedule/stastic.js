const { getDay } = require("../utils/day");
const us = require("../static/users/index");
const mySolutions = require("../static/my/solutions.json");

// 下面代码没有考虑一个人中途加入，那么他没有加入之前也会被统计为未打卡。
const allUsers = JSON.parse(JSON.stringify(us));

// 返回7天内所有已经打卡的
function checkWithin7Days() {
  const users = {};
  const day = getDay();
  if (day <= 7) return allUsers;
  for (const name in mySolutions) {
    const solutions = mySolutions[name];
    if (!(name in allUsers)) {
      console.log(`震惊! ${name} 竟然发生了这种事情，真相令人唏嘘！`);
      continue;
    }
    let i = Math.max(day - 7, getDay(allUsers[name].createTime));

    let count = 0;

    while (i < day) {
      if (!solutions[i]) {
        count += 1;
      } else {
        count = 0;
      }
      if (count == 7) {
        break;
      }
      i++;
    }

    if (count < 7) {
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

console.log(diff(allUsers, checkWithin7Days()).length);
