---
title: 升级链
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: up-long
order: 2
---

## 一、说明

升级链也和Buff一样也没有集成在引擎中，也是以扩展和插件的形式提供的。

## 二、实现方式

通用脚本的 \$refreshCombatant函数 在游戏中会不停的循环调用，这个函数又会调用 levelUp 函数，这个函数默认又会调用战斗人物脚本（在\$commons对象中）的 levelUpScript 和 levelAlgorithm 函数，这两个函数分别是升级脚本和升级算法，如果没有，则导入全局通用的 commonLevelUpScript 和 commonLevelAlgorithm 函数，这两个函数是通过 JSLevelChain 外部导入的方式提供的（如果没有导入则默认会使用系统的）。两种方法都可以。

1、升级脚本

原型：

```js
function *commonLevelUpScript(combatant)
```

作用：角色升级的动画和效果（系统默认为每次所有属性提高10%，且出现提示）；

参数：战斗人物；

返回：升级后的级别。

2、升级算法

原型：

```js
function commonLevelAlgorithm(combatant, targetLevel)
```

作用：返回 战斗人物 的 目标级别 所对应的属性条件；

返回：属性条件对象，比如{EXP: 100}；

## 三、注意

详细可见 示例工程；

两个函数只是一种升级的实现方式，你完全可以自己去设计自己的升级算法。
