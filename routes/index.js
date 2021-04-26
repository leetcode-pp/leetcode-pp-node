const fetch = require("node-fetch");
const router = require("koa-router")();

const clientId = "c16b80e7b58a5a007157";
const clientSecret = process.env.secret;

const db = [
  {
    login: "azl397985856",
  },
];

const loginedUsers = Set();

router.get("/", async (ctx) => {
  await ctx.render("index", {
    title: "欢迎来到 91 天学算法~",
  });
});

module.exports = router;
