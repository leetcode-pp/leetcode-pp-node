const fs = require('fs')
const path = require('path')
const name = 'guochiscoding';

const us = require("../static/users/index");

us[name].noCheck = false



us[name].createTime = new Date().getTime()


fs.writeFileSync(
    path.resolve(__dirname, "../static/users/index.json"),
    JSON.stringify(us)
  );