const fs = require("fs");
const path = require("path");
const meta = require("../meta.json");
const { encrypt } = require("../../utils/crypto.js");

function merge(A, ...B) {
  if (B.length == 1) {
    return { ...A, ...B[0] };
  }
  return merge(merge(A, B[0]), ...B.slice(1));
}

const originalLectures = JSON.parse(
  fs.readFileSync(__dirname + "/lectures-by-category.json")
);

const lectures = {
  intro: {
    1000: {
      title: "00. 学前必读",
      desc: "活动的基本介绍以及大家需要准备的东西",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gvjurc1by8j60u012iaef02.jpg",
      },
      id: 1000,
    },
    1001: {
      title: "01. 数据结构与算法概述",
      desc: "主要介绍了数据结构与算法是在研究什么",
      image: {
        url: "https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603338453129-image.png",
      },
      id: 1001,
    },
    1002: {
      title: "02. 如何衡量算法的性能",
      desc: "介绍复杂度",
      image: {
        url: "https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603339778900-image.png",
      },
      id: 1002,
    },
    1003: {
      title: "03. 如何使用好仓库",
      desc: "仓库使用指南",
      image: {
        url: "https://tva1.sinaimg.cn/large/008eGmZEly1gomv0rscf4j31c00u0adk.jpg",
        alt: "仓库使用指南",
      },
      id: 1003,
      external: true,
      externalLink: "https://www.bilibili.com/video/av627510315",
    },
    1004: {
      title: "04. 如何高效刷题",
      desc: "方法和技巧介绍",
      image: {
        url: "https://tva1.sinaimg.cn/large/008eGmZEly1gomv0r0f1ej30zk0k0tac.jpg",
        alt: "方法和技巧介绍",
      },
      id: 1004,
      external: true,
      externalLink: "https://www.bilibili.com/video/av670114626",
    },
    1005: {
      title: "05. 力扣刷题的正确姿势是什么？",
      desc: "方法+工具",
      image: {
        url: "https://tva1.sinaimg.cn/large/008vxvgGly1h8ni9nscv4j32bq0u0dkr.jpg",
        alt: "方法和技巧介绍",
      },
      id: 1005,
    },
  },
  basic: {
    2001: {
      title: "01. 数组，栈，队列",
      desc: "主要介绍了数组，栈，队列基本原理，基础 API 以及其对应的复杂度",
      image: {
        url: "https://tva1.sinaimg.cn/large/007S8ZIlly1gfbikq9ipmj30cd0a73yp.jpg",
      },
      id: 2001,
    },
    2002: {
      title: "02. 链表",
      desc: "主要介绍了链表基本原理，基础 API 以及其对应的复杂度，另外还列举了链表的常见考点和题型",
      image: {
        url: "https://tva1.sinaimg.cn/large/007S8ZIlly1gfigbvzje1j30ky0bhq3x.jpg",
      },
      id: 2002,
    },
    2003: {
      title: "03. 树",
      desc: "主要介绍了树的基本原理，遍历方式以及题型。递归的使用，递归与树的结合等。",
      image: {
        url: "https://cdn.jsdelivr.net/gh/wylu/cdn/post/Algorithm/Tree/%E4%BA%8C%E5%8F%89%E6%A0%91/preorder-traversal.gif",
      },
      id: 2003,
    },
    2004: {
      title: "04. 哈希表",
      desc: "主要介绍了哈希表基本原理，基础 API ，处理冲突的方式以及其对应的复杂度，最后介绍了哈希表的常见题型和套路",
      image: {
        url: "https://tva1.sinaimg.cn/large/007S8ZIlly1gjurye2oxyj30zk0cymz7.jpg",
      },
      id: 2004,
    },
    2005: {
      title: "05. 双指针",
      desc: "主要介绍了双指针的基本概念，题型以及实际操作技巧。",
      image: {
        url: "https://tva1.sinaimg.cn/large/007S8ZIlly1gf5w79tciyj30aa0hl77b.jpg",
      },
      id: 2005,
    },
    2006: {
      title: "06. 图",
      desc: "主要介绍了图基本原理，表示方式，常见算法。",
      image: {
        url: "https://tva1.sinaimg.cn/large/0081Kckwly1gk3qh59semj30ec05ptab.jpg",
      },
      id: 2006,
    },
    2007: {
      title: "07. 模拟与枚举",
      desc: "模拟和枚举的简单介绍",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gq8s81iijpj308i04it92.jpg",
      },
      id: 2007,
    },
    2008: {
      title: "08. 排序（加餐）",
      desc: "经典排序的实现以及思想",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gwzne4sdw7j31hc0u0gnc.jpg",
      },
      id: 2008,
    },
  },
  topic: {
    3001: {
      title: "01. 二分",
      desc: "主要介绍了二分的本质，类型以及常见的套路",
      image: {
        url: "https://tva1.sinaimg.cn/large/008eGmZEly1goss2vq59dj30c407rgm0.jpg",
      },
      id: 3001,
    },
    3002: {
      title: "02. 滑动窗口",
      desc: "主要介绍了滑动的本质，类型以及常见的套路",
      image: {
        url: "https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugl94y8j30d90d50t5.jpg",
      },
      id: 3002,
    },
    3003: {
      title: "03. 搜索（BFS，DFS，回溯）专题",
      desc: "主要介绍了搜索的本质，类型以及常见的套路和解题模板",
      image: {
        url: "https://tva1.sinaimg.cn/large/0081Kckwly1gkaub4scgij30uu0io40h.jpg",
      },
      id: 3003,
    },

    3004: {
      title: "04. 动态规划",
      desc: "主要介绍了动态规划的本质，常见类型以及常见的套路",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gr6btdzgsbj31ak0p0gpj.jpg",
      },
      id: 3004,
    },
    3005: {
      title: "05. 背包",
      desc: "主要介绍了常见的背包问题及其对应套路",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gr6byqpl1ij30m80m8q4p.jpg",
      },
      id: 3005,
    },
    3006: {
      title: "06. 分治",
      desc: "主要介绍了分治的基本解题思路",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gr6btwbwt0j30jv0gf0u7.jpg",
      },
      id: 3006,
    },
    3007: {
      title: "07. 贪心",
      desc: "主要介绍了贪心的常见问题",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gr6bvgz7c4j30c10390sq.jpg",
      },
      id: 3007,
    },
    3008: {
      title: "08. 位运算",
      desc: "主要介绍了位运算是什么，种类有哪些，这是状态压缩的基础。",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gr6bzd54kij30pc0bcmxx.jpg",
      },
      id: 3008,
    },
  },
  advance: {
    4001: {
      title: "01. Trie",
      desc: "主要介绍了 Trie 解决的问题，适用场景，以及如何自己动手实现一个 Trie",
      image: {
        url: "https://tva1.sinaimg.cn/large/007S8ZIlly1ghlug87vyfj30mz0gq406.jpg",
      },
      id: 4001,
    },
    4002: {
      title: "02. 并查集",
      desc: "主要介绍了并查集解决的问题，适用场景，以及如何自己动手实现一个并查集",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gpzcws8miqj30dh053glo.jpg",
      },
      id: 4002,
    },
    4003: {
      title: "03. 剪枝",
      desc: "主要介绍了什么是剪枝，以及如何运用剪枝技巧使得暴力法可以 AC",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gpzcxvawtdj30qb0bjq41.jpg",
      },
      id: 4003,
    },
    4004: {
      title: "04. 字符串匹配（BF&RK&KMP）",
      desc: "主要介绍了字符串匹配的三种经典算法",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gpzd084vk4j314o0hutaz.jpg",
      },
      id: 4004,
    },
    4005: {
      title: "05. 堆",
      desc: "主要介绍了堆的特点，解决的问题以及常见题型",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gpzcyng27aj30dt0f33yy.jpg",
      },
      id: 4005,
    },
    4006: {
      title: "06. 跳表",
      desc: "主要介绍了跳表是什么，解决的问题",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gpzcyzany9j31u90u0n14.jpg",
      },
      id: 4006,
    },
    4007: {
      title: "07. 高频面试题",
      desc: "最后给大家带来常见的面试题系列，为大家的面试保驾护航~",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gpzd0qzll5j30zk0k10tz.jpg",
      },
      id: 4007,
    },
    4008: {
      title: "08. 线段树（加餐）",
      desc: "区间算法题用线段树可以秒解？",
      image: {
        url: "https://tva1.sinaimg.cn/large/008i3skNly1gxeuwtgg9oj30u00vvmym.jpg",
      },
      id: 4008,
    },
  },
};

