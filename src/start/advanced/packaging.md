---
title: 打包教程
icon: boxes-packing
order: 1
---

## 一、前言

鹰歌引擎支持打包功能，原则上用什么平台开发就打包什么平台的安装包，比如 Windows 下是一个带 exe 和 bat 的文件夹（你可以自己压缩），安卓下是 apk，Linux 下是 deb（也是一堆库和环境文件）等等。

打包环境文件一般是2个压缩文件[^runtimeZip]，一般都在引擎的 Releases 页面，需要打包的下载，然后按要求和打包步骤去打包。

打包的平台中，Android 是比较麻烦的，但鹰歌也提供了半自动化处理：把两个环境放在固定目录，然后改一些参数[^androidParameter]即可，再用三方 App 来打包就行。Windows 和 Linux 相对简单，替换一下工程目录即可。

若您不知道什么是32位和64位，请自行搜索了解，简单来说就是64位的软件只能运行在64位的系统上，而现在大部分都是64位的系统，32位的软件可以同时运行在32位和64位的系统上，但在64位系统上软件性能会显著降低。

## 二、准备工作

首先你需要一个工程，没有工程是不能打包的，且此工程已经配置好游戏开始事件，不然的话你就算打包了也玩不了。

然后进入你的工程，点击工程管理，再在弹出的上下文菜单中选择打包项目。

![进入打包项目](/assets/image/docs/advanced/packaging/Packaging_Program.png)

随后会进入到这个页面中，当然，这里的 `打包Windows` 选项是没有任何作用的，它只是起到一个教程的作用，真正有用的是下面的 `打包Android`。

![选择一个选项](/assets/image/docs/advanced/packaging/Selecting_options.png)

## 三、打包 Windows 平台

就如同教程说的一样，生成 Windows 版本很简单，仅仅需要下载，解压，改名这几个操作。

首先你需要来到引擎的 Releases 页面：

<!-- @include: ../engineReleases.snippet.md -->

随后下载 `QtEnv_Win_x64_xxx.rar` \/ `QtEnv_Win_x86_xxx.rar`。

![选择下载 QtEnv](/assets/image/docs/advanced/packaging/QtEnv_Win.png)

和 `MakerFrame_GameRuntime_Win_x64_xxx.rar` \/ `MakerFrame_GameRuntime_Win_x86_xxx.rar`。

![选择下载 GameRuntime](/assets/image/docs/advanced/packaging/GameRuntime_Win.png)

下载完成后将两个压缩包解压到同一文件夹（在哪里都可以，不过路径最好不要有中文），需要注意的是两个压缩包必须为同一架构[^framework]。

![解压到同一文件夹](/assets/image/docs/advanced/packaging/Unzip_Win.png)

然后将你的工程文件夹复制到游戏目录[^binCatalog]中。

![复制工程文件夹](/assets/image/docs/advanced/packaging/1Copy_Project_Win.png)

复制完成后将你的工程文件夹改名为 `Project` ，注意大小写。

![改名](/assets/image/docs/advanced/packaging/2Rename_Win.png)

然后运行 `_运行游戏.bat` 文件，大功告成！

![双击运行](/assets/image/docs/advanced/packaging/3Start_Game_Win.png)

### 1.常见问题

* 一、引擎和游戏不能同时运行，如果你企图同时运行，那么最后运行的将会被强行关闭[^forceClose]。
* 二、如果你出现了个弹窗，提示你 由于找不到 xxx.dll ，无法继续执行代码。 那么可能是以下原因：
  * 1、作者忘记放某个 dll 文件了，那么你可以从引擎的 `bin` 目录中找到它并复制一个到你的游戏目录[^binCatalog]里的 `bin` 中，例如 `libquazip1-qt5.dll`，这个文件也可以[点此下载](/assets/dll/libquazip1-qt5.dll)。
![复制dll](/assets/image/docs/advanced/packaging/4Copy_Dll_Win.png)
  * 2、没有将两个压缩包解压在同一文件夹，解压在同一文件夹即可解决此问题
  * 3、没有解压全部文件，重新解压一次或换个压缩软件可以解决此问题。

## 四、打包 Android 平台

