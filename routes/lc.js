
const router = require("koa-router")();
const fetch = require("node-fetch");
const {
    leetcodeConfig: {
        baseUrl,
        submitUrl,
        _91UsernameCookieName,
        _91PwdCookieName,
        lcSeesionCookieName,
        lcCsrftokenCookieName
    }
} = require('../config/index')
const { success, fail } = require('../utils/request')
const { encrypt, decrypt } = require('../utils/crypto')
const { set91Cookie, getLcRequestData } = require('./utils')

// 用户上传lc的账号名与密码
router.post('/api/v1/lc/submitLcAccount', async (ctx) => {
    const { login, password } = ctx.request.body
    // 先提交给lc，账号密码是否正确
    let result = await getLcRequestData({login, password})
    if(result.success){
        // 密码正确时，对密码进行加密
        let encryptPwd = encrypt(password)
        // 将加密后的密文 以及 sessionId、 csrftoken 写入cookie中
        sessionId = result[lcSeesionCookieName]
        csrftoken = result[lcCsrftokenCookieName]
        set91Cookie({
            [_91UsernameCookieName]: login,
            [_91PwdCookieName]: encryptPwd,
            [lcSeesionCookieName]: sessionId,
            [lcCsrftokenCookieName]: csrftoken,
        }, ctx)
        ctx.body = success({isLogin: true})
    } else {
        ctx.body = fail({code: 302, message: '提交失败' })
    }
});

// 用户提交题解
router.post('/api/v1/lc/submitCode', async (ctx, next) => {
    // 先校验cookie中是否有账号密码，没有就让用户先输入再提交
    const userName = ctx.cookies.get(_91UsernameCookieName)
    const passwd = ctx.cookies.get(_91PwdCookieName)
    if(!userName || !passwd){
        return ctx.response.body = fail({
            code: 403,
            message: "请先提交账号名与密码后再提交"
        });
    }

    // 如果这俩cookie有一个不存在就提示用户重新提交一遍lc的账号密码
    let sessionId = ctx.cookies.get(lcSeesionCookieName)
    let csrftoken = ctx.cookies.get(lcCsrftokenCookieName)
    let requestData = {
        [lcSeesionCookieName]: sessionId,
        [lcCsrftokenCookieName]: csrftoken
    }
    if(!sessionId || !csrftoken){
        return ctx.response.body = fail({
            code: 403,
            message: "提交失败，请重新输入账号名与密码后再提交！"
        });
    }

    // 先试着用cookie中的旧csrftoken提交下看是否成功
    const problemData = formateSubmitData(ctx.request.body)
    let result = (await submitSolution(problemData, requestData)) || {}
    if(result.success){
        return ctx.body = success(result.data)
    }

    // 如果403就用账号密码获取最新csrftoken,再提交一遍
    if(result.statusCode === 403){
        // 获取最新csrftoken
        let newRequestData = await getLatestLcRequestData(ctx)
        if(!newRequestData.success){
            return ctx.response.body = fail({
                code: 403,
                message: newRequestData.message || "提交失败，请重新输入账号名与密码后再提交！"
            });
        }
        // 更新下91的cookie
        set91Cookie(newRequestData, ctx)

        // 再提交一遍
        let retryResult = await submitSolution(problemData, newRequestData)
        if(retryResult.success){
            return ctx.body = success(retryResult.data)
        }
    }

    // 如果还是失败，就提示用户重新输入账号名与密码
    return ctx.response.body = fail({
        code: 403,
        message: "提交失败，请重新输入账号名与密码后再提交！"
    });
});

// 获取最新的的向leetcode发送请求的必要参数
async function getLatestLcRequestData(ctx){
    const userName = ctx.cookies.get(_91UsernameCookieName)
    const encryptPassword = ctx.cookies.get(_91PwdCookieName)
    const password = decrypt(encryptPassword)
    return await getLcRequestData({
        [_91UsernameCookieName]: userName,
        [_91PwdCookieName]: password
    })
}

async function submitSolution(problem, requestData){
    let statusCode = 403
    const url = submitUrl.replace('$slug', problem.slug);
    const sessionId = requestData[lcSeesionCookieName]
    const csrftoken = requestData[lcCsrftokenCookieName]
    const cookie = `${lcSeesionCookieName}=${sessionId};${lcCsrftokenCookieName}=${csrftoken};`
    const opt = {
        method: 'POST',
        headers: {
            Origin: baseUrl,
            Referer: problem.link,
            Cookie: cookie,
            'X-csrftoken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        _delay: 1,// in seconds
        body: JSON.stringify(problem || {})
    }
    console.log(opt)
    const result = await fetch(url, opt).then((res) => {
        statusCode = res.status
        return res.json()
    });
    return {
        success: !!result,
        statusCode: statusCode,
        data: result
    }
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
