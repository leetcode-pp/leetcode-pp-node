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

router.get("/api/v1/lectures/intro", async (ctx) => {
  ctx.body = {
    success: true,
    code: 0,
    data: [
      {
        title: "01. 数据结构与算法概述",
        desc: "主要介绍了数据结构与算法是在研究什么",
        image: {
          url:
            "https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603338453129-image.png",
          alt: "数据结构总览",
        },
        id: -1,
      },
      {
        title: "02. 如何衡量算法的性能",
        desc: "介绍复杂度",
        image: {
          url:
            "https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603339778900-image.png",
          alt: "复杂度",
        },
        id: -2,
      },
    ],
  };
});

router.get("/api/v1/lectures/:id", async (ctx) => {
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
