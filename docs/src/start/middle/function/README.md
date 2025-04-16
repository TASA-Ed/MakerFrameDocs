---
title: 游戏命令详解
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: terminal
index: false
order: 2
---

## 一、说明

功能：载入地图资源名为mapRID的地图并执行地图载入事件$start。
参数：userData是用户传入数据，后期调用的钩子函数会传入；
  forceRepaint表示是否强制重绘（为false时表示如果mapRID与现在的相同，则不重绘）；
返回：Promise对象（完全载入后状态改变；出错会抛出错误），携带值为地图信息；
示例：yield game.loadmap('地图资源名');

```
yield game.loadmap(mapRID, userData, forceRepait=false)
```

功能：在屏幕中间显示提示信息；命令用yield关键字修饰表示命令完全运行完毕后再进行下一步。
参数：msg为提示文字，支持HTML标签；
  interval为文字显示间隔，为0则不使用；
  pretext为预显示的文字；
  keeptime：如果为-1，表示点击后对话框会立即显示全部，为0表示等待显示完毕，为>0表示显示完毕后再延时KeepTime毫秒然后自动消失；
  style为样式；
    如果为数字，则含义为Type，表示自适应宽高（0b1为宽，0b10为高），否则固定大小；
    如果为对象，则可以修改BackgroundColor、BorderColor、FontSize、FontColor、MaskColor、Type；
      分别表示 背景色、边框色、字体颜色、字体大小、遮盖色、自适应类型、持续时间；
  pauseGame为显示时是否暂停游戏（游戏主循环暂停，并暂停产生游戏事件）；值为true、false或字符串。如果为true或字符串则游戏会暂停（字符串表示暂停值，不同的暂停值互不影响，只要有暂停值游戏就会暂停；true表示给个随机暂停值）；
  callback是结束时回调函数，如果为非函数则表示让系统自动处理（销毁组件并继续游戏）；
    如果是自定义函数，参数为cb, ...params，cb表示系统处理（销毁组件并继续游戏），请在合适的地方调用 cb(...params)；
返回：Promise对象（完全载入后状态改变；出错会抛出错误），$params属性为消息框组件对象；如果参数msg为true，则直接创建组件对象并返回（需要自己调用显示函数）；
示例：yield game.msg('你好，鹰歌');

```
[yield] game.msg(msg='', interval=20, pretext='', keeptime=0, style={Type: 0b10}, pauseGame=true, callback=true);
```

功能：在屏幕下方显示对话信息；命令用yield关键字修饰表示命令完全运行完毕后再进行下一步。
参数：role为角色名或角色对象（会显示名字和头像），可以为null（不显示名字和头像）；
  msg同命令msg的参数；
  interval同命令msg的参数；
  pretext同命令msg的参数；
  keeptime同命令msg的参数；
  style为样式，包括BackgroundColor、BorderColor、FontSize、FontColor、MaskColor、Name、Avatar；
    分别表示 背景色、边框色、字体颜色、字体大小、遮盖色、自适应类型、持续时间、是否显示名字、是否显示头像；
  pauseGame同命令msg的参数；
  callback同命令msg的参数；
返回：同命令msg的返回值；
示例：yield game.talk('你好，鹰歌')；

`[yield] game.talk(role=null, msg='', interval=20, pretext='', keeptime=0, style=null, pauseGame=true, callback=true);`

功能：角色头顶显示文字信息。
参数：role为角色名或角色对象；
  msg同命令msg的参数；
  interval同命令msg的参数；
  pretext同命令msg的参数；
  keeptime：同命令msg的参数；
  style为样式，包括BackgroundColor、BorderColor、FontSize、FontColor；
    分别表示 背景色、边框色、字体颜色、字体大小；
返回：角色组件对象；
示例：game.say('角色名', '你好')；

`game.say(role, msg, interval=60, pretext='', keeptime=1000, style={});`

功能：显示一个菜单；命令用yield关键字修饰表示命令完全运行完毕后再进行下一步。
参数：title为显示文字；
  items为选项数组；
  style为样式，包括MaskColor、BorderColor、BackgroundColor、ItemFontSize、ItemFontColor、ItemBackgroundColor1、ItemBackgroundColor2、TitleFontSize、TitleBackgroundColor、TitleFontColor、ItemBorderColor、ItemHeight、TitleHeight；
  pauseGame同命令msg的参数；
  callback同命令msg的参数；
