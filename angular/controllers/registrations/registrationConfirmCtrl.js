configmanagerControllers.controller('RegistrationConfirmCtrl', ['$scope', '$routeParams', '$location', 'User',
	function($scope, $routeParams, $location, User) {
		User.confirm($routeParams.token).success(function(result) {
			$location.path('/');
		}).error(function(error){
			$scope.error = error;
		});
	}]);