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
