const { getDay } = require("../utils/day");
const { db } = require("../config/index");
const mySolutions = require("../static/my/solutions.json");

// 下面代码没有考虑一个人中途加入，那么他没有加入之前也会被统计为未打卡。
const allUsers = JSON.parse(JSON.stringify(db));

function noCheckWith7Days() {
  const users = [];
  const day = getDay();
  if (day < 7) return users;
  for (const name in mySolutions) {
    const solutions = mySolutions[name];
    let i = 0;
    let count = 0;

    while (i < day - 1) {
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

    if (count > 7) {
      users.push(name);
    }
  }
  return users;
}

console.log(noCheckWith7Days());
