const fs = require("fs");

const { encrypt } = require("../../utils/crypto.js");
const lectures = {};

lectures["-1"] = {
  id: "-1",
  content: encrypt(Buffer.from(fs.readFileSync("./-1.intro-01.md"), "utf8")),
};

lectures["-2"] = {
  id: "-2",
  content: encrypt(Buffer.from(fs.readFileSync("./-2.intro-02.md"), "utf8")),
};

lectures["1"] = {
  id: "1",
  content: encrypt(Buffer.from(fs.readFileSync("./1.basic-01.md"), "utf8")),
};

fs.writeFileSync("./lectures.json", JSON.stringify(lectures));
