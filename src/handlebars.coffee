handlebars = require 'handlebars'
fs = require 'fs'

exports.makeHandler = (filename, context, mimeType) ->
  # The mime-type is hacky. Should have a standard way of handling
  # this in handlers. Consider in Knit re-design.
  mimeType ?= 'text/html'
  handler = (stream) ->
    fs.readFile filename, (err, data) =>
      if err then return stream.log.error err
      template = handlebars.compile(data.toString())
      stream.setMime(mimeType)
      stream.end(template(context))
  handler
