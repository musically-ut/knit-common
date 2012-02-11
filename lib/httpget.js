(function() {
  var http;

  http = require('http');

  exports.makeHandler = function(host, path) {
    var handler, source;
    source = {
      host: host,
      path: path
    };
    return handler = function(stream) {
      var req;
      req = http.get(source, function(res) {
        return res.pipe(stream);
      });
      knit.log.info("FETCHING http://" + source.host + source.path);
      return req.on('error', function(e) {
        return knit.log.error(e);
      });
    };
  };

}).call(this);
