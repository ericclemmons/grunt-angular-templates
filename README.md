# grunt-angular-templates [![Build Status](https://travis-ci.org/ericclemmons/grunt-angular-templates.png?branch=master)](https://travis-ci.org/ericclemmons/grunt-angular-templates)

Grunt build task to concatenate & register your AngularJS templates in the $templateCache

**NOTE**:

- Use `0.1.x` for Grunt `0.3.x`.
- Use `0.2.x` or `0.3.x` for Grunt `0.4.x`.


## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-angular-templates`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-angular-templates');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md


## Documentation

This plugin provides the grunt task `ngtemplates`, which will allow you to compile your HTML templates into a single JS file,
which preloads `$templateCache` to prevent round-trips to the server.

### Update Grunt

```js
// grunt.js
grunt.initConfig({
  ngtemplates:      {
    myapp:          {
      options:      {
        base:       'src/views',        // $templateCache ID will be relative to this folder
        prepend:    '/static/assets/',  // (Optional) Prepend path to $templateCache ID
        module:     'App'               // (Optional) The module the templates will be added to
                                        //            Defaults to grunt target name (e.g. `myapp`)
        // ...or...
        module:     {
          name:     'App',              // (Optional) Explicitly define module name
          define:   true                // (Optional) Define new module (Default: false)
        },
        concat:     'dist/js/app.js'    // (Optional) Append to existing `concat` target
        noConflict: 'otherAngular'      // (Optional) Name of angular.noConflict() app uses

        htmlmin:    {                   // (Optional) html-minifier options. Can also be '<%= htmlmin.options %>'
          ...
        }
      },
      src:          'src/views/**.html',
      dest:         'dist/templates.js'
    }
  }
});
```

This will generate the following at `dist/templates.js`:

```js
angular.module('App').run(['$templateCache', function($templateCache) {
  ...
}]);
```

### Include Compiled Templates

There are 3 different ways to make use of the compiled templates in your project:
an HTML script tag, an existing `concat` task, or `usemin`'s dynamic `concat` task.


### Using HTML

```html
<script src="dist/templates.js"></script>
```

### Using Your Gruntfile

Either add it explicitly to your `concat` task:

```js
concat: {
  myapp: {
    src: [
      'src/js/**/*.js',               // MyApp module first
      '<%= ngtemplates.myapp.dest %>' // Generated templates (`dist/templates.js`)
    ],
    dest: 'dist/js/app.js'
  }
}
```

or have `ngtemplates` add it to an existing `concat` task for you:

```js
concat:   {
  myapp:  {
    src:  'src/js/**/*.js', // Will automatically have `dist/templates.js` appended
    dest: 'dist/js/app.js'
  }
},

ngtemplates:  {
  myapp:      {
    options:  {
      concat: 'myapp' // Name of concat target to append to
    },
    src:      'src/views/**.html',
    dest:     'dist/templates.js'
  }
}
```


### Using [grunt-usemin](https://github.com/yeoman/grunt-usemin)

First, note the **output of `build:js`** in your HTML:

```html
  <!-- build:js dist/js/app.js -->
  <script src="src/js/app.js"></script>
  ...
```

Finally, add `concat: 'dist/js/app.js` to the `concat` option

```js
ngtemplates:    {
  myapp:        {
    options:    {
      concat:   'dist/js/app.js'
    },
    src:        'src/views/**.html',
    dest:       'dist/templates.js'
  }
}
```

This will append the output file `dist/js/templates.js` to
`usemin`'s dynamic `concat` task: `dist/js/app.js`.

### Defining an Angular Module

It's possible to define a new angular module in the generated JS file.

```js
ngtemplates:    {
  myapp:        {
    options:    {
      module:   {
        name:   'templates',
        define: true
      }
    },
    src:        'src/views/**.html',
    dest:       'dist/templates.js'
  }
}
```

This will generate the following at `dist/templates.js`:

```js
angular.module('templates', []).run(['$templateCache', function($templateCache) {
  ...
}]);
```

If you want the templates to append to a *pre-existing* module, simply leave off the `define` option by default.

## Changelog

### v0.3.12

- Whoops, forgot to make `htmlmin` a regular dependency. Thanks  @rubenv ([#37](https://github.com/ericclemmons/grunt-angular-templates/pull/37))

### v0.3.11

- Add `htmlmin` option that supports both an `{ ... }` and `<%= htmlmin.options %>` for existing tasks.

### v0.3.10

- Fix *unknown concat target* bug on windows, thanks to @trask ([#31](https://github.com/ericclemmons/grunt-angular-templates/pull/31))

### v0.3.9

- Allow the creation of a new module via `module.define`, thanks to @sidwood ([#28](https://github.com/ericclemmons/grunt-angular-templates/pull/28))

### v0.3.8

- Fix error that occurs when adding 0-length files, thanks to @robertklep ([#27](https://github.com/ericclemmons/grunt-angular-templates/pull/27))

### v0.3.7

- Add `noConflict` option to work with [angular.noConflict](https://github.com/angular/angular.js/pull/1535), thanks to @mbrevoort ([#26](https://github.com/ericclemmons/grunt-angular-templates/pull/26))

### v0.3.6

- Fix issue with dading to `concat` task when it's an array, thanks to @codefather ([#23](https://github.com/ericclemmons/grunt-angular-templates/pull/23))

### v0.3.5

- Preserver line endings in templates, thanks to @groner ([#21](https://github.com/ericclemmons/grunt-angular-templates/pull/21))

### v0.3.4

- Attempt to fix a bug with `Path`, thanks to @cgross ([#19](https://github.com/ericclemmons/grunt-angular-templates/issues/19))

### v0.3.3

- Add `concat` option for automatically adding compiled template file to existing `concat` (or `usemin`-created) task, thanks to @cgross ([#17](https://github.com/ericclemmons/grunt-angular-templates/pull/17))

### v0.3.2

- Add `module` option for setting which module the templates will be added to, thanks to @sidwood ([#20](https://github.com/ericclemmons/grunt-angular-templates/pull/20))

### v0.3.1

- Add `prepend` option for modifying final `$templateCache` IDs, thanks to @mbarchein. ([#16](https://github.com/ericclemmons/grunt-angular-templates/pull/16))

### v0.3.0

- **BC break** - Templates are added to an existing module (e.g. `myapp`) rather than being their own `myapp.templates` module to be manually included, thanks to @geddesign. ([#10](https://github.com/ericclemmons/grunt-angular-templates/issues/10))

### v0.2.2

- Fixes

  - Escape backslashes, thanks to @dallonf. ([#9](https://github.com/ericclemmons/grunt-angular-templates/pull/9))

### v0.2.1

  - Remove `./bin/grunt-angular-templates`.  No need for it!

### v0.2.0

  - Update to Grunt 0.4, thanks to @jgrund. ([#5](https://github.com/ericclemmons/grunt-angular-templates/issues/5))

### v0.1.3

- Fixes

    - Convert `\\` to `/` in template IDs (for on win32 systems) ([#3](https://github.com/ericclemmons/grunt-angular-templates/issues/3))

### v0.1.2

- Added NPM keywords

### v0.1.1

- Fixes

    - [Fails to combine multiple templates](https://github.com/ericclemmons/grunt-angular-templates/issues/1)

- New

    - Added directions to README on how to integrate with AngularJS app
    - Integrated with TravisCI

### v0.1.0

- Released to [NPM](https://npmjs.org/package/grunt-angular-templates)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].


## License

Copyright (c) 2013 Eric Clemmons
Licensed under the MIT license.
