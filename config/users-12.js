const data = `
ccq339	Chloe-C11
Nonkul_R	0Christ1
larscheng	larscheng
ahu-wx	jsaki
donald_duck	javajianghu
Lauralwx	laurallalala
Y4W3B1	freeroo2
youyin__	EggEggLiu
QinhaoChang	QinhaoChang
wxid_7490714906511	zm-hunter
wx_nawtain	snmyj
yangcan17	ycan253
yangcan17	ycan253
wx_nawtain	snmyj
wx_nawtain	snmyj
shirlin19	Junru281
Z906155099	rennzhang
FishMoCuishle	emergence23
jx8023997	qingkediguo
IamJHM	JinhMa
duruo8686	Verkru
13781000528	adfvcdxv
xyan516495459	Danielyan86
 jau_ianxaus-99914	kiirii4
wxid_aq27maw9rf4u22	adfvcdxv
wxid_u69garvv48jr21	 Luster-lyl
TianlinGui	dr-kkk 
yudong-sun-	joe-the-plumber
wxid_eaxvmu9x593s12	Ludwig-LL
andynick1983	smallppgirl
witerth	witerth
Ellenson_	Hioneowner
andynick1983	smallppgirl
duxiyang430105	RealDuxy
aiziyouhao	peggyhao
pweinihao	Awilekong
singeewx	ImSingee
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
  // "820064276"
  "wxid_7490714906511",
  "13781000528"
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
