angular.module("multiple").run(["$templateCache", function($templateCache) {

  $templateCache.put("multiple/one.html",
    "<h1>One</h1>" +
    "" +
    "<p>I am one.</p>" +
    "" +
    "<script>" +
    "  // Test" +
    "  /* comments */" +
    "  var foo = 'bar';" +
    "</script>" +
    ""
  );

  $templateCache.put("multiple/two/two.html",
    "<h2>Two</h2>" +
    "" +
    "<p>We are two.</p>" +
    ""
  );

}]);
