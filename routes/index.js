const fetch = require("node-fetch");
const router = require("koa-router")();

const clientId = "c16b80e7b58a5a007157";
const clientSecret = process.env.secret;

const db = [
  {
    login: "azl397985856",
  },
];

router.get("/", async (ctx) => {
  await ctx.render("index", {
    title: "欢迎来到 91 天学算法~",
  });
});

router.get("/api/v1/user", async (ctx) => {
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
  if (db.find((q) => q.login === login)) {
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
