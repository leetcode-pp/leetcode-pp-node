const data = `
John_17	suiyi8760
M.X	xxxiaoma
DarkNightWriter	DarkNightWriter
youhaha67	admu
wxwangxia514	ILoveQier
所念皆星河	LMLKeepGoing
Jerry_Chris_	jerry-lllman
BaoChengYo	c1f2h3
shawnwu6688	shawnwu6688
lzy591156784	lzyxts
wengzhouyunfan	wengzhouyunfan
xiangalifu	github.com/ZhongXiangXiang
whishtlf	Whisht
资深嵌入式点灯工程师	ataraxyadong
long__181818	zhaogeg111
与空气斗智斗勇	fenchuiyun
Arthur	ll491119940
mengyu_chen	chenmengyu
MrHydeChang	hydelovegood
lbc546	lbc546
18571852185	9vivian88
kerrhl	Kerrhl
YUZEJIA2021	yuzejia
Tonghai19931111	fourierhai
hasee202550	mirrors-cl
summer	sujit197
于小鱼ృ༊°	Yuki-yzy
None	mmmsmh
LJ1433887494	liuajingliu
郭勇彬	ye2222
yush-_-	nehchsuy
Garygu9426	sunl1ght
lamb_0221	findlayZhou
Claire	AConcert
wsmmxmm	wsmmxmm
Utopia	smz1995
LFFF	bzlff
F	fan-svg
5t悟	sanjiu81
lengyue940123	gsgtgyb
13643423467	铁兑
啥也不是的小垃圾	clr1235
acoada	acoada
宓唐	zhaozhaosiqi
xjy_2584	nikojxie
jiuxu17	bulingbulingbuling
宓唐	HengHeng-Yun
sh1207741131	luckyoneday
寡言但唯一	zhaogeg111
joriscai	joriscai
urfblsq	flaming-cl
nea	neado
UyPlayer	uyplayer
MaYue626	AmberMa626
hwj100036	weijie-he
thankuniversewechat	brodxie
Nuy-oaH-7777777	zpc7
-Hh，18536202542	zm-hunter
su1ka	MaylingLin
chenqilin_1988	1019921999@qq.com
kkxxywn	thinkfurther
chenlei1011	raychenlei
我就说好吃吧(vx: mizhixhanbao)	yutong53
wxid_tg292w23mm8411	UCASHurui
Coder_Hacker_Li	lichunfeng2406
JY-11007	yaya-bb
YuKang_Zhong	Hacker90
YuKang_Zhong	Hacker90
LXJRichard	Richard-Lime
tribulations2022	aq666888
liushinan8888	okkband
aW5jaXBl	incipe
wxid_z2pbolnax5e112	xy147
何旭	hx-code
Tlntin / 微信号(Tlntin_)	Tlntin
淡c	caicancai
Hhhhhelj	linjunhe
huangyuqing1111a	hyqqq22
沉浮	jia98shanliang
ccslience	ccslience
15600273388	sarapan412
zz993558206	flyzenr
maoer123oooo	caterpillar-0
hanwangxx	hanwangxxx
lwting_1999	Elon-Lau
盆	uancen
smilexiaang	jakkiabc
xfy15811592751	2learnsomething
breezyFeng	tomato-tomato
game6021023	aiweng1981
michaelxiii3	MichaelXi3
hatori1110	hatoriMain
EldinZhou_	EldinZhou
FlyingInTheGalaxy	phoenixflyingsky
含光	Brabem
erika_32134	erikahuang
smjw816	shunmingxiong
smjw816	shunmingxiong
#66CCFF	vhhgx
YuKang_Zhong	Hacker90
AlduinLeung	AlduinLeung
findleonn	okilled
aouome	aouos
as18772957769	zhongranherz
wxid_m1em3bp06oaq22	 Luckysq999
cytrue	cytrue
duanyaqi-_-	DuanYaQi
adehappy168	dereklisdr
Z02f0202	zhangfei18
hookjs	andyyxw
happy_lizhe	woshichuanqilz
zhg19920815	zhg1992
gaoyuan19880111	jackgaoyuan
Aa112211urp	uancen
amazinglalabro(夜鹰)	XingZhaoDev
Jay	jay-xzj
momo-rain8	nuomituxedo
所念皆星河	lmlkeepgoing
Architect620	hackbl
mathematical_2020	dujt-X
`;

const unknowns = [
	"Dawn",
	"宿愿Cc",
	"have-belief-to-live",
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

exports.users =
	Object.values(users)
		.filter(Boolean)
		.map((v) => String.prototype.trim.call(v))
		.map((v) => String.prototype.toLocaleLowerCase.call(v));
