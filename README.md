> 前端自动化工程

## 1.0.0

```
yazi mb/pc init

yazi dev

yazi build -s 1/2

yazi build
```

## Installation


```bash
sudo npm install -g yazi
```

## Getting To Know yazi

## 初始化前端脚手架 init

1. yazi mb init 
2. yazi pc init

生成前端项目脚手架，脚手架目录：

```
[test-613]
  | -- package.json
  | -- [src]
  |     | -- [images]
  |     |     | -- [slice]
  |     | -- index.html
  |     | -- [js]
  |     |     | -- index.js
  |     | -- [less]
  |     |     | -- style.less
  |     | -- [lib]
```

当前yazi版本生成的脚手架只常规的符合commonjs规范。并没有支持vue，react等。

根据`mb/pc`不同生成的脚手架具体内容不同，比如html头信息不同。

## browser-sync实时调试 dev

1. yazi dev

调试模式下打开默认打开`localhost:8000`页面。
在调试过程中支持

 - es6编译
 - less编译
 - 书写js的commonJS规范（require）

可以在项目中进行`npm install xxx --save`
## 项目构建 build

1. yazi build -s 1
2. yazi build -s 2
3. yazi build

**yazi build**

将src文件夹内的项目文件构建并生成build文件夹。

其中包含：

 - es6编译混淆压缩
 - less编译
 - 图片压缩

**注意事项：**

需要进行雪碧图转换的图片需要放在`images/slice`文件下内，并且在css中需要使用`background-image`属性引用图片。

```
.test1 {
	width: 30px;
	height: 30px;
	background-image: url('../images/slice/img1.png');
}

```

**yazi build -s 1**

将src文件夹内的项目文件构建并生成build文件夹，并将图片转换为雪碧图，修改对应css。

此处的 `-s 1`表示`sprite`雪碧图设置，并且在普通屏幕上使用（pc和非retina屏）

**yazi build -s 2**

将src文件夹内的项目文件构建并生成build文件夹，并将图片转换为雪碧图，修改对应css。

此处的 `-s 2`表示`sprite`雪碧图设置，并且在retina屏使用。


## TODO
- [  ]  添加一些处理css的gulp插件
- [  ]  build时图片进行七牛空间自动上传。


## License

MIT © [南洋](lvdada.org)
