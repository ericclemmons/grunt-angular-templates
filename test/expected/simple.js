angular.module("simple.templates", []).run(["$templateCache", function($templateCache) {

  $templateCache.put("simple.html",
    "Howdy there! \\ Your name is \"{{ name }}\"." +
    ""
  );

}]);
