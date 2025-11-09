---
title: 基础命令详解
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: terminal
date: 2024-08-14
order: 1
---

## 一、说明

### 载入地图

功能：载入地图资源名为 `mapRID` 的地图并执行地图载入事件 `$start` 。

参数：

- `userData` 是用户传入数据，后期调用的钩子函数会传入；
- `forceRepaint` 表示是否强制重绘（为 `false` 时表示如果 `mapRID` 与现在的相同，则不重绘）；

返回：`Promise` 对象（完全载入后状态改变；出错会抛出错误），携带值为地图信息；

示例：

```js
yield game.loadmap('地图资源名');

yield game.loadmap(mapRID, userData, forceRepait=false)
```

### 提示信息

功能：在屏幕中间显示提示信息；命令用 `yield` 关键字修饰表示命令完全运行完毕后再进行下一步。

参数：

- `msg` 为提示文字，支持 `HTML` 标签；
- `interval` 为文字显示间隔，为 `0` 则不使用；
- `pretext` 为预显示的文字；
- `keeptime` ：如果为 `-1` ，表示点击后对话框会立即显示全部，为 `0` 表示等待显示完毕，为 `>0` 表示显示完毕后再延时 `KeepTime` 毫秒然后自动消失；
- `style` 为样式；
  - 如果为数字，则含义为 `Type` ，表示自适应宽高（ `0b1` 为宽， `0b10` 为高），否则固定大小；
  - 如果为对象，则可以修改 `BackgroundColor` 、 `BorderColor` 、 `FontSize` 、 `FontColor` 、 `MaskColor` 、 `Type` ；
  - 分别表示 背景色、边框色、字体颜色、字体大小、遮盖色、自适应类型、持续时间；
- `pauseGame` 为显示时是否暂停游戏（游戏主循环暂停，并暂停产生游戏事件）；值为 `true` 、 `false` 或字符串。如果为 `true` 或字符串则游戏会暂停（字符串表示暂停值，不同的暂停值互不影响，只要有暂停值游戏就会暂停；`true` 表示给个随机暂停值）；
- `callback` 是结束时回调函数，如果为非函数则表示让系统自动处理（销毁组件并继续游戏）；
  - 如果是自定义函数，参数为 `cb` , `...params` ，`cb` 表示系统处理（销毁组件并继续游戏），请在合适的地方调用 `cb(...params)` ；

返回：`Promise` 对象（完全载入后状态改变；出错会抛出错误）， `$params` 属性为消息框组件对象；如果参数 `msg` 为 `true` ，则直接创建组件对象并返回（需要自己调用显示函数）；

示例：

```js
yield game.msg('你好，鹰歌');

[yield]
game.msg(msg='', interval=20, pretext='', keeptime=0, style={Type: 0b10}, pauseGame=true, callback=true);
```

### 对话信息

功能：在屏幕下方显示对话信息；命令用 `yield` 关键字修饰表示命令完全运行完毕后再进行下一步。

参数：

- `role` 为角色名或角色对象（会显示名字和头像），可以为 `null`（不显示名字和头像）；
- `msg` 为提示文字，支持 `HTML` 标签；
- `interval` 为文字显示间隔，为 `0` 则不使用；
- `pretext` 为预显示的文字；
- `keeptime` ：如果为 `-1` ，表示点击后对话框会立即显示全部，为 `0` 表示等待显示完毕，为 `>0` 表示显示完毕后再延时 `KeepTime` 毫秒然后自动消失；
- `style` 为样式，包括 `BackgroundColor` 、`BorderColor` 、`FontSize` 、`FontColor` 、`MaskColor` 、`Name` 、`Avatar` ；
  - 分别表示 背景色、边框色、字体颜色、字体大小、遮盖色、自适应类型、持续时间、是否显示名字、是否显示头像；
- `pauseGame` 为显示时是否暂停游戏（游戏主循环暂停，并暂停产生游戏事件）；值为 `true` 、 `false` 或字符串。如果为 `true` 或字符串则游戏会暂停（字符串表示暂停值，不同的暂停值互不影响，只要有暂停值游戏就会暂停；`true` 表示给个随机暂停值）；
- `callback` 是结束时回调函数，如果为非函数则表示让系统自动处理（销毁组件并继续游戏）；
  - 如果是自定义函数，参数为 `cb` , `...params` ，`cb` 表示系统处理（销毁组件并继续游戏），请在合适的地方调用 `cb(...params)` ；

