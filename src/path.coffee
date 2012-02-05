fs = require 'fs'
p  = require 'path'

# TODO: Option to follow links

routePath = (path, config) ->
  config              ?= {}
  config.mimeTypes    ?= {}

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
      fs.readFile path, (err, data) ->
        if err
          console.error "ERROR: #{ err.message }"
          put('', '')
        else
          mimeTypes = {}
          mimeTypes[match] = type for match, type of defaultMimeTypes
          mimeTypes[match] = type for match, type of config.mimeTypes
          type = matchMimeType(path, mimeTypes, 'text/plain')
          console.log "using", type
          put(data, type)
  else
    console.log "IGNORE    #{ path }. Neither file nor directory."
  handler

matchMimeType = (path, types, defaultType) ->
  # Find matching endings and pick the longest one or return the defaultType
  ts = ([e.length, t] for e, t of types when (new RegExp("#{ e }$")).test(path))
  ts.sort()
  if ts.length > 0 then ts.pop()[1] else defaultType

defaultMimeTypes =
  '.txt':    'text/plain'
  '.htm':    'text/html'
  '.html':   'text/html'
  '.css':    'text/css'
  '.coffee': 'text/coffeescript'
  '.js':     'application/javascript'
  '.json':   'application/json'
  '.xhtml':  'application/xhtml+xml'
  '.xml':    'application/xml'
  '.gif':    'image/gif'
  '.png':    'image/png'
  '.jpg':    'image/jpeg'
  '.jpeg':   'image/jpeg'
  '.svg':    'image/svg+xml'
  '.ico':    'image/vnd.microsoft.icon'

exports.makeHandler = routePath
