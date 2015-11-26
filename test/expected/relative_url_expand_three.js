angular.module('relative_url_expand').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('three/three.html',
    "<h2>Three</h2>\n" +
    "\n" +
    "<!-- Comment for three -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are three.</textarea>\n"
  );

}]);
