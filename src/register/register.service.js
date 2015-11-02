"use strict";
angular.module("kudos")
  .factory("RegisterService", RegisterService);

  RegisterService.$inject = [
    "Auth",
    "$q"
  ];

function RegisterService(authBackend, q) {
  var service = {
    register: registerUser
  }
  return service;

  function registerUser(registerInfo) {
    var deferred = q.defer();
    authBackend.register(registerInfo).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }
}
