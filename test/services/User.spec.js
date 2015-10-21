"use strict";
describe("User", function() {
  var BackendUser, httpBackend;
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
    inject(function(_User_, $httpBackend) {
      BackendUser = _User_;
      httpBackend = $httpBackend;
    })
  })
  it("should be defined", function() {
    expect(BackendUser).toBeDefined();
  });
    describe("--user", function() {
      describe("#home", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendUser.home)).toBeTruthy();
        });
        it("should call backend to get the home page info for a user", function() {
          httpBackend.expectGET("http://127.0.0.1:8080/user/home").respond("");
          BackendUser.home();
          httpBackend.flush();
        });
      });
      describe("#disable", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendUser.disable)).toBeTruthy();
        });
        it("should call backend to disable a user", function() {
          httpBackend.expectGET("http://127.0.0.1:8080/user/disable").respond("");
          BackendUser.disable();
          httpBackend.flush();
        });
      });
      describe("#update", function() {
        beforeEach(function() {
          requestData = {
            id: "123"
          }
        })
        it("should be defined", function() {
          expect(angular.isFunction(BackendUser.update)).toBeTruthy();
        });
        it("should call backend to update the user info", function() {
          httpBackend.expectPOST("http://127.0.0.1:8080/user/update").respond("");
          BackendUser.update(requestData);
          httpBackend.flush();
        });
        it("should call backend with correct data", function() {
          httpBackend.expectPOST("http://127.0.0.1:8080/user/update", requestData).respond("");
          BackendUser.update(requestData);
          httpBackend.flush();
        })
      });
      describe("#list", function() {
        beforeEach(function() {
          requestData = {
            filter: "name"
          }
        })
        it("should be defined", function() {
          expect(angular.isFunction(BackendUser.list)).toBeTruthy();
        });
        it("should call backend to fetch the list of users", function() {
          httpBackend.expectPOST("http://127.0.0.1:8080/user/list").respond("");
          BackendUser.list(requestData);
          httpBackend.flush();
        });
        it("should call backend with correct filter query", function() {
          httpBackend.expectPOST("http://127.0.0.1:8080/user/list", requestData).respond("");
          BackendUser.list(requestData);
          httpBackend.flush();
        })
      })
    })


})
