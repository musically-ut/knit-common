jsp = (require "uglify-js").parser
pro = (require "uglify-js").uglify

fs = require 'fs'

exports.makeHandler = (filename, config) ->
  config                     ?= {}
  config.strict_semicolons   ?= undefined
  config.ast_lift_variables  ?= false
  config.ast_mangle_options  ?= {}
  config.ast_squeeze_options ?= {}
  config.gen_code_options    ?= {}
  config.comments_before     ?= true
  config.prepend             ?= ''

  showCopyright = (commentTokens) ->
    parts = for token in commentTokens
      if token.type == 'comment1'
        "//" + token.value + "\n"
      else
        "/*" + token.value + "*/"
    parts.join('')

  handler = (stream) ->
    fs.readFile filename, (err, code) =>
      if err then return stream.log.error err

      codeString = code.toString()
      result = ""
      # If a prepend string is specified, prepend it
      if config.prepend
        result += config.prepend
      # Extract initial comments (assumed to be copyright)
      if config.comments_before
        result += showCopyright(jsp.tokenizer(codeString)().comments_before)
      # parse code and get the initial AST
      ast = jsp.parse(code.toString(), config.strict_semicolons)
      # merge and move var declarations if configured to
      ast = pro.ast_lift_variables(ast) if config.ast_lift_variables
      # get a new AST with mangled names
      ast = pro.ast_mangle(ast, config.ast_mangle_options)
      # get an AST with compression optimizations
      ast = pro.ast_squeeze(ast, config.ast_squeeze_options)
      # compressed code here
      result += pro.gen_code(ast, config.gen_code_options)
      stream.endWithMime(result, "application/javascript")
  handler
