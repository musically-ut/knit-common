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
      return https.get(source, function(res) {
        res.on('data', function(d) {
          return stream.write(d);
        });
        return res.on('end', function() {
          return stream.end();
        });
      }).on('error', function(e) {
        return console.error(e);
      });
    };
  };

}).call(this);
