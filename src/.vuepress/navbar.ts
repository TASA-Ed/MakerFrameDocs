import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/start/",
  "/info/",
  "/projects/",
  "/faq.md",
  {
    text: "其它",
    icon: "ellipsis",
    prefix: "/",
    children: [
      {
        text: "文档",
        children: [
          "about.md",
          "contribution.md",
        ],
      },
      {
        text: "引擎",
        children: [
          "engineUpdatelog.md"
        ],
      }
    ],
  }
]);
