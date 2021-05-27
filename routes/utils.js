const request = require('request');
const { baseUrl, loginUrl } = require('../config/index')

// 设置cookie
function set91Cookie (data, ctx){
    for(let key in data){
        ctx.cookies.set(key, data[key], {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
    }
}

// 从leetcode的请求中获取cookie值
function getDataFromLcResponse(resp, key) {
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

// 发送一个登录请求，获取leetcode中 LEETCODE_SESSION、csrftoken两个cookie
function getLeetcodeCookie({login, password}){
    return new Promise((resolve, reject) => {
        // 先发前置请求获取csrftoken
		request(loginUrl, function(e, resp, body) {
			let csrftoken = getDataFromLcResponse(resp, 'csrftoken');
			let LEETCODE_SESSION
			const opts = {
				url: loginUrl,
				headers: {
					Origin:  baseUrl,
					Referer: loginUrl,
					Cookie:  `csrftoken=${csrftoken};`
				},
				form: {
					csrfmiddlewaretoken: csrftoken,
					login,
					password,
				}
			};

            // 再发一次请求获取csrftoken、LEETCODE_SESSION
			request.post(opts, function(e, resp, body) {
				if (resp.statusCode !== 302) {
                    return resolve({success: false, message: 'pwd invaid'})
                }
				LEETCODE_SESSION = getDataFromLcResponse(resp, 'LEETCODE_SESSION');
				csrftoken = getDataFromLcResponse(resp, 'csrftoken');
				resolve({
                    success: true,
                    LEETCODE_SESSION,
                    csrftoken
                })
			});
		});
	})
}

function success(data) {
    return {
        success: true,
        data,
    };
}

function fail({ message, code = 10001 }) {
    return {
        success: false,
        data: null,
        message,
        code,
    };
}
module.exports = {
    set91Cookie,
    getDataFromLcResponse,
    getLeetcodeCookie,
    success,
    fail
}
