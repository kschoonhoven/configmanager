/*
 * Controller for the list of configers page
 */
configmanagerControllers.controller('ConfigerIndexCtrl',
[
	'$scope',
	'$location',
	'$routeParams',
	'Configer',
	'User',
	function($scope, $location, $routeParams, Configer, User){
		$scope.data = {};
		$scope.clickConfiger = function(configer) {
			Configer.setCurrent(configer);
			$location.path('/configers/' + configer.id);
		};
		$scope.$on('user.logon', function(){
			loadConfigers();
		});
		$scope.deleteConfiger = function(configer) {
			$scope.$emit('global.confirmDelete', {
				message: 'Are you sure you want to delete the configer - ' + configer.name + "? WARNING, This action can not be undone.",
				confirm: function() {
					Configer.destroy(configer.id).success(
						function(result) {
							Configer.setCurrent(undefined);
							loadConfigers();
						});
				}
			});
		};

		function loadConfigers() {
			$scope.data.isBusy = true;
			Configer.all().success(function(result){
				$scope.data.isBusy = false;
				$scope.data.configers = Configer.configers();
			}).error(function(error){
				// Anything to do here? Display an error?
				$scope.data.isBusy = false;
				console.log(error);
			});
		}

		if (User.isLoggedOn()) {
			loadConfigers();
		}
	}]);
