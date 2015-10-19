"use strict";
angular.module("kudos")
  .factory("BackendService", BackendService);

  BackendService.$inject = [
    "$http",
    "$q",
    "SERVER"
  ]

  function BackendService($http, $q, SERVER) {

    var service;
    service = {
      login: Login,
      logout: Logout,
      register: Register,
      reset: ResetPassword,
      confirm: ConfirmRegistration,
      kudos: {
        send: sendKudos,
        incoming: getIncomingKudos,
        outgoing: getOutgoingKudos,
        remaining: getRemainingKudos,
        received: getReceivedKudos
      }
    };
    return service;

    function Login(requestData) {
           return $http.post(SERVER.ip + "/login", requestData).then(function(response) {
             return response.data;
          });
      }

    function Logout() {
         return $http.get(SERVER.ip + "/logout").then(function(response) {
          return response.data;
        });
    }

    function Register(requestData) {
      if(requestData.password === requestData.confirmPassword) {
          return $http.post(SERVER.ip + "/register", requestData).then(function(response) {
              return response.data;
            });
      } else {
        var error = {
          message: "NO_MATCH_PASSWORD"
        }
          return error;
      }
    }

    function ResetPassword(requestData) {
      return $http.post(SERVER.ip + "/reset", requestData).then(function(response) {
        return response.data;
      });
    }

    function ConfirmRegistration(requestData) {
      return  $http.post(SERVER.ip + "/confirm", requestData).then(function(response) {
        return response.data;
      });
    }

    function sendKudos(requestData) {
      if(angular.isDefined(requestData.amount) && requestData.amount > 0) {
          return $http.post(SERVER.ip + "/kudos/send", requestData).then(function(response) {
            return response.data;
          });
      } else {
        var error = {
          message: "INVALID_AMOUNT"
        }
        return error;
      }
    }

    function getIncomingKudos() {
        return $http.get(SERVER.ip + "/kudos/incoming").then(function(response) {
          return response.data;
        });
    }

    function getOutgoingKudos() {
        return $http.get(SERVER.ip + "/kudos/outgoing").then(function(response) {
          return response.data;
        });
    }

    function getRemainingKudos() {
      return $http.get(SERVER.ip + "/kudos/remaining").then(function(response) {
        return response.data;
      });
    }

    function getReceivedKudos() {
      return $http.get(SERVER.ip + "/kudos/received").then(function(response) {
        return response.data;
      });
    }

  };
