angular.module('single_quotes').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/one.html',
    '<h1>One</h1>\n' +
    '\n' +
    '<p class="">I am one.</p>\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '  // Test\n' +
    '  /* comments */\n' +
    '  var foo = \'bar\';\n' +
    '</script>\n'
  );

}]);
