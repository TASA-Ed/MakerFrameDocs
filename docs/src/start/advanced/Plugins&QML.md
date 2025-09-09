---
title: 鹰歌插件/QML 教程
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: /assets/image/simpleIcons-qt.svg
order: 2
---

## 一、QML是什么

QML是Qt公司开发的主要用于快速构建界面的一种描述性语言，结合了流行的V8 JS引擎，类似HTML和CSS的结合体。

## 二、QML的代码结构

一个QML文件的代码结构由下面组成：

```qml
根组件名 { //一个QML文件有且只有一个根组件
  id: xxx  //用于 作用域内 引用这个组件
  属性名: 属性值 //将值 绑定在 组件原有的属性
  property var 变量: 值
  function 函数名(参数列表) {
  }
  signal 信号名(参数列表)

  组件名 { //定义其他组件，内容同上
    //属性、函数、信号 或 其他组件
  }
}
```

这里需要注意几点：

1、一个qml文件只有一个根组件（就是最外层只能有一个组件）；

2、每个组件有三种成员：属性、函数和信号；

3、组件可以静态创建（直接定义）也可以动态创建（这个后面讲)；

4、新组件可以用已有组件来构建；

5、一个QML文件其实就是一个组件（文件名首字母大写），一个文件夹内的所有QML文件都互相可见（创建组件可直接用QML文件名来定义）；

6、QML文件定义的组件，只有根组件的成员是对外可见的，内部组件的成员如果需要暴露，可以在根组件定义一个引用属性来引用它：

  property alias 属性名: 组件id 或 组件成员（属性或函数）

## 三、导入其他组件和JS文件

QML默认可以导入自身所在文件夹下的所有文件（非网络载入情况下），如果需要导入其他地方的组件，需要使用import：

* import '相对或绝对目录' [as Abc] //导入一个文件夹，该文件夹下的所有QML都可见；
* import QtQuick 2.14 //这种比较高级，一般导入的是系统提供的组件或框架引擎提供的组件，自己做这种组件难度比较高，详细可见Qt官方教程
* import "文件名.js" as Abc //导入一个JS脚本，脚本内的变量和函数都可以用 `Abc.xxx` 来使用；

## 四、在鹰歌Maker中使用插件

> 需要知道的是，鹰歌存放插件的文件夹目录为 `/storage/emulated/0/Leamus/MakerFrame/GameMaker/Projects/你的工程/Plugins`

插件目录为二级目录，简单来说，你需要在 `/Plugins/` 下创建一个新文件夹(建议取为个人昵称或是团队名)，进入该文件夹(存放多个属于您的插件目录)，再次创建一个插件文件夹(建议取名为英文)

大致文件结构如下：
    Plugins
    ├─Luomic
    ├──showGold
    ├─Leamus
    ├──getExp

进入插件文件夹，创建 `Components` 文件夹
在该文件夹下， `main.js` 为**必要**文件，`example.qml`为可选文件
在里面你可以自由创建文件夹(但需包含必要文件)

我们来看一下 `main.js` 的大致内容

> 您可以直接复制该代码到 `main.js` 中

```javascript

//导入qml组件
.import QtQml 2.14 as QtQml
//插件描述
var $description = '新的鹰歌插件';
var obj = null;

var intervalSum = 1000;


//载入 函数（游戏第一次运行时会执行，所以在这里创建组件）
function $load() {
    //如果需要新建一个界面，你可以使用 $load() 函数来加载一个界面
    var comp = Qt.createComponent("example.qml");
    //console.debug(comp)
    function statusChanged() {
        if (comp.status === QtQml.Component.Ready) {
            //创建组件对象
            obj = comp.createObject(game.$sys.scene);
            obj.visible = false
            //arrObjs.push(obj);
        } else if (comp.status === QtQml.Component.Error) {
            console.error(comp.errorString());
        }
    }
    if (comp.status === QtQml.Component.Loading) {
        comp.statusChanged.connect(statusChanged);
    } else {
        statusChanged();
        obj.visible = false
    }
    return null;
}

//初始化 函数（游戏运行 或 读取存档 会运行，用来初始化）
function $init() {
  console.debug('[Plugins]init');
  //注意该判断的使用是正确的，为单行判断
  if (obj)
    obj.visible = false;

  return null;
}
//释放 函数（读取存档 或 退出游戏时会执行，用来清理工作）
function $release() {
  console.debug('[Plugins]release');
  if (obj)
    obj.visible = false;

  return null;
}

//卸载 函数（读取存档 或 退出游戏时会执行，用来删除组件）
function $unload() {
  console.debug('[Plugins]unload');
  //删除组件
  if (obj)
    obj.destroy();
  obj = null;
  
  return null;
}

//定时器刷新 函数（刷新组件状态）
function $timerTriggered(interval) {

if(!game.gd["checked"]){
  obj.visible=false
  
}
  /*1秒刷一次
  intervalSum += interval;
  if (intervalSum >= 1000) {
    intervalSum = 0;
  }*/
}
```

只要你创建了 `main.js` (规范)，鹰歌在开始游戏时会自动运行 `main.js` ，所以为了避免不必要的麻烦，你或许可以尝试将 `$load()` 函数通过注释规避错误
