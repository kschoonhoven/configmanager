/*
 * Controller for the login page
 */
configmanagerControllers.controller('LoginCtrl',
[
	'$scope',
	'$location',
	'User',
	'Configer',
	'AfterLoginService',
	function($scope, $location, User, Configer, AfterLoginService) {
		$scope.data = {};
		$scope.login = function() {
			var logonData = {
				email: $scope.data.email,
				password: $scope.data.password,
				rememberMe: $scope.data.rememberMe
			};
			$scope.data.isBusy = true;
			$scope.data.hasErrors = false;
			$scope.data.errors = [];
			User.logon(logonData).success(
				function(result) {
					AfterLoginService.go();
				}).error(
					function(error) {
						$scope.data.isBusy = false;
						$scope.data.hasErrors = true;
						$scope.data.errors = ['Invalid username or password'];
			});
		};
	}]);
