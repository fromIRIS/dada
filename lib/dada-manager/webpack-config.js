var path = require('path');
var ROOT_PATH = process.cwd();
var BUILD_PATH = path.join(ROOT_PATH, 'build/js');
var SRC_PATH = path.join(ROOT_PATH, 'src/js');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: {
    index: SRC_PATH
  },

  output: {
    filename: '[name].min.js'
  },
  plugins: [],
  resolve: {},
  // 配置loader的目录
  resolveLoader: {
    root: path.resolve(__dirname, '..', '..', 'node_modules')
  },
  module: {
    loaders: [
      {
	      test: /\.js?$/,
	      loader: 'babel',
	      query: {
	        presets: ['babel-preset-es2015'].map(require.resolve)
	      }
	    }
    ]
  }
};