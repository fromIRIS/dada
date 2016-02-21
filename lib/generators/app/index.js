'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var npmlog = require('npmlog');
var util = require('util'); // 工具箱

/**
 * 获取git用户的信息
 * 根据远程仓库获取项目的组、名等
 * 初始化时的一些信息登记
 * 生成需要的脚手架文件夹文件等
 * 更新mobi。json
 * spon.json
 * 保存webpack.config.js
 */


var sponGenerator = module.exports = function (args, options, config) {
  yeoman.generators.Base.apply(this, arguments);


};

util.inherits(sponGenerator, yeoman.generators.Base);

var userConfig = {};

/**
 * @param  {一行命令行，相当于在终端中执行某条命令}
 * @param  {Function}
 * @return {promise}
 */
function exec_defer(cmd,cb){
  var defer = Q.defer();
  exec(cmd, function (err, stdout, stderr) {
    if(err) {
      defer.reject(err);
    }

    cb && cb(stdout,defer);
  });
  return defer.promise;
}

sponGenerator.prototype.initializing = function(){
  
};

sponGenerator.prototype.prompting = function(){

  // Have Yeoman greet the user.
  this.log('*****为您初始化 dada 项目');

  var prompts = [
    {
      type: 'input',
      name: 'q1',
      message: '你快乐吗',
      default: 'yes'
    }];

  this.prompt(prompts, function (props) {
      this.isHappy = props.q1;
    }.bind(this));

};

sponGenerator.prototype.writing = function(){

  var self = this;
  self.sourceRoot(path.join(__dirname,'./templates'));

  this.mkdir('src');
  this.mkdir('src/images');
  this.mkdir('src/images/slice');
  this.mkdir('src/js');
  this.mkdir('src/less');
  this.mkdir('src/lib');

  self.copy('index.html', path.join('src','index.html'));
  self.copy('less/style.less',path.join('src/less','style.less'));
  self.copy('js/index.js',path.join('src/js','index.js'));


  
  // self.template('_gitattributes', '.gitattributes');
  // self.template('_gitignore', '.gitignore');
  // self.template('_jshintrc', '.jshintrc');

};


