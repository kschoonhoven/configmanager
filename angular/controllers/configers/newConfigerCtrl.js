configmanagerControllers.controller('NewConfigerCtrl', ['$scope', '$location', 'Configer', 'PropertyType', 'Address',
	function($scope, $location, Configer, PropertyType, Address) {
		$scope.data = {};
		$scope.data.form = {};
		$scope.data.form.primary = Configer.configers() == undefined || Configer.configers().length == 0 ? true : false;
		$scope.data.form.property_attributes = {};
		$scope.data.form.property_attributes.country = Address.countries()[0].value;
		$scope.data.form.property_attributes.property_type = 'Single Family';
		$scope.$on('configer.save', function(e, formData) {
			Configer.create(formData).success(function(result){
				Configer.setCurrent(result);
				$location.path('/configers/' + result.id + '/onboarding_wizard/contractors');
			}).error(function(error) {
				$scope.data.form.errors = error;
			});
		});
		$scope.$on('configer.cancelForm', function() {
			$location.path('/configers/');
		});
	}]);