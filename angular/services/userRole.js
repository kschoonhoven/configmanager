/*
 * Service to make REST calls for user_roles
 */
configmanagerServices.factory('UserRole',['$http', 'Configer',
	function($http, Configer) {
		return {
			create: function(role_info) {
				return $http.post('/api/v1/user_roles/', {role: role_info});
			}
		};
	}]);