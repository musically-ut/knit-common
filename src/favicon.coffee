exports.makeHandler = () ->
  handler = (stream) -> stream.endWithMime('', 'image/vnd.microsoft.icon')
