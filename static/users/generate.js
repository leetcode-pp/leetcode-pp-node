const fs = require("fs");
const { db } = require("../../config/index");
const users = require("./index.json");

for (const name in db) {
  if (!(name in users)) {
    users[name] = {
      login: name,
      createTime: new Date().getTime(),
    };
  }
}

fs.writeFileSync(__dirname + "/index.json", JSON.stringify(users));
