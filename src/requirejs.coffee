requirejs = require('requirejs')
fs = require('fs')
p  = require('path')

exports.makeHandler = (modulename, config) ->
  config                ?= {}
  config.name           ?= modulename
  config.out            ?= "./REMOVE-this-temporary-knit-file-for-#{ config.name }.js"

  # Modules
  handler = (stream) ->
    requirejs.optimize(config, (response) ->
      # Set mime-type
      stream.setMime('application/javascript')

      # Pipe file contents to response stream
      fileStream = fs.createReadStream(config.out)
      fileStream.on('error', (e) -> stream.log.error("#{ err.message }"))
      fileStream.on('close', -> fs.unlinkSync(config.out)) # Remove config.out file
      fileStream.pipe(stream)
    )
