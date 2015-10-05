"use strict";
describe("BackendService", function() {
  var BackendService, httpBackend;
  var requestData;

  beforeEach(function() {
    var httpMock = {
      get: jasmine.createSpy()
    }
  })

  beforeEach(function() {
    module("kudos");
    inject(function(_BackendService_, $httpBackend) {
      BackendService = _BackendService_;
      httpBackend = $httpBackend;
    })
  })
  it("should be defined", function() {
    expect(BackendService).toBeDefined();
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
        expect(angular.isFunction(BackendService.login)).toBeTruthy();
      });
      it("should call @config and get the server IP", function() {
        httpBackend.expectGET("server.json").respond("");
        httpBackend.expectPOST("").respond("");
        BackendService.login(requestData);
        httpBackend.flush();
      });
      it("should POST the login data to the API", function() {
        httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"})
        httpBackend.expectPOST("http://127.0.0.1:8080/login").respond("");
        BackendService.login(requestData);
        httpBackend.flush();
      });
    })
    describe("#logout", function() {
      it("should be defined", function() {
        expect(angular.isFunction(BackendService.logout)).toBeTruthy();
      });
      it("should call @config and get the server IP", function() {
        httpBackend.expectGET("server.json").respond("");
        httpBackend.expectGET("").respond("");
        BackendService.logout();
        httpBackend.flush();
      });
      it("should GET(?!) logout to the API", function() {
        httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"});
        httpBackend.expectGET("http://127.0.0.1:8080/logout").respond("");
        BackendService.logout();
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
        expect(angular.isFunction(BackendService.register)).toBeTruthy();
      });
      it("should call config and get the server IP", function() {
        httpBackend.expectGET("server.json").respond("");
        httpBackend.expectPOST("").respond("");
        BackendService.register(requestData);
        httpBackend.flush();
      });
      it("should call backend API", function() {
        httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"});
        httpBackend.expectPOST("http://127.0.0.1:8080/register", requestData).respond("");
        BackendService.register(requestData);
        httpBackend.flush();
      });
      it("should not call anything if passwords don't match", function() {
        requestData.confirmPassword = "notPassword";
        expect(BackendService.register(requestData)).toEqual({message: "NO_MATCH_PASSWORD"});
      });
    })
    describe("#reset", function() {
      it("should be defined", function() {
        expect(angular.isFunction(BackendService.reset)).toBeTruthy();
      });
      it("should call config and get the server IP", function() {
        httpBackend.expectGET("server.json").respond("");
        httpBackend.expectPOST("").respond("");
        BackendService.reset(requestData);
        httpBackend.flush();
      });
      it("should call backend API", function() {
        requestData.email = "mail"
        httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"});
        httpBackend.expectPOST("http://127.0.0.1:8080/reset", requestData).respond("");
        BackendService.reset(requestData);
        httpBackend.flush();
      });
    })
    describe("#confirm", function() {
      it("should be defined", function() {
        expect(angular.isFunction(BackendService.confirm)).toBeTruthy();
      })
      it("should call config and get the server IP", function() {
        httpBackend.expectGET("server.json").respond("");
        httpBackend.expectPOST("").respond("");
        BackendService.confirm(requestData);
        httpBackend.flush();
      });
      it("should call backend API", function() {
        requestData.id = "123"
        httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"});
        httpBackend.expectPOST("http://127.0.0.1:8080/confirm", requestData).respond("");
        BackendService.confirm(requestData);
        httpBackend.flush();
      });
    });
  });
    describe("--kudos", function() {
      describe("#send", function() {
        beforeEach(function() {
          requestData = {
            email: "mail",
            amount: "1",
            message: "Bond, James Bond"
          }
        })
        it("should be defined", function() {
          expect(angular.isFunction(BackendService.kudos.send)).toBeTruthy();
        });
        it("should call config and get the server IP", function() {
          httpBackend.expectGET("server.json").respond("");
          httpBackend.expectPOST("").respond("");
          BackendService.kudos.send(requestData);
          httpBackend.flush();
        });
        it("should send data to the backend API", function() {
          httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"});
          httpBackend.expectPOST("http://127.0.0.1:8080/kudos/send", requestData).respond("");
          BackendService.kudos.send(requestData);
          httpBackend.flush();
        });
        it("should not send request if amount is 0 or negative", function() {
          requestData.amount = "-1";
          expect(BackendService.kudos.send(requestData)).toEqual({message: "INVALID_AMOUNT"})
        });
      })
      describe("#incoming", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendService.kudos.incoming)).toBeTruthy();
        })
        it("should call config and get the server IP", function() {
          httpBackend.expectGET("server.json").respond("");
          httpBackend.expectGET("").respond("");
          BackendService.kudos.incoming();
          httpBackend.flush();
        });
        it("should call backend to get incoming kudos", function() {
          httpBackend.expectGET("server.json").respond({data: "http://127.0.0.1:8080"});
          httpBackend.expectGET("http://127.0.0.1:8080/kudos/incoming").respond("");
          BackendService.kudos.incoming();
          httpBackend.flush();
        });
      });
    })


})
