https = require 'https'

# GitHub files can be retrieved as:
# https://raw.github.com/<username>/<reponame>/<ref>/<filename>

exports.makeHandler = (username, reponame, ref, filename) ->
  source =
    host: "raw.github.com"
    path: "/#{ username }/#{ reponame }/#{ ref }/#{ filename }"

  handler = (stream) ->
    req = https.get(source, (res) -> res.pipe(stream))
    knit.log.info "FETCHING https://#{ source.host }#{ source.path }"
    req.on('error', (e) -> knit.log.error(e))