返回：同命令 `msg` 的返回值；

示例：

```js
yield game.talk('你好，鹰歌');

[yield]
game.talk(role=null, msg='', interval=20, pretext='', keeptime=0, style={}, pauseGame=true, callback=true);
```

### 头顶文字信息

功能：角色头顶显示文字信息。

参数：

- `role` 为角色名或角色对象；
- `msg` 为提示文字，支持 `HTML` 标签；
- `interval` 为文字显示间隔，为 `0` 则不使用；
- `pretext` 为预显示的文字；
- `keeptime` ：如果为 `-1` ，表示点击后对话框会立即显示全部，为 `0` 表示等待显示完毕，为 `>0` 表示显示完毕后再延时 `KeepTime` 毫秒然后自动消失；
- `style` 为样式，包括 `BackgroundColor` 、`BorderColor` 、`FontSize` 、`FontColor`；
  - 分别表示 背景色、边框色、字体颜色、字体大小；

返回：角色组件对象；

示例：

```js
game.say('角色名', '你好');

game.say(role, msg, interval=60, pretext='', keeptime=1000, style={});
```

### 显示菜单

功能：显示一个菜单；命令用 `yield` 关键字修饰表示命令完全运行完毕后再进行下一步。

参数：

- `title` 为显示文字；
- `items` 为选项数组；
- `style` 为样式，包括 `MaskColor`、`BorderColor`、`BackgroundColor`、`ItemFontSize`、`ItemFontColor`、`ItemBackgroundColor1`、`ItemBackgroundColor2`、`TitleFontSize`、`TitleBackgroundColor`、`TitleFontColor`、`ItemBorderColor`、`ItemHeight`、`TitleHeight`；
- `pauseGame` 为显示时是否暂停游戏（游戏主循环暂停，并暂停产生游戏事件）；值为 `true` 、 `false` 或字符串。如果为 `true` 或字符串则游戏会暂停（字符串表示暂停值，不同的暂停值互不影响，只要有暂停值游戏就会暂停；`true` 表示给个随机暂停值）；
- `callback` 是结束时回调函数，如果为非函数则表示让系统自动处理（销毁组件并继续游戏）；
  - 如果是自定义函数，参数为 `cb` , `...params` ，`cb` 表示系统处理（销毁组件并继续游戏），请在合适的地方调用 `cb(...params)` ；

返回：`Promise` 对象（完全运行完毕后状态改变；携带值为选择的下标，0起始；出错会抛出错误），`$params` 属性为消息框组件对象；如果参数 `title` 为 `true`，则直接创建组件对象并返回（需要自己调用显示函数）；

示例：

```js
let choiceIndex = yield game.menu('标题', ['选项A', '选项B']);

yield game.menu(title='', items=[], style={}, pauseGame=true, callback=true);
```

### 显示输入框

功能：显示一个输入框；命令用 `yield` 关键字修饰表示命令完全运行完毕后再进行下一步。

参数：

- `title` 为显示文字；
- `pretext` 为预设文字；
- `style` 为自定义样式；
- `pauseGame` 为显示时是否暂停游戏（游戏主循环暂停，并暂停产生游戏事件）；值为 `true` 、 `false` 或字符串。如果为 `true` 或字符串则游戏会暂停（字符串表示暂停值，不同的暂停值互不影响，只要有暂停值游戏就会暂停；`true` 表示给个随机暂停值）；
- `callback` 是结束时回调函数，如果为非函数则表示让系统自动处理（销毁组件并继续游戏）；
  - 如果是自定义函数，参数为 `cb` , `...params` ，`cb` 表示系统处理（销毁组件并继续游戏），请在合适的地方调用 `cb(...params)` ；

返回：`Promise` 对象（完全运行完毕后状态改变；携带值为输入的字符串；出错会抛出错误），`$params` 属性为消息框组件对象；如果参数 `title` 为 `true`，则直接创建组件对象并返回（需要自己调用显示函数）；

示例：

```js
let inputText = yield game.input('标题');

yield game.input(title='', pretext='', style={}, pauseGame=true, callback=true);
```
