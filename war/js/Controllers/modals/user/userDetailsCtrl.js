angular.module('myApp.controllers')
    .controller('userDetailsCtrl',['$scope','staticDataService',function($scope,staticDataService){

    	var user = $scope.$parent.user;
    	
        $scope.somthing = 1;
        $scope.age = undefined;

        var init = function(){
            callAtTimeout();
        };

        var callAtTimeout =  function() {
            if ($scope.objectives !== null || $scope.objectives !== undefined) {
                staticDataService.getObjectives().then(
                    function (data) {
                        $scope.items = data;
                    },
                    function (error) {
                        console.log("Something wrong with the objectives")
                    }
                );
            }

            if ($scope.locations !== null || $scope.locations !== undefined) {
                staticDataService.getLocations().then(
                    function (data) {
                        $scope.locations = data;
                    },
                    function (error) {
                        console.log("Something wrong with the locations")
                    }
                );
            }
        };

        $scope.togglePropertiesSelection = function toggleSelection(item) {
            var idx = $scope.itemSelection.indexOf(item);

            // is currently selected
            if (idx > -1) {
                $scope.itemSelection.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.itemSelection.push(item);
            }
        };

        $scope.$watch('user',function(){
            function calculateAge(birthday) { // birthday is a date
                var ageDifMs = Date.now() - birthday.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
            if($scope.user !== undefined){
                var birthday = new Date($scope.user.birth_date);
                $scope.age = calculateAge(birthday);
            }}
        );

        init();

    }]);