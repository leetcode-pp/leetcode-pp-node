const router = require("koa-router")();
const {
  submitSolution,
  getLCProblem,
  getLcRequestData,
} = require("./lc.helper.js");
const {
  leetcodeConfig: {
    _91UsernameCookieName,
    _91PwdCookieName,
    lcSeesionCookieName,
    lcCsrftokenCookieName,
  },
} = require("../config/index");
const { success, fail } = require("../utils/request");
const { encrypt } = require("../utils/crypto");

// 用户上传lc的账号名与密码
router.post("/api/v1/lc/submitLcAccount", async (ctx) => {
  // 先提交给lc，账号密码是否正确
  const { login, password } = ctx.request.body;
  let result = await getLcRequestData({ login, password });
  if (result.success) {
    let encryptPwd = encrypt(password);
    ctx.body = success({
      isLogin: true,
      [_91UsernameCookieName]: login,
      [_91PwdCookieName]: encryptPwd,
      [lcSeesionCookieName]: result[lcSeesionCookieName],
      [lcCsrftokenCookieName]: result[lcCsrftokenCookieName],
    });
  } else {
    ctx.body = fail({ code: 302, message: result.message || "登录失败" });
  }
});

// 用户提交题解
router.post("/api/v1/lc/submitCode", async (ctx, next) => {
  // 前置数据校验
  const {
    login,
    password,
    [lcSeesionCookieName.toLowerCase()]: sessionId,
    [lcCsrftokenCookieName.toLowerCase()]: csrftoken,
  } = ctx.request.headers;
  // 如果有一个不存在，就提示用户重新提交一遍lc的账号密码
  if (!login || !password || !sessionId || !csrftoken) {
    return (ctx.response.body = fail({
      code: 403,
      message: "缺少字段或者cookie已过期，请重新提交账号名与密码后再提交",
    }));
  }
  await next();
});

async function submit({ sessionId, csrftoken, problem }) {
  const sc = {
    [lcSeesionCookieName]: sessionId,
    [lcCsrftokenCookieName]: csrftoken,
  };
  return submitSolution(problem, sc) || {};
}

// 题解提交逻辑
router.post("/api/v1/lc/submitCode", async (ctx) => {
  const {
    login,
    password,
    [lcSeesionCookieName.toLowerCase()]: sessionId,
    [lcCsrftokenCookieName.toLowerCase()]: csrftoken,
  } = ctx.request.headers;

  const account = {
    login,
    password,
  };
  const problem = getLCProblem(ctx.request.body);
  // 1. 先试着用旧值提交下看是否成功
  const result = await submit({
    login,
    password,
    sessionId,
    csrftoken,
    problem,
  });

  if (result.success && result.data.submission_id) {
    return (ctx.response.body = success(
      Object.assign(sc, result.data, account)
    ));
  }

  // 2. 如果403就用账号密码获取最新csrftoken,再提交一遍
  if (result.statusCode === 403) {
    console.log(result);
    return (ctx.response.body = fail({
      code: 403,
      message: result.message || "提交失败，请重新输入账号名与密码后再提交！",
    }));
  } else {
    return (ctx.response.body = fail({
      code: 500,
      message:
        result?.error?.message || "服务器异常，请联系管理员 lucifer 处理",
    }));
  }
});

module.exports = router;
