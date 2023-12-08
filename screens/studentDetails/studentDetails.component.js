studentDetails.component("studentDetails", {
  templateUrl: "screens/studentDetails/studentDetails.template.html",
  controller: function ($scope, $http) {
    $http
      .get("../../db/studentDetails.json")
      .then(function (response) {
        $scope.details = response.data;
        console.log($scope.details);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  },
});
