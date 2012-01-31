(function() {
  var fs, mimeType, mimeTypes, p, routePath;

  fs = require('fs');

  p = require('path');

  routePath = function(path) {
    var filename, handler, stat, _fn, _i, _len, _ref;
    stat = fs.statSync(path);
    handler = void 0;
    if (stat.isDirectory()) {
      handler = {};
      _ref = fs.readdirSync(path);
      _fn = function(filename) {
        if (p.existsSync(path)) {
          return handler[filename] = routePath(p.join(path, filename));
        }
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        filename = _ref[_i];
        _fn(filename);
      }
    } else if (stat.isFile() && p.existsSync(path)) {
      handler = function(put) {
        return fs.readFile(path, function(err, data) {
          if (err) {
            console.error("ERROR: " + err.message);
            return put('', '');
          } else {
            return put(data, mimeType(path));
          }
        });
      };
    } else {
      console.log("IGNORE    " + path + ". Neither file nor directory.");
    }
    return handler;
  };

  mimeTypes = {
    'txt': 'text/plain',
    'html': 'text/html',
    'htm': 'text/html',
    'js': 'application/javascript',
    'css': 'style/css',
    'json': 'application/json',
    'coffee': 'text/coffeescript',
    '': 'text/plain'
  };

  mimeType = function(filename) {
    return mimeTypes[(p.extname(filename)).substr(1)] || 'text/plain';
  };

  exports.handler = routePath;

}).call(this);
