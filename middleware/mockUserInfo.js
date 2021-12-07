// const { decrypt } = require("../utils/crypto");
const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
module.exports = ({ whitelist = [] }) =>
  async function checkAuth(ctx, next) {
    // await sleep(3000);
    // throw new Error('意料之内')
    if (!ctx.session) {
      ctx.session = {};
    }
    ctx.session.user = {
      // login: "Zz10044",
      login: "zhangzz2015",
      // login: "wangzehan123",
      // login: "rfhklwt",
      // login: "azl397985856",
      avatar_url: "https://avatars.githubusercontent.com/u/12479470?v=4",
      name: "lucifer",
      pay: true
    };

    await next();
  };