返回：Promise对象（完全运行完毕后状态改变；携带值为选择的下标，0起始；出错会抛出错误），\$params属性为消息框组件对象；如果参数title为true，则直接创建组件对象并返回（需要自己调用显示函数）；
示例：let choiceIndex = yield game.menu('标题', ['选项A', '选项B'])；

`yield game.menu(title='', items=[], style={}, pauseGame=true, callback=true);`

功能：显示一个输入框；命令用yield关键字修饰表示命令完全运行完毕后再进行下一步。
参数：title为显示文字；
  pretext为预设文字；
  style为自定义样式；
  pauseGame同msg的参数；
  callback同msg的参数；
返回：Promise对象（完全运行完毕后状态改变；携带值为输入的字符串；出错会抛出错误），$params属性为消息框组件对象；如果参数title为true，则直接创建组件对象并返回（需要自己调用显示函数）；
示例：let inputText = yield game.input('标题')；

`yield game.input(title='', pretext='', style={}, pauseGame=true, callback=true);`

功能：创建地图主角。
参数：
  role为 角色资源名 或 标准创建格式的对象。
    参数对象属性：\$id、\$name、\$showName、\$scale、\$speed、\$penetrate、\$realSize、\$avatar、\$avatarSize、\$x、\$y、\$bx、\$by、\$direction、\$action、\$targetBx、\$targetBy、\$targetX、\$targetY、\$targetBlocks、\$targetPositions、\$targetBlockAuto；
    RID为要创建的角色资源名；
    \$id为角色对象id（默认为\$name值），id存在则会复用组件；\$name为游戏显示名（默认为RID值）；
    \$showName为是否头顶显示名字；\$scale为缩放倍率数组（横竖坐标轴方向）；\$speed为移动速度；\$penetrate为是否可穿透；\$realSize为影子大小；\$avatar为头像文件名；\$avatarSize为头像大小；这几个属性会替换已设置好的角色资源的属性；
    \$x、\$y是像素坐标；\$bx、\$by是地图块坐标（像素坐标和块坐标设置二选一）；
    \$direction表示面向方向（0、1、2、3分别表示上右下左）；
    \$action：
      为0表示暂时静止；为1表示随机移动；为-1表示禁止移动和操作；
      为2表示定向移动；此时（用其中一个即可）：
        \$targetBx、\$targetBy为定向的地图块坐标
        \$targetX、\$targetY为定向的像素坐标；
        \$targetBlocks为定向的地图块坐标数组;
        \$targetPositions为定向的像素坐标数组;
        \$targetBlockAuto为定向的地图块自动寻路坐标数组；
    $start表示角色是否自动动作（true或false)；
返回：成功为组件对象，失败为false。
示例：let h = game.createhero({RID: '角色资源名', 。。。其他属性});
  let h = game.createhero('角色资源名');   //全部使用默认属性；
`game.createhero(role={});`

功能：返回/修改 地图主角组件对象。
参数：hero可以是下标，或字符串（主角的\$id），或主角组件对象，-1表示返回所有主角组件对象数组；
  props：hero不是-1时，为修改单个主角的属性，同 createhero 的第二个参数对象；
返回：经过props修改的 主角 或 所有主角的列表；如果没有则返回null；出错返回false；
示例：let h = game.hero('主角名');
  let h = game.hero(0, {\$bx: 10, \$by: 10, \$showName: 0, 。。。其他属性});
`game.hero(hero=-1, props={});`

功能：删除地图主角；
参数：hero可以是下标，或主角的\$id，或主角组件对象，-1表示所有主角；
返回：删除成功返回true；没有或错误返回false；
示例：game.delhero('地图主角名');
game.delhero(hero=-1);

功能：将主角移动到地图 bx、by 位置。
参数：bx、by为目标地图块；如果超出地图，则自动调整；
示例：game.movehero(6,6);
game.movehero(bx, by, index=0);

功能：创建地图NPC。
参数：role为 角色资源名 或 标准创建格式的对象（RID为角色资源名）；
  参数对象属性：同createhero参数；
成功为组件对象，失败为false。
game.createrole(role={});

功能：返回/修改 地图NPC组件对象。
参数：role可以是字符串（NPC的\$id），或NPC组件对象，-1表示返回所有NPC组件对象数组；
  props：role不是-1时，为修改单个NPC的属性，同 createhero 的第二个参数对象；
返回：经过props修改的 NPC 或 所有NPC的列表；如果没有则返回null；出错返回false；
示例：let h = game.role('NPC的\$id');
  let h = game.role('NPC的\$id', {\$bx: 10, \$by: 10, \$showName: 0, 。。。其他属性});

