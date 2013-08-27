angular.module("htmlmin").run(["$templateCache", function($templateCache) {

  $templateCache.put("markup.html",
    "<!DOCTYPE html><!--[if lt IE 7]><html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"><![endif]--><!--[if IE 7]><html class=\"no-js lt-ie9 lt-ie8\"><![endif]--><!--[if IE 8]><html class=\"no-js lt-ie9\"><![endif]--><!--[if gt IE 8]><!--><html class=no-js><!--<![endif]--><head><meta charset=utf-8><title>Genesis Skeleton</title><meta http-equiv=X-UA-Compatible content=\"IE=edge,chrome=1\"><link rel=stylesheet href=\"app/styles/app.css\"><!--[if lt IE 9]><script src=\"components/html5shiv-dist/html5shiv.js\"></script><![endif]--></head><body ng-app=app><div class=container><hr><noscript>Please enable Javascript to experience this site :)</noscript><div ng-view=\"\"><input disabled><script type=\"text/javascript\">console.log('JS Enabled');</script></div><hr></div><script src=\"bower_components/angular/angular.js\"></script></body></html>"
  );

}]);
