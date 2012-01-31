(function() {
  var fs, p, requirejs;

  requirejs = require('requirejs');

  fs = require('fs');

  p = require('path');

  exports.handler = function(modulename, config) {
    var handler, _ref, _ref2;
    if (config == null) config = {};
    if ((_ref = config.name) == null) config.name = modulename;
    if ((_ref2 = config.out) == null) {
      config.out = './REMOVE-this-temporary-knit-file.js';
    }
    return handler = function(put) {
      return requirejs.optimize(config, function(response) {
        var data;
        console.log(config);
        data = fs.readFileSync(config.out, 'utf8');
        fs.unlinkSync(config.out);
        return put(data, 'application/javascript');
      });
    };
  };

}).call(this);
