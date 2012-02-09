(function() {
  var fs, less;

  less = require('less');

  fs = require('fs');

  exports.makeHandler = function(dir, config) {
    var handler, parser, _ref, _ref2, _ref3;
    if (config == null) config = {};
    config.filename = dir;
    if ((_ref = config.compress) == null) config.compress = false;
    if ((_ref2 = config.paths) == null) config.paths = [];
    if ((_ref3 = config.optimization) == null) config.optimization = 1;
    parser = new less.Parser(config);
    handler = function(stream) {
      var _this = this;
      return fs.readFile(config.filename, function(err, data) {
        if (err) return console.error(err);
        return parser.parse(data.toString(), function(err, tree) {
          if (err) return console.error(err);
          stream.setMime('text/css');
          return stream.end(tree.toCSS({
            compress: config.compress
          }));
        });
      });
    };
    return handler;
  };

}).call(this);
