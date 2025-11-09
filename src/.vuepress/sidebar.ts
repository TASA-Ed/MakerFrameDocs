import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "使用教程",
      icon: "signs-post",
      prefix: "start/",
      link: "start/",
      children: [
        {
          text: "初级教程",
          icon: "circle-play",
          collapsible: true,
          prefix: "beginner/",
          children: "structure",
        },
        {
          text: "中级教程",
          icon: "dice-d6",
          collapsible: true,
          prefix: "middle/",
          children: [
            "intro.html",
            {
              text: "游戏命令",
              icon: "terminal",
              link: "command/",
              prefix: "command/",
              children: "structure",
            },
            {
              text: "系统函数",
              icon: "f",
              link: "function/",
              prefix: "function/",
              children: "structure",
            },
            {
              text: "脚本",
              icon: "scroll",
              link: "script/",
              prefix: "script/",
              children: "structure",
            },
            {
              text: "战斗",
              icon: "khanda",
              link: "battle/",
              prefix: "battle/",
              children: "structure",
            },
            {
              text: "界面",
              icon: "object-group",
              link: "interface/",
              prefix: "interface/",
              children: "structure",
            },
            "menu.html",
            "plugin.html",
            "network.html",
            "customCommand.html",
          ],
        },
        {
          text: "高级教程",
          icon: "code",
          collapsible: true,
          prefix: "advanced/",
          children: "structure",
        },
        {
          text: "电子书教程",
          icon: "book",
          collapsible: true,
          prefix: "ebook/",
          children: "structure",
        }
      ],
    },
    {
      text: "介绍",
      icon: "circle-info",
      prefix: "info/",
      link: "info/",
    },
    {
      text: "案例",
      icon: "splotch",
      prefix: "projects/",
      link: "projects/",
    },
    "faq.md",
    "about.md",
    "contribution.md",
    "engineUpdatelog.md"
  ],
});
