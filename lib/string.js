
  exports.makeHandler = function(data, mimetype) {
    var handler;
    return handler = function(stream) {
      return stream.endWithMime(data, mimetype != null ? mimetype : 'text/plain');
    };
  };
