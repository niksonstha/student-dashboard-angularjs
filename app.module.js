var myApp = angular.module("myApp", [
  "ui.router",
  "ui.grid",
  "navbar",
  "dashboard",
]);
myApp.config(function ($stateProvider) {
  var dashboard = {
    name: "dashboard",
    url: "/dashboard",
    templateUrl: "screens/dashboard/dashboard.template.html",
  };
  var studentDetails = {
    name: "studentDetails",
    url: "/studentDetails",
    templateUrl: "screens/studentDetails/studentDetails.template.html",
  };

  $stateProvider.state(dashboard);
  $stateProvider.state(studentDetails);
});

myApp.controller("MainController", function ($scope) {
  $scope.$on("toggleNavbarEvent", function () {
    var navbarElement = document.querySelector(".navbar");
    navbarElement.classList.toggle("smallerNavbar");
  });
});
