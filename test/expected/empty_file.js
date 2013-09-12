angular.module('empty_file').run(['$templateCache', function($templateCache) {

  $templateCache.put('test/fixtures/empty.html',
    ""
  );

}]);