鹰歌支持在 Windows 和 Android 上打包到 Android 平台，不过鹰歌本身不支持打包到 APK，仅仅是做了一个半自动化的处理，例如在Windows上你还需要使用 Apktool 之类的进行打包，在Android上需要使用 Apktool M 之类的。

### 1.在 Windows 上打包

首先你需要来到引擎的 Releases 页面：

<!-- @include: ../engineReleases.snippet.md -->

随后下载 `MakerFrame_Package_Android_ALL_xxx.zip` 和 `MakerFrame_GameRuntime_Android_ALL_xxx.zip`。

![下载](/assets/image/docs/advanced/packaging/Env_Android.png)

之后将两个压缩包移动到 `<引擎文件夹>\GameMaker\Games` 中，**不要解压！**

![移动压缩包](/assets/image/docs/advanced/packaging/MoveZip_Android.png)

需要注意的是，两个压缩包的名称前缀分别要有 `MakerFrame_Package_Android_` 和 `MakerFrame_GameRuntime_Android_` ，否则引擎是无法识别出来的。

当然，两个压缩包的名称弄反了倒是也可以正常运行，但还是不推荐那么做。

记住比较小的那个是 `MakerFrame_GameRuntime_Android_xxx.zip` ，比较大的那个是 `MakerFrame_Package_Android_xxx.zip` 就行。

上述操作完成之后我们就可以来到引擎工程的打包项目界面，我们选择打包Android：

![选择 打包Android](/assets/image/docs/advanced/packaging/Select_Android.png)

之后我们会来到这个界面：

![打包Android](/assets/image/docs/advanced/packaging/Packing_Android.png)

然后按照下图的样式来填写：

![填写](/assets/image/docs/advanced/packaging/Packing_Input_Android.png)

打包文件夹的路径不能包含特殊字符，包名必须按照规范[^packageName]来写，选择完图标路径后前面会有一个 `file:///` 将它删掉就好，当然你也可以不选择图标，默认会使用引擎图标，填写完成之后点击生成即可。

如果上述复制压缩包的操作正确的话就会弹出这个弹窗：

![弹窗 选择 是](/assets/image/docs/advanced/packaging/Dialog_Android.png)

我们选择是即可，然后我们等待一会，将会弹出这个弹窗：

![成功弹窗](/assets/image/docs/advanced/packaging/Success_Android_Windows.png)

