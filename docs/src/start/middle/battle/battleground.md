---
title: 战斗时上下战场
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: up-down
order: 1
---

## 一、说明

&emsp;&emsp;战斗时可以使用这两个代码，分别进行某个战斗人物上场或下场；

## 二、命令

### 1、上场

&emsp;&emsp;fight.\$sys.insertFightRole(index, fightrole, teamID);

&emsp;&emsp;参数：

&emsp;&emsp;&emsp;index：上场序号（位置），-1为放在队尾；

&emsp;&emsp;&emsp;fightrole：上场的战斗人物，可以是3种格式的创建方式；

&emsp;&emsp;&emsp;teamID：为0是我方，为1是敌方；

&emsp;&emsp;返回值：

&emsp;&emsp;&emsp;成功返回创建的战斗人物，没有返回null；

### 2、下场

&emsp;&emsp;fight.\$sys.removeFightRole(index, teamID);

&emsp;&emsp;参数：同上；

&emsp;&emsp;返回值：成功返回删除的战斗人物数组，错误返回false；

## 三、注意

&emsp;&emsp;上场代码使用后，只是临时产生一个战斗人物，并不会加入到我方战斗人物里，如果需要加入，则还得使用game.createhero()命令。
