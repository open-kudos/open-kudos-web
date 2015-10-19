"use strict";
angular.module("kudos")
  .factory("User", User);

  User.$inject = [
    "$http",
    "SERVER"
  ];

  function User($http, SERVER) {
    var user = {
      home: getHomeInfo,
      disable: disableUser,
      update: updateUserInfo,
      list: listUsers
    }
    return user;

    function getHomeInfo() {
      return $http.get(SERVER.ip + "/user/home").then(function(response) {
        return response.data;
      })
    }

    function disableUser() {
      return $http.get(SERVER.ip + "/user/disable").then(function(response) {
        return response.data;
      })
    }

    function updateUserInfo(userInfo) {
      return $http.post(SERVER.ip + "/user/update", userInfo).then(function(response) {
        return response.data;
      })
    }

    function listUsers(searchFilter) {
      return $http.post(SERVER.ip + "/user/list", searchFilter).then(function(response) {
        return response.data;
      })
    }
  }