我们需要安装 [Java](https://www.java.com/zh-CN/download/) 和 [Apktool](https://apktool.org/docs/install) ，如果已安装可以跳过这个操作。

随后我们来到刚才打包的文件夹中，默认的话是 `<引擎文件夹>\GameMaker\Games\<工程文件夹名>` ，然后我们在此目录空白处右键，选择在终端中打开：

![在终端中打开](/assets/image/docs/advanced/packaging/Open_in_Terminal_Android.png)

随后在终端中输入 `apktool b` ：

![在终端中输入](/assets/image/docs/advanced/packaging/PowerShell_Android.png)

如果一切正常的话，则会输出类似以下的日志：

```bash
I: Using Apktool 2.11.1 on Game.APK with 8 threads
I: Copying raw classes.dex file...
I: Copying raw classes2.dex file...
I: Copying raw classes3.dex file...
I: Checking whether resources have changed...
I: Building resources with aapt2...
I: Building apk file...
I: Importing assets...
I: Importing lib...
I: Built apk into: .\dist\Game.APK
Press any key to continue . . .
```

意思是打包到了 `<打包文件夹>\dist\Game.APK` 中，需要注意的是，默认是没有签名的，需要用工具[^apksigner]给它签名，否则是无法安装的。

完成之后关闭终端即可。

### 2.在 Android 上打包

首先你需要来到引擎的 Releases 页面：

<!-- @include: ../engineReleases.snippet.md -->

随后下载 `MakerFrame_Package_Android_ALL_xxx.zip` 和 `MakerFrame_GameRuntime_Android_ALL_xxx.zip`。

![下载 =305x678](/assets/image/docs/advanced/packaging/Env_Android_Android.jpg)

之后将两个压缩包移动到 `<引擎文件夹>\GameMaker\Games` 中，**不要解压！**

![移动压缩包 =305x678](/assets/image/docs/advanced/packaging/MoveZip_Android_Android.jpg)

需要注意的是，两个压缩包的名称前缀分别要有 `MakerFrame_Package_Android_` 和 `MakerFrame_GameRuntime_Android_` ，否则引擎是无法识别出来的。

当然，两个压缩包的名称弄反了倒是也可以正常运行，但还是不推荐那么做。

记住比较小的那个是 `MakerFrame_GameRuntime_Android_xxx.zip` ，比较大的那个是 `MakerFrame_Package_Android_xxx.zip` 就行。

上述操作完成之后我们就可以来到引擎工程的打包项目界面，我们选择打包Android：

![选择 打包Android =305x678](/assets/image/docs/advanced/packaging/Select_Android_Android.jpg)

之后我们会来到这个界面：

![打包Android =305x678](/assets/image/docs/advanced/packaging/Packing_Android_Android.jpg)

然后按照下图的样式来填写：

![填写 =305x678](/assets/image/docs/advanced/packaging/Packing_Input_Android_Android.jpg)

打包文件夹的路径不能包含特殊字符，包名必须按照规范[^packageName]来写，图标的路径前面必须加上 `file:` 如果已经有了则不用加，当然你也可以不选择图标，默认会使用引擎图标，填写完成之后点击生成即可。

如果上述复制压缩包的操作正确的话就会弹出这个弹窗：

![弹窗 选择 是 =480x502](/assets/image/docs/advanced/packaging/Dialog_Android_Android.jpg)

我们选择是即可，然后安卓打包较慢需要耐心等待一会，将会弹出这个弹窗：

![成功弹窗 =639x480](/assets/image/docs/advanced/packaging/Success_Android_Android.jpg)

我们需要安装 [Apktool M](https://maximoff.su/apktool/?lang=zh) ，如果已安装可以跳过这个操作。

随后我们在 Apktool M 中打开弹窗中所提到的文件夹，文件夹的上方会有一个 `编译此项目`，点击它：

![点击编译此项目 =305x678](/assets/image/docs/advanced/packaging/Apktool_M_Compile.jpg)

一般我们使用默认选项，点击确定：

![使用默认选项 点击确定 =305x678](/assets/image/docs/advanced/packaging/Apktool_M_Default.jpg)

如果一切正常的话，则会输出类似以下的日志：

![点击确定 =305x678](/assets/image/docs/advanced/packaging/Apktool_M_Success.jpg)

意思是打包到了 `<打包文件夹>/Game.APK` 中，打包出的APK可以直接安装。

### 3.常见问题

* 一、无法选择图标，报错 `【Critical】[!Platform]Exception Occured: java.lang.NumberFormatException: For input string:xxx`。
  * 新版本安卓中不能从最近，图片，下载内容里面选择，只能从本机目录中选择。
* 二、Apktool M 打包报错 `W: xxx.png: error: failed to read PNG signature: file does not start with PNG signature.`
  * 这通常是因为你的图标不是一个正确的 PNG 文件，必须选择一个 PNG 文件才能继续打包。

## 五、其它

由于时间精力成本问题，目前只有 Windows、Android 的打包环境文件，如果需要其他的打包环境可以联系深林孤鹰。

本教程仍需补充。

[^runtimeZip]: 一个是 Qt 环境文件一个是引擎文件，前者一般比较大且固定，后者会随着引擎的更新而更新

[^androidParameter]: 比如包名、图标、存档位置等等，如果上架 TapTap 还得修改 TapTap 的 key 等等。

[^framework]: 例如你下载 x64 的 QtEnv，那么另外一个 GameRuntime 也必须是 x64 的。

[^forceClose]: 也就是说运行 `.bat` 文件后什么也不会发生。

[^binCatalog]: 也就是 QtEnv 和 GameRuntime 解压到的文件夹。

[^packageName]: 应用包名填写必须遵守以下限制 :

    * 必须至少包含两段（一个或多个圆点）。
    * 每段必须以字母开头。
    * 所有字符必须为字母数字或下划线 [a-zA-Z0-9_]。

[^apksigner]: 可以使用这些签名工具 :

    * [apksigner](https://developer.android.google.cn/tools/apksigner?hl=zh-cn)（Android Studio 工具）
    * [ApkSigner](https://github.com/jixiaoyong/ApkSigner)
    * [dx-signer](https://github.com/dingxiangtech/dx-signer)

<!-- markdownlint-disable-file MD007 -->
