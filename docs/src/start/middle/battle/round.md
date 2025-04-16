---
title: 自定义战斗人物战斗回合
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: rotate-right
order: 1
---

## 一、说明

&emsp;&emsp;通用脚本的\$fightRolesRound函数可以修改一个大回合内所有战斗人物的战斗次序，默认的是所有战斗人物按速度排序，并一回合内出手一次。

## 二、实现原理

&emsp;&emsp;这个函数是一个生成器函数，每次返回一个战斗人物对象数组。

## 三、其他效果

&emsp;&emsp;你可以修改为其他效果，比如：

&emsp;&emsp;1、某个人物在一个大回合内可出手多次（根据速度比）；

&emsp;&emsp;2、整个游戏只做一个回合（也就是没有回合这个概念了），放置挂机游戏就是这种。
