(function() {
  var fs, jsp, less, pro;

  jsp = (require("uglify-js")).parser;

  pro = (require("uglify-js")).uglify;

  less = require('less');

  fs = require('fs');

  exports.makeHandler = function(filename, config) {
    var handler, _ref, _ref2, _ref3, _ref4, _ref5;
    if (config == null) config = {};
    if ((_ref = config.strict_semicolons) == null) {
      config.strict_semicolons = void 0;
    }
    if ((_ref2 = config.ast_lift_variables) == null) {
      config.ast_lift_variables = false;
    }
    if ((_ref3 = config.ast_mangle_options) == null) {
      config.ast_mangle_options = {};
    }
    if ((_ref4 = config.ast_squeeze_options) == null) {
      config.ast_squeeze_options = {};
    }
    if ((_ref5 = config.gen_code_options) == null) config.gen_code_options = {};
    handler = function(put) {
      var _this = this;
      return fs.readFile(filename, function(err, code) {
        var ast, output;
        if (err) return console.error(err);
        ast = jsp.parse(code.toString(), config.strict_semicolons);
        if (config.ast_lift_variables) ast = pro.ast_lift_variables(ast);
        ast = pro.ast_mangle(ast, config.ast_mangle_options);
        ast = pro.ast_squeeze(ast, config.ast_squeeze_options);
        output = pro.gen_code(ast, config.gen_code_options);
        return put(output, "application/javascript");
      });
    };
    return handler;
  };

}).call(this);
