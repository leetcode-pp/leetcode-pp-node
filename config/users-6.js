function join(s) {
  return s
    .split(/\n/)
    .filter(Boolean)
    .map((v) => String.prototype.trim.call(v))
    .map((v) => String.prototype.toLocaleLowerCase.call(v));
}

exports.users = join(`
azl397985856
yu1252068782
shawn03w
gmh-123456
13438128255
13051561825
iambigchen0
13124217471
Tiquiero1122
lyf0260
linrAx
Myosotis111
zpy734009760
lmx55011
acelinguo
zsh0139okok
Myosotis111
ZHU573511441
baomihuahua123
sizeof8
CharlesTang
abcddian
onlyellow
yiming908141467
TimmmYoung
vivo-boy
wangxinpei1992
NYBO08
BeBraveBeCurious
a15815287136
mingpengfei5
hzg13527566227
lihongyin123
  `);
