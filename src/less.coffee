less = require 'less'
fs = require 'fs'

exports.makeHandler = (dir, config) ->
  config              ?= {}
  config.filename     = dir
  config.compress     ?= false
  config.paths        ?= []
  config.optimization ?= 1
  parser = new less.Parser config
  handler = (stream) ->
    fs.readFile config.filename, (err, data) =>
      if err then return stream.log.error err
      parser.parse data.toString(), (err, tree) =>
        if err then return stream.log.error JSON.stringify(err, null, '  ')
        stream.setMime('text/css')
        stream.end(tree.toCSS({compress: config.compress}))
  handler
