"use strict";
angular.module("kudos")
  .factory("LoginService", LoginService);

  LoginService.$inject = [
    "Auth",
    "$q"
  ]

function LoginService(authBackend, q) {
  var service = {
    login: LoginUser
  }
  return service;

  function LoginUser(loginInfo) {
    var deferred = q.defer();

    authBackend.login(loginInfo).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    
    return deferred.promise;
  }
}
