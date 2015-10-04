"use strict";
angular.module("kudos")
  .factory("BackendService", BackendService);

  BackendService.$inject = [
    "$http",
    "$q"
  ]

  function BackendService($http) {

    var service;
    service = {
      login: Login,
      logout: Logout,
      register: Register,
      reset: ResetPassword,
      confirm: ConfirmRegistration
    };
    return service;

    function config() {
      return $http.get("server.json").then(function(response) {
        return response.data;
      });
    }

    function Login(requestData) {
        config().then(function(response) {
          return $http.post(response.data + "/login?email=" + requestData.email +"&password=" + requestData.password)
          .then(function(response) {
            return response.data;
          });
        });
      }

    function Logout() {
      config().then(function(response) {
        return $http.get(response.data + "/logout").then(function(response) {
          return response.data;
        });
      });
    }

    function Register(requestData) {
      if(requestData.password === requestData.confirmPassword) {
        config().then(function(response) {
          return $http.post(response.data +
            "/register?email=" + requestData.email +
            "&password=" + requestData.password +
            "&confirmPassword=" + requestData.confirmPassword +
            "&name=" + requestData.name +
            "&surname=" + requestData.surname).then(function(response) {
              return response.data;
            });
        });
      } else {
        var error = {
          message: "Passwords do not match"
        }
          return error;
      }
    }

    function ResetPassword(requestData) {
      config().then(function(response) {
        $http.post(response.data + "/reset?email=" + requestData.email)
      });
    }

    function ConfirmRegistration(requestData) {
      config().then(function(response) {
        $http.post(response.data + "/confirm?id=" + requestData.id)
      });
    }
  };
