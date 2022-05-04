const router = require("koa-router")();
const meta = require("../static/meta.json");
const { success } = require("../utils/request");

router.get(
	"/api/v1/meta",
	async (ctx) => {
		ctx.body = success(meta);
	},
);

module.exports = router;
