const startTime = new Date("2021-05-09 16:00:00 GMT");
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

  "lzdFeiFei",

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
  "QiYang03101994",
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
eachless
simplezhao
suukii
JohnVSD
AutumnDeSea
yulecc
devil-lin
dmlseeing
UCASHurui
naomiwufzz
dopufol
yinfenglin
wu529778790
15209356689
kofzhang
BryanMiracle
sichenguo
Endeavor-Gcl
Syan115
xiongyujie
qycoder
Hazelnuttt
S-T-D
wangzqnb
LS-King
gjm12345
yanjyumoso
YuanWenLai
linzeliang1222
MellonGuan
Size-of
oborc
Daniel-Zheng
thisisandy
Yvonne1231-Wang
Gentlemancj
bolunzhang2021
minuet-red
jmaStella
caoyuyuyu
yolo-jane
xmlb88
Auto-SK
mengwwww
st2yang
siomarry
xixi-jiu
supermeohh
Nbambi
p76
Talent-Rain
cyk1337
daidaidashixiong666
hannahliu-github
ImSingee
QiZhongdd
AmuroPeng
ShunzuoWu012
LiangZheCoder
SunStrongChina
jawn-ha
serrust
q815101630
xuanaxuan
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
