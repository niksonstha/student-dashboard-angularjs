studentlist.component("studentlist", {
  templateUrl: "components/studentlist/studentlist.template.html",
  controller: function ($scope) {
    $scope.getData = function () {
      // Use Axios to make a GET request
      axios
        .get("../../db/student_list.json")
        .then(function (response) {
          // Handle successful response
          console.log("Data:", response.data);
          $scope.myData = response.data; // Assign the data to $scope or process it as needed
        })
        .catch(function (error) {
          // Handle error
          console.error("Error fetching data:", error);
        });
    };
    $scope.getData();
  },
});
