https = require 'https'

exports.makeHandler = (host, path) ->
  source =
    host: host
    path: path

  handler = (stream) ->
    req = https.get(source, (res) -> res.pipe(stream))
    knit.log.info "FETCHING https://#{ source.host }#{ source.path }"
    req.on('error', (e) -> knit.log.error(e))
