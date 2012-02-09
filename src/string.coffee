exports.makeHandler = (data, mimetype) ->
  handler = (stream) -> stream.endWithMime(data, mimetype ? 'text/plain')
