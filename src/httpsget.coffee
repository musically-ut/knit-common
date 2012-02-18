https = require 'https'

exports.makeHandler = (host, path) ->
  source =
    host: host
    path: path

  handler = (stream) ->
    req = https.get(source, (res) -> res.pipe(stream))
    stream.log.info "FETCHING https://#{ source.host }#{ source.path }"
    req.on('error', (e) -> stream.log.error(e))
