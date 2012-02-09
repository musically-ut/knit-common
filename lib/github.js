(function() {
  var https;

  https = require('https');

  exports.makeHandler = function(username, reponame, ref, filename) {
    var handler, source;
    source = {
      host: "raw.github.com",
      path: "/" + username + "/" + reponame + "/" + ref + "/" + filename
    };
    return handler = function(stream) {
      var req;
      req = https.get(source, function(res) {
        return res.pipe(stream);
      });
      console.log("FOREIGN REQUEST: https://" + source.host + source.path);
      return req.on('error', function(e) {
        return console.error(e);
      });
    };
  };

}).call(this);