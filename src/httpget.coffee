http = require 'http'

exports.makeHandler = (host, path) ->
  source =
    host: host
    path: path

  handler = (stream) ->
    req = http.get(source, (res) -> res.pipe(stream))
    knit.log.info "FETCHING http://#{ source.host }#{ source.path }"
    req.on('error', (e) -> knit.log.error(e))
