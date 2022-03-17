
function join(s) {
  return s
    .split(/\n/)
    .filter(Boolean)
    .map((v) => String.prototype.trim.call(v))
    .map((v) => String.prototype.toLocaleLowerCase.call(v));
}

const data = `
Fillf.	YEOLOL
jaxvan	Junhao Fang
LXD943176792	L-SUI
bianbian_U	CarrieyqZhang
mxg123321	momomoi
yxm13767749407	kite-fly6618
Orangejuz_	Orangejuz
18273011839	liuguang520-lab
youyin__	EggEggLiu
zhoukey591380395	carterrr
15396053927	Oision-hub
正儿八经的lc	dzwhh
sgy9711	physicshi
zz993558206	 flyzenr
integrity	zhou0425
shawn03w	testeducative
LOVE871205209	vuesch
zz993558206（正在上山的泽哥）	flyzenr
chun_zi_li	mo660
c18742125776	youxucoding
SummerJay__	BallerJay
raingolee	raingolee
WH15909321605	CQUTWANGHONG
Joker0__0	bigboom666
icbtb_26	ljq0226
Hoult-Nicholas	hulichao
HL3032635302	freedom0123
xlyxrexx	LannyX
Zyxccc66	Yongxi-Zhou
zenwangzy	zenwangzy
Yshira	ShirAdaOne
NoleMMeloN	herbertpan
zbl18844185782	bolunzhang2021
Wikyang1028	Joewx21
HaotianYin	yinhaoti
skyTuanzi	miss1
MZD719705648	m908
小明不是我	AstrKing
Bonnenut	Bonnenult
wuxudanxin5246	declan92
zzz607	zzz607
xiaoxinyu51	xixiao51
EricCheng00	SDUEricCheng
xidinghu_3	shawnhu23
davontZ	Davont
hiklsabc	lskong
正儿八经的lc	dzwhh
zz1194365836	HZHENGZHI
magua97	Magua-hub
guid_shin	shin-guid
zyn1973719588	1973719588
icbtb_26	ljq0226
Coolboy0530	kbfx1234
wanghelloworld	AstrKing
lzt961025	Liuzt1025
Jean-Tao	taojin1992
Zzz_Snoring_C	ZacheryCao
AnonymousBit	zhiyuanpeng
QIZIXE	W-Will
Love-Life	Geek-LX
elliot_zrj	tobepellucid
Brave_Heart_Alway	xingchen77
HaotianYin	yinhaoti
wufangzhouzhou	naomiwufzz
bonnenut	Dee
星辰	xingchen77
@序	youxucoding
俨-zen	zenwangzy
komorebi	1973719588
xiaoranzife	FontEndArt
lucky_zourui	BlueRui
wxid_e52ejucgg5zt11	christ36
jy19990917	Serena9
kite	kite-fly6618
麻瓜	Magua-hub
Caso	kesucaso
LJJjiayouya	Jinjin680
nnnnn!	Nbambi
Brainlds	brainlds
骑士	JasonHe-WQ
后沿路	houyanlu
NoTurningBack	577961141
linjun	linjunhe
不思八九	Liuzt1025
linjun	linjunhe
cute.	yayabb（yaya-bb）
jaxvan	jax-van
小橙子	yikuanglancheng
小兔儿	竹林1110
Wayne	ha0cheng
正儿八经的lc	dzwhh
Eldin_juc	EldinZhou
HL3032635302	freedom0123
村子里	mo660
Bonnenut	Bonnenut
Xnw_ing	ViviXu-qiqi
sizeof	Size-of
PeteACD	zzq-666
BruceLee	BruceLeeQAQ
清冽似你	maqianxiong
Moon	MoonLee001
Bonnenut	Bonnenut
Omos	okbug
饼干	biscuit279
`

const unknowns = ['18273011839', '15396053927', 'hiklsabc', 'zz1194365836', 'guid_shin', 'elliot_zrj', 'wxid_e52ejucgg5zt11']
const users = {}
const lines = data.split(/\n/)
for (const line of lines) {
  const [wechat, github] = line.split(/\t/)
  if (!wechat || !github) continue
  if (unknowns.includes(wechat)) continue
  users[wechat] = github
}


exports.users = Object.values(users).map((v) => String.prototype.trim.call(v))
  .map((v) => String.prototype.toLocaleLowerCase.call(v))
