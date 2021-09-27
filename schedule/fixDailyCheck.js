const fs = require("fs");
const path = require("path");
const mySolutions = require("../static/my/solutions.json");
const backup = require("../static/my/backup.json");

for (const login in backup) {
  const lower = login.toLocaleLowerCase();
  if (lower in mySolutions && lower !== login) {
    // 清理老数据
    mySolutions[login] = void 0;
  }
  // 恢复误删除数据
  if (login in backup) {
    if (login === "ZhuMengCheng") {
      console.log(backup[login]);
    }
    if (!mySolutions[lower]) {
      mySolutions[lower] = backup[login];
    }
    for (const s of mySolutions[lower]) {
      if (s === null) {
        mySolutions[lower] = backup[login];
      }
    }
  }
}

fs.writeFileSync(
  path.resolve(__dirname, "../static/my/solutions.json"),
  JSON.stringify(mySolutions)
);
