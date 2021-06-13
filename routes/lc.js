const router = require("koa-router")();
const fetch = require("node-fetch");
const request = require('request');
const {
    leetcodeConfig: {
        baseUrl,
        loginUrl,
        submitUrl,
        _91UsernameCookieName,
        _91PwdCookieName,
        lcSeesionCookieName,
        lcCsrftokenCookieName
    }
} = require('../config/index')
const { success, fail } = require('../utils/request')
const { encrypt, decrypt } = require('../utils/crypto')

// 用户上传lc的账号名与密码
router.post('/api/v1/lc/submitLcAccount', async (ctx) => {
    // 先提交给lc，账号密码是否正确
    const { login, password } = ctx.request.body
    let result = await getLcRequestData({login, password})
    if(result.success){
        let encryptPwd = encrypt(password)
        ctx.body = success({
            isLogin: true,
            [_91UsernameCookieName]: login,
            [_91PwdCookieName]: encryptPwd,
            [lcSeesionCookieName]: result[lcSeesionCookieName],
            [lcCsrftokenCookieName]: result[lcCsrftokenCookieName],
        })
    } else {
        ctx.body = fail({code: 302, message: result.message || '登录失败' })
    }
});

// 用户提交题解
// 前置数据校验
router.post('/api/v1/lc/submitCode', async (ctx, next) => {
    const {
        login,
        password,
        [lcSeesionCookieName.toLowerCase()]: sessionId,
        [lcCsrftokenCookieName.toLowerCase()]: csrftoken
    } = ctx.request.headers
    // 如果有一个不存在，就提示用户重新提交一遍lc的账号密码
    if(!login || !password || !sessionId || !csrftoken){
        return ctx.response.body = fail({
            code: 403,
            message: "缺少字段或者cookie已过期，请重新提交账号名与密码后再提交"
        });
    }
    await next()
})

// 题解提交逻辑
router.post('/api/v1/lc/submitCode', async (ctx) => {
    const {
        login,
        password,
        [lcSeesionCookieName.toLowerCase()]: sessionId,
        [lcCsrftokenCookieName.toLowerCase()]: csrftoken
    } = ctx.request.headers
    const lcAccountData = {
        login,
        password,
    }

    // 先试着用旧值提交下看是否成功
    const problemData = formateSubmitData(ctx.request.body)
    let requestData = {
        [lcSeesionCookieName]: sessionId,
        [lcCsrftokenCookieName]: csrftoken
    }
    let result = (await submitSolution(problemData, requestData)) || {}
    if(result.success && result.data.submission_id){
        return ctx.response.body = success(Object.assign(requestData, result.data, lcAccountData))
    }

    // 如果403就用账号密码获取最新csrftoken,再提交一遍
    if(result.statusCode === 403){
        const decryPwd = decrypt(password)
        let newRequestData = await getLcRequestData({
            [_91UsernameCookieName]: login,
            [_91PwdCookieName]: decryPwd
        })
        if(!newRequestData.success){
            return ctx.response.body = fail({
                code: 403,
                message: newRequestData.message || "提交失败，请重新输入账号名与密码后再提交！"
            });
        }
        let retryResult = await submitSolution(problemData, newRequestData)
        if(retryResult.success && retryResult.data.submission_id){
            return ctx.body = success(Object.assign(newRequestData, retryResult.data, lcAccountData))
        }
    }
    return ctx.response.body = fail({
        code: 403,
        message: "提交失败，请重新输入账号名与密码后再提交！"
    });
});

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
        test_mode:   false,
        typed_code:  problem.code
    })
}

// 从leetcode的请求中获取cookie值
function getCookieFromLc(resp, key) {
    const cookies = resp.headers['set-cookie'];
    if (!cookies) return null;

    for (let i = 0; i < cookies.length; ++i) {
        const sections = cookies[i].split(';');
        for (let j = 0; j < sections.length; ++j) {
            const kv = sections[j].trim().split('=');
            if (kv[0] === key) return kv[1];
        }
    }
    return null;
};

// 从leetcode中获取 发送请求的必要参数 LEETCODE_SESSION、csrftoken
async function getLcRequestData(options){
    const opt = {
        url: loginUrl,
        credentials: 'include',
        headers: {
            credentials: 'include',
            Origin:  baseUrl,
            Referer: loginUrl,
        },
        form: {
            [_91UsernameCookieName]: options[_91UsernameCookieName],
            [_91PwdCookieName]: options[_91PwdCookieName]
        }
    }
    return new Promise(resolve => {
        request.post(opt, function(e, resp, body) {
            if (resp.statusCode !== 302) {
                return resolve({success: false, message: 'pwd invaid'})
            }
            sessionId = getCookieFromLc(resp, lcSeesionCookieName);
            csrftoken = getCookieFromLc(resp, lcCsrftokenCookieName);
            resolve({
                success: true,
                [lcSeesionCookieName]: sessionId,
                [lcCsrftokenCookieName]:csrftoken
            })
        });
    })
}

module.exports = router;
