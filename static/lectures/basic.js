const fs = require("fs");

const { encrypt } = require("../../utils/crypto.js");
const t = require("../../static/lectures/lectures.json");
const lectures = {};

lectures[1] = {
  id: 1,
  content: encrypt(Buffer.from(fs.readFileSync("./1.basic-01.md"), "utf8")),
};

fs.writeFileSync("./lectures.json", JSON.stringify(lectures));
