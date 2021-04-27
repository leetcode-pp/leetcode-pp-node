const router = require("koa-router")();
const lectures = require("../static/lectures/lectures.json");
const { decrypt } = require("../utils/crypto");
const { success, fail } = require("../utils/request");

router.get("/api/v1/lectures/basic", async (ctx) => {
  ctx.body = {
    success: true,
    code: 0,
    data: [
      {
        title: "01. 数组，栈，队列",
        desc: "主要介绍了数组，栈，队列基本原理，基础 API 以及其对应的复杂度",
        image: {
          url:
            "https://tva1.sinaimg.cn/large/007S8ZIlly1gfbikq9ipmj30cd0a73yp.jpg",
          alt: "栈",
        },
        id: 1,
      },
    ],
  };
});

router.get("/api/v1/lectures/basic/:id", async (ctx) => {
  const id = ctx.params.id;
  const lecture = lectures[id];
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
