const startTime = new Date();

startTime.setMonth(4);
startTime.setDate(10);
startTime.setHours(0);
startTime.setMinutes(0);
startTime.setSeconds(0);
function join(s) {
  return s
    .split(/\n/)
    .filter(Boolean)
    .map((v) => String.prototype.trim.call(v));
}
const tobeIdentified = [
  // "Xeraphinite",
  // "rjhot",
  "Forschers",
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
  "SWUFEzyf",
  "suffocatingly0",
  "christ36",
  "evil-lin",
  "NchuYJ",
  "zc-githubs",
  "paopaohua",
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
  "464244812",
  "DIUDIU110",
  // "frostjsy",
  "DAXIAdaxia",
  "tongxw",
  "lingquan02",
  "taojin1992",
  "size-of",
  "ARe99s",
  "agentzzz",

  "longlonglu",
  "lanceli424",
  "Saberfish",
  "zyycode",

  "911gt5",
  "MangoJuicy",
  "yourspeace",

  "physicshi",
  "SeventeenCui",
  "KevinWorkSpace",
  "Cartie-ZhouMo",

  "fenglei110",

  "Kuroky-Chen",

  "liuhl06",
  "absent1353",
  "doubelejjyy",

  "andyyxw",

  "pkuphy",
  "zhangjihu0",
  "w-z-hub",
  "bmxbmx3",
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
  "CoreJa",
  "FontEndArt",
  "surahe",
  "flagyk5",
  "QiYang03101994 ",
  "cecilia-vu",
  "keepchasing",
  "Davont",
  "Jolins",
  "cicihou",
  "Yueqi-19",
  "Xeraphinite",
  "rfhklwt",
  "Liuqibaa",
  "Mvbbb",
  "nanwy",
  "zengwmFE",
  "XiaoY0324",
  "aouos",
  "15399618796",
  "LeiLeiW825",
  "CurrrryChen",
  "DoubleW2w",
  "yaofaqian",
  "fakerbaby",
  "ezrealcong",
  "PeopleWhoListenToStories",
  "heartinn",
  "XUHUIisxh",
  "peterolive",
  "bowlofnoodles",
  "coke420",
  "Forschers",
  "LeiLeiW825",
  "joriscai",
  "348977787@qq.com",
  "miqpalzm",
  "sitequ",
  "dorothyDing",
  "BraveSage",
  "edge-wzw",
  "dublue24",
  "Xyxy1722",
  "mystoryshine",
  ...join(`wangyi123456
  mittacy
  Nicenonecb
  LangqiZhao
  wangpengzhen
  falconruo
  mokinzhao
zhangyong-hub
125110072@qq.com
wsgouwan
johanazhu
  HTian1997
  Bochengwan
  shuo0314
  peacejoylove86
  joe-the-plumber
  QiuhaoLi
xiaotuanzi999
Eachless@gmail.com
simplezhao
suukii
JohnVSD
autumndesea
yulecc
devil-lin
dmlseeing
UCASHurui
naomiwufzz
dopufol
wu529778790
15209356689
kofzhang
BryanMiracle
sichenguo
Endeavor-Gcl
Syan115
xiongyujie
qycoder
hazelnuttt
S-T-D
wangzqnb
LS-King
gjm12345
yanjyumoso
YuanWenLai
linzeliang1222
MellonGuan
  NorthSeacoder`),
];

module.exports = {
  owner: "leetcode-pp",
  repo: "91alg-4",
  startTime: startTime.getTime(),
  secret: process.env.secret,
  clientId: "c16b80e7b58a5a007157",
  db: [
    {
      login: "azl397985856",
    },
  ].concat(
    tobeIdentified.map((name) => ({
      login: name,
    }))
  ),
};
