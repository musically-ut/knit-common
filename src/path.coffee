fs = require 'fs'
p  = require 'path'

# TODO: Option to follow links
# TODO: Option to override mimetypes
# TODO: More mime-types

routePath = (path) ->
  stat = fs.statSync(path)
  handler = undefined
  if stat.isDirectory()
    handler = {}
    for filename in fs.readdirSync(path)
      do (filename) ->
        if p.existsSync(path) # Necessary for some odd links
          handler[filename] = routePath (p.join path, filename)
  else if stat.isFile() and p.existsSync(path)
    handler = (put) ->
      fs.readFile(path, (err, data) ->
        if err
          console.error "ERROR: #{ err.message }"
          put('', '')
        else
          put(data, mimeType(path)))
  else
    console.log "IGNORE    #{ path }. Neither file nor directory."
  handler

mimeTypes =
  'txt':    'text/plain'
  'html':   'text/html'
  'htm':    'text/html'
  'js':     'application/javascript'
  'css':    'style/css'
  'json':   'application/json'
  'coffee': 'text/coffeescript'
  '':       'text/plain'

mimeType = (filename) -> mimeTypes[(p.extname filename).substr(1)] or 'text/plain'

exports.makeHandler = routePath
