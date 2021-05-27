// 用户上传账号名与密码
const router = require("koa-router")();

const {
    set91Cookie,
    getLeetcodeCookie,
    success,
    fail
} = require('./utils')

// 设置响应头
router.options('/submitLcAccount', async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
	ctx.set("Access-Control-Allow-Credentials", "true");
	ctx.set("Access-Control-Allow-Methods", "*");
	ctx.set("Access-Control-Allow-Headers", "Content-Type,Access-Token");
	ctx.set("Access-Control-Expose-Headers", "*");
    ctx.body = 200; 
    ctx.status = 200;
});

// 设置响应头
router.post('/submitLcAccount', async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
	ctx.set("Access-Control-Allow-Credentials", "true");
	ctx.set("Access-Control-Allow-Methods", "*");
	ctx.set("Access-Control-Allow-Headers", "Content-Type,Access-Token");
	ctx.set("Access-Control-Expose-Headers", "*");
    await next();
});

// 先提交给lc，账号密码是否正确
router.post('/submitLcAccount', async (ctx, next) => {
    const {login, password} = ctx.request.body
    let result = await getLeetcodeCookie({login, password})
    if(result.success){
        // todo密码正确时，对密码进行加密

        // 将加密后的密文 以及 sessionId、 csrftoken写入cookie中
        LEETCODE_SESSION = result.LEETCODE_SESSION
        csrftoken = result.csrftoken
        set91Cookie({
            login,
            password,
            csrftoken,
            LEETCODE_SESSION
        }, ctx)
        ctx.body = success({isLogin: true})
    } else {
        ctx.body = fail()
    }
});

module.exports = router;