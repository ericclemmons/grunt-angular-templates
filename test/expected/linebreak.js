angular.module('linebreak').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/linebreak.html',
    "<textarea placeholder=\"This is a carriage return.\r" +
    "\n" +
    "Also also a newline.\"></textarea>"
  );

}]);
