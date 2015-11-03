/*
 * Service to handle the REST calls for subscriptions
 */
configmanagerServices.factory('Subscription',['$http', 'User', 'Configer',
	function($http, User, Configer) {
		return {
			all: function() {
				return $http.get('/api/v1/subscriptions?configer_id=' + Configer.getCurrent().id);
			},
			allForUser: function() {
				return $http.get('/api/v1/subscriptions?user=x');
			},
			get: function(subscriptionId) {
				return $http.get('/api/v1/subscriptions/' + subscriptionId);
			},
			create: function(subscription) {
				return $http.post('/api/v1/subscriptions/', {subscription: subscription});
			},
			update: function(subscriptionId, subscription) {
				return $http.put('/api/v1/subscriptions/' + subscriptionId, {subscription: subscription});
			},
			destroy: function(subscriptionId) {
				return $http.delete('/api/v1/subscriptions/' + subscriptionId);
			},
			save: function(action, subscription, card, coupon) {
				var data = {
					subscription_action: action,
					subscription: subscription,
					card: card,
					coupon: coupon
				};
				
				return $http.put('/api/v1/subscriptions/' + subscription.id, data);
			}
		};
	}]);
	

configmanagerServices.factory('Plan',['$http',
	function($http) {
		return {
			get: function(planId) {
				return $http.get('/api/v1/plans/' + planId);
			}
		};
	}]);
	
configmanagerServices.factory('Coupon',['$http',
	function($http) {
		return {
			get: function(couponId) {
				return $http.get('/api/v1/coupons/' + couponId);
			}
		};
	}]);