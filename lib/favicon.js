
  exports.makeHandler = function() {
    var handler;
    return handler = function(put) {
      return put('', 'image/vnd.microsoft.icon');
    };
  };
