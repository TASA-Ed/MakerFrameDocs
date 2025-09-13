import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "鹰歌游戏引擎文档",
  description: "鹰歌游戏引擎的文档。",
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  theme,

  shouldPrefetch: false,
});
