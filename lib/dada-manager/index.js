var path = require('path');
var fs = require('fs');
// var cli = require('commander');
var chalk = require('chalk');
var npmlog = require('npmlog');
var _ = require('lodash');
var generatorPath = path.resolve(__dirname,'..' ,'generators/app');
var Generator = require(generatorPath);
var dadaTask = require('../dada-task/index.js');
var webpackConfig = require('./webpack-config.js');
var log = console.log;
var cyanLog = function(msg){
  console.log(chalk.italic.cyan(msg));
};

module.exports = function(cli){

  cli
    .command('init')
    .description('初始化dada环境')
    .action(function(){
      var generator = new Generator([], {
      resolved: generatorPath,
      env: {
        cwd: process.cwd()
      }
    });

      generator.run();
    });

    cli
    .command('dev')
    .description('dada项目测试')
    .action(function(){
      dadaTask(webpackConfig);
    });
}

  



  