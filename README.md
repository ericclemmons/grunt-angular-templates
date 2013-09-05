# grunt-angular-templates [![Build Status](https://travis-ci.org/ericclemmons/grunt-angular-templates.png?branch=master)](https://travis-ci.org/ericclemmons/grunt-angular-templates)

> Speed up your AngularJS app by automatically minifying, combining,
> and registering your external AngularJS templates with `$templateCache`.

Here's an example of the output created by this task from multiple `.html` files:

```js
angular.module('app').run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html",
    // contents for home.html ...
  );
  ...
  $templateCache.put("src/app/templates/button.html",
    // contents for button.html
  );
});
```


## Installation

*This plugin requires [Grunt][1] `~0.4.0`*

Install the plugin:

    $ npm install grunt-angular-templates --save-dev

Enable the plugin within your `Gruntfile`:

```js
grunt.loadTasks('grunt-angular-templates');
```


## Options

  - `module`  – **(Required)** Name of the module to register templates with.
  - `angular` – Global namespace for Angular, if you use `angular.noConflict()`. *(Default: `angular`)*
  - `url`     – Callback to create/modify the template URL after processing. *(e.g. `Function(url)`)*
  - `source`  – Callback to create/modify the template source after processing. *(e.g. `Function(source)`)*
  - `wrapper` – Callback to wrap compiled templates. *(e.g. `amd` or `Function(output)`)*


## Usage


### Compiling HTML Templates

After configuring your `ngtemplates` task, you can either run the
task directly:

    $ grunt ngtemplates

Or, bake it into an existing task:

```js
grunt.registerTask('default', [ 'jshint', 'ngtemplates', 'concat' ]);
```

### Including Compiled Templates

Finally, you have to load the compiled templates' `.js` file into your
application.


#### Using HTML

```html
<script src="templates.js"></script>
```


#### Using Grunt's `concat` task:

```js
concat:   {
  app:    {
    src:  [ '**.js', '<%= ngtemplates.app.dest %>' ]
    dest: [ 'app.js' ]
  }
}
```


### Examples


#### Concat HTML Templates as `templates.js` Into `app` Module

```js
ngtemplates:  {
  app:        {
    src:      '**.html',
    dest:     'templates.js',
    options:  {
      module: 'app'
    }
  }
}
```


#### Register Relative Template Paths

Normally, your app, templates, & server are in separate folders, which means
that the template URL is **different** from the file path.

```js
ngtemplates:  {
  app:        {
    cwd:      'src/app',
    src:      'src/app/templates/**.html',
    dest:     'build/app.templates.js'
  }
}
```

This will store the template URL as `templates/home.html` instead of
`src/app/templates/home.html`, which would cause a 404.


#### Minify HTML

Simply pass the [same options][2] as the `htmlmin` task:

```js
ngtemplates:    {
  app:          {
    src:        '**.html',
    dest:       'templates.js',
    options:    {
      module:   'app',
      htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
    }
  }
}
```

Or, if you already have an existing `htmlmin` task, you can reference it:

```js
ngtemplates:    {
  app:          {
    src:        '**.html',
    dest:       'templates.js',
    options:    {
      module:   'app',
      htmlmin:  '<%= htmlmin.app %>'
    }
  }
}
```


#### Customize Template URL

Suppose you only use `ngtemplates` when on production, but locally you serve
templates via Node, sans the `.html` extension.

You can specify a `url` callback to further customize the registered URL:

```js
ngtemplates:  {
  app:        {
    src:      '**.html',
    dest:     'templates.js',
    options:  {
      module: 'app',
      url:    function(url) { return url.replace('.html', ''); }
    }
  }
}
```


#### Customize Output

