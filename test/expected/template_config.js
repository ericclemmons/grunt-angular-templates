angular.module("templateConfig").run(["$templateCache", function($templateCache) {

  $templateCache.put("foo/test/fixtures/simple.html",
    "Howdy there! \\ Your name is \"{{ name }}\".\n"
  );

}]);
