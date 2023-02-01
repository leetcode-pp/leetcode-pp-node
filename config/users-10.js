const data = `
scncgoo	seanutf
laoju0	AngryChocobo
jliu0185	el1as7
xjy_2584	nikojxie
Hustry	munmust
qx150604(千山慕雪)	Panfen
spryti	adaex
cushu_96	coder-cushu
kanmiian	kanmiian
airwalkers	airwalkers
fylz_flyz	ZhuMengCheng
hanchutianji622	richypang
LoveYouWenQinAllLife	hshen_11@163.com
ginkela	Ginkela
Fear_of_Jay	WANGjay408
w87100992	Serrust
丁	xiaoDingc
Sayuri_Watanabe	Dominique9898
zenmehuiyourenyong	zpbc007
l90032190	wangqianqian202301
李晶	lijing1024
Sunlitskylines-onlyu	Ryanbaiyansong
yj920952933	yan-jie
joemonkeylee	joemonkeylee
13852991066	LIMBO42
wrc165677	Wl678
wrc165678	wl678
xiaopawnye	lp1506947671
Zephr1943	zepherust
小太阳	RichardTaoK
Quieter_yuxi29	Quieter2018
youyukao	FireHaoSky
wxid_z2pbolnax5e112	xy147
Dragon_FCL	DragonFCL
zhangjh0501	zhangjiahuan17
LoveYouWenQinAllLife	hshen11
LoveYouWenQinAllLife	hshen11
mengsixing_	mengsixing
halcyon_lums	HalcyonZata
kokobop22	sarah11qing
chao00905	chao-cc
wchat_four	Fuku-L
wchat_four	Fuku-L
wx_nawtain	snmyj@outlook.com
gsy178069	import-ant
YJACIVY	OASans
BaoChengYo	c1f2h3
fqk1129	feefeefee
fqk1129	feefeefee
zenwangzy	zenwangzy
xinanande	Lrwhc
dorapocket0402	dorapocket
w_TRTW	GISW
yldznf	chocolate-emperor
13060206910	ezwkg@qq.com
Adir42	texamc2
Arrthure	KangQinSen
huizsh	huizsh
`;

const unknowns = [
  "zoro-lulu",
  "Dawn",
  "宿愿Cc",
  "Simple_TYJ",
  "xiaohanlliu.0730",
  "15396053927",
  "guid_shin",
  "wxid_e52ejucgg5zt11",
  "453593547",
  "13719295799",
  // "丁",
  "cushu_96",
  "kanmiian",
  "wrc165677",
  "13852991066",
  "Zephr1943",
  "wxid_z2pbolnax5e112",
  "BaoChengYo",
  "13060206910"
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
