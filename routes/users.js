const router = require("koa-router")();
const fetch = require("node-fetch");
const crypto = require("crypto");

const secret = process.env.secret;

const clientId = "c16b80e7b58a5a007157";
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

const db = [
  {
    login: "azl397985856",
  },
];

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secret.slice(0, 32), iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString("hex");
}

function decrypt(content) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secret.slice(0, 32),
    Buffer.from(iv.toString("hex"), "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
}

router.get("/api/v1/user", async (ctx) => {
  const token = ctx.cookies.get("token");

  if (token) {
    const duserStr = decrypt(token);
    if (duserStr) {
      const duser = JSON.parse(duserStr);
      // console.log(duser);
      if (db.find((q) => q.login === duser.login)) {
        ctx.body = duser;
        return;
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

  if (db.find((q) => q.login === user.login)) {
    ctx.cookies.set("token", encrypt(JSON.stringify(user)), {
      httpOnly: false,
      expires: new Date(24 * 60 * 60 * 1000 + Date.now()),
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
