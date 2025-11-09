---
title: QML组件和对象
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: /assets/image/simpleIcons-qt.svg
order: 2
---

## 一、说明

QML组件其实就是一个QML对象，定时器、对话框、鼠标区域、包括地图、战斗界面上你看到的任何角色、动画等都是QML组件组成的，不同类型的QML组件有不同的属性，但一般都是从Item（或QtObject）继承而来，都具有一些通用的属性（比如x、y、width、height、visible、opacity、scale等）。

QML语言和QML组件的相关教程请看高级教程或其他参考教程，这节主要是讲述下自定义QML的组件如何和游戏界面结合起来。

## 二、QML组件的定义

学过QML的朋友知道，QML组件有几种定义方式：

1、QML文件（首字母大写）

首字母大写的QML文件本身就是一个组件，它可以被同目录的其他QML直接使用。

2、Component

使用Component在qml文件种定义组件并创建组件对象。

## 三、QML组件对象的创建

组件定义好后就可以用它来创建实际的组件对象了，有以下几种方式：

1、静态定义；最普通直接的方式：组件名{属性定义。。。}；

2、Loader或Repeater方式动态载入；

3、JS方式动态创建；这种相比上面两种静态定义来说，创建最为灵活，有两种创建方式：

a、使用文件定义的QML组件 let comp =Qt.createComponent(文件url)
或 定义Component{id: comp;。。。}，然后再用QML组件来创建对象comp.createObject(parent, properties)；

b、直接使用Qt.createQmlObject来创建QML组件对象。

区别：如果在QML文档中定义了现有组件，并且希望动态创建该组件的实例，最好使用a。否则使用b：当对象QML本身在运行时生成时，从QML的字符串创建对象是有用的。

## 四、与游戏中的组件对象结合

一般情况下由于静态创建的对象的parent在已经定义时已经指定，所以我们与游戏结合的对象一般用动态创建的对象（尤其是使用Qt.createQmlObject）；

动态创建组件对象的方式前面已经简单的介绍过，更详细的可以看QML教程，而重点是QML对象的parent属性，这个属性直接决定了我们创建的QML对象与谁关联，在哪显示等等。除了我们之前在“界面的层序”种介绍的四个界面对象外，还可以关联在地图角色、战斗人物、特效等等上，只需找到它们的组件并创建时传递即可。

还有个最常见的组件就是特效对象，我们定义好效果后可以直接关联到角色、特效、地图上等等，可以实现非常不错的效果（比如角色闪烁、特效淡入淡出和移动、Buff、夜晚、下雨下雪效果等等）。AVG游戏可能多需要这种效果。
