"use strict";
angular.module("kudos")
  .factory("BackendService", BackendService);

  BackendService.$inject = [
    "$http",
    "$q"
  ]

  function BackendService($http, $q) {

    var service;
    service = {
      login: Login,
      logout: Logout,
      register: Register,
      reset: ResetPassword,
      confirm: ConfirmRegistration,
      kudos: {
        send: sendKudos,
        incoming: getIncomingKudos
      }
    };
    return service;

    function config() {
      return $http.get("server.json").then(function(response) {
        return response.data;
      });
    }

    function Login(requestData) {
        return config().then(function(server) {
           $http.post(server.data + "/login", requestData).then(function(response) {
             return response.data;
          });
        });
      }

    function Logout() {
      return config().then(function(server) {
         $http.get(server.data + "/logout").then(function(response) {
          return response.data;
        });
      });
    }

    function Register(requestData) {
      if(requestData.password === requestData.confirmPassword) {
        return config().then(function(server) {
           $http.post(server.data +
            "/register", requestData).then(function(response) {
              return response.data;
            });
        });
      } else {
        var error = {
          message: "NO_MATCH_PASSWORD"
        }
          return error;
      }
    }

    function ResetPassword(requestData) {
      return config().then(function(server) {
        $http.post(server.data + "/reset", requestData)
      });
    }

    function ConfirmRegistration(requestData) {
      return config().then(function(server) {
        $http.post(server.data + "/confirm", requestData)
      });
    }

    function sendKudos(requestData) {
      if(angular.isDefined(requestData.amount) && requestData.amount > 0) {
        return config().then(function(server) {
          $http.post(server.data + "/kudos/send", requestData)
        });
      } else {
        var error = {
          message: "INVALID_AMOUNT"
        }
        return error;
      }
    }

    function getIncomingKudos() {
      return config().then(function(server) {
        $http.get(server.data + "/kudos/incoming").then(function(response) {
          return response.data
        });
      })
    }

  };