// 先导
lectures.intro["1000"].content = encrypt(
  fs.readFileSync(path.resolve(__dirname, "../../91alg-5/introduction.md"))
);

lectures.intro["1001"].content = encrypt(
  fs.readFileSync(path.resolve(__dirname, "../../91alg-5/algo.md"))
);

lectures.intro["1002"].content = encrypt(
  fs.readFileSync(path.resolve(__dirname, "../../91alg-5/bigO.md"))
);

lectures.intro["1005"].content = encrypt(
  fs.readFileSync(path.resolve(__dirname, "../../91alg-5/how-leetcode.md"))
);

// 基础

[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008].forEach((id, i) => {
  lectures.basic[id].content = encrypt(
    fs.readFileSync(
      path.resolve(__dirname, `../../91alg-5/lecture/basic-0${i + 1}.md`)
    )
  );
});

// 专题

[3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008].forEach((id, i) => {
  lectures.topic[id].content = encrypt(
    fs.readFileSync(
      path.resolve(__dirname, `../../91alg-5/lecture/topic-0${i + 1}.md`)
    )
  );
});

// 进阶

[4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008].forEach((id, i) => {
  lectures.advance[id].content = encrypt(
    fs.readFileSync(
      path.resolve(__dirname, `../../91alg-5/lecture/advanced-0${i + 1}.md`)
    )
  );
});

fs.writeFileSync(
  __dirname + "/lectures-by-category.json",
  JSON.stringify(lectures)
);

const idLectures = JSON.stringify(
  merge(lectures.intro, lectures.basic, lectures.topic, lectures.advance)
);

// update lastUpdateTime if needed
for (const k in lectures) {
  if (JSON.stringify(lectures[k]) !== JSON.stringify(originalLectures[k])) {
    if (!meta.lectures) {
      meta.lectures = {};
    }
    if (!meta.lectures[k]) {
      meta.lectures[k] = {};
    }

    meta.lectures[k].lastUpdateTime = new Date().getTime();

    fs.writeFileSync(
      path.resolve(__dirname, "../meta.json"),
      JSON.stringify(meta)
    );
  }
}

fs.writeFileSync(__dirname + "/lectures-by-id.json", idLectures);
