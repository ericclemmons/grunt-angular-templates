angular.module('relative_url_expand').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('three/three_two.html',
    "<h2>Three Two</h2>\n" +
    "\n" +
    "<!-- Comment for three two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are three two.</textarea>\n"
  );

}]);