game.role(role=-1, props={});

功能：删除地图NPC；
参数：role可以是NPC的$id，或NPC组件对象，-1表示当前地图所有NPC；
返回：删除成功返回true；没有或错误返回false；
示例：game.delhero('地图NPC的$id');
game.delrole(role=-1);

功能：将NPC移动到地图 bx、by 位置。
参数：bx、by为目标地图块；如果超出地图，则自动调整；
示例：game.moverole('NPC的\$id',6,6);
game.moverole(bx, by, role);

功能：返回角色的各种坐标，或判断是否在某个地图块坐标上；
参数：
  role为角色组件（可用hero和role命令返回的组件）；
    如果为数字或空，则是主角；如果是字符串表示$id，会在 主角和NPC 中查找；
  pos为[bx,by]，返回角色是否在这个地图块坐标上；如果为空则表示返回角色中心所在各种坐标；
返回：如果是判断，返回true或false；如果返回是坐标，则包括x、y（实际坐标）、bx、by（地图块坐标）、cx、cy（中心坐标）、rx1、ry2、rx2、ry2（影子的左上和右下坐标）、sx、sy（视窗中的坐标）；出错返回false；
game.rolepos(role, pos=null);

功能：创建一个战斗主角，并放入我方战斗队伍。
参数：fightrole为战斗主角资源名 或 标准创建格式的参数对象（具有RID、Params和其他属性）。
返回：战斗主角对象。
示例：game.createfighthero('战斗角色1'); game.createfighthero({RID: '战斗角色2', Params: {级别: 6}, \$name: '鹰战士'});
game.createfighthero(fightrole);

功能：删除我方战斗队伍中的一个战斗主角。
参数：fighthero为下标，或战斗角色的\$name，或战斗角色对象，或-1（删除所有战斗主角）。
返回：成功返回true；错误或没找到返回false。
示例：game.delfighthero(0); game.delfighthero('鹰战士');
game.delfighthero(fighthero);

功能：返回我方战斗队伍中的战斗主角；
参数：fighthero为下标，或战斗角色的name，或战斗角色对象，或-1（返回所有战斗主角）；
  type为0表示返回 对象，为1表示只返回名字（可用作选择组件）；
返回：战斗角色对象、名字字符串或数组；false表示没找到或出错；
示例：let h = game.fighthero('鹰战士');
  let h = game.fighthero(0);
  let arrNames = game.fighthero(-1, 1);
game.fighthero(fighthero=-1, type=0);

//获得技能；
//fighthero为下标，或战斗角色的name，或战斗角色对象；
//skill为技能资源名，或 标准创建格式的对象（带有RID、Params和其他属性），或技能本身（带有\$rid）；
//skillIndex为替换到第几个（如果为-1或大于已有技能数，则追加）；
//copyedNewProps是 从skills复制的创建的新技能的属性（skills为技能对象才有效，复制一个新技能同时再复制copyedNewProps属性）；
//成功返回true；
game.getskill(fighthero, skill, skillIndex=-1, copyedNewProps={});

//移除技能；
//fighthero为下标，或战斗角色的name，或战斗角色对象；
//skill：技能下标（-1为删除所有 符合filters 的 技能），或 技能资源名（符合filters 的 技能）；
//filters：技能条件筛选；
//成功返回skill对象的数组；失败返回false；
game.removeskill(fighthero, skill=-1, filters={});

//返回技能信息；
//fighthero为下标，或战斗角色的name，或战斗角色对象；
//skill：技能下标（-1为所有 符合filters 的 技能），或 技能资源名（符合filters 的 技能）；
//filters：技能条件筛选；
//成功返回 技能数组；
game.skill(fighthero, skill=-1, filters={});

//战斗角色修改属性；
//  fighthero为下标，或战斗角色的name，或战斗角色对象；
//  props：对象；Key可以为 属性 或 属性,下标，Value可以为 数字（字符串属性或n段属性都修改） 或 数组（针对n段属性，对应修改）；
//    支持格式：{HP: 6, HP: [6,6,6], 'HP,2': 6}
//  type为1表示加，为2表示乘，为3表示赋值，为0表示将n段值被n+1段值赋值；
//  type如果为数组，第一个值为上面的含义，第二个表示乘的时候 参考属性（0为properties，1为propertiesWithExtra）；
//  flags：从左到右：是否检测升级，是否调用刷新函数（如果修改一些不用刷新的属性，就不用刷新）；
//  成功返回战斗角色对象；失败返回false；
game.addprops(fighthero, props={}, type=[1,1], flags=0b11);

