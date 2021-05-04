const startTime = new Date();

startTime.setMonth(4);
startTime.setDate(10);
startTime.setHours(0);
startTime.setMinutes(0);
startTime.setSeconds(0);

const tobeIdentified = [
  // "Xeraphinite",
  // "rjhot",
  "ssxgit",
  "sumukeio",
  "ziwh",
  "JasonQiu",
  "yeanli95",
  "yunli2015",
  "linearindep",
  "liandmin",
  "sunshineliu6",
  "Huzhixin00",
  // "Leah-Luo",
  "HackBL",
  "mozro0327",
  "liucy0417",
  "watermelonDrip",
  "wonderful1234",
  // "SWUFEzyf",
  "suffocatingly0",
  "christ36",
  "awarmdevil",
  "NchuYJ",
  "zc-githubs",
  // "paopaohua",
  "Critsu",
  "Placeholder",
  "Levix",
  "newVincentFong",
  "cyaoyao",
  "cengjingeng",
  "hengyi666",
  "fzzfgbw",
  "Erika2001",
  "1998yyh",
  "LexieLiu01",
  "javanlu123",
  "chelseachen007",
  "yuris304",
  "fangyh",
  "fyyjyx-github",

  "littlesugarman",
  "LASIWan",
  "gitigor107",

  "DADAHUI",
  "yangjiahao106",
  "He1xin",

  "okbug",
  // "sichenguo",
  "zliu1413",
  "BeBraveBeCurious",
  "lzcyx",
  "suikataro",
  // "464244812@qq.com",
  "DIUDIU110",
  // "frostjsy",
  // "DAXIAdaxia",
  "tongxw",
  // "lingquan02",
  "taojin1992",
  "size-of",
  "ARe99s",
  "agentzzz",

  "longlonglu",
  "lanceli424",
  "saberfish",
  "zyycode",

  "911gt5",
  "MangoJuicy",
  "yourspeace",

  "physicshi",
  "SeventeenCui",
  "KevinWorkSpace",
  // "Cartie-ZhouMo",

  "fenglei110",

  "5837907@qq.com",

  // "liuhl06",

  "doubelejjyy",

  "andyyxw",

  "pkuphy",
  "zhangjihu0",
  "wz-hub",
  "bmxbmx3",
  "davont",
  "Lizhao-Liu ",

  "terrylijiayang",
  "shizukanaskytree",
  "taozi-taozi",
  "wanyongtao1988",

  "LzdFeiFei",

  "angusgenius",
  "lilyzhaoyilu",
  "FlorenceLLL",
  "zjsj",
  "andyyxw",
  "pkuphy",
  "zhangjihu0",
  "wz-hub",
  "bmxbmx3",
  "davont",
  "Lizhao-Liu ",
  "terrylijiayang",
  "shizukanaskytree",
  "taozi-taozi",
  "wanyongtao1988",
  "LzdFeiFei",
  "angusgenius",
  "lilyzhaoyilu",
  "ningali",
  "WIN0624",
  "Gjts",
];

module.exports = {
  startTime: startTime.getTime(),
  secret: process.env.secret,
  clientId: "c16b80e7b58a5a007157",
  db: [
    {
      login: "azl397985856",
    },
    {
      login: "Yueqi-19",
    },
    {
      login: "rfhklwt",
    },
    {
      login: "Liuqibaa",
    },
    {
      login: "Mvbbb",
    },
    {
      login: "nanwy",
    },
    {
      login: "XiaoY0324",
    },
    {
      login: "zengwmFE",
    },
    { login: "aouos" },
    {
      login: "15399618796",
    },
    {
      login: "Xeraphinite",
    },
  ].concat(
    tobeIdentified.map((name) => ({
      login: name,
    }))
  ),
};
