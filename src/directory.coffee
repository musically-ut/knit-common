fs = require 'fs'
p  = require 'path'

# TODO: Option to follow links
# TODO: Option to override mimetypes
# TODO: More mime-types

buildRoutes = (dir) ->
  # Construct routes object for files in dir
  routes = {}
  for filename in fs.readdirSync(dir)
    do (filename) ->
      path = p.join dir, filename
      if p.existsSync(path) # Necessary for some odd links
        stat = fs.statSync(path)
        if stat.isDirectory()
          routes[filename] = buildRoutes path
        else if stat.isFile()
          routes[filename] = (cb) ->
            fs.readFile(path, (err, data) ->
              if err
                console.error "ERROR: #{ err.message }"
                cb('', '')
              else
                cb(data, mimeType(path)))
        else
          console.log "IGNORE    #{ path }. Neither file nor directory."
  routes

mimeTypes =
  'txt':  'text/plain'
  'html': 'text/html'
  'htm':  'text/html'
  'js':   'application/javascript'
  'css':  'style/css'
  'json': 'application/json'
  '':     'text/plain'

mimeType = (filename) -> mimeTypes[(p.extname filename).substr(1)]

exports.handler = buildRoutes
