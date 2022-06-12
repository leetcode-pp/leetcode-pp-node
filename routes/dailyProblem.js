const router = require("koa-router")();
const solutions = require("../static/solution/solutions.json");
const { decrypt } = require("../utils/crypto");
const mySolutions = require("../static/my/solutions.json");
const users = require("../static/users/index.json");
const { success, fail } = require("../utils/request");
const { getDay } = require("../utils/day");
const { startTime } = require("../config/index");

const A = [];
for (const [login, solution] of Object.entries(mySolutions)) {
	if (!users[login]) {
		continue;
	}
	const { bio, name, noCheck, allCheck, avatar_url, card } = users[login];
	A.push({
		count: solution.filter((s) => s && s.onTime).length,
		bio,
		name,
		login,
		noCheck,
		avatar_url,
		card,
		allCheck,
	});
}

const rankings = A.sort((a, b) => b.count - a.count);

for (let i = 0; i < rankings.length; i++) {
	if (i > 0 && rankings[i].count === rankings[i - 1].count) {
		rankings[i].rank = rankings[i - 1].rank;
	} else {
		rankings[i].rank = i + 1;
	}
}

router.get(
	"/api/v1/daily-problem",
	async (ctx) => {
		if (ctx.query.date && ctx.query.date > new Date().getTime()) {
			// 活动没有开始，给大家一个体验版本(两道题)
			if ((new Date().getTime() - startTime) < 0) {
				ctx.body = success(solutions[((Math.random() * 3) + 1) >>> 0]);
			} else {
				ctx.body = fail({ message: "仅能查询今天之前的题目" });
			}
		} else {
			const date = getDay(ctx.query.date || new Date().getTime()); // 用户指定的实际
			if (date in solutions) {
				ctx.body = success(solutions[date]);
			} else if (date > 91) {
				ctx.body =
					fail({ message: "本期活动已经结束，请耐心等待下期~ 活动开始报名会第一时间在公众号《力扣加加》同步!" });
			} else {
				// ctx.body = fail({
				//   message: "当前暂时没有每日一题，请联系当前讲师进行处理~",
				// });
				// 预打卡
				ctx.body =
					success({
						title: "预打卡",
						link: "此处正常应该是链接",
						description: "让大家熟悉如何打卡",
						day: 0,
						tags: ["预打卡"],
					});
			}
		}
	},
);

router.get(
	"/api/v1/daily-problem/solution",
	async (ctx) => {
		// 逻辑和上面类似，只是返回值为 Markdown
		const currentDay = getDay(new Date().getTime());
		const day = ctx.query.day || currentDay; // 用户指定的实际第几天（注意这里的 day 是数字，含义为第 day 天）
		if (day > currentDay) {
			ctx.body = fail({ message: "仅支持查询历史官方题解" });
			return;
		}
		if (day in solutions) {
			ctx.body = success({ content: decrypt(solutions[day].content) });
		} else {
			ctx.body = fail({ message: "当前暂时没有官方题解，请联系当前讲师进行处理~" });
		}
	},
);

router.get(
	"/api/v1/daily-problem/ranking",
	async (ctx) => {
		ctx.body = success(rankings);
	},
);

module.exports = router;
