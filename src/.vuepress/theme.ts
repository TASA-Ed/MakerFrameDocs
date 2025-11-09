import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://docs-mf.tasaed.top",

  logo: "/assets/image/logo.png",

  repo: "TASA-Ed/MakerFrameDocs",

  favicon: "favicon.ico",

  docsDir: "docs/src",

  author: {
    name: "TASA-Ed工作室",
    url: "https://www.tasaed.top",
    email: "studio@tasaed.top",
  },

  // 页面信息
  pageInfo: ["Author", "Date", "PageView", "ReadingTime", "Word"],

  // 导航栏
  fullscreen: true,
  navbarTitle: "",
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["qqGroupLink", "Repo", "Outlook", "Search"],
  },
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: '<a href=\"https://docs-mf.tasaed.top\">鹰歌游戏引擎文档</a> | Copyright © 2025 <a href=\"https://www.tasaed.top\">TASA-Ed工作室</a>，<a href=\"https://github.com/leamus\">深林孤鹰</a>，<a href=\"https://qm.qq.com/q/bTB1cZoGze\">鹰歌游戏引擎社区</a> licensed <a href=\"https://creativecommons.org/licenses/by-sa/4.0\" target=\"_blank\">CC BY-SA 4.0</a><br/>Powered by <a href=\"https://vuejs.press\" target=\"_blank\">VuePress</a> | Theme by <a href=\"https://theme-hope.vuejs.press\" target=\"_blank\">Hope</a>',
  copyright: false,
  displayFooter: true,

  // Git
  contributors: "content",
  changelog: true,

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // ...?
  encrypt: {
    config: {
      "/eagle.html": {
        password: ["song"],
        hint: "What does the eagle like?",
      },
    },
  },

  markdown: {
    component: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    mark: true,
    footnote: true,
    stylize: [
      {
        matcher: /^\*.*/,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "mark")
            return {
              tag: "span",
              attrs: { ...attrs, style: "color:rgba(255, 29, 35, 0.85);" },
              content,
            };
        },
      },
    ],
    include: true,
    vPre: true,
  },

  plugins: {
    comment: {
      provider: "Artalk",
      server: "https://talk.tasaed.top",
      locale: "zh-CN",
      emoticons: "https://api.tasaed.top/artalk/default.json",
      placeholder: "输入你想说的话吧",
      noComment: "这里还没有评论，快来抢沙发！",
      sendBtn: "点击发送",
      uaBadge: true,
      gravatar: {
        mirror: "https://cn.cravatar.com/avatar/",
        params: "sha256=1&d=mp&s=240&d=retro",
      },
    },

    docsearch: {
      appId: "NNZCDJNBW8",
      apiKey: "c45b30fc8b8df4259e969fa101b29b33",
      indexName: "mf-tasaed",
    },

    components: {
      components: ["Badge", "VPCard", "PDF", "SiteInfo", "VPBanner"],
      componentOptions: {
        pdf: {
          pdfjs: "/pdfjs"
        }
      }
    },

    git: {
      contributors: {
        avatar: true,
        info: [
          {
            username: "ccd2s",
            name: "德二吹风机",
            alias: ["德二吹风机","TASA-Ed"],
            email: "tasaedem@outlook.com",
          },
          {
            username: "luomic",
            name: "落",
            alias: ["Luomic","落"],
          },
          {
            username: "leamus",
            name: "深林孤鹰",
            alias: ["leamus","深林孤鹰"],
          },
        ],
      }
    },

    pwa: {
      update: "hint",
      favicon: "/favicon.ico",
    },

    // 在移动设备上显示复制按钮
    copyCode: {
      showInMobile: true,
      duration: 1500,
    },

    icon: {
      assets: ["/assets/fontawesome/js/brands.min.js","/assets/fontawesome/js/solid.min.js","/assets/fontawesome/js/regular.min.js","/assets/fontawesome/js/fontawesome.min.js"]
    },

    feed: {
      rss: true,
      image: "/assets/image/logo.png",
      icon: "/assets/image/TwemojiEagle.svg",
      channel: {
        copyright: "Copyright © 2025 TASA-Ed工作室，深林孤鹰 licensed CC BY-SA 4.0",
        ttl: 1440,
        image: "/assets/image/logo.png",
        icon: "/assets/image/TwemojiEagle.svg",
      },
    },

    notice: [
      {
        path: "/",
        title: "引擎公告",
        content: "因为目前鹰歌游戏引擎已经完善，所以现在开发者深林孤鹰的重心并不在这里，不过如果有问题的话也可以去找开发者深林孤鹰咨询。",
        confirm: true,
        showOnce: true,
        actions: [
          {
            text: "加入Q群",
            link: "https://qm.qq.com/q/bTB1cZoGze",
            type: "primary",
          },
          {
            text: "关闭",
          }
        ],
      },
    ],
  },
});
