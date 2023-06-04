const data = `
bi9potato	bi9potato
ACutieCutiePie	SoSo1105
DiL_0349	RestlessBreeze
1143183660	Xinyue-Ma
yin1442091358	yzhyzhyzh123
xtxxueyan	xtxxueyan
hc_hbgh	RanDong22
JennyHovo	jennyjgao
acy925	acy925
tridacnagigas	pan-qin
cun_zi_li	mo660
imyourskx	CatKathy
wx_nawtain	snmyj@outlook.com
 L6102IU	zhaoygcq
EJ_15035	Erjian96
zhou1813785561	miller-em
iai1110	Metsystem
13886812418	m908
AinfinitedZ	AinfinitedZ
po'n'y	pony-2020
hu5980	hu5980
qq578752350	guangsizhongbin
cjbcbllm	zhenya-zhu
15021187156	admin 
YQYLYW	YQYCS
zjfh20171110	zjsj
wzbwztever	wzbwzt
qq578752350	guangsizhongbin
Moin-Jer	Moin-Jer
qq578752350	guangsizhongbin
zyj2660399402	SunStrongChina
`;

const unknowns = [
  "zoro-lulu",
  "Dawn",
  "宿愿Cc",
  "Simple_TYJ",
  "xiaohanlliu.0730",
  "15396053927",
  // "guid_shin", 第 X 期加入
  "wxid_e52ejucgg5zt11",
  "453593547",
  "13719295799",
  // "丁",
  "cushu_96",
  "kanmiian",
  "wrc165677",
  "13852991066",
  // "Zephr1943",
  // "wxid_z2pbolnax5e112",
  "BaoChengYo",
  "13060206910",
  // "wxid_o9o4m8nos7xe22",
  "web_code-5",
  // "chengh-nju",
  // "ThatDoctor",
  "Van2643097225",
  // "603289228",
  "13250504940",
  // "18742055687",
  "16602112714",
  // "wxid_rdu0te34117m22",
  // "aneureka2",
  "wang18804001869",
  "16602112714",
  // "lmx55011",
  "15275150257",
  "5436888893",
  "wxid_tvkpmouwp0n522",
  // "820064276",
  "1143183660",
  "JennyHovo",
  "15021187156",
  "zhou1813785561",
  "iai1110",
  "13886812418",
  "po'n'y",
  "15021187156"
];
const users = {};
const lines = data.split(/\n/);
for (const line of lines) {
  const [wechat, github] = line.split(/\t/);
  if (!wechat || !github) {
    continue;
  }
  if (unknowns.includes(wechat)) {
    continue;
  }
  users[wechat] = github;
}

exports.users = Object.values(users)
  .filter(Boolean)
  .map((v) => String.prototype.trim.call(v))
  .map((v) => String.prototype.toLocaleLowerCase.call(v));
