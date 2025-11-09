---
title: 游戏命令详解
author:
  name: 深林孤鹰
  url: https://github.com/leamus
icon: gamepad
date: 2024-08-14
order: 4
---

## 一、说明

### 设置操作

功能：设置操作，遥感可用和可见、键盘可用；

参数：

- `$gamepad` 的 `$visible` 和 `$enabled`，`$keyboard` 的 `$enabled`；
- 参数为空则返回遥感组件，可自定义；

```js
game.control(config={});
```

### 显示窗口

功能：显示一个窗口；

参数：

- `params`
  - `$id`：0b1为主菜单；0b10为战斗人物信息；0b100为道具信息；0b1000为系统菜单；
  - `$value`：战斗人物信息时为下标；
  - `$visible`：为false表示关闭窗口；
- `style`：样式
  - 包括 `MaskColor`、`BorderColor`、`BackgroundColor`、`ItemFontSize`、`ItemFontColor`、`ItemBackgroundColor1`、`ItemBackgroundColor2`、`TitleFontSize`、`TitleBackgroundColor`、`TitleFontColor`、`ItemBorderColor`；
- `pauseGame`：是否暂停游戏；

示例：

```js
game.window(params=null, style={}, pauseGame=true);
```

### 存档

功能：将 `game.gd` 存为文件，开头为 $$ 的键不会保存；

参数：

- `showName`：显示名；
- `compressionLevel`：压缩级别（1-9，-1为默认，0为不压缩）；

返回：成功返回true 或 存储字符串；

示例：

```js
// 存档（将game.gd存为 文件，开头为 $$ 的键不会保存）
yield game.save(文件名, showName="", compressionLevel=-1);
```

### 读档

功能：读取数据到 `game.gd`；

返回：成功返回true，失败返回false；

示例：

```js
// 读档（读取数据到 game.gd）
yield game.load(文件名);
```

### 检查存档

功能：检测存档是否存在且正确；

返回：失败返回false，成功返回存档对象（包含 `Name` 和 `Data`）；

示例：

```js
// 检测存档是否存在且正确
game.checksave(文件名);
```

### 读取json文件

功能：读取一个JSON文件；

参数：

- `fileName`：**绝对或相对路径**的文件名；
- `filePath`：文件的**绝对路径**，如果为空，则 `fileName` 为相对于本项目根路径；

返回：失败返回null，成功返回解析后对象；

示例：

```js
// 读取json文件
game.loadjson(fileName, filePath="");
```

### 执行脚本命令

功能：执行脚本命令（注意：此命令会将脚本放入game系统脚本引擎中等候执行，一般用来在Maker中载入外部脚本文件）；

示例：

```js
game.run(vScript, scriptProps=-1, ...params);
```

### 执行脚本文件

功能：执行脚本文件（注意：此命令会将脚本放入game系统脚本引擎中等候执行，一般用来在Maker中载入外部脚本文件）；

参数：

- `fileName`：**绝对或相对路径**的文件名；
- `filePath`：文件的**绝对路径**，如果为空，则 `fileName` 为相对于本项目根路径；

示例：

```js
// 执行脚本文件
game.script(fileName, filePath);

// 脚本上次返回的值
game.lastreturn;
// 脚本上次返回的值（return+yield）
game.lastvalue;
```

### 立即执行脚本命令

功能：立即执行脚本命令；

参数：

- `filePath`：为异常时提供的文件名（目前不支持字符串中的函数异常）；
- `envs`：是额外的上下文环境；

返回：失败返回 `null`，成功返回结果；

注意：和 `game.evaluate` 的区别是，这个执行时自带所有的上下文环境；

示例：

```js
game.evalcode(data, filePath="", envs={});
```

### 立即执行脚本文件

功能：立即执行脚本文件；

参数：

- `fileName`：**绝对或相对路径**的文件名；
- `filePath`：文件的**绝对路径**，如果为空，则 `fileName` 为相对于本项目根路径；
- `envs`：是额外的上下文环境；

返回：失败返回 `null`，成功返回结果；

注意：和 `game.evaluateFile` 的区别是，这个执行时自带所有的上下文环境；

示例：

```js
game.evalfile(fileName, filePath="", envs={});
```

### 用C++执行脚本命令

功能：用C++执行 `program` 脚本命令（类似 `evalcode`）。在初始化时已注入 `game` 上下文环境；优点是异常时可提供文件路径；

注意：初学者不要用；

示例：

```js
game.evaluate(program, filePath="", lineNumber = 1);
```

### 用C++执行脚本文件

功能：用C++执行脚本文件（类似 `evalfile`）；在初始化时已注入 `game` 上下文环境；优点是异常时可提供文件路径；

注意：初学者不要用；

示例：

```js
game.evaluateFile;
```

### 用C++导入脚本

功能：用C++导入一个脚本（脚本可以使用 `import` 和 `export` 指令，但只能导入一次，也不能卸载，所以不方便调试）；

注意：初学者不要用；

示例：

```js
game.importModule;
```
