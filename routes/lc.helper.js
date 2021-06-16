const fetch = require("node-fetch");
const request = require("request");
const {
  leetcodeConfig: {
    baseUrl,
    loginUrl,
    submitUrl,
    _91UsernameCookieName,
    _91PwdCookieName,
    lcSeesionCookieName,
    lcCsrftokenCookieName,
  },
} = require("../config/index");

const out = {};

out.submitSolution = async function submitSolution(problem, sc) {
  let statusCode = 500;
  const url = submitUrl.replace("$slug", problem.slug);
  const sessionId = sc[lcSeesionCookieName];
  const csrftoken = sc[lcCsrftokenCookieName];
  const cookie = `${lcSeesionCookieName}=${sessionId};${lcCsrftokenCookieName}=${csrftoken};`;
  const opt = {
    method: "POST",
    headers: {
      Origin: baseUrl,
      Referer: problem.link,
      Cookie: cookie,
      "X-csrftoken": csrftoken,
      "X-Requested-With": "XMLHttpRequest",
    },
    json: true,
    _delay: 1, // in seconds
    body: JSON.stringify(problem || {}),
  };

  try {
    const result = await fetch(url, opt).then((res) => {
      statusCode = res.status;
      return res.json();
    });

    return {
      success: !!result,
      statusCode,
      data: result,
    };
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
      status: 500,
      error: err,
    };
  }
};

// 整理提交题解时的数据格式
out.getLCProblem = function getLCProblem(problem = {}) {
  return Object.assign(problem, {
    judge_type: "large",
    lang: problem.lang,
    test_mode: false,
    typed_code: problem.code,
  });
};

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
out.getLcRequestData = async function getLcRequestData(options) {
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
  return new Promise((resolve) => {
    request.post(opt, function (err, resp, body) {
      if (err) console.log("rrrrrr", err);
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
};

module.exports = out;
