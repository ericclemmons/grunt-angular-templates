# grunt-angular-templates [![Build Status](https://travis-ci.org/ericclemmons/grunt-angular-templates.png?branch=master)](https://travis-ci.org/ericclemmons/grunt-angular-templates)

Grunt build task to concatenate & register your AngularJS templates in the $templateCache

**NOTE**:

- Use `0.1.x` for Grunt `0.3.x`.
- Use `0.2.x` for Grunt `0.4.x`.


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
  ngtemplates:  {
    myapp:      {
      options:  { base: 'src/views' },
      src:      [ 'src/views/**.html' ],
      dest:     'dist/templates.js'
    }
  }
});
```

**You should name your sub-target (e.g. `myapp`) after the name of the module the templates will be added to**.


This will generate the following at `dist/templates.js`:

```js
angular.module('myapp').run(['$templateCache', function($templateCache) {
  ...
}]);
```

### Include Compiled Templates

This can either be done via HTML:

```html
<script src="dist/templates.js"></script>
```

or via your Gruntfile:

```js
concat: {
  myapp: {
    src: [
      'src/js/**/*.js',       // MyApp module first
      '<%= ngtemplates.myapp.dest %>' // Generated templates
    ],
    dest: 'dist/js/app.js'
  }
}
```


## Changelog

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
