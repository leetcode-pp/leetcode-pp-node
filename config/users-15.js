const data = `
xarey870629	xarey0629
haodongwang0000	HaodongWang1995
JazzingMountain	QunShanHe
xstb_ly	xstblu
darwinmonkey	darwintankon@gmail.com
BillyCHX0410	CHXBilly
PEng	rocjemaintiendrai
passengerses	passengersa
w01h14b	shuichicx
IamJHM	jinhma
kizibai	baiqz
CPP-PENG-QFFDNLXX	XiaogaoDDD
vivihbl999	hebingliang
tuuna_	tuuna
wtb2632057	wtbkevin
darwinmonkey	darwintk
tongxiaoweiwill	tongxw
turnalltocashflow	hallcia
asukawsj	shangjiaw
Lauralwx	laurallalala
xiao_guang_0	master-guang
watermenlon827	jameswangxin
wxid_oj77ij5q2utg22	m1592
晨曦	Dtjk
xx13295441574	lxy12l
qq874329147	dencanwen
L13724343058	fea1220
kitkwanL	leungogogo
liub0_o	awenbocc
sentiy_when	sentiy-hub
Lauralwx	laurallalala
hzp2061448973	HuZhipeng
hzp2061448973	HuZhipeng-hu
15171667126	tongtz
wmz9812ytlds	lindo146
maoting844336	maoting
dreamdragonHeHao	heye0507
`;

const unknowns = [
  "wxid_oj77ij5q2utg22",
  "xarey870629",
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
  // "820064276"
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
