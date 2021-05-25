module.exports = ({ whitelist = [] }) =>
  async function checkAuth(ctx, next) {
    if (!ctx.session) {
      ctx.session = {};
    }
    ctx.session.user = {
      // login: "lilyzhaoyilu",
      // login: "zliu1413",
      login: "rfhklwt",
      // login: "azl397985856",
      avatar_url: "https://avatars.githubusercontent.com/u/12479470?v=4",
      name: "lucifer",
      pay: true,
    };

    await next();
  };
