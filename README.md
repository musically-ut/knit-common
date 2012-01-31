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
      '/static/':     handle.directory('./static')

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

Directory Handler
-----------------

Usage: `handle.directory(directory)`

Serves files (recursively) from the specified local
directory. Determines a limited set of mime-types from the files'
extensions.
