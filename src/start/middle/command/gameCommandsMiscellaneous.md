---
title: 杂项命令详解
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: ellipsis
date: 2024-08-14
order: 5
---

## 一、说明

包含一些杂项。

### 场景相关

```js
// 将场景缩放n倍；可以是小数。
game.scale(n);
// 场景跟随某个角色。
game.setscenerole(r);
```

### 游戏相关

```js
// 暂停游戏。
game.pause();
// 继续游戏。
game.goon();
// 设置游戏刷新率（interval毫秒）。
game.interval(interval);

// 暂停time毫秒。
[yield]
game.wait(time);
// 返回start~end之间的随机整数（包含start，不包含end）。
game.rnd(start, end);

// 游戏结束（调用游戏结束脚本）；
yield game.gameover(params);
```

### 杂项

```js
//返回 JS 的 new Date()对象。
game.date();
```
