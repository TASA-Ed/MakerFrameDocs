---
title: 媒体命令详解
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: play
date: 2024-08-14
order: 3
---

## 一、说明

### 创建定时器

功能：创建定时器；

参数：

- `timerName`：定时器名称；
- `interval`：定时器间隔；
- `times`：触发次数（`-1` 为无限）；
- `flags`：从右到左，是否是全局定时器（否则地图定时器），是否在脚本队列里运行（否则在 `game.async`）；
- `params` 为自定义参数（回调时传入）；

返回：成功返回 `true`；如果已经有定时器则返回 `false`；

注意：如果是局部定时器，则触发的脚本在 `地图脚本` 或 `game.f[定时器名]` 中定义；如果是全局，则触发的脚本在 `game.gf[定时器名]` 中定义。

示例：

```js
game.addtimer(timerName, interval, times=1, flags=0b10, ...params);
```

### 删除定时器

功能：删除定时器；

参数：

- `flags`：从右到左，是否是全局定时器（否则地图定时器）；

返回：成功返回 `true`；如果没有则返回 `false`；

示例：

```js
game.deltimer(timerName, flags=0b0)
```

### 播放音乐

功能：播放音乐；

参数：

- `musicParams` 是音乐名或对象（包含 `RID`）；为空表示开始播放之前停止的；
  - `musicParams` 为对象包含两个属性：
    - `$loops` 为循环次数，空或 `0` 表示无限循环；
    - `$callback` 为状态回调函数；

返回：成功返回 `true`。

示例：

```js
game.playmusic(musicParams);
```

### 停止音乐

功能：停止音乐；

示例：

```js
game.stopmusic();
```

### 暂停音乐

功能：暂停音乐；

参数：

- `name` 为暂停名称。

示例：

```js
game.pausemusic(name='$user');
```

### 继续播放音乐

功能：继续播放音乐；

参数：

- `name` 为播放名称。

示例：

```js
game.resumemusic(name='$user');
```

### 存栈音乐

功能：将音乐暂停并存栈。一般用在需要播放战斗音乐前；

示例：

```js
game.pushmusic();

//播放上一次存栈的音乐。一般用在战斗结束后（$commonFightEndScript已调用，不用写在战斗结束脚本中）。
game.popmusic();

//跳到播放进度（毫秒）
game.seekmusic(offset=0);
```

### 音乐状态

功能：音乐状态；

示例：

```js
game.musicplaying();

game.musicpausing();
```

### 播放视频

功能：播放视频；

参数：

- `videoParams` 是视频名称或对象（包含RID）
  - `videoParams` 为对象包含两个属性：
    - `$videoOutput`（包括x、y、width、height等）
    - `$mediaPlayer`
  - 也可以 `$x`、`$y`、`$width`、`$height`。

示例：

```js
game.playvideo(videoName, properties={});
// 结束播放。
game.stopvideo()
```

### 显示图片

功能：显示图片；

参数：

- `imageParams` 为图片名或对象（包含RID）
- `id` 为图片标识（用来控制和删除）
- `imageParams` 为对象：包含 `Image组件` 的所有属性 和 `$x`、`$y`、`$width`、`$height`、`$parent` 等属性；还包括 `$clicked`、`$doubleClicked` 事件的回调函数；
  - `x`、`y`、`width`、`height` 和 `$x`、`$y`、`$width`、`$height` 是坐标和宽高，每组（带\$和不带\$）只需填一种；
    - 不带\$表示按像素；
    - 带\$的属性有以下几种格式：
      - `$x`、`$y`：如果为数字，则表示坐标是按固定长度（厘米）为单位的长度（跨平台用）；
      - 如果为 `数组[n, t]`，则n表示值，t表示类型：t为0、1分别和直接填`x`、`y` 和 `$x`、`$y` 作用相同；为2表示全屏的百分比；为3表示居中后偏移多少像素，为4表示居中后偏移多少固定长度；
      - `$width`、`$height`：如果为数字，则表示按固定长度（厘米）为单位的长度（跨平台用）；
      - 如果为 `数组[n, t]`，则n表示值，t表示类型：t为0、1分别和直接填`width`、`height` 和 `$width`、`$height` 作用 相同；为2表示全屏的多少倍；为3表示自身的多少倍；为4表示是 固定宽高比 的多少倍；
  - `$parent`：0表示显示在屏幕上（默认）；1表示显示在屏幕上（受scale影响）；2表示显示在地图上；字符串表示显示在某个角色上；

示例：

```js
game.showimage(imageParams, id=undefined);
```

### 删除图片

功能：删除图片；

参数：

- `idParams` 为：
  - -1：全部屏幕上的图片组件；
  - 数字：屏幕上的图片标识；
  - 字符串：角色上的图片标识；
  - 对象：包含 `$id` 和 `$parent` 属性（同 `showimage` ）；

示例：

```js
game.delimage(idParams);
```

### 显示特效

功能：显示特效；

参数：

- `spriteParams` 为特效名或对象（包含RID）；`id` 为特效标识（用来控制和删除）；
- `spriteParams` 为对象：包含 `SpriteEffect` 组件 的所有属性 和 `$x`、`$y`、`$width`、`$height`、`$parent` 等属性；还包括 `$clicked`、`$doubleClicked`、`$looped`、`$finished` 事件的回调函数；
  - `x`、`y`、`width`、`height` 和 `$x`、`$y`、`$width`、`$height` 是坐标和宽高，每组（带\$和不带\$）只需填一种；
    - 不带\$表示按像素；
    - 带\$的属性有以下几种格式：
      - `$x`、`$y`：如果为数字，则表示坐标是按固定长度（厘米）为单位的长度（跨平台用）；
      - 如果为 `数组[n, t]`，则n表示值，t表示类型：t为0、1分别和直接填`x`、`y` 和 `$x`、`$y` 作用相同；为2表示全屏的百分比；为3表示居中后偏移多少像素，为4表示居中后偏移多少固定长度；
      - `$width`、`$height`：如果为数字，则表示按固定长度（厘米）为单位的长度（跨平台用）；
      - 如果为 `数组[n, t]`，则n表示值，t表示类型：t为0、1分别和直接填`width`、`height` 和 `$width`、`$height` 作用 相同；为2表示全屏的多少倍；为3表示自身的多少倍；为4表示是 固定宽高比 的多少倍；
  - `$parent`：0表示显示在屏幕上（默认）；
    - 1表示显示在屏幕上（受scale影响）；
    - 2表示显示在地图上；
    - 字符串表示显示在某个角色上；

示例：

```js
game.showsprite(spriteParams, id=undefined);
```

### 删除特效

功能：删除特效；

参数：

- `idParams`为：
  - -1：全部屏幕上的特效组件；
  - 数字：屏幕上的特效标识；
  - 字符串：角色上的特效标识；
  - 对象：包含 `$id` 和 `$parent` 属性（同 `showsprite`）；

示例：

```js
game.delsprite(idParams=-1);
```
