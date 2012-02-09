
  exports.makeHandler = function() {
    var handler;
    return handler = function(stream) {
      return stream.endWithMime('', 'image/vnd.microsoft.icon');
    };
  };
