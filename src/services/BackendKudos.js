"use strict";
angular.module("kudos")
  .factory("BackendKudos", BackendKudos);

  BackendKudos.$inject = [
    "$http",
    "SERVER"
  ];

  function BackendKudos($http, SERVER) {
    var kudos = {
      send: sendKudos,
      incoming: getIncomingKudos,
      outgoing: getOutgoingKudos,
      remaining: getRemainingKudos,
      received: getReceivedKudos
    }
    return kudos;

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
  }
