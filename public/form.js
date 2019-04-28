(function() {
  "use strict";

  angular.module("expressForm", []);
  angular.module("expressForm").controller("MainController", MainController);

  MainController.$inject = ["$scope", "enrollStudent"];
  function MainController($scope, enrollStudent) {
    $scope.student = {};
    $scope.students = [];

    loadStudents();
    $scope.submitForm = function() {
      //clear form styles upon submitting form
      $scope.studentForm.$setPristine();

      if ($scope.student._id === null || $scope.student._id === undefined) {
        enrollStudent.saveUsers($scope.student).then(function(result) {
          console.log("result is", result);
          clearForm();
          loadStudents();
        });
      } else {
        enrollStudent
          .updateSingleStudent($scope.student._id, $scope.student)
          .then(function(result) {
            loadStudents();
            console.log("data updated", result);
            clearForm();
          });
      }
    };

    $scope.deleteSingleUser = function(userId) {
      enrollStudent.removeSingleStudent(userId).then(function(result) {
        console.log("result after delete", result);
        loadStudents();
      });
    };

    $scope.updateSingleUser = function(user) {
      console.log("user value", user);
      $scope.student = user;
    };

    function loadStudents() {
      enrollStudent.getAll().then(function(result) {
        $scope.students = result;
      });
    }

    function clearForm() {
      $scope.student = {};
    }

    $scope.propertyName = "name";
    $scope.reverse = false;
    $scope.sortBy = function(propertyName) {
      $scope.reverse =
        $scope.propertyName === propertyName ? !$scope.reverse : $scope.reverse;
      $scope.propertyName = propertyName;
    };
  }

  angular.module("expressForm").factory("enrollStudent", function($http) {
    // const BASE_URL = "https://kabita-student-enrollment.herokuapp.com/api/formData/";
    const BASE_URL = "http://localhost:3000/api/formData/";

    function getAll() {
      return $http({
        method: "GET",
        url: BASE_URL
      }).then(function(result) {
        return result.data;
      });
    }

    function saveUsers(user) {
      return $http({
        method: "POST",
        url: BASE_URL,
        data: user
      }).then(
        function(successResult) {
          return successResult;
        },
        function(failedResult) {
          console.log("failedResult", failedResult);
        }
      );
    }

    function removeSingleStudent(userId) {
      return $http({
        method: "DELETE",
        url: BASE_URL + userId
      }).then(
        function(successResult) {
          console.log("successResult", successResult);
        },
        function(failedResult) {
          return failedResult;
        }
      );
    }

    function getSingleStudent(userId) {
      return $http({
        method: "GET",
        url: BASE_URL + userId
      }).then(
        function(successResult) {
          return successResult;
        },
        function(failedResult) {
          return failedResult;
        }
      );
    }

    function updateSingleStudent(userId, user) {
      return $http({
        method: "PUT",
        url: BASE_URL + userId,
        data: user
      }).then(
        function(successResult) {
          return successResult;
        },
        function(failedResult) {
          return failedResult;
        }
      );
    }

    return {
      getAll: getAll,
      saveUsers: saveUsers,
      removeSingleStudent: removeSingleStudent,
      getSingleStudent: getSingleStudent,
      updateSingleStudent: updateSingleStudent
    };
  });
})();
