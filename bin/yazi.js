#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var cli = require('commander'); // 命令行
var npmlog = require('npmlog');
var _ = require('lodash');


// var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
// var showjoyBase = path.join(home,'.spon');
// var pluginsBase = path.join(showjoyBase,'plugins');
// if(!fs.existsSync(pluginsBase)){
//     fs.mkdirSync(pluginsBase);
// }

require('../lib/dada-manager')(cli);

cli.parse(process.argv);
