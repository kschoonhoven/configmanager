'use strict';

/*
 * Controller for the configer page
 */
configmanagerControllers.controller('UserConfigurationCtrl', ['$scope', '$injector',
    function($scope, $injector){

        $scope.data = {};
        $scope.app_configs = {};

        function loadAppConfigs() {
            /*			$scope.projects.isBusy = true;
             AppConfiguration.all().success(function(result){
             $scope.projects.items = result;
             $scope.projects.isBusy = false;
             }).error(function(error){
             $scope.projects.isBusy = false;
             });
             */
        }

        function refresh() {
            loadAppConfigs();
        }
    }]);
