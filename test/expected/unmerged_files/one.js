angular.module('unmerged_files').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/unmerged/level2/level3/one.html',
    "<h1>One</h1>\n" +
    "\n" +
    "<p class=\"\">I am one.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );

}]);
