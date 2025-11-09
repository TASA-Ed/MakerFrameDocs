---
title: 脚本变量与其他详解
author:
  - name: 深林孤鹰
    url: https://github.com/leamus
  - name: TASA-Ed工作室
    url: https://www.tasaed.top
    email: studio@tasaed.top
icon: square-root-variable
date: 2025-08-14
order: 6
---

## 脚本变量与事件

引擎定义了一些脚本变量，可供开发者使用，同时也支持使用 JS 的 `let`、`var`、`const` 定义变量。

### 脚本变量

```js
game.d // 用户自定义地图变量集合（切换地图后清空）。
game.f // 用户自定义地图函数集合（切换地图后清空），地图脚本也会拷贝在内。
game.gd // 用户自定义全局变量集合（整个游戏可用，会写入存档）。
game.gf // 用户自定义全局函数集合（整个游戏可用），game.js 脚本也会拷贝在内。
game.cd // 引擎变量，一般比较少用，全局可用，只要进入游戏就一直可用，跨存档共享，比如可以存放玩家的总游戏时长；

// JS 的 Math对象。
game.math
Math

// 当前地图信息
game.d['$sys_map']
    .$rid // 当前地图资源名
    .$name // 当前地图名
    .$columns // 列数
    .$rows // 行数
    .$obstacles // 障碍信息
    .$specials // 块信息
    .$info // 地图信息

game.$projectpath // 项目根目录。
game.$userscripts // 用户脚本（用户 common_scripts.js，如果没有则为 $GameMakerGlobalJS）
game.$plugins // 所有的插件对象

fight.d // 用户自定义战斗变量集合（战斗结束后清空）。
fight.myCombatants // 我方数组。
fight.enemies // 敌方数组。


$CommonLibJS // 一些 JS 公共方法；
$Global // 提供跨平台、自适应的一些方法；
$GlobalJS // 一些公共方法；
$GameMakerGlobal // Maker 的公共对象；
$GameMakerGlobalJS // 一些 Maker 的相关方法；
```

### 事件

```js
// NPC事件的四种写法（前两种支持同步调用）
game.f[角色游戏名] = ... //（推荐写法）
game.f[角色游戏名] = function*() {}
game.f[角色游戏名] = function() {}
game.f[角色游戏名] = () => {}

// 定时器事件（写法同上）：
game.f[局部定时器名] // 局部定时器
game.gf[全局定时器名] // 全局定时器

```

## QML 函数与变量

支持使用 QML 的一些函数与变量。

### 退出

::: caution
此函数极为危险，运行后将会让整个程序退出，在引擎环境中运行会同时导致引擎退出。
:::

使游戏退出的函数。

```js
Qt.exit(0); // 可传入退出代码参数
Qt.quit(); // 不支持传入参数
```

### md5

MD5 哈希（不可逆加密）函数。

```js
Qt.md5("需要加密的数据"); // 必须传入需要加密的数据
```

### 打开指定的 URL

尝试调用系统默认的外部应用程序打开指定的 URL（链接）的函数。如果成功则返回 `true` ，否则返回 `false`。

::: warning
返回值为 `true` 表示应用程序已成功请求操作系统在外部应用程序中打开该 URL。但外部应用程序仍可能无法启动或无法打开请求的 URL，此类结果不会反馈给应用程序。
:::

```js
Qt.openUrlExternally('https://www.tasaed.top'); // 必须传入一个 URL
```

### 系统名称

返回用户系统名称的变量。

```js
Qt.platform.os
```

可能的值：

- "android"：安卓 系统
- "ios"：iOS 系统
- "tvos"：tvOS 系统
- "visionos"：visionOS 系统
- "linux"：Linux 系统
- "osx"：macOS 系统
- "qnx"：QNX 系统
- "unix"：其他基于 Unix 的系统
- "windows"：Windows 系统
- "wasm"：WebAssembly

### 系统语言

返回用户系统语言的变量。

```js
Qt.uiLanguage
```

