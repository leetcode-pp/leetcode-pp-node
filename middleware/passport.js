const fetch = require("node-fetch");
const { encrypt, decrypt } = require("../utils/crypto");

const secret = process.env.secret;

const clientId = "c16b80e7b58a5a007157";
const db = [
  {
    login: "azl397985856",
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
            ctx.body = duser;
            return;
          }
        } catch (err) {
          console.log("token 解析失败:", err);
        }
      }
    }
    const code = ctx.query.code;
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

    await next();
  }
};
