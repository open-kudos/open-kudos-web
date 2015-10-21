"use strict";
describe("Kudos", function() {
  var BackendKudos, httpBackend;
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
    inject(function(_Kudos_, $httpBackend) {
      BackendKudos = _Kudos_;
      httpBackend = $httpBackend;
    })
  })
  it("should be defined", function() {
    expect(BackendKudos).toBeDefined();
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
          expect(angular.isFunction(BackendKudos.send)).toBeTruthy();
        });
        it("should send data to the backend API", function() {
          httpBackend.expectPOST("http://127.0.0.1:8080/kudos/send").respond("");
          BackendKudos.send(requestData);
          httpBackend.flush();
        });
        it("should send correct data to the backend API", function() {
          httpBackend.expectPOST("http://127.0.0.1:8080/kudos/send", requestData).respond("");
          BackendKudos.send(requestData);
          httpBackend.flush();
        });
        it("should not send request if amount is 0 or negative", function() {
          requestData.amount = "-1";
          expect(BackendKudos.send(requestData)).toEqual({message: "INVALID_AMOUNT"})
        });
      })
      describe("#incoming", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendKudos.incoming)).toBeTruthy();
        })
        it("should call backend to get incoming kudos", function() {
          httpBackend.expectGET("http://127.0.0.1:8080/kudos/incoming").respond("");
          BackendKudos.incoming();
          httpBackend.flush();
        });
      });
      describe("#outgoing", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendKudos.outgoing)).toBeTruthy();
        })
        it("should call backend to get outgoing kudos", function() {
          httpBackend.expectGET("http://127.0.0.1:8080/kudos/outgoing").respond("");
          BackendKudos.outgoing();
          httpBackend.flush();
        });
      });
      describe("#remaining", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendKudos.remaining)).toBeTruthy();
        })
        it("should call backend to get remaining kudos", function() {
          httpBackend.expectGET("http://127.0.0.1:8080/kudos/remaining").respond("");
          BackendKudos.remaining();
          httpBackend.flush();
        });
      });
      describe("#received", function() {
        it("should be defined", function() {
          expect(angular.isFunction(BackendKudos.received)).toBeTruthy();
        })
        it("should call backend to get received kudos", function() {
          httpBackend.expectGET("http://127.0.0.1:8080/kudos/received").respond("");
          BackendKudos.received();
          httpBackend.flush();
        });
      });
    });

})
