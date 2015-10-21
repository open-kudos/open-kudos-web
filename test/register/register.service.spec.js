"use strict";
describe("Register Service", function() {
  var RegisterService, rootScope, MockedAuth;
  var passPromise;



  beforeEach(function() {
    module("kudos");

    module(function($provide) {
      $provide.factory("Auth", function($q) {
        var register = jasmine.createSpy("register").and.callFake(function() {
          var registerData = {};
          if (passPromise) {
            return $q.when(registerData);
          } else {
            return $q.reject("WRONG");
          }
        });
        return {
          register: register
        }
      })
    })
  })

  beforeEach(function() {
    inject(function($rootScope, _Auth_, _RegisterService_) {
      RegisterService = _RegisterService_;
      rootScope = $rootScope;
      MockedAuth = _Auth_;
    })
  })
  it("should be defined", function() {
      expect(RegisterService).toBeDefined();
  });
  describe("#login", function() {
    beforeEach(function() {
      passPromise = true;
    })
    it("should be defined", function() {
      expect(angular.isFunction(RegisterService.register)).toBeTruthy();
    });
    it("should call the auth service register method", function() {
      RegisterService.register();
      rootScope.$digest();
      expect(MockedAuth.register).toHaveBeenCalled();
    });
    it("should return data from the promise", function() {
      var data;
      RegisterService.register().then(function(response) {
        data = response;
      });
      rootScope.$digest();
      expect(data).toEqual({});
    });
    it("should return an error from a failed promise", function() {
      passPromise = false;
      var error;
      RegisterService.register().catch(function(response) {
        error = response;
      });
      rootScope.$digest();
      expect(error).toEqual("WRONG");
    });
  })
})
