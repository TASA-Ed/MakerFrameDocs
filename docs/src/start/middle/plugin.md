---
title: 插件
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: puzzle-piece
order: 7
---

## 一、说明

插件是用来扩展游戏功能、界面和视图代码功能的，一般使用js和qml编写。

## 二、目录结构

工程插件一般位于 工程根目录/Plugins下，每个插件的目录结构：/分类名/插件名/，其中分类名可以写 作者名 或 公司名。插件目录下又有两个文件夹：Components和VirtualScripts，前者是游戏载入时加载的插件，后者是提供额外的视图代码的插件。

## 三、加载原理

游戏载入时，引擎会扫描并加载所有插件的Components/main.js文件。其中有一些\$开头的钩子函数，会在不同时机的时候调用：

\$load函数：在游戏刚加载完毕时调用，一般用来创建组件；

\$init函数：在游戏加载完毕后和存档载入后调用，一般用来初始化；

\$release：游戏退出前和存档载入前调用，一般用来释放；

\$unload函数：在游戏退出后调用，一般用来销毁组件；

\$timerTriggered：游戏定时器循环时自动调用，一般可以刷新数据；

还有两个变量：

\$autoLoad：是否游戏启动后自动加载（否则使用组件时才调用\$load和\$init函数）；

\$description：组件描述；

注意：

1、我写的示例组件的main.js文件是一个标准通用的格式，一般只需要修改Comp.qml来实现你的组件即可。

2、main.js中创建组件时，组件的父组件可以是game.\$sys.scene、game.\$sys.container、game.\$sys.container或具体的角色等，挂载在不同的组件下有不同的效果，具体请看main.js文件说明。

## 四、使用方式

main.js函数中，可以导入其他qml或js文件，也可以定义一些函数和变量供游戏中调用，插件的使用格式：

`game.plugin('作者名', '模块名')`

这个代码其实就是 main.js 脚本对象，你可以调用它定义的对象和函数。