//背包内 获得 count个道具；返回背包中 改变后 道具个数，返回false表示错误。
//goods可以为 道具资源名、 或 标准创建格式的对象（带有RID、Params和其他属性），或道具本身（带有\$rid），或 下标；
//count为0表示使用goods内的\$count；
game.getgoods(goods, count=0);

//背包内 减去count个道具，返回背包中 改变后 道具个数；
//goods可以为 道具资源名、道具对象 和 下标；
//count为个数，如果为true则表示道具的所有；
//如果 装备数量不够，则返回<0（相差数），原道具数量不变化；
//返回 false 表示错误；
game.removegoods(goods, count=1);

//获得道具列表中某项道具信息；
//goods为-1表示返回所有道具的数组（此时filters是道具属性的过滤条件）；
//goods为数字（下标），则返回单个道具信息的数组；
//goods为字符串（道具资源名），返回所有符合道具信息的数组（此时filters是道具属性的过滤条件）；
//返回格式：道具数组。
game.goods(goods=-1, filters={});

//使用道具（会执行道具use脚本）；
//fighthero为下标，或战斗角色的name，或战斗角色对象，也可以为null或undefined；
//goods可以为 道具资源名、道具对象 和 下标。
game.usegoods(fighthero, goods);

//直接装备一个道具（不是从背包中）；
//fighthero为下标，或战斗角色的name，或战斗角色对象；
//goods可以为 道具资源名、 或 标准创建格式的对象（带有RID、Params和其他属性），或道具本身（带有\$rid），或 下标；
//newPosition：如果为空，则使用 goods 的 position 属性来装备；
//copyedNewProps是 从goods复制的创建的新道具的属性（goods为道具对象才有效，复制一个新道具同时再复制（覆盖）copyedNewProps属性，比如\$count、\$position）；
//返回null表示错误；
//注意：会将目标装备移除，需要保存则先unload到getgoods；
game.equip(fighthero, goods, newPosition=undefined, copyedNewProps={\$count: 1});

//卸下某装备（所有个数），返回装备对象，没有返回undefined；
//fighthero为下标，或战斗角色的name，或战斗角色对象；
//返回旧装备；
game.unload(fighthero, positionName);

//返回某 fighthero 的装备；如果positionName为null，则返回所有装备的数组；
//fighthero为下标，或战斗角色的name，或战斗角色对象；
//返回格式：全部装备的数组 或 某一个位置的装备；
//错误返回false。
game.equipment(fighthero, positionName=null);

//进入交易界面；
//goods为买的物品rid列表；
//mygoodsinclude为true表示可卖背包内所有物品，为数组则为数组中可交易的物品列表；
//callback为交易结束后的脚本。
//pauseGame为是否暂停游戏；值为true、false或字符串。如果为true或字符串则表示需要暂停等待结束，命令建议用yield关键字修饰；如果为false，则尽量不要用yield关键字；
game.trade(goods=[], mygoodsinclude=true, pauseGame=true, callback=true);

//获得金钱；返回金钱数目；
game.money(m);

//创建定时器；
//timerName：定时器名称；interval：定时器间隔；times：触发次数（-1为无限）；bGlobal：是否是全局定时器；params为自定义参数（回调时传入）；
//成功返回true；如果已经有定时器则返回false；
game.addtimer(timerName, interval, times=1, bGlobal=false, params=null);

//删除定时器。
game.deltimer(timerName, bGlobal=false);

//播放音乐；
//musicParams是音乐名或对象（包含RID）；为空表示开始播放之前停止的；
//  musicParams为对象包含两个属性：
//    \$loops为循环次数，空或0表示无限循环；
//    \$callback为状态回调函数；
//成功返回true。
game.playmusic(musicParams);

//停止音乐。
game.stopmusic();

//暂停音乐。
//参数name为暂停名称。
game.pausemusic(name='\$user');

//继续播放音乐。
//参数name为暂停名称。
game.resumemusic(name='\$user');

//将音乐暂停并存栈。一般用在需要播放战斗音乐前。
game.pushmusic();
//播放上一次存栈的音乐。一般用在战斗结束后（\$commonFightEndScript已调用，不用写在战斗结束脚本中）。
game.popmusic();
//跳到播放进度（毫秒）
game.seekmusic(offset=0);

//状态
game.musicplaying();
game.musicpausing();

## 二、目录结构

&emsp;&emsp;

## 三、加载原理

&emsp;&emsp;

## 四、使用方式

&emsp;&emsp;
