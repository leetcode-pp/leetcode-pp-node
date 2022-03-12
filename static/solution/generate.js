const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const {
  leetcodeConfig: { allProblem },
} = require("../../config/index");
const { encrypt } = require("../../utils/crypto.js");

const solutions = require("./solutions.json");
let lcProblemIdMap = {};

const BASIC_DAYS = 36
const TOPIC_DAYS = 36
const ADVANCED_DAYS = 19

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

function getQuestionId(link = "") {
  if (!link) return null;
  let slug = link
    .split("/")
    .reverse()
    .find((item) => item);
  return lcProblemIdMap[slug];
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
  solutions[i]["question_id"] =
    getQuestionId(link) || solutions[i]["question_id"];
}
// 基础篇
function generateBasic() {
  Array.from({ length: BASIC_DAYS }, (_, i) => i + 1).forEach((i) => {
    solutions[i] = solutions[i] || {};

    const rawMDBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../91alg-5/solution/basic/d${i}.md`)
    );
    const rawMD = rawMDBuffer.toString();
    generate(rawMD, rawMDBuffer, i);
  });
}
// 专题篇
function generateTopic() {
  Array.from({ length: TOPIC_DAYS }, (_, i) => i + 37).forEach((i) => {
    solutions[i] = solutions[i] || {};

    const rawMDBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../91alg-5/solution/topic/d${i}.md`)
    );
    const rawMD = rawMDBuffer.toString();
    generate(rawMD, rawMDBuffer, i);
  });
}
// 进阶篇
function generateAdvance() {
  Array.from({ length: ADVANCED_DAYS }, (_, i) => i + 73).forEach((i) => {
    solutions[i] = solutions[i] || {};

    const rawMDBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../91alg-5/solution/advanced/d${i}.md`)
    );
    const rawMD = rawMDBuffer.toString();
    generate(rawMD, rawMDBuffer, i);
  });
}

function getLcProblemIdMap() {
  return fetch(allProblem)
    .then((res) => res.json())
    .then((res) => {
      let result = {};
      let data = res.stat_status_pairs;
      if (data) {
        result = data.reduce((pre, item) => {
          let { stat: { question__title_slug, question_id } = {} } = item || {};
          if (question__title_slug && question_id) {
            pre[question__title_slug] = question_id;
          }
          return pre;
        }, {});
      }
      return result;
    });
}

async function main() {
  try {
    lcProblemIdMap = await getLcProblemIdMap();
  } catch (err) {
    console.log(err);
  }
  generateBasic();
  generateTopic();
  generateAdvance();

  fs.writeFileSync(__dirname + "/solutions.json", JSON.stringify(solutions));
}

main();



