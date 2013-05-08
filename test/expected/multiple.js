angular.module("multiple").run(["$templateCache", function($templateCache) {

  $templateCache.put("multiple/one.html",
    "<h1>One</h1>\n" +
    "\n" +
    "<p>I am one.</p>\n" +
    "\n" +
    "<script>\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );

  $templateCache.put("multiple/two/two.html",
    "<h2>Two</h2>\n" +
    "\n" +
    "<p>We are two.</p>\n"
  );

}]);
