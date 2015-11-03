/*
 * Directive 
 */
configmanagerDirectives.directive('applicationHeader', function() {
	return {
		restrict: 'E',
		templateUrl: '/angular/views/directives/applicationHeader.html',
		controller: function($scope, $element, $attrs, $injector) {
			var User = $injector.get('User');
			var Configer = $injector.get('Configer');
			var $location = $injector.get('$location');
			var $modal = $injector.get('$modal');
			
			$scope.data = {};
			$scope.data.settings_tooltip = "Your Settings";
			
			function setCurrentUser() {
				$scope.data.user = User.current();
				$scope.data.is_admin = $scope.data.user == undefined ? undefined : $scope.data.user.global_role == 'admin';
			}
			
			function setConfigers() {
				var configers = Configer.configers();
				if (configers) {
					$scope.data.configers = configers;
				} else {
					Configer.all().then(
						function(result) {
							$scope.data.configers = result.data;
						}
					);
				}
			}
			
			function setConfiger() {
				$scope.data.configer = Configer.getCurrent();
			}
			
			$scope.$on('user.logon', function() {
				setCurrentUser();
				setPendingShares();
			});
			$scope.$on('configer.all', function() {
				setConfigers();
			});
			$scope.$on('configer.selected', function() {
				setConfiger();
			});
			$scope.logout = function() {
				User.logoff(function() {
					$location.path('/');
				});
			};
			$scope.roleManagement = function() {
				var modalInstance = $modal.open({
					templateUrl : "/angular/views/admin/user_roles/form.html",
					controller : 'UserRoleFormCtrl'
				});
			};
			$scope.selectConfiger = function(configer) {
				Configer.setCurrent(configer);
				$location.path('/configers/' + configer.id);
			};
			
			setCurrentUser();
			setConfigers();
			setConfiger();
		}
	};
});