exports.makeHandler = () ->
  handler = (put) -> put('', 'image/vnd.microsoft.icon')
