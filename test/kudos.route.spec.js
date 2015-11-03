"use strict";
describe("kudos routing", function() {

  var $templateCache, $location, $rootScope, $state;

  function mockTemplate(templateRoute, tmpl) {
  $templateCache.put(templateRoute, tmpl || templateRoute);
}

  beforeEach(module("kudos.routing"));
  beforeEach(function() {
    inject(function(_$state_, _$templateCache_, _$location_, _$rootScope_) {
      $state = _$state_;
      $templateCache = _$templateCache_;
      $location = _$location_;
      $rootScope = _$rootScope_;
    })
  })

  describe("states", function() {
    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    it("should be /login when empty", function() {
      mockTemplate("login/login.html");
      goTo("");
      expect($state.current.name).toEqual("Login");
    })
  })
});
