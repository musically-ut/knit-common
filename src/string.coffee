exports.handler = (data, mimetype) ->
  handler = (put) -> put(data, mimetype ? 'text/plain')
