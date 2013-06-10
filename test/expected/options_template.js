define([],function(){
  return {
    loadTemplates: function($templateCache){
      $templateCache.put("simple.html",
        "Howdy there! \\ Your name is \"{{ name }}\".\n"
      );
    }
  };
});