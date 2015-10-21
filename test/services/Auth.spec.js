"use strict";
describe("Auth", function() {
  var BackendAuth, httpBackend;
  var requestData;

  beforeEach(function() {
    var httpMock = {
      get: jasmine.createSpy()
    }
    var SERVERMock = {
      "ip" : "http://127.0.0.1:8080"
    }
  })

  beforeEach(module("kudos"));
  beforeEach(module(function($provide) {
    $provide.constant("SERVER", {
      "ip": "http://127.0.0.1:8080"
    });
  }))
  beforeEach(function() {
    inject(function(_Auth_, $httpBackend) {
      BackendAuth = _Auth_;
      httpBackend = $httpBackend;
    })
  })
  it("should be defined", function() {
    expect(BackendAuth).toBeDefined();
  });
  describe("--auth", function() {
    describe("#login", function() {
      beforeEach(function() {
        requestData = {
          email: "name",
          password: "password"
        }
      })
      it("should be defined", function() {
        expect(angular.isFunction(BackendAuth.login)).toBeTruthy();
      });
      it("should POST the login data to the API", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/login").respond("");
        BackendAuth.login(requestData);
        httpBackend.flush();
      });
      it("should POST with the correct data", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/login", requestData).respond("");
        BackendAuth.login(requestData);
        httpBackend.flush();
      })
    })
    describe("#logout", function() {
      it("should be defined", function() {
        expect(angular.isFunction(BackendAuth.logout)).toBeTruthy();
      });
      it("should GET(?!) logout to the API", function() {
        httpBackend.expectGET("http://127.0.0.1:8080/logout").respond("");
        BackendAuth.logout();
        httpBackend.flush();
      });
    })
  });
  describe("--registration", function() {
    describe("#register", function() {
      beforeEach(function() {
        requestData = {
          email: "mail",
          password: "password",
          confirmPassword: "password",
          name: "name",
          surname: "surname"
        }
      })
      it("should be defined", function() {
        expect(angular.isFunction(BackendAuth.register)).toBeTruthy();
      });
      it("should call backend API", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/register").respond("");
        BackendAuth.register(requestData);
        httpBackend.flush();
      });
      it("should call backend API with correct data", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/register", requestData).respond("");
        BackendAuth.register(requestData);
        httpBackend.flush();
      });
      it("should not call anything if passwords don't match", function() {
        requestData.confirmPassword = "notPassword";
        expect(BackendAuth.register(requestData)).toEqual({message: "NO_MATCH_PASSWORD"});
      });
    })
    describe("#reset", function() {
      beforeEach(function() {
        requestData = {
          email : "mail"
        }
      })
      it("should be defined", function() {
        expect(angular.isFunction(BackendAuth.reset)).toBeTruthy();
      });
      it("should call backend API", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/reset").respond("");
        BackendAuth.reset(requestData);
        httpBackend.flush();
      });
      it("should call backend API with correct data", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/reset", requestData).respond("");
        BackendAuth.reset(requestData);
        httpBackend.flush();
      });
    })
    describe("#confirm", function() {
      beforeEach(function() {
        requestData = {
          id: "123"
        }
      })
      it("should be defined", function() {
        expect(angular.isFunction(BackendAuth.confirm)).toBeTruthy();
      });
      it("should call backend API", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/confirm").respond("");
        BackendAuth.confirm(requestData);
        httpBackend.flush();
      });
      it("should call backend API with correct data", function() {
        httpBackend.expectPOST("http://127.0.0.1:8080/confirm", requestData).respond("");
        BackendAuth.confirm(requestData);
        httpBackend.flush();
      });
    });
  });
})
