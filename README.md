# grunt-angular-templates

Grunt build task to concatenate & register your AngularJS templates in the $templateCache

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

```js
grunt.initConfig({
  ngtemplates:  {
    app:        {
      options:  { base: 'src/views' },
      src:      [ 'src/views/**.html' ],
      dest:     'dist/templates.js'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## License
Copyright (c) 2013 Eric Clemmons
Licensed under the MIT license.
