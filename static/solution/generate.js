const fs = require("fs");
const path = require("path");

const { encrypt } = require("../../utils/crypto.js");

const solutions = require("./solutions.json");

function toArray(sep = "-", txt) {
  if (!txt) return txt;
  // 兼容形如  - [dfs](https://www.xxxxxx)

  if (/\[(.+)\](.+)/.test(txt)) {
    try {
      txt = /\[(.+)\](.+)/.exec(txt)[1];
    } catch (err) {
      console.log(err);
    }
  }

  return txt
    .split(sep)
    .slice(1)
    .map((v) => String.prototype.trim.call(v));
}

function getParenceDataReg() {
  return {
    title: /(?<=# 题目地址[(（])(.+?)(?=[)）])/,
  };
}

function getSatelliteDataReg() {
  return {
    link: /(?<=# 题目地址[(（)].+?[)）])([\s\S]*?)(?=##)/,
    pres: /(?<=## 前置知识)([\s\S]*?)(?=##)/,
    description: /(?<=## .*?描述)([\s\S]*?)(?=##)/,
    tags: /(?<=## 标签)([\s\S]*?)(?=##)/,
    whys: /(?<=## 推荐理由)([\s\S]*?)(?=##)/,
    difficulty: /(?<=## 难度)([\s\S]*?)(?=##)/,
  };
}

function matchWioutPaddingLine(reg, txt) {
  return (
    txt.match(reg) &&
    txt
      .match(reg)[0]
      .replace(/^[\r\n]+/g, "")
      .replace(/[\r\n]+$/g, "")
  );
}

function generate(rawMD, rawMDBuffer, i) {
  const regs = {
    ...getSatelliteDataReg(),
    ...getParenceDataReg(),
  };
  const pres = matchWioutPaddingLine(regs.pres, rawMD);
  const description = matchWioutPaddingLine(regs.description, rawMD);

  const tags = matchWioutPaddingLine(regs.tags, rawMD);
  const link = matchWioutPaddingLine(regs.link, rawMD);
  const title = matchWioutPaddingLine(regs.title, rawMD);
  const whys = matchWioutPaddingLine(regs.whys, rawMD);
  const difficulty = matchWioutPaddingLine(regs.difficulty, rawMD);
  solutions[i] = {
    ...solutions[i],
    day: i,
    pres: toArray("-", pres),
    tags: toArray("-", tags),
    whys: toArray("-", whys),
    difficulty,
    description,
    content: encrypt(rawMDBuffer),
    title,
    link,
  };
}
// 基础篇
function generateBasic() {
  Array.from({ length: 28 }, (_, i) => i + 1).forEach((i) => {
    solutions[i] = solutions[i] || {};

    const rawMDBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../91alg-4/solution/basic/d${i}.md`)
    );
    const rawMD = rawMDBuffer.toString();
    generate(rawMD, rawMDBuffer, i);
  });
}
// 专题篇
function generateTopic() {
  Array.from({ length: 36 }, (_, i) => i + 29).forEach((i) => {
    solutions[i] = solutions[i] || {};

    const rawMDBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../91alg-4/solution/topic/d${i}.md`)
    );
    const rawMD = rawMDBuffer.toString();
    generate(rawMD, rawMDBuffer, i);
  });
}
// 进阶篇
function generateAdvance() {
  Array.from({ length: 27 }, (_, i) => i + 65).forEach((i) => {
    solutions[i] = solutions[i] || {};

    const rawMDBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../91alg-4/solution/advanced/d${i}.md`)
    );
    const rawMD = rawMDBuffer.toString();
    generate(rawMD, rawMDBuffer, i);
  });
}

generateBasic();
generateTopic();
generateAdvance();

fs.writeFileSync(__dirname + "/solutions.json", JSON.stringify(solutions));
