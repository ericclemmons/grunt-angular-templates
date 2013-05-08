angular.module("ImAModuleNotATarget").run(["$templateCache", function($templateCache) {

  $templateCache.put("simple.html",
    "Howdy there! \\ Your name is \"{{ name }}\".\n"
  );

}]);
