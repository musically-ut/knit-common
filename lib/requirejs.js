(function() {
  var fs, p, requirejs;

  requirejs = require('requirejs');

  fs = require('fs');

  p = require('path');

  exports.makeHandler = function(modulename, config) {
    var handler, _ref, _ref2;
    if (config == null) config = {};
    if ((_ref = config.name) == null) config.name = modulename;
    if ((_ref2 = config.out) == null) {
      config.out = "./REMOVE-this-temporary-knit-file-for-" + config.name + ".js";
    }
    return handler = function(stream) {
      return requirejs.optimize(config, function(response) {
        var fileStream;
        stream.setMime('application/javascript');
        fileStream = fs.createReadStream(config.out);
        fileStream.on('error', function(e) {
          return stream.log.error("" + err.message);
        });
        fileStream.on('close', function() {
          return fs.unlinkSync(config.out);
        });
        return fileStream.pipe(stream);
      });
    };
  };

}).call(this);
