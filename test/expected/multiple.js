angular.module("multiple.templates", []).run(["$templateCache", function($templateCache) {

  $templateCache.put("multiple/one.html",
    "<h1>One</h1>" +
    "" +
    "<p>I am one.</p>" +
    ""
  );

  $templateCache.put("multiple/two/two.html",
    "<h2>Two</h2>" +
    "" +
    "<p>We are two.</p>" +
    ""
  );

}]);
