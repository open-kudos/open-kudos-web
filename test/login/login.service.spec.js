"use strict";
describe("Login Service", function() {
  var LoginService, rootScope, MockedAuth;
  var passPromise;



  beforeEach(function() {
    module("kudos");

    module(function($provide) {
      $provide.factory("Auth", function($q) {
        var login = jasmine.createSpy("login").and.callFake(function() {
          var loginData = {};
          if (passPromise) {
            return $q.when(loginData);
          } else {
            return $q.reject("WRONG");
          }
        });
        return {
          login: login
        }
      })
    })
  })

  beforeEach(function() {
    inject(function($rootScope, _Auth_, _LoginService_) {
      LoginService = _LoginService_;
      rootScope = $rootScope;
      MockedAuth = _Auth_;
    })
  })
  it("should be defined", function() {
      expect(LoginService).toBeDefined();
  });
  describe("#login", function() {
    beforeEach(function() {
      passPromise = true;
    })
    it("should be defined", function() {
      expect(angular.isFunction(LoginService.login)).toBeTruthy();
    });
    it("should call the auth service login method", function() {
      LoginService.login();
      rootScope.$digest();
      expect(MockedAuth.login).toHaveBeenCalled();
    });
    it("should return data from the promise", function() {
      var data;
      LoginService.login().then(function(response) {
        data = response;
      });
      rootScope.$digest();
      expect(data).toEqual({});
    });
    it("should return an error from a failed promise", function() {
      passPromise = false;
      var error;
      LoginService.login().catch(function(response) {
        error = response;
      });
      rootScope.$digest();
      expect(error).toEqual("WRONG");
    });
  })
})
