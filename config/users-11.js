const data = `
bi9potato	bi9potato
ACutieCutiePie	SoSo1105
DiL_0349	RestlessBreeze
wxid_nk9qxm79s33b12	Xinyue-Ma
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
zhou1813785561	Miller-em
wx_nawtain	snmyj
-_-#	zhuxinyu-znb
YuLansiyaki	beanza
CYCL1224	cyk1337
15021187156	2896431151@qq.com
watermelon827	JesseWang
joemonkeylee	joemonkeylee
Cctrui17	C2tr
kingonsky	348977787@qq.com
JY-11007	-yayabb
iswesley	wasedawesley
ys954244923	GuitarYs
Fear_of_Jay	WANGjay408
w2441505169	diana21170648
JY-11007	yaya-bb
xhj__1119	954545647
yoci642	chang-you
iambigchen0	iambigchen
RyanOnCloud	gaoyuan1223m
wchat_four	fuku-l
15021187156	weiguangjiayou
freesan44	freesan44
LY27597873	61hhh
wbs15071133212	weiboshi
ID2B290	Sencc
LeoG0922	RocJeMaintiendrai
huizsh	huizsh
iswesley	wasedawesley
zq945293035	franciszq
YUZI-1216	hjy-u
zhou1813785561	miller-em
wxid_e52ejucgg5zt11	christ36
lt1114061614	zcytm3000
id-topazzz	YGNAUH
zhou1813785561	miller-em
MZD719705648	m908
lmx55011	alexno1no2
15895987576	zhangyu1131
xiaoxinyu51	xixiao51
bzwill	yizhewill
xiao_guang_0	Master-guang
_wuxiao_	wuxiaoShawn
timmyhotimmy	sosdogecoin@gmail.com
junn-chen	qiaojunch 
gu2896431151	weiguangjiayou
lmx55011	Alexno1no2
watermenlon827	jameswangxin
JAMJID	beginner-jamji
afoolsjourney	dorian-byte
CarolinaFu1998	yfu6
w2441505169	diana21170648
Lukashuang1995	hzzaicyz
iai1110	MetSystem
hotimmyho	sosdogecoin
gu2896431151	weiguangjiayou
biscuit279	biscuit279
kingonsky	kingxiaozhe
xhj__1119	954545647
iai1110	metsystem
et229229	dongzegithub
BaidiRd_LittlePeppa	yetfan
xingchenlhx	Hughlin07
wxid_rdu0te34117m22	syh-coder
xuyuefan2013	zhouliuhuo
gaoyuan19880111	jackgaoyuan
duanyukun150	1095135037
han-9113	aohanliu
LJ1433887494	liuajingliu
GEMINI__HJ	hengistchan
passengerses	passengersa
BestBoyMarcus	lizlian
hchen_CA	HuiyingC
a136751026	andyli4
Momogir_air	Memo
`;

const unknowns = [
  "timmyhotimmy",
  "zoro-lulu",
  "Dawn",
  "宿愿Cc",
  "Simple_TYJ",
  "xiaohanlliu.0730",
  "15396053927",
  // "guid_shin", 第 X 期加入
  // "wxid_e52ejucgg5zt11",
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
  // "JennyHovo",
  "15021187156",
  // "zhou1813785561",
  // "iai1110",
  "13886812418",
  "po'n'y",
  "15021187156",
  "watermelon827",
  "w2441506169",
  "13250504940",
  "15021187156",
  // "15895987576"
  // "wxid_rdu0te34117m22",
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
