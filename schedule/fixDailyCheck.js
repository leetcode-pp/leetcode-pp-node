const fs = require("fs");
const path = require("path");
const mySolutions = require("../static/my/solutions.json");
const { run } = require('./daily-check')
// const backup = require("../static/my/backup.json");

// for (const login in backup) {
//   const lower = login.toLocaleLowerCase();
//   if (lower in mySolutions && lower !== login) {
//     // 清理老数据
//     mySolutions[login] = void 0;
//   }
//   // 恢复误删除数据
//   if (login in backup) {
//     if (login === "ZhuMengCheng") {
//       console.log(backup[login]);
//     }
//     if (!mySolutions[lower]) {
//       mySolutions[lower] = backup[login];
//     }
//     for (const s of mySolutions[lower]) {
//       if (s === null) {
//         mySolutions[lower] = backup[login];
//       }
//     }
//   }
// }

// 将 fr 的 comment 转移到 to
// 就是为了修复新建了多个 issue，这几个 issue 是同一天的，而且大家分别在两个 issue 打卡
function transfer(day, issue_number) {
  run(day, issue_number)
}

transfer(52, 71)

fs.writeFileSync(
  path.resolve(__dirname, "../static/my/solutions.json"),
  JSON.stringify(mySolutions)
);
