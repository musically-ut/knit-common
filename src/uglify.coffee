jsp = (require "uglify-js").parser
pro = (require "uglify-js").uglify

less = require 'less'
fs = require 'fs'

exports.makeHandler = (filename, config) ->
  config                     ?= {}
  config.strict_semicolons   ?= undefined
  config.ast_lift_variables  ?= false
  config.ast_mangle_options  ?= {}
  config.ast_squeeze_options ?= {}
  config.gen_code_options    ?= {}

  handler = (put) ->
    fs.readFile filename, (err, code) =>
      if err then return console.error err
      # parse code and get the initial AST
      ast = jsp.parse(code.toString(), config.strict_semicolons)
      # merge and move var declarations if configured to
      ast = pro.ast_lift_variables(ast) if config.ast_lift_variables
      # get a new AST with mangled names
      ast = pro.ast_mangle(ast, config.ast_mangle_options)
      # get an AST with compression optimizations
      ast = pro.ast_squeeze(ast, config.ast_squeeze_options)
      # compressed code here
      output = pro.gen_code(ast, config.gen_code_options)
      put(output, "application/javascript")
  handler
