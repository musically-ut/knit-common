// Generated by CoffeeScript 1.3.3
(function() {

  exports.makeHandler = function(data, mimetype) {
    var handler;
    return handler = function(stream) {
      return stream.endWithMime(data, mimetype != null ? mimetype : 'text/plain');
    };
  };

}).call(this);
