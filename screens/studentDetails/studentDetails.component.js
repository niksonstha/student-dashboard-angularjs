studentDetails.component("studentDetails", {
  templateUrl: "screens/studentDetails/studentDetails.template.html",
  controller: function ($scope) {
    // Retrieve data from local storage
    var storedDetails = localStorage.getItem("studentData");

    if (storedDetails) {
      $scope.details = JSON.parse(storedDetails);
      console.log($scope.details);
    } else {
      $scope.details = []; // Initialize as an empty array if no data is found
      console.log("No stored data found.");
    }
  },
});
