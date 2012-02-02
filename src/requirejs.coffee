requirejs = require('requirejs')
fs = require('fs')
p  = require('path')

exports.makeHandler = (modulename, config) ->
  config                ?= {}
  config.name           ?= modulename
  config.out            ?= './REMOVE-this-temporary-knit-file.js'

  # Modules
  handler = (put) ->
    requirejs.optimize(config, (response) ->
      console.log config
      data = fs.readFileSync(config.out, 'utf8')
      fs.unlinkSync(config.out) # Remove config.out file
      put(data, 'application/javascript')
    )
