const router = require("koa-router")();
const lectures = require("../static/lectures/lectures-by-category.json");
const lecturesId = require("../static/lectures/lectures-by-id.json");
const { decrypt } = require("../utils/crypto");
const { success, fail } = require("../utils/request");

router.get("/api/v1/lectures/advance", async (ctx) => {
  ctx.body = {
    success: true,
    code: 0,
    data: Object.values(lectures.advance),
  };
});

router.get("/api/v1/lectures/topic", async (ctx) => {
  ctx.body = {
    success: true,
    code: 0,
    data: Object.values(lectures.topic),
  };
});

router.get("/api/v1/lectures/basic", async (ctx) => {
  ctx.body = {
    success: true,
    code: 0,
    data: Object.values(lectures.basic),
  };
});

router.get("/api/v1/lectures/intro", async (ctx) => {
  ctx.body = {
    success: true,
    code: 0,
    data: Object.values(lectures.intro),
  };
});

router.get("/api/v1/lectures/:id", async (ctx) => {
  const id = ctx.params.id;
  const lecture = lecturesId[id];
  if (!lecture) {
    ctx.body = fail({ message: "讲义不存在" });
  } else {
    ctx.body = success({
      ...lecture,
      content: decrypt(lecture.content),
    });
  }
});

module.exports = router;
