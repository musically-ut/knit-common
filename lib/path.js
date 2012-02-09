(function() {
  var defaultMimeTypes, fs, matchMimeType, p, routePath;

  fs = require('fs');

  p = require('path');

  routePath = function(path, config) {
    var filename, handler, stat, _fn, _i, _len, _ref, _ref2;
    if (config == null) config = {};
    if ((_ref = config.mimeTypes) == null) config.mimeTypes = {};
    stat = fs.statSync(path);
    handler = void 0;
    if (stat.isDirectory()) {
      handler = {};
      _ref2 = fs.readdirSync(path);
      _fn = function(filename) {
        if (p.existsSync(p.join(path, filename))) {
          return handler[filename] = routePath(p.join(path, filename));
        }
      };
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        filename = _ref2[_i];
        _fn(filename);
      }
    } else if (stat.isFile() && p.existsSync(path)) {
      handler = function(stream) {
        var fileStream, match, mimeTypes, type, _ref3;
        mimeTypes = {};
        for (match in defaultMimeTypes) {
          type = defaultMimeTypes[match];
          mimeTypes[match] = type;
        }
        _ref3 = config.mimeTypes;
        for (match in _ref3) {
          type = _ref3[match];
          mimeTypes[match] = type;
        }
        type = matchMimeType(path, mimeTypes, 'text/plain');
        stream.setMime(type);
        fileStream = fs.createReadStream(path);
        fileStream.on('error', function(e) {
          return console.error("ERROR: " + err.message);
        });
        return fileStream.pipe(stream);
      };
    } else {
      console.log("IGNORE    " + path + ". Neither file nor directory.");
    }
    return handler;
  };

  matchMimeType = function(path, types, defaultType) {
    var e, t, ts;
    ts = (function() {
      var _results;
      _results = [];
      for (e in types) {
        t = types[e];
        if ((new RegExp("" + e + "$")).test(path)) _results.push([e.length, t]);
      }
      return _results;
    })();
    ts.sort();
    if (ts.length > 0) {
      return ts.pop()[1];
    } else {
      return defaultType;
    }
  };

  defaultMimeTypes = {
    '.txt': 'text/plain',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.css': 'text/css',
    '.coffee': 'text/coffeescript',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.xhtml': 'application/xhtml+xml',
    '.xml': 'application/xml',
    '.gif': 'image/gif',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/vnd.microsoft.icon'
  };

  exports.makeHandler = routePath;

}).call(this);
