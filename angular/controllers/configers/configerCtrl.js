'use strict';

/*
 * Controller for the configer page
 */
configmanagerControllers.controller('ConfigerCtrl', ['$scope', '$injector',
	function($scope, $injector){
		var Configer = $injector.get('Configer');
//		var AppConfiguration = $injector.get('AppConfiguration');

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
