http = require 'http'

exports.makeHandler = (host, path) ->
  source =
    host: host
    path: path

  handler = (stream) ->
    req = http.get(source, (res) -> res.pipe(stream))
    console.log "FETCHING: http://#{ source.host }#{ source.path }"
    req.on('error', (e) -> console.error(e))
