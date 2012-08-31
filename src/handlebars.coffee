handlebars = require 'handlebars'
fs = require 'fs'

exports.makeHandler = (filename, context) ->
  handler = (stream) ->
    fs.readFile filename, (err, data) =>
      if err then return stream.log.error err
      template = handlebars.compile(data.toString())
      stream.end(template(context))
  handler
