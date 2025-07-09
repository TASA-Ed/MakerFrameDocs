<!-- markdownlint-disable -->
<p align="center">
    <a href="https://github.com/leamus/MakerFrame" target="_blank" rel="noopener noreferrer">
        <img width="175" src="https://raw.githubusercontent.com/TASA-Ed/MakerFrameDocs/refs/heads/main/docs/src/.vuepress/public/assets/image/logo.png" alt="MakerFrame" />
    </a>
</p>

<h1 align="center"><b>MakerFrame Documentation</b></h1>

<p align="center">
<a href="https://app.netlify.com/sites/jovial-sable-a4b76d/deploys"><img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/75983092-fde6-4c25-8f5f-6e0d7af010fe/deploy-status"/></a>
<a href="https://github.com/TASA-Ed/MakerFrameDocs/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/TASA-Ed/MakerFrameDocs?color=8ef6e4&style=flat"/></a>
<a href="https://github.com/TASA-Ed/MakerFrameDocs/actions/workflows/pr-check.yml"><img alt="Build" src="https://github.com/TASA-Ed/MakerFrameDocs/actions/workflows/pr-check.yml/badge.svg"/></a>
<a href="https://github.com/TASA-Ed/MakerFrameDocs/actions/workflows/pr-lint.yml"><img alt="Lint" src="https://github.com/TASA-Ed/MakerFrameDocs/actions/workflows/pr-lint.yml/badge.svg"/></a>
</p>

<p align="center">
<a href="README.md">English</a>，<a href="README_zh_CN.md">中文</a>
</p>

---

Here is the code repository for the MakerFrame Game Engine documentation, and you can optionally visit [docs-mf.tasaed.top](https://docs-mf.tasaed.top/) to view a live version.

Note: that this document is an unofficial repository, [original is here](https://github.com/leamus/MakerFrame).

The MakerFrame Game Engine Documentation needs your contribution!

## Contribution Guide

### Local Development

#### **Requirements**

- Install LTS Versions of Node.js Node.js ^20.19.0, ^22.12.0。
- Use `corepack enable` enable Corepack。
- Install pnpm >= 7。

Note: Node.js v18 has reached End-Of-Life on April 30, 2025.

#### **Clone and install the project**

Clone the repository locally using `git clone https://github.com/TASA-Ed/MakerFrameDocs.git`.

Go to the docs directory and run `pnpm install` to install the module.

#### **Project operation and development**

- Use `pnpm docs:dev` to enable the development server.
- Use `pnpm build` to build the project.
- Use `pnpm markdownlint-cli2 "**/*.md"` formatting project[^lint].

### Preparation of tutorials

Duplicate this repository, and then you can commit the changes to this repository by turning on Pull Request.

> Note:Refuse to submit content that doesn't make any sense, doesn't help others, is cluttered, promotes, plagiarizes, or attracts traffic.

## Description of license

This project is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) and all content submitted to this project will be licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) license.

[^lint]: This project uses [markdownlint-cli2](https://www.npmjs.com/package/markdownlint-cli2) to format md documents, so you need to use `pnpm markdownlint-cli2 "**/*.md"` to check for errors after modifying `.md` documents.

    The Pull Request status checks for this project also include markdownlint, except that they are neutral and can be merged normally even if an error is reported (nevertheless, we recommend that you fix all the errors before submitting the PR).
