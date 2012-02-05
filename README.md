Knit Common Handlers
====================

This package provides a set of common handlers for
[Knit](https://github.com/cbaatz/knit), a flexible development server
and builder for static resources.

Example usage
-------------

Simple (not particularly useful) example:

    myapp
    |-- knit.coffee
    `-- static/

with `knit.coffee` containing

    handle = require 'knit-common'

    exports.routes =
      '/':            handle.string('This is the data', 'text/plain')
      '/robots.txt':  handle.string('User-agent: *\nDisallow: /', 'text/plain')
      '/favicon.ico': handle.favicon()
      '/static/':     handle.path('./static')

then

    $ cd myapp
    $ knit serve

will serve this on `http://localhost:8081/`, proxying everything but
the specified resources to `http://localhost:8080/`. See the [Knit readme](https://github.com/cbaatz/knit) for more details on Knit usage.

Installation
------------

Installation requires
[node.js](https://github.com/joyent/node/wiki/Installation) and
[npm](http://npmjs.org/) and can then be accomplished with

    git clone git://github.com/cbaatz/knit-common.git
    cd knit-common
    npm install -g

String Handler
--------------

Usage: `handle.string(data, [mime-type])`

Simple handler for serving a string.

Favicon Handler
---------------

Usage: `handle.favicon()`

Simply serves empty data with an `image/vnd.microsoft.icon` mime-type.

Path Handler
-----------------

Usage: `handle.path(file or directory, config)`

Serves the specified file or directory hierarchy (recursively). The
config supports a `mimeTypes` option allowing you to override the
limited set of default mime-types (below). The `mimeTypes` field
should be a map from path-ending to a mime-type. For example:

    config =
      'mimeTypes':
        'txt': 'text/plain'
        'poorly-named.txt': 'text/html'
    handle.path('scripts', config)

The default map from ending to mime-type is:

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

Less Handler
------------

Usage: `handle.less(filename, [options])`

Compiles [Less](http://lesscss.org/) files to CSS. Options are passed
to the Less parser (so can include things like `paths` and
`optimization`).  It also passes the `compress` value of the options
object to the `toCSS` function, indiciating whether or not to minify
the produced CSS.

r.js optimizer Handler
----------------------

Usage: `handle.requirejs(modulename, [options])`

Compiles an AMD module with [r.js](http://requirejs.org/) into an
optimized file. Options are passed to the `requirejs.optimize`
function.

Uglify Handler
--------------

Usage: `handle.uglify(filename, [options])`

Transform the `filename` file with
[UglifyJS](https://github.com/mishoo/UglifyJS). `options` can include:

- `strict_semicolons` (`true` or `false`): Passed UglifyJS's `parser.parse` funciton.
- `ast_lift_variables` (`true` or `false`): Include a `uglify.ast_lift_variables` step.
- `ast_mangle_options` (object): Options passed to `uglify.ast_mangle`.
- `ast_squeeze_options` (object): Options passed to `uglify.ast_squeeze`.
- `gen_code_options` (object): Options passed to `uglify.gen_code`.

This handler is mostly useful for building for deployment. For
example, you could write your routes conditionally on `knit.action ==
'write'` and then use handle.uglify('libs/jquery.js') if you're using
uncompressed `jquery.js` in development (and you want to serve it
yourself, but you should consider using a CDN).
