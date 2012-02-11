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
      config.out = './REMOVE-this-temporary-knit-file.js';
    }
    return handler = function(stream) {
      return requirejs.optimize(config, function(response) {
        var fileStream;
        stream.setMime('application/javascript');
        fileStream = fs.createReadStream(path);
        fileStream.on('error', function(e) {
          return knit.log.error("" + err.message);
        });
        fileStream.on('close', fs.unlinkSync(config.out));
        return fileStream.pipe(stream);
      });
    };
  };

}).call(this);
