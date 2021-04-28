const fetch = require("node-fetch");
const { encrypt, decrypt } = require("../utils/crypto");
const { fail } = require("../utils/request");

const secret = process.env.secret;

const clientId = "c16b80e7b58a5a007157";
const db = [
  {
    login: "azl397985856",
  },
  {
    login: "Yueqi-19",
  },
];

module.exports = async function checkAuth(ctx, next) {
  if (!ctx.session) {
    ctx.session = {};
  }
  if (ctx.session.user) {
    await next();
  } else {
    const token = ctx.cookies.get("token");

    if (token) {
      const duserStr = decrypt(token);
      if (duserStr) {
        try {
          const duser = JSON.parse(duserStr);

          if (db.find((q) => q.login === duser.login)) {
            ctx.session.user = duser;
            await next();
            return;
          }
        } catch (err) {
          console.log("token 解析失败:", err);
          return;
        }
      }
    }
    const code = ctx.query.code;
    if (!code) {
      ctx.body = fail({ message: "请先登录~", code: 91 });
      return;
    } else if (code.length !== 20) {
      ctx.body = fail({ message: "code 码无效，请重新登录", code: 92 });
      return;
    }
    const { access_token } = await fetch(
      `https://github.com/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${secret}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());
    if (!access_token) return;

    const user = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/json",
        Authorization: `token ${access_token}`,
      },
    }).then((res) => res.json());

    // user.login 存在表示登录成功
    if (user.login) {
      ctx.cookies.set(
        "token",
        encrypt(
          Buffer.from(
            JSON.stringify({
              ...user,
              pay: true,
            }),
            "utf8"
          )
        ),
        {
          httpOnly: false,
          expires: new Date(24 * 60 * 60 * 1000 + Date.now()),
        }
      );

      if (db.find((q) => q.login === user.login)) {
        ctx.session.user = {
          ...user,
          pay: true,
        };
      } else {
        ctx.session.user = {
          ...user,
          pay: false,
        };
      }
    }

    await next();
  }
};
