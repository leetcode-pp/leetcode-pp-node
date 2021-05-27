// 提交题解
const router = require("koa-router")();
const request = require('request');

const {
    set91Cookie,
    getLeetcodeCookie,
    success,
    fail
} = require('./utils')
const { submitUrl, baseUrl } = require('../config/index')

// 设置响应头
router.options('/submitCode', async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
	ctx.set("Access-Control-Allow-Credentials", "true");
	ctx.set("Access-Control-Allow-Methods", "*");
	ctx.set("Access-Control-Allow-Headers", "Content-Type,Access-Token");
	ctx.set("Access-Control-Expose-Headers", "*");
    ctx.body = 200;
    ctx.status = 200;
});

// 设置响应头
router.post('/submitCode', async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
	ctx.set("Access-Control-Allow-Credentials", "true");
	ctx.set("Access-Control-Allow-Methods", "*");
	ctx.set("Access-Control-Allow-Headers", "Content-Type,Access-Token");
	ctx.set("Access-Control-Expose-Headers", "*");
    await next();
});


// 用户提交题解
// 先校验cookie中是否有账号密码，没有就让用户先输入再提交
router.post('/submitCode', async (ctx, next) => {
    const userName = ctx.cookies.get('login')
    const passwd = ctx.cookies.get('password')
    if(!userName || !passwd){
        return ctx.response.body = fail({
            message: "请先提交账号名与密码后再提交"
        });
    }
    await next();
});

// 先试着用cookie中的csrftoken提交下看是否成功，
router.post('/submitCode', async (ctx, next) => {
    const login = ctx.cookies.get('login')
    const password = ctx.cookies.get('password')
    let LEETCODE_SESSION = ctx.cookies.get('LEETCODE_SESSION')
    let csrftoken = ctx.cookies.get('csrftoken')
    const problemData = formateSubmitData(ctx.request.body)

    // 如果这俩cookie有一个不存在就拿账号密码再去lc请求一个新的
   if(!LEETCODE_SESSION || !csrftoken){
       const newCookie = await getLeetcodeCookie({login, password})
       LEETCODE_SESSION = newCookie.LEETCODE_SESSION
       csrftoken = newCookie.csrftoken
        set91Cookie({
            csrftoken,
            LEETCODE_SESSION
        }, ctx)
   }

    // 先试着用cookie中的csrftoken提交下看是否成功，
    let result = await submitSolution(problemData, ctx)
    if(result.success){
        set91Cookie({
            csrftoken,
            LEETCODE_SESSION
        }, ctx)
        return ctx.body = success(result)
    }

    // 如果403就用账号密码获取最新csrftoken,再提交一遍
    let { statusCode } = result
    if(statusCode === 403){
        const newCookie = await getLeetcodeCookie({login, password})
        LEETCODE_SESSION = newCookie.LEETCODE_SESSION
        csrftoken = newCookie.csrftoken

        let retryResult = await submitSolution(problemData, ctx)
        if(retryResult.success){
            set91Cookie({
                csrftoken,
                LEETCODE_SESSION
            }, ctx)
            return ctx.body = success(retryResult)
        }
    }

    // 如果还是失败，就提示用户重新输入账号名与密码
    return ctx.response.body = fail({
        message: "提交失败，请重新输入账号名与密码后再提交！"
    });
});

function submitSolution(problem, ctx){
    const LEETCODE_SESSION = ctx.cookies.get('LEETCODE_SESSION')
    const csrftoken = ctx.cookies.get('csrftoken')
    const opts = {}
    opts.method = 'POST';
    opts.url = submitUrl.replace('$slug', problem.slug);
    opts.headers = {};
    opts.headers.Origin = baseUrl;
    opts.headers.Referer = problem.link;
	opts.headers.Cookie = `LEETCODE_SESSION=${LEETCODE_SESSION};csrftoken=${csrftoken};`;
	opts.headers['X-csrftoken'] = csrftoken;
	opts.headers['X-Requested-With'] = 'XMLHttpRequest';
    opts.json = true;
    opts._delay = 1; // in seconds
    opts.body = problem || {};

    return new Promise(res => {
        request(opts, function(e, resp, body) {
            if(e){
                return res({success: false, statusCode: resp.statusCode})
            }
            body.success = true
            body.statusCode = resp.statusCode
            return res(body)
        });
    })
}

// 整理提交题解时的数据格式
function formateSubmitData(problem = {}){
    return Object.assign(problem, {
        judge_type: 'large',
        lang:        problem.lang,
        question_id: parseInt(problem.id, 10),
        test_mode:   false,
        typed_code:  problem.code
    })
}

module.exports = router;
