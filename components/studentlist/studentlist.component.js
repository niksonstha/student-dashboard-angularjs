studentlist.component("studentlist", {
  templateUrl: "components/studentlist/studentlist.template.html",
  controller: function ($scope, uiGridConstants) {
    $scope.highlightFilteredHeader = function (
      row,
      rowRenderIndex,
      col,
      colRenderIndex
    ) {
      if (col.filters[0].term) {
        return "header-filtered";
      } else {
        return "";
      }
    };

    $scope.gridOptions = {
      enableFiltering: true,
      columnDefs: [
        {
          field: "id",
          headerCellClass: $scope.highlightFilteredHeader,
          enableFiltering: false,
        },
        {
          field: "name",
          headerCellClass: $scope.highlightFilteredHeader,
        },
        { field: "age", headerCellClass: $scope.highlightFilteredHeader },
        { field: "grade", headerCellClass: $scope.highlightFilteredHeader },
        { field: "major", headerCellClass: $scope.highlightFilteredHeader },
      ],
      data: [], // Initialize an empty array for data
    };

    $scope.getData = function () {
      // Use AngularJS $http to make a GET request
      axios
        .get("../../db/student_list.json") // Adjust the path accordingly
        .then(function (response) {
          $scope.gridOptions.data = response.data;
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
        });
    };

    $scope.getData(); // Fetch data when controller initializes
  },
});
