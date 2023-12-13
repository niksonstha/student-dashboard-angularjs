studentlist.filter("mapGender", mapGender).component("studentlist", {
  templateUrl: "components/studentlist/studentlist.template.html",
  controller: function ($scope, $http, uiGridConstants) {
    // Inside your controller
    $scope.showAddStudentModal = false;

    $scope.openAddStudentModal = function () {
      $scope.showAddStudentModal = true; // Show the modal when Add Student is clicked
    };

    $scope.addStudent = function () {
      // Assuming the new student details are captured in $scope.newStudent
      var newStudent = {
        name: $scope.newStudent.name,
        age: $scope.newStudent.age,
        grade: $scope.newStudent.grade,
        major: $scope.newStudent.major,
        gender: $scope.newStudent.gender === "male" ? 1 : 2,
      };

      // Push the new student object to your data array
      $scope.data.push(newStudent);

      // Close the modal
      $scope.showAddStudentModal = false;

      // Clear the form fields after submission if necessary
      $scope.newStudent = {}; // Assuming newStudent is an object holding form fields
    };

    $scope.closeModal = function () {
      $scope.showAddStudentModal = false;
    };

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
    $scope.data = [];
    $scope.gridOptions = {
      enableFiltering: true,
      enableGridMenu: true,
      data: "data",
      importerDataAddCallback: function (grid, newObjects) {
        $scope.data = $scope.data.concat(newObjects);
      },
      columnDefs: [
        {
          field: "name",
          headerCellClass: $scope.highlightFilteredHeader,
        },
        { field: "age", headerCellClass: $scope.highlightFilteredHeader },
        { field: "grade", headerCellClass: $scope.highlightFilteredHeader },
        { field: "major", headerCellClass: $scope.highlightFilteredHeader },
        {
          field: "gender",
          // filter: {
          //   type: uiGridConstants.filter.SELECT,
          //   selectOptions: [
          //     { value: "1", label: "male" },
          //     { value: "2", label: "female" },
          //   ],
          // },

          cellFilter: "mapGender", // Use the mapGender filter
          headerCellClass: self.highlightFilteredHeader,
        },
      ],
      // data: [], // Initialize an empty array for data
    };

    $scope.getData = function () {
      // Use AngularJS $http to make a GET request
      $http
        .get("../../db/student_list.json") // Adjust the path accordingly
        .then(function (response) {
          if (!$scope.data) {
            $scope.gridOptions.data = response.data;
          } else {
            $scope.data = response.data;
          }

          var genderCounts = {
            male: 0,
            female: 0,
          };

          response.data.forEach(function (student) {
            if (student.gender === 1) {
              genderCounts.male++;
            } else if (student.gender === 2) {
              genderCounts.female++;
            }
          });

          var ctx = document.getElementById("genderChart").getContext("2d");
          var genderChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Male", "Female"],
              datasets: [
                {
                  label: "Gender Distribution",
                  data: [genderCounts.male, genderCounts.female],
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.5)", // Color for male
                    "rgba(255, 99, 132, 0.5)", // Color for female
                  ],
                  borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Students",
                    color: "black",
                    font: {
                      size: 14,
                    },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Gender",
                    color: "black",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              // Additional chart options can be set here
            },
          });
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
        });
    };

    $scope.getData(); // Fetch data when controller initializes
  },
});
function mapGender() {
  var genderHash = {
    1: "male",
    2: "female",
  };

  return function (input) {
    if (!input) {
      return "";
    } else {
      return genderHash[input];
    }
  };
}
