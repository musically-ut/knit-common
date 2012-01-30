
  exports.handler = function(data, mimetype) {
    var handler;
    return handler = function(put) {
      return put(data, mimetype != null ? mimetype : 'text/plain');
    };
  };
