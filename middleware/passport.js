const fetch = require("node-fetch");
const { encrypt, decrypt } = require("../utils/crypto");
const { fail } = require("../utils/request");
const { secret, db, clientId } = require("../config/index");

module.exports = async function checkAuth(ctx, next) {
  if (!ctx.session) {
    ctx.session = {};
  }
  if (ctx.session.user) {
    await next();
  } else {
    // 1. 如果有 token ，则说明是之前种植过的，直接解析（如果是别人伪造的则会解析失败）
    const token = ctx.cookies.get("token");

    if (token) {
      const duserStr = decrypt(token);
      if (duserStr) {
        try {
          const duser = JSON.parse(duserStr);
          ctx.session.user = duser;
          await next();
          return;
        } catch (err) {
          console.log("token 解析失败:", err);
          return;
        }
      }
    }
    // 2. 如果没有 token，就必须有 code，因此这个时候需要拿 code 去 github 登录，取用户的信息。
    const code = ctx.query.code;
    if (!code) {
      ctx.body = fail({ message: "请先登录~", code: 91 });
      return;
    } else if (code.length !== 20) {
      ctx.body = fail({ message: "code 码无效，请重新登录", code: 92 });
      return;
    }
    try {
      // 3. 根据 code  获取用户信息
      const { access_token } = await fetch(
        `https://github.com/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${secret}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());

      const user = await fetch("https://api.github.com/user", {
        headers: {
          Accept: "application/json",
          Authorization: `token ${access_token}`,
        },
      }).then((res) => res.json());

      // user.login 存在表示登录成功
      if (user.login) {
        // 付费用户
        const u = {
          ...user,
          pay: !!db.find((q) => q.login === user.login),
        };
        // TODO: 如果不在组织中，自动邀请进 Github 组织
        // see #1 https://octokit.github.io/rest.js/v18#orgs-check-membership
        // see #2 https://github.com/octokit/octokit.js
        // see #3 https://github.com/thundergolfer/automated-github-organization-invites/blob/bb1bb3d42a330716f4dd5c49256245e4bde27489/web_app.rb
        ctx.session.user = u;
        ctx.cookies.set(
          "token",
          encrypt(Buffer.from(JSON.stringify(u), "utf8")),
          {
            // domain: ".leetcode-solution.cn",
            // path: "/",
            // secure: true,
            // sameSite: "none",
            httpOnly: true,
            expires: new Date(24 * 60 * 60 * 1000 + Date.now()), // 一天后过期，后期考虑延长时间
          }
        );
      }

      await next();
    } catch (err) {
      // 4. 登录过程中出错，会跳转至此
      ctx.body = fail({ message: "登录失败， code 码已失效~", code: 93 });
    }
  }
};
