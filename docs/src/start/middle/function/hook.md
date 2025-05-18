---
title: 事件和钩子函数
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: hockey-puck
order: 2
---

## 一、说明

游戏中包含了丰富的事件和钩子函数，事件就是在特定的条件下自动触发并调用相关函数，钩子函数类似事件，但我这里将它们归为一种东西（但事件更倾向于一种命名）。

## 二、地图上的事件处理函数

* 地图上的事件包含以下种类：
  * \$start：表示载入事件（地图载入或游戏载入）；
  * \$end：表示离开地图事件；
  * \$地图块事件名：表示主角进入地图事件块时的事件（对应的角色脚本事件函数名是：\$地图块事件名_map）；
  * \$地图块事件名_leave：表示主角离开地图块事件时的事件（对应的角色脚本事件函数名是：\$地图块事件名_map_leave）；
  * \$NPCid：表示主角与NPC对话时的事件（对应的角色脚本事件函数名是\$interactive）；
  * \$map_click：地图点击事件；
  * \$角色id_click：角色点击事件（对应的角色脚本事件函数名是\$click）；
  * \$NPCid_collide：NPC 与 主角/NPC 的触碰事件（对应的角色脚本事件函数名是\$collide）；
  * \$角色id_collide_obstacle：角色 与 地图障碍/边界 的碰撞事件（对应的角色脚本事件函数名是\$collide_obstacle）；
  * \$角色id_arrive：角色自动行走到达目的地时触发的事件（对应的角色脚本事件函数名是\$arrive）；
  * 定时器名：创建定时器后会自动调用定时器事件（包括全局和地图定时器）；
  * 特有全局事件（`game.gf`）：这些事件会在上述对应事件触发后仍会触发。
    * \$地图块事件名_map：地图块事件；
    * \$地图块事件名_map_leave：地图块离开事件；
    * \$collide：主角与NPC碰撞事件；
    * \$collide_obstacle：主角 与 地图障碍/边界 的碰撞事件；

上面的事件的触发函数，一般会依次在地图脚本、game.f、game.gf中搜寻，找到后只调用一次便结束，没有则不会触发。

## 三、主角或角色的动作的6个回调函数

### 1、在脚本中定义

在角色脚本`role.js`中定义

```js
//角色/主角 动作开始回调函数（主角行动或调用了playAction）
//参数actionName是动作名；
function $action_start(actionName) {
    console.debug('action_start:', actionName);
}

//角色/主角 动作刷新回调函数（主角行动或调用了playAction）
//参数currentFrame是当前帧数，actionName是动作名；

function $action_refresh(currentFrame, actionName) {
    console.debug('action_refresh:', currentFrame, actionName);
}

//角色/主角 动作循环一遍回调函数（主角行动或调用了playAction）
//参数actionName是动作名；

function $action_loop(actionName) {
    console.debug('action_loop:', actionName);
}

//角色/主角 动作结束回调函数（前提是调用playAction并设置了loops参数
//参数actionName是动作名；

function $action_finish(actionName) {
    console.debug('action_finish:', actionName);
}


//角色/主角 动作暂停回调函数（调用了pauseAction）
//参数actionName是动作名；

function $action_pause(actionName) {
    console.debug('action_pause:', actionName);
}

//角色/主角 行动停止回调函数（调用了stopAction或动作结束）
//参数actionName是动作名；

function $action_stop(actionName) {
    console.debug('action_stop:', actionName);
}
```

### 2、在其他脚本上定义

可以在`init.js`、`game.gf`、`game.f`、地图脚本上定义的，和上面效果一样的回调函数名

`role`表示角色，`hero`表示主角

```js
function $hero_角色名_action_start(actionName)
function $hero_角色名_action_refresh(currentFrame, actionName)
function $hero_角色名_action_loop(actionName)
function $hero_角色名_action_finish(actionName)
function $hero_角色名_action_pause(actionName)
function $hero_角色名_action_stop(actionName)

function $role_角色名_action_start(actionName)
function $role_角色名_action_refresh(currentFrame, actionName)
function $role_角色名_action_loop(actionName)
function $role_角色名_action_finish(actionName)
function $role_角色名_action_pause(actionName)
function $role_角色名_action_stop(actionName)
```

### 示例

1、如果需要走路停止后播放站立动作，这样写：

```js
function $action_stop(actionName, role) {
  //console.warn(actionName)
  switch(actionName) {
    case '$Up':
      role.playAction('向上站立');
      break;
    case '$Down':
      role.playAction('向下站立');
      break;
    case '$Left':
      role.playAction('向左站立');
      break;
    case '$Right':
      role.playAction('向右站立');
      break;
  }
}
```

2、如果需要同步另一个角色（比如刀剑）

```js
function $action_refresh(currentFrame, actionName, role) {
    goods.changeAction(actionName);
    goods.sprite.nCurrentFrame = currentFrame;
}
```

## 四、钩子函数

也可以称为系统函数，这个就多了，比如通用脚本里带\$前缀的基本都是钩子函数，战斗脚本中的 战斗初始化函数、战斗开始函数、战斗回合函数、战斗结束函数
都可以称为钩子函数，这些钩子函数可以是 普通函数（会立即执行），
也可以是生成器函数（放在事件队列中执行，比 普通函数 更强一些，比如可以用 yield 来异步消息框、选择框等等。

## 五、钩子函数的种类

钩子函数有两种：带\*号的生成器和不带\*号的函数；区别：

* 带\*号的是生成器回在脚本队列中运行，可以直接使用yield命令来调用game.msg这些指令；
* 不带\*号的是函数，不在脚本队列中运行，而是回立即运行，但是不能用yield来使用game.msg，不过可以用 game.run 来运行一个生成器，和上面是一样的功能。

一般情况下使用带\*号的生成器，这样保证函数在脚本队列中运行保证顺序和稳定性，特殊情况下可以使用函数（比如需要立即运行）；
