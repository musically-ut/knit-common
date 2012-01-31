less = require 'less'
fs = require 'fs'

exports.handler = (dir, config) ->
  config              ?= {}
  config.filename     = dir
  config.compress     ?= false
  config.paths        ?= []
  config.optimization ?= 1
  parser = new less.Parser config
  handler = (put) ->
    fs.readFile config.filename, (err, data) =>
      if err then return console.error err
      parser.parse data.toString(), (err, tree) =>
        if err then return console.error err
        put(tree.toCSS({compress: config.compress}), 'text/css')
  handler
