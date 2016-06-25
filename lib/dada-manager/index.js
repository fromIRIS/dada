var path = require('path');
var fs = require('fs');
// var cli = require('commander');

var npmlog = require('npmlog');
var _ = require('lodash');
var generatorMBPath = path.resolve(__dirname,'..' ,'generators/app');
var generatorPCPath = path.resolve(__dirname,'..' ,'generators/pc-app');
var GeneratorMB = require(generatorMBPath);
var GeneratorPC = require(generatorPCPath);
var dadaTask = require('../dada-task');
var log = console.log;


module.exports = function(cli){


  cli
    .command('mb [cmd]')
    .description('传统前端开发方案')
    .option("-p,--port [type]", "设置本地服务器端口")
    .option("-s,--sprite [type]", "构建加入雪碧图")
    .action(function(cmd, options){

      options.mb = true;
      // 由于pc端和mobile端的开发规范相同，因此大多数情况下
      // 命令可以共用
      switch(cmd){
        case 'init':

          var generator = new GeneratorMB([], {
            resolved: generatorMBPath,
            env: {
              cwd: process.cwd()
            }
          });

            generator.run();
          break;
        case 'dev':

          dadaTask('dev', options);
          break;
        case 'build':

          if (options.sprite) {
            dadaTask('buildSprite', options);  
          } else {
            dadaTask('build', options);
          }
          break;
      }

    });

    cli
    .command('pc [cmd]')
    .description('传统前端开发方案')
    .option("-p,--port [type]", "设置本地服务器端口")
    .option("-s,--sprite [type]", "构建加入雪碧图")
    .action(function(cmd, options){
      options.mb = false;
      // 由于pc端和mobile端的开发规范相同，因此大多数情况下
      // 命令可以共用
      switch(cmd){
        case 'init':

          var generator = new GeneratorPC([], {
            resolved: generatorPCPath,
            env: {
              cwd: process.cwd()
            }
          });

            generator.run();
          break;
        case 'dev':

          dadaTask('dev', options);
          break;
        case 'build':
          if (options.sprite) {
            dadaTask('buildSprite', options);  
          } else {
            dadaTask('build', options);
          }
          
          break;
        
      }

    });

    cli
    .command('build [cmd]')
    .description('传统前端开发方案')
    .option("-s,--sprite [type]", "构建加入雪碧图")
    .action(function(cmd, options){
      // 由于pc端和mobile端的开发规范相同，因此大多数情况下
      // 命令可以共用
      if (options.sprite) {
          dadaTask('buildSprite', options);  
        } else {
          dadaTask('build', options);
        }

    });

    cli
    .command('dev [cmd]')
    .description('传统前端开发方案')
    .option("-p,--port [type]", "端口")
    .action(function(cmd, options){
      
      dadaTask('dev', options);

    });
}

  



  