const data = `
liuhongyi096522	leohongyi
csyuu3	yuetong3yu
DM1132961804	DMax1314
16602112714	xy147
kizibai	baiqz
zwx_19922620402	wutXuan
ygjpglz	shuyuanzhang118
lmw6412036	lmw6412036
小小郭	guowei0223
passengerses	passengersa
kitkwanL	leungogogo
jeffery84115	haoyuliaocurb
ariana0409	Ariana850409
wxid_9c2wke127hnl12	zechengze
wuchang_very_nice	falsity
WWB020808	Mr-Kient
16602112714	xy147
wxid_xp7r2j7afs0322	stonehl
gjwang0856	gjwang224
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
  // "16602112714",
  // "wxid_rdu0te34117m22",
  // "aneureka2",
  "wang18804001869",
  // "16602112714",
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
