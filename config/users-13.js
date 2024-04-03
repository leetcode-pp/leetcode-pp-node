const data = `
ren_FEE	hillsonziqiu
GenXiao0824	atom-set
io123456789987654321	Alexzhang-Mini
wxid_z2pbolnax5e112	xy147
yunshen-1995	zhangjinzhepro
GreyQT	GReyQT
Neary23	20donkey
saniededka	coderXiaowq
AnonymousBit	zhiyuanpeng
andynick1983	smallppgirl
yunshen-1995	zhangjinzhepro
lucksstarr	Dtjk
xiaohanliu0730	xil324
hjqeasymoneysniper	Hawkins-hjq
border_g	borderGong
shirlin19	Junru281
LeoG0922	RocJeMaintiendrai
Brainlds	brainlds
shangzq9631	CathyShang
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