Some people like [AMD & RequireJS][3] and would like wrap the output
in AMD or something else (don't ask me why!):

```js
ngtemplates:    {
  app:          {
    src:        '**.html',
    dest:       'templates.js',
    options:    {
      module:   'app',
      wrapper:  function(output) {
        return 'define([], function() { ... ' + output + ' ... }';
      }
    }
  }
}
```

You will be able to custom everything surrounding `$templateCache.put(...)`.


## Changelog

- v0.4.0 – Complete rewrite to simplify optinos & allow customizing `module`, `url`, `source`, and `wrapper`.
- v0.3.12 – Whoops, forgot to make `htmlmin` a regular dependency. Thanks  @rubenv ([#37](https://github.com/ericclemmons/grunt-angular-templates/pull/37))
- v0.3.11 – Add `htmlmin` option that supports both an `{ ... }` and `<%= htmlmin.options %>` for existing tasks.
- v0.3.10 – Fix *unknown concat target* bug on windows, thanks to @trask ([#31](https://github.com/ericclemmons/grunt-angular-templates/pull/31))
- v0.3.9 – Allow the creation of a new module via `module.define`, thanks to @sidwood ([#28](https://github.com/ericclemmons/grunt-angular-templates/pull/28))
- v0.3.8 – Fix error that occurs when adding 0-length files, thanks to @robertklep ([#27](https://github.com/ericclemmons/grunt-angular-templates/pull/27))
- v0.3.7 – Add `noConflict` option to work with [angular.noConflict](https://github.com/angular/angular.js/pull/1535), thanks to @mbrevoort ([#26](https://github.com/ericclemmons/grunt-angular-templates/pull/26))
- v0.3.6 – Fix issue with dading to `concat` task when it's an array, thanks to @codefather ([#23](https://github.com/ericclemmons/grunt-angular-templates/pull/23))
- v0.3.5 – Preserver line endings in templates, thanks to @groner ([#21](https://github.com/ericclemmons/grunt-angular-templates/pull/21))
- v0.3.4 – Attempt to fix a bug with `Path`, thanks to @cgross ([#19](https://github.com/ericclemmons/grunt-angular-templates/issues/19))
- v0.3.3 – Add `concat` option for automatically adding compiled template file to existing `concat` (or `usemin`-created) task, thanks to @cgross ([#17](https://github.com/ericclemmons/grunt-angular-templates/pull/17))
- v0.3.2 – Add `module` option for setting which module the templates will be added to, thanks to @sidwood ([#20](https://github.com/ericclemmons/grunt-angular-templates/pull/20))
- v0.3.1 – Add `prepend` option for modifying final `$templateCache` IDs, thanks to @mbarchein. ([#16](https://github.com/ericclemmons/grunt-angular-templates/pull/16))
- v0.3.0 – **BC break** - Templates are added to an existing module (e.g. `myapp`) rather than being their own `myapp.templates` module to be manually included, thanks to @geddesign. ([#10](https://github.com/ericclemmons/grunt-angular-templates/issues/10))
- v0.2.2 – Escape backslashes, thanks to @dallonf. ([#9](https://github.com/ericclemmons/grunt-angular-templates/pull/9))
- v0.2.1 – Remove `./bin/grunt-angular-templates`.  No need for it!
- v0.2.0 – Update to Grunt 0.4, thanks to @jgrund. ([#5](https://github.com/ericclemmons/grunt-angular-templates/issues/5))
- v0.1.3 – Convert `\\` to `/` in template IDs (for on win32 systems) ([#3](https://github.com/ericclemmons/grunt-angular-templates/issues/3))
- v0.1.2 – Added NPM keywords
- v0.1.1 – [Fails to combine multiple templates](https://github.com/ericclemmons/grunt-angular-templates/issues/1). Added directions to README on how to integrate with AngularJS app. Integrated with TravisCI
- v0.1.0 – Released to [NPM](https://npmjs.org/package/grunt-angular-templates)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].


## License

Copyright (c) 2013 Eric Clemmons
Licensed under the MIT license.


[1]: http://gruntjs.com/
[2]: https://github.com/gruntjs/grunt-contrib-htmlmin
[3]: http://requirejs.org/docs/whyamd.html
