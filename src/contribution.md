---
title: 文档贡献指南
icon: lightbulb
date: 2025-04-13
order: 2
---

鹰歌引擎教程需要你的贡献！

## 文档贡献指南

### 本地开发

#### **要求**

- 安装 LTS 版本 的 Node.js ^20.6.0, ^22.0.0。
- 使用 `corepack enable` 启用 Corepack。
- 安装 pnpm >= 7。

注：Node.js 18 已与 2025 年 4 月 30 日停止支持。

#### **克隆并安装项目**

使用 `git clone https://github.com/TASA-Ed/MakerFrameDocs.git` 将仓库克隆至本地。

进入docs目录，运行 `pnpm install` 安装模块。

#### **项目的运行与开发**

- 使用 `pnpm docs:dev` 启用开发服务器。
- 使用 `pnpm build` 构建项目。
- 使用 `pnpm markdownlint-cli2 "**/*.md"` 格式化项目[^lint]。

### 编写教程

将本仓库复刻，随后可以通过开启 Pull Request 将更改提交到本仓库中。

> 注:拒绝提交没有任何意义、对他人无帮助、杂乱无章、推广、抄袭、引流的内容。

### 文档贡献者交流群

注：本群**不是**引擎交流群，非文档贡献者请勿进入。

- [点击加入](https://qm.qq.com/q/9tsBvtRsiY) (群号: 597524393)

### 其他

本项目采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可，向本项目提交的所有内容都将采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可。

如果说你无法访问GitHub，也无法通过其他特殊手段来访问，那您可以选择：

- 在网站的评论区中指出错误（仅接受错误指出和修改）。
- 向 [tasaedem@outlook.com](mailto:tasaedem@outlook.com) 发送邮件。
- 加入 [文档贡献者交流群](#文档贡献者交流群) 并联系群主

注：使用其他方法提交的文档无法在显示页面底部的贡献者列表[^list]中，不过我们会在 [关于](about.md) 页标注以其他方式贡献的贡献者。

[^lint]: 本项目使用 [markdownlint-cli2](https://www.npmjs.com/package/markdownlint-cli2) 格式化md文档，因此你在修改md文档后需要使用 `pnpm markdownlint-cli2 "**/*.md"` 检查错误。

    本项目的 Pull Request 状态检查也包括 markdownlint ，只不过这些检查是中立性的，即使报错也可以正常合并（尽管如此，但我们还是推荐你修复完所有错误之后再来提交 PR ）。

[^list]: 因为贡献者列表基于 [git](https://ecosystem.vuejs.press/zh/plugins/development/git.html) 插件自动生成。
