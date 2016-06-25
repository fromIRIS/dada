'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var npmlog = require('npmlog');
var util = require('util'); // 工具箱




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
  this.log('*****为您初始化 yazi 项目');

  var prompts = [
    {
      type: 'input',
      name: 'q1',
      message: '你快乐吗',
      default: 'yes'
    }];

  // this.prompt(prompts, function (props) {
  //     this.isHappy = props.q1;
  //   }.bind(this));

};

sponGenerator.prototype.writing = function(){

  var self = this;
  self.sourceRoot(path.join(__dirname,'./templates'));  
  

  this.mkdirp('src');
  this.mkdirp('src/images');
  this.mkdirp('src/images/slice');
  this.mkdirp('src/js');
  this.mkdirp('src/less');
  this.mkdirp('src/lib');

  self.copy('index.html', path.join('src','index.html'));
  self.copy('less/style.less',path.join('src/less','style.less'));
  self.copy('js/index.js',path.join('src/js','index.js'));
  self.copy('package.json', path.resolve('src', '..', 'package.json'))

  
  // self.template('_gitattributes', '.gitattributes');
  // self.template('_gitignore', '.gitignore');
  // self.template('_jshintrc', '.jshintrc');

};


