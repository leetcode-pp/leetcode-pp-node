
function join(s) {
  return s
    .split(/\n/)
    .filter(Boolean)
    .map((v) => String.prototype.trim.call(v))
    .map((v) => String.prototype.toLocaleLowerCase.call(v));
}

exports.users = join(`
momomoi
kite-fly6618
Orangejuz
// liuguang520-lab:18273011839
EggEggLiu
carterrr
// Oision-hub:15396053927
dzwhh
physicshi
 flyzenr
zhou0425
testeducative
vuesch
flyzenr
mo660
youxucoding
BallerJay
raingolee
CQUTWANGHONG
bigboom666
ljq0226
hulichao
freedom0123
LannyX
Yongxi-Zhou
// zenwangzy:zenwangzy
ShirAdaOne
herbertpan
bolunzhang2021
Joewx21
yinhaoti
miss1
m908
AstrKing
Bonnenult
declan92
zzz607
xixiao51
SDUEricCheng
shawnhu23
Davont
lskong
dzwhh
HZHENGZHI
Magua-hub
shin-guid
1973719588
ljq0226
kbfx1234
AstrKing
Liuzt1025
taojin1992
ZacheryCao
zhiyuanpeng
W-Will
Geek-LX
// tobepellucid:elliot_zrj
xingchen77
yinhaoti
naomiwufzz
Dee
xingchen77
youxucoding
zenwangzy
1973719588
FontEndArt
BlueRui
// christ36:wxid_e52ejucgg5zt11
Serena9
kite-fly6618
Magua-hub
kesucaso
Jinjin680
Nbambi
brainlds
JasonHe-WQ
houyanlu
577961141
    `);
