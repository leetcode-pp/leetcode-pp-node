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
remembrance_dear	ronething
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
shileyixiashizhende	zhuzhu096
ywang525	y525
小小郭	guowei0223
wuvsjm1093237218	jancerwu
Orangejuz_	Orangejuz
wxid_99kessnllg0x21	tiandao043
lmx55011	alexno1no2
lance0000	lihua1997
xiaoranzife	FontEndArt
openMindG	ringo1597
ppmm1217yi	sclihuiming
wxid_2kl9hphryf6g52	DorisLee1997
cyonline123	cyonline
Yun-Heng-	HengHeng-Yun
cuuze321	cuizezhou
chenjianfeng0305	saitoChen
FredFu2460	Frederickfan
Ben_0620	rzhao010
as18772957769	zhongranHerz
JYe_1999	Serena9
wuxudanxin5246	declan92
panlin-kkxia	xiaaller
ppmm1217yi	sclihuiming
Lucas-zlq	LangqiZhao
_18thbro	y4h2
壮二	y4h2
wookongz	xin-gh
lance0000	lihua1997
wuxudanxin5246	declan92
whishtlf	Whisht
panlin-kkxia	xiaaller
solas01	allenfeng666
zzzzz_zzx	Elsa-zhang
Jean-Tau	taojin1992
gaoyuan19880111	jackgaoyuan
B13040513	AstrKing
solas01	allenfeng666
Stellaaa_ma	jmaStella
maoer123oooo	caterpillar-0
hyx_abby	AnnabellHyx
ppzaio	wurongronga
bookyue	bookyue
Memoryof24	wenyuhan-lina
stefan_F_	1541732340
kyle4win	kyrie96521
d478541	xuanaxuan
Little_Airz	ApocKira
long52082004	buer1121
gsw981803970	gsw9818
thankuniversewechat	ceramickitten
boyingwang	klspta
u_link_me	CaveCrypTo
qingge899504	bwspsu
maker	Yanping-Li-oss
wufangzhouzhou	naomiwufzz
Aa112211urp	uancen
meggia	chouqin99
MOS	snmyj
Yfucan	yetfan
workday944	heng518
darwinmonkey	darwintk
hanchutianji622	richypang
Lj1433887494	liuajingliu
zhiyuan7707	steven72574
soyAnanas	ruikiwi
453593547	zjsuper
wxid_rdu0te34117m22	syh-coder
wengzhouyunfan	wengzhouyunfan
含光	luhaoling
zhou1224150218	amazeding
hatori1110	hatorimain
Forschers	Forscher
_wuxiao_	wuxiaoShawn
OpalArin	arinzz
yindadaws	yin02
smilexiaang	Jakkiabc
rzj15345711326	renzhejun
hundanxingxiaobao	Christina-Soda
nea	neado
13719295799	hwfrankfung
zm-nerd	zhumiao-taylor
tribulations2022	aq666888
wizard1616	zjsuper
FungHiuwang	HWFrankFung
Zyxccc66	Yongxi-Zhou
kongkongysq517	ShuqianYang
嘟嘟	SJ941127
骆驼草	maoting
Wubalubudabuda	miduoliu
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
