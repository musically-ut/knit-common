https = require 'https'

# https://raw.github.com/<username>/<reponame>/<ref>/<filename>

exports.makeHandler = (username, reponame, ref, filename) ->
  source =
    host: "raw.github.com"
    path: "/#{ username }/#{ reponame }/#{ ref }/#{ filename }"

  handler = (stream) ->
    https.get(source, (res) ->
      res.on('data', (d) -> stream.write(d))
      res.on('end', () -> stream.end())
     ).on('error', (e) -> console.error(e))
