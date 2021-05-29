const fetch = require("node-fetch");
const request = require("request");
const {
  leetcodeConfig: {
    baseUrl,
    loginUrl,
    _91UsernameCookieName, // 在91网站中存lc用户名的cookie的键名
    _91PwdCookieName, // 在91网站中存lc密码的cookie的键名
    lcSeesionCookieName, // lc存seesionid的 cookie键名
    lcCsrftokenCookieName, // lc存csrf的 cookie键名
  },
} = require("../config/index");

// 设置91的cookie并且过期时间为一年
function set91Cookie(data, ctx) {
  for (let key in data) {
    ctx.cookies.set(key, data[key], {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: false,
    });
  }
}

// 从leetcode的请求中获取cookie值
function getCookieFromLc(resp, key) {
  const cookies = resp.headers["set-cookie"];
  if (!cookies) return null;

  for (let i = 0; i < cookies.length; ++i) {
    const sections = cookies[i].split(";");
    for (let j = 0; j < sections.length; ++j) {
      const kv = sections[j].trim().split("=");
      if (kv[0] === key) return kv[1];
    }
  }
  return null;
}

// 从leetcode中获取 发送请求的必要参数 LEETCODE_SESSION、csrftoken
async function getLcRequestData(options) {
  const opt = {
    url: loginUrl,
    credentials: "include",
    headers: {
      credentials: "include",
      Origin: baseUrl,
      Referer: loginUrl,
    },
    form: {
      [_91UsernameCookieName]: options[_91UsernameCookieName],
      [_91PwdCookieName]: options[_91PwdCookieName],
    },
  };
  return await new Promise((resolve) => {
    request.post(opt, function (e, resp, body) {
      if (resp.statusCode !== 302) {
        return resolve({ success: false, message: "pwd invaid" });
      }
      sessionId = getCookieFromLc(resp, lcSeesionCookieName);
      csrftoken = getCookieFromLc(resp, lcCsrftokenCookieName);
      resolve({
        success: true,
        [lcSeesionCookieName]: sessionId,
        [lcCsrftokenCookieName]: csrftoken,
      });
    });
  });
}

module.exports = {
  set91Cookie,
  getLcRequestData,
};
