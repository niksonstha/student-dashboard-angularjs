navbar.component("navbar", {
  templateUrl: "components/navbar/navbar.template.html",
  controller: function ($scope, $rootScope) {
    $scope.isSmallerNavbar = false;

    $scope.toggleNavbar = function () {
      $rootScope.$broadcast("toggleNavbarEvent");
      $scope.isSmallerNavbar = !$scope.isSmallerNavbar;
    };
  },
});
