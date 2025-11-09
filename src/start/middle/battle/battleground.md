---
title: 战斗时上下战场
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: up-down
order: 1
---

## 一、说明

战斗时可以使用这两个代码，分别进行某个战斗人物上场或下场；

## 二、命令

### 1、上场

fight.\$sys.insertFightRole(index, fightrole, teamID);

参数：

index：上场序号（位置），-1为放在队尾；

fightrole：上场的战斗人物，可以是3种格式的创建方式；

teamID：为0是我方，为1是敌方；

返回值：

成功返回创建的战斗人物，没有返回null；

### 2、下场

fight.\$sys.removeFightRole(index, teamID);

参数：同上；

返回值：成功返回删除的战斗人物数组，错误返回false；

## 三、注意

上场代码使用后，只是临时产生一个战斗人物，并不会加入到我方战斗人物里，如果需要加入，则还得使用game.createhero()命令。
