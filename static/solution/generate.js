const fs = require("fs");

const { encrypt } = require("../../utils/crypto.js");

const solutions = {
  1: {},
};

[1].forEach((i) => {
  solutions[i].content = encrypt(
    Buffer.from(fs.readFileSync(`./d${i}.md`), "utf8")
  );
});

fs.writeFileSync("./solutions.json", JSON.stringify(solutions));
