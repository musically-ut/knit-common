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
      console.log("FETCHING: https://" + source.host + source.path);
      return req.on('error', function(e) {
        return console.error(e);
      });
    };
  };

}).call(this);
