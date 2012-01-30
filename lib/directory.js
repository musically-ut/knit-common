(function() {
  var buildRoutes, fs, mimeType, mimeTypes, p;

  fs = require('fs');

  p = require('path');

  buildRoutes = function(dir) {
    var filename, routes, _fn, _i, _len, _ref;
    routes = {};
    _ref = fs.readdirSync(dir);
    _fn = function(filename) {
      var path, stat;
      path = p.join(dir, filename);
      if (p.existsSync(path)) {
        stat = fs.statSync(path);
        if (stat.isDirectory()) {
          return routes[filename] = buildRoutes(path);
        } else if (stat.isFile()) {
          return routes[filename] = function(cb) {
            return fs.readFile(path, function(err, data) {
              if (err) {
                console.error("ERROR: " + err.message);
                return cb('', '');
              } else {
                return cb(data, mimeType(path));
              }
            });
          };
        } else {
          return console.log("IGNORE    " + path + ". Neither file nor directory.");
        }
      }
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      filename = _ref[_i];
      _fn(filename);
    }
    return routes;
  };

  mimeTypes = {
    'txt': 'text/plain',
    'html': 'text/html',
    'htm': 'text/html',
    'js': 'application/javascript',
    'css': 'style/css',
    'json': 'application/json',
    '': 'text/plain'
  };

  mimeType = function(filename) {
    return mimeTypes[(p.extname(filename)).substr(1)];
  };

  exports.handler = buildRoutes;

}).call(this);
