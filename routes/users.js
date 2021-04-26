const router = require("koa-router")();
const fetch = require("node-fetch");
const crypto = require("crypto");

const secret = process.env.secret;

const clientId = "c16b80e7b58a5a007157";
const clientSecret = process.env.secret;

const db = [
  {
    login: "azl397985856",
  },
];

function encrypt(str) {
  const cipher = crypto.createCipheriv(
    "aes192",
    crypto.generateLegacyKey("aes192", secret)
  );
  let enc = cipher.update(str, "utf8", "hex"); //编码方式从utf-8转为hex;
  enc += cipher.final("hex"); //编码方式从转为hex;
  return enc;
}

function decrypt(str) {
  const decipher = crypto.createDecipheriv(
    "aes192",
    crypto.generateLegacyKey("aes192", secret)
  );
  let dec = decipher.update(str, "hex", "utf8"); //编码方式从hex转为utf-8;
  dec += decipher.final("utf8"); //编码方式从utf-8;
  return dec;
}

router.get("/api/v1/user", async (ctx) => {
  const token = ctx.cookies.get("token");

  if (token) {
    const duser = decrypt(token);
    if (db.find((q) => q.login === duser.login)) return duser;
  }
  const code = ctx.query.code;
  const { access_token } = await fetch(
    `https://github.com/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
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

  if (db.find((q) => q.login === user.login)) {
    ctx.cookies.set("token", encrypt(JSON.stringify(user)), {
      httpOnly: false,
      expires: 24 * 60 * 60 * 1000 + Date.now(),
    });
    ctx.body = {
      ...user,
      pay: true,
    };
  } else {
    ctx.body = {
      ...user,
      pay: false,
    };
  }
});

module.exports = router;