返回 [ISO 639-1](https://quickref.cn/docs/iso-639-1.html) 标准的语言代码，可能的值：

- "zh"：中文
- "en"：英语
- ...

## 导入外部脚本

由于 QML 环境没有好地载入外部 js 脚本的方式，本人也用了一些奇淫技巧来实现了相对便捷的方法来做到了。

项目中的各种相关脚本几乎都是固定路径和名字的，如果需要在脚本 js 种导入外部脚本，可以用 QML 的方式来导入：

```js
.import '相对路径/xx.js' as JsName
```

然后就可以使用 `JsName` 中的函数和数据了。

### 旧说明

- 1、涉及到算法的脚本，用 `game.evaluateFile` 或 `game.evalfile` 命令来立即执行并会返回结果；
  （技术说明：推荐用前者，底层是 C++ 执行，异常时会准确报错；后者是用 `eval` 执行，函数内的函数异常时只能报 `eval` 错误；但后者执行有脚本的上下文环境）
- 2、涉及到事件的脚本，用 `game.script` 命令来队列执行，调用 `run` 的时候才返回结果；

编辑器中有提示，请注意不要用错。

## 同步代码调用说明

由于Javascript本身是异步调用，所有的指令都是一瞬间运行完毕。比如你想让人物说几句话，这样调用的话

```js
game.talk('第1句')
game.talk('第2句')
game.talk('第3句')
```

默认是一瞬间执行到了第3句指令，第1句和第2句会一闪而过看不到（msg 组件则是全部显示出来），如果你想一句一句执行，等每一句彻底执行完毕再执行下一句，则应该这样

```js
yield game.talk('第1句')
yield game.talk('第2句')
yield game.talk('第3句')
```

没错，只需要前面加一条 yield 单词就可以了。

目前所有指令都支持同步调用。

### 有意义的异步命令

```js
game.msg
game.talk
game.menu
game.input
game.trade
game.window
game.wait
```

注：上面的指令如果用 `yield`，`pauseGame` 最好设置为 `true`（暂停游戏），不用 `yield` 的话就将 `pauseGame` 设置为 `false`（最好这样用，否则可能会出现意料之外的结果）。

### 战斗命令

```js
fight.msg
fight.talk
fight.menu
```

注意，这些指令没有 `pauseGame`，直接使用 `yield`；

技能脚本 也支持 `yield`，它是 `yield` 一个固定的对象，用来完成不同的效果和功能。

## 地图编辑器说明

### 功能和特色

支持各种 size 的地图块；支持无数层级（目前1层和2层为地板层），角色都在2、3层之间；支持事件脚本编辑；支持复制粘贴功能；

### 操作说明

左上角按钮为鼠标功能选择，有 绘制、障碍、事件、移动 4个功能；

#### 绘制

- 单击：提示地图块坐标和移动粘贴目标；
- 单击拖动：绘制地图（注意选择的当前图层）；
- 双击和拖动：清空目标地图块；
- 长按+拖动：复制地图选块；

#### 障碍

- 单击：提示地图块坐标和移动粘贴目标；
- 单击拖动：绘制障碍；
- 双击和拖动：清空目标障碍；
- 长按+拖动：复制地图选块；

#### 事件

- 单击：提示地图块坐标和移动粘贴目标；
- 单击拖动：绘制事件（注意需要选择一个事件）；
- 双击和拖动：清空目标事件；
- 长按+拖动：复制地图选块；

#### 移动

可以移动和缩放地图区；

- 粘贴：可以复制源地图层的选区到目标地图层的粘贴目标内；
- 地图层列表：单击可以选择当前地图层；双击可以显示、隐藏当前地图层；
- 事件列表：单击可以选择当前事件进行绘制；双击可以编辑事件名；
- 事件：编辑地图的所有事件（事件名就是函数名）；

### 注意

- 地图编辑器有小概率会崩（估计是 QML 的 canvas 大小限制问题，这是 QML 环境的 BUG，后期会用 OpenGL 替换后应该能解决），所以有个小技巧就是，经常保存，且用不同的地图名，如果崩了可以用上一个保存的地图，等地图完善了再保存为正式的名字，其他的删除。
- 经不准确测试，地图编辑器最多支持 `1920*1920` 像素（32位 arm_v7）和 `3200*3200` 像素（64位 arm_v8），太大有可能导致绘制卡顿或报错、黑屏等问题，这是由于引擎使用了 QML 的 Canvas 组件，效率比较低，后期如果用 nano/opengl 库会好很多（目前只是集成还没有替换）。

## 游戏工程和数据主目录

- 1、windows 环境，在 可执行程序 目录下的 `GameMaker\Projects` 目录下；
- 2、android 环境，在 `/storage/emulated/0/Leamus/MakerFrame/GameMaker/Projects` 目录下；
- 工程打包后导出的路径为 `Projects/工程名.zip`；

## 关于脚本的编写方式和几点说明

### 地图脚本

```js
function* start(){} // 载入地图时触发的脚本
function* 其他(){} // 其他为 某角色、某地图事件或某定时器 的脚本
```

注：这些也可以定义 在 start 脚本中的 `game.f` 中，但上面 `function` 的优先级高。

### 道具脚本变量

```js
$name // 游戏中显示名称；
$description // 描述详情；
$image // 图标；
$size // 大小；
$type // 1为装备；2为普通使用；3为战斗使用；4为剧情类；
$position // 装备位置；

// 注：
// 1、武器是特殊位置，普通攻击时会使用 武器 的 skills；
// 2、脚本命令可以重定义给战斗角色装备的位置；

$price // 买卖金额，false表示不能买卖；
$skills // 道具所带技能（1、此时道具作为装备，且为 武器 时可用；2、目前只用到第一个）；
$equipEffectAlgorithm //装备效果；
$equipScript // 装备脚本；
$useScript // 使用脚本；
$fightScript // 战斗时对应的技能；
```

### 战斗角色

战斗角色的脚本都是可选的，格式：

```js
let $createData = function(){return {RID: 'killer2', $name: '敌人1', $properties: {HP: 5, healthHP: 5, remainHP: 5, EXP: 5}, $skills: [{RID: 'fight'}], $goods: [{RID: '西瓜刀'}], $money: 5};}
// 在战斗脚本中可以修改覆盖这些属性。

function* $levelUpScript(combatant){} //角色单独升级链
// 如果不定义，则使用通用的升级链算法；

function $levelAlgorithm(combatant, targetLevel){}
// 级别对应的 各项属性 算法（升级时会设置，可选；注意：只增不减）；
// 如果不定义，则使用通用的算法；
```

### 技能

估计是最复杂的，说明：

```js
$name // 游戏中显示的名称；
$description // 描述；
$type // 1为选敌方；2为选我方；0为不选（全体技能）；
$choiceScript // 选择技能时脚本
$playScript // 技能产生的效果 和 动画（最复杂难理解的地方，但可以做出各种不错的特效动画效果）；
$check // 是否可以触发（可以用MP判断）；
```

### 战斗脚本说明

```js
$backgroundImage // 背景图文件；
$music // 背景音乐；
$runAway // 是否可以逃跑；true则调用 通用逃跑算法；0~1则为概率逃跑；false为不能逃跑；
$enemyFightRoles // 敌人ID的数组；
$enemyCount // 敌人数；数字或数组（m-n）的随机排列，如果为true则表示按顺序排列；
$enemiesData // 敌人属性数据，可以覆盖战斗角色中定义的数据；
$fightRoundEvent // 回合事件；
$fightStartEvent // 开始事件；
$fightEndEvent // 结束事件；
```

### 通用脚本

```js
// 游戏结束脚本
function* $gameOverScript(params) {}
// 通用逃跑算法
function $runAwayAlgorithm(team, roleIndex) {}
// 战斗技能算法（可以实现其他功能并返回一个值，比如显示战斗文字、返回通用伤害值等）
function $fightSkillAlgorithm(combatant, targetCombatant, Params) {}
// 战斗开始通用脚本；
function* $commonFightStartScript() {}
// 战斗回合通用脚本；
function* $commonFightRoundScript(round) {}
// 战斗结束通用脚本；
function* $commonFightEndScript(r, exp, money) {}
// 恢复算法
function $resumeEventScript(combatant) {}
```

### 通用升级链算法

已经集成在了通用脚本里，格式：

```js
function* commonLevelUpScript(combatant) {} // 升级脚本
function commonLevelAlgorithm(combatant, targetLevel) {} // 级别对应的 各项属性 算法（升级时会设置，可选；注意：只增不减）
// 注：如果没有单独的战斗人物升级链，则使用通用的。
```

## 其他说明

- 游戏载入脚本：在游戏一开始时执行，主要是载入初始地图、创建主角、创建属性、变量等；
- 地图载入脚本：在载入地图时执行，主要是清空原NPC、创建NPC、创建NPC脚本等；
- 游戏刷新率：建议5~50，根据游戏实际情况设置（经测试低端手机最高FPS能达到60左右）；
- 角色速度：为了匹配所有游戏刷新率，将其定义为 像素/毫秒，具体要根据图块大小来设置（一般设置为 0.1-0.2 即可）；
- 游戏退出时会自动存到名为 savedata 的存档。
- 游戏中脚本引入的 资源ID（比如特效、角色、道具等），指的是你保存时的名称（列表中也会显示），并不是脚本中定义的 name；
- 已经实现打包到 win、安卓平台 的功能，但安卓平台麻烦一点，因为需要打包 apk 和签名的问题，由于个人时间精力不足，所以提供了 打包 APK 所需的环境资源 和 三方打包签名工具（安卓下和 win 下都有的 APKTool），也很方便；
- 编辑器有在线和离线版本，在线又分为正式和测试版本，保守的用户可以使用固定的离线版本（可随时升级），激进的玩家可以使用在线测试版本，但我推荐使用在线正式版本；
