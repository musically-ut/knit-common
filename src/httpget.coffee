http = require 'http'

exports.makeHandler = (host, path) ->
  source =
    host: host
    path: path

  handler = (stream) ->
    req = http.get(source, (res) -> res.pipe(stream))
    stream.log.info "FETCHING http://#{ source.host }#{ source.path }"
    req.on('error', (e) -> stream.log.error(e))
