/*
 * Service to make REST calls for configers
 */
configmanagerServices.factory('Configer', ['$http', '$rootScope', 'Session', 'Errors',
	function($http, $rootScope, Session, Errors) {
		var configers = [];
		var currentConfiger;
		
		function clearCurrentConfiger() {
			currentConfiger = undefined;
		}
		
		function setCurrentConfiger(configer) {
			if (configer == undefined) {
				Session.clearConfiger();
				clearCurrentConfiger();
			} else {
				currentConfiger = configer;
				Session.setConfiger(configer);
				$rootScope.$broadcast('configer.selected');
			}
		}
		
		$rootScope.$on('user.logoff', function() {
			clearCurrentConfiger();
			configers.length = 0;
		});
		
		return {
			init: function() {
				setCurrentConfiger(Session.getConfiger());
			},
			all: function() {
				return $http.get('/api/v1/configers/').success(
					function(result) {
						configers = result;
						$rootScope.$broadcast('configer.all');
					});
			},
			get: function(configerId) {
				return $http.get('/api/v1/configers/' + configerId);
			},
			create: function(configer) {
				return $http.post('/api/v1/configers', {configer: configer});
			},
			update: function(configerId, configer) {
				return $http.put('/api/v1/configers/' + configerId, {configer: configer});
			},
			destroy: function(configerId) {
				return $http.delete('/api/v1/configers/' + configerId);
			},
			configers: function() {
				return configers;
			},
			getCurrent: function() {
				return currentConfiger;
			},
			setCurrent: function(configer) {
				setCurrentConfiger(configer);
			}
		};
	}]);

/*
 * Service to make REST calls for property types
 */
configmanagerServices.factory('PropertyType', ['$http',
	function($http) {
		return {
			all: function() {
				return $http.get('/api/v1/property_types/');
			}
		};
	}]);