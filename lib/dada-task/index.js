var dev = require('./dev.js');
var build = require('./build.js');
var buildSprite = require('./buildSprite.js');

module.exports = function (order, config) {
  var orderObj = {
    'dev': dev,
    'build': build,
    'buildSprite': buildSprite
  };

  orderObj[order](config);

}