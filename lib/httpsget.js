(function() {
  var https;

  https = require('https');

  exports.makeHandler = function(host, path) {
    var handler, source;
    source = {
      host: host,
      path: path
    };
    return handler = function(stream) {
      var req;
      req = https.get(source, function(res) {
        return res.pipe(stream);
      });
      stream.log.info("FETCHING https://" + source.host + source.path);
      return req.on('error', function(e) {
        return stream.log.error(e);
      });
    };
  };

}).call(this);
