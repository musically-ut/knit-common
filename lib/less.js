(function() {
  var fs, less;

  less = require('less');

  fs = require('fs');

  exports.handler = function(dir, config) {
    var handler, parser, _ref, _ref2, _ref3;
    if (config == null) config = {};
    config.filename = dir;
    if (config != null) {
      if ((_ref = config.compress) == null) config.compress = false;
    }
    if (config != null) if ((_ref2 = config.paths) == null) config.paths = [];
    if ((_ref3 = config.optimization) == null) config.optimization = 1;
    parser = new less.Parser(config);
    handler = function(put) {
      var _this = this;
      return fs.readFile(config.filename, function(err, data) {
        if (err) return console.error(err);
        return parser.parse(data.toString(), function(err, tree) {
          if (err) return console.error(err);
          return put(tree.toCSS({
            compress: config.compress
          }), 'text/css');
        });
      });
    };
    return handler;
  };

}).call(this);
