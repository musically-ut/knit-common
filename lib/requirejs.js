(function() {
  var fs, p, requirejs;

  requirejs = require('requirejs');

  fs = require('fs');

  p = require('path');

  exports.handler = function(modulename, config) {
    var handler, _ref, _ref2;
    if (config == null) config = {};
    if ((_ref = config.name) == null) config.name = modulename;
    if ((_ref2 = config.out) == null) config.out = '/tmp/require.js';
    return handler = function(put) {
      return requirejs.optimize(config, function(response) {
        console.log(config);
        return put(fs.readFileSync(config.out, 'utf8'), 'application/javascript');
      });
    };
  };

}).call(this);
