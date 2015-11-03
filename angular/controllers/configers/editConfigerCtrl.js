configmanagerControllers.controller('EditConfigerCtrl', ['$scope', '$location', '$routeParams', 'Configer',
	function($scope, $location, $routeParams, Configer) {
		$scope.data = {};
		$scope.data.form = {};
		var configerId = $routeParams['configerId'];
		Configer.get(configerId).success(function(result){
			var configer = {
				id: result.id,
				name: result.name,
				primary: result.primary,
				partner: result.partner ? result.partner.id : undefined,
				property_attributes: result.property
			};
			$scope.data.form = configer;
		});
		$scope.$on('configer.save', function(e, formData) {
			var id = $scope.data.form.id;
			delete formData.id;
			Configer.update(id, formData).success(function(result) {
				Configer.setCurrent(result);
				$location.path('/configers/' + result.id);
			}).error(function(error){
				$scope.data.form.errors = error;
			});
		});
		$scope.$on('configer.cancelForm', function() {
			$location.path('/configers/' + Configer.getCurrent().id);
		});
	}]);