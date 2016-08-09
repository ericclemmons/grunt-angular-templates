angular.module('unmerged_files').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/unmerged/level2/empty.html',
    ""
  );

}]);
