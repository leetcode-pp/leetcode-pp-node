const data = `
Mlking15	mlking15
莫失莫忘	yuexi001
闻鸡不起舞	mld-njupt
guomx8023	Albert556
Gigura-	Luanxing
Ox00000F7	asur4s
Fabulous_Yangzzz	YANGZ001
Fine-tuning	ChickenBC
moin-jer	moin-jer
imoney202188888888	ReadyCheng
Jeffray__	jetery
17302261195	Elon-Lau
alyenor	Alyenor
PleaseHEHe	testplm
alyenor	Alyenor
eagllaw	kshjby
yjb842952	ChickenBC
🌙奔我而来(yiyi-fengheju)	littlesugarman
wxid_o9o4m8nos7xe22	tzuikuo
philAI	xqmmy
n1366668888	Blackn_L
thame_first_hy	Lemon-Hoyoung
zhourentian	zrtch
xhj_1119	954545647
x2827867731	A-pricity
StevenQiHe	H-steven
WABW0321	wabw1
RHM100712	huiminren
luoch123	 Lawsonkurt
mayloveless	mayloveless
z906083712	GG925407590
hanwangxx	hanwangxxx
uniTure120	ZhihaoWan
噜噜噜	xiaomingshixiaotang
wxid_340j8awzg28i21	whoam-challenge
xiaocao041	chenming-cao
Tachikomaa	FlipN9
EJ_15035	erjian96
zzw1152354108	BruceZhang-utf-8
gnorux_42	Abby-xu
D	RestlessBreeze
芒🌈	CXGBro
JasonC0101	A-Polarbear
onestreamnineis	nineis7
来处	caizxian
aouome	aouos
blood	MDGE
AnonymousBit	zhiyuanpeng
资深嵌入式点灯工程师	AtaraxyAdong
Yc-Michael-Yy	Chao-Yan-git
Joeywwwww	zywang0
gmhcn95	GaoMinghao
Joeywwwww	zywang0
szk_0108	luckyshenzhengkang
remembrance_dearronething
Unique_worth	ShanShuiQianKun
Lonely Street丶	dd2001
wxid_1cl9i5ievlek22	wtdcai
lhb-123-456	huibinny
faker18235705089	lx-1005
su1ka	MaylingLin
_Serenadipity_	MischaQI
hookjs	andyyxw
YanY	FlipN9
hicoding2022	hicoding2022
zenwangzy	zenwangzy
13914003074	Dark-volute
weiyingyu0411	Weisday
silence_hem	ggohem
zzw1152354108	BruceZhang-utf-8
snow1763571	paopaohua
`;
// r19000815	renxuyang

const unknowns = [
  "zoro-lulu",
  "Dawn",
  "宿愿Cc",
  "Simple_TYJ",
  "xiaohanlliu.0730",
  "15396053927",
  "guid_shin",
  "wxid_e52ejucgg5zt11",
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
