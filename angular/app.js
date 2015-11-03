var configmanagerApp = angular.module('configmanagerApp', [
	'ngRoute',
	'ngCookies',
	'ngSanitize',
	'ui.bootstrap',
    'configmanagerControllers',
	'configmanagerServices',
	'configmanagerDirectives',
	'configmanagerAnimations',
	'Configmanager.Filters']);

configmanagerApp.config(['$routeProvider', /*'IntercomServiceProvider',*/
	function($routeProvider/*, IntercomServiceProvider*/){
		$routeProvider
			.when('/', {
				templateUrl: '/angular/views/sessions/login.html',
				controller: 'LoginCtrl',
				caseInsensitiveMatch: true
			})
			.when('/register', {
				templateUrl: '/angular/views/registrations/form.html',
				controller: 'RegistrationFormCtrl',
				caseInsensitiveMatch: true
			})
			.when('/passwords/reset', {
				templateUrl: '/angular/views/passwords/reset.html',
				controller: 'PasswordResetFormCtrl',
				caseInsensitiveMatch: true
			})
			.when('/passwords/reset_sent', {
				templateUrl: '/angular/views/passwords/reset_sent.html',
				caseInsensitiveMatch: true
			})
			.when('/passwords/:token/update', {
				templateUrl: '/angular/views/passwords/update.html',
				controller: 'PasswordUpdateFormCtrl',
				caseInsensitiveMatch: true
			})
			.when('/login', {
				templateUrl: '/angular/views/sessions/login.html',
				controller: 'LoginCtrl',
				caseInsensitiveMatch: true
			})
			.when('/user_configuration', {
				templateUrl: '/angular/views/userConfiguration/index.html',
				controller: 'UserConfigurationCtrl',
				caseInsensitiveMatch: true
			})
			.when('/configers', {
				templateUrl: '/angular/views/configers/index.html',
				controller: 'ConfigerIndexCtrl',
				caseInsensitiveMatch: true
			})
			.when('/configers/new', {
				templateUrl: '/angular/views/configers/new.html',
				caseInsensitiveMatch: true
			})
			.when('/configers/:configerId/edit', {
				templateUrl: '/angular/views/configers/edit.html',
				caseInsensitiveMatch: true
			})
			.when('/configers/:configerId/transfer', {
				templateUrl: '/angular/views/transfers/new.html',
				caseInsensitiveMatch: true
			})
			.when('/configers/:configerId', {
				templateUrl: '/angular/views/configers/configer.html',
				caseInsensitiveMatch: true
			})
			.when('/configers/:configerId/overview', {
				templateUrl: '/angular/views/configers/configer.html',
				caseInsensitiveMatch: true
			})
			.when('/user_profiles/', {
				templateUrl: '/angular/views/user_profiles/show.html',
				caseInsensitiveMatch: true
			})
			.when('/user_profiles/:profileId/edit', {
				templateUrl: '/angular/views/user_profiles/edit.html',
				caseInsensitiveMatch: true
			})
			.when('/shares/', {
				templateUrl: '/angular/views/shares/index.html',
				caseInsensitiveMatch: true
			})
			.when('/shares/:id', {
				templateUrl: '/angular/views/shares/action.html',
				controller: 'ShareCtrl',
				caseInsensitiveMatch: true
			})
			.when('/subscriptions/', {
				templateUrl: '/angular/views/subscriptions/index.html',
				caseInsensitiveMatch: true
			})
			.when('/subscriptions/:subscriptionId/upgrade', {
				templateUrl: '/angular/views/subscriptions/form.html',
				caseInsensitiveMatch: true
			})
			.when('/subscriptions/:subscriptionId/update', {
				templateUrl: '/angular/views/subscriptions/form.html',
				caseInsensitiveMatch: true
			})
			.when('/buyers_reports/:code', {
				templateUrl: '/angular/views/buyers_reports/show.html',
				caseInsensitiveMatch: true
			})
			.when('/terms', {
				templateUrl: '/angular/views/landing/terms.html',
				caseInsensitiveMatch: true
			})
			.when('/privacy', {
				templateUrl: '/angular/views/landing/privacy.html',
				caseInsensitiveMatch: true
			})
			.when('/internal_error', {
				templateUrl: '/angular/views/landing/500.html'
			})
			.when('/forbidden', {
				templateUrl: '/angular/views/landing/403.html'
			})
			.when('/agents', {
				templateUrl: '/angular/views/agents/agents.html',
				controller: 'AgentsCtrl',
				caseInsensitiveMatch: true
			})
			.otherwise({
				redirectTo: '/'
			});
			/*
        IntercomServiceProvider
            .asyncLoading(true)
            // manually set url since there is no local server running
            .scriptUrl('https://static.intercomcdn.com/intercom.v1.js');
			*/
	}]);
	
// startup operations
configmanagerApp.run(['$injector', function($injector){
	var $rootScope = $injector.get('$rootScope');
	var $location = $injector.get('$location');
	var $routeParams = $injector.get('$routeParams');
	var $http = $injector.get('$http');
	var $modal = $injector.get('$modal');
	var Session = $injector.get('Session');
	var User = $injector.get('User');
	var Configer = $injector.get('Configer');
	var Config = $injector.get('Config');
    //var Intercom = $injector.get('Intercom');
	
	// Set the API Key
	$http.defaults.headers.common['HB-ApiKey'] = Config.getApiKey();
	
	// load the config options
	Config.load().success(function(result){
		Stripe.setPublishableKey(result.stripe.public_key);
		$rootScope.$broadcast('config.loaded');
	});

	$rootScope.$on('$locationChangeSuccess', function() {
        loadConfigerFromPath();
    });
    
    $rootScope.$on('configer.all', function() {
    	loadConfigerFromPath();
    });
	
	$rootScope.$on('global.showModal', function(e, params){
		var modalInstance = $modal.open({
			templateUrl: 'angular/views/application/modal.html',
			controller: 'ModalCtrl',
			backdrop: 'static',
			resolve: {
				title: function(){
					return params.title;
				},
				majorMessage: function(){
					return params.majorMessage;
				},
				minorMessage: function(){
					return params.minorMessage;
				},
				buttons: function(){
					return params.buttons;
				}
			}
		});
		
		modalInstance.result.then(
			function(result) {
				if (params.confirm)
					params.confirm(result);
			},
			function(reason) {
				if (params.cancel)
					params.cancel(reason);
			});
	});
	$rootScope.$on('global.confirmDelete', function(e, params){
		var modalInstance = $modal.open({
			templateUrl: 'angular/views/application/modal.html',
			controller: 'ModalCtrl',
			backdrop: 'static',
			resolve: {
				title: function(){
					return 'Confirm Delete';
				},
				majorMessage: function(){
					return undefined;
				},
				minorMessage: function(){
					return params.message;
				},
				buttons: function(){
					return [
						{
							label: 'Yes',
							isPrimary: true,
							isFocused: true,
							action: 'close',
							result: 'confirm'
						},
						{
							label: 'No',
							action: 'dismiss'
						}
					];
				}
			}
		});
            
		modalInstance.result.then(
			function(result) {
				if (params.confirm)
					params.confirm(result);
			},
			function(reason) {
				if (params.cancel)
					params.cancel(reason);
			});
    });

	var loadConfigerFromPath = function() {
		// get the id from the path. $routeParams doesn't seem reliable here
		var pathParts = $location.path().split('/');
		var configer_id;
		for(var k = 0; k < pathParts.length; k++) {
			if (pathParts[k].toLowerCase() == 'configers') {
				if (pathParts.length >= k) {
					configer_id = pathParts[k+1];
					break;
				}
			}
		}

		// If there is no configer Id in the path clear current
		if (!configer_id) {
			if (!Configer.getCurrent()) {
				Configer.setCurrent(undefined);
			}
			return;
		}
		
		// if the current configer is the same as the one in the path we're done
		if (Configer.getCurrent() && Configer.getCurrent().id == configer_id) {
			return;
		}
		// try and select the configer
		var configers = Configer.configers();
		if (configers) {
			for(var k = 0; k < configers.length; k++) {
				if (configers[k].id == configer_id) {
					Configer.setCurrent(configers[k]);
					return;
				}
			}
		}
	};
	
	// Try and init the JWT and user
	User.init();
	Configer.init();
	//loadConfigerFromPath();
	
	/* make jumbotrons lock to navbar when scrolling... 
	 * this requires the jumbotron-bar snippet to exist
	 * it should be replaced directly after the jumbotron
	 * and the title/links should be updated as needed
	 * 
	 * <div class="jumbotron-bar navbar navbar-default navbar-fixed-top" style="display:none;">
	 *	<div class="container-fluid">
	 *	 <a class="navbar-brand" href="#/configers/">My Configers</a>
	 *	 <a href="#/configers/new" class="btn btn-primary navbar-btn">Create new configer</a>
	 *	</div>
	 * </div>
	 * 
	 */
	$(function () {
	    $(document).on( 'scroll', function(){
	        if($(window).scrollTop() >= ($(".jumbotron").height() / 2)) { 
	        	$(".jumbotron-bar").fadeIn();
	        	$(".jumbotron").css("visibility", "hidden");
	        }
	        if($(window).scrollTop() < ($(".jumbotron").height() / 2)) { 
	        	$(".jumbotron-bar").fadeOut();
	        	$(".jumbotron").css("visibility", "visible");
	        }
	    });
	});	
}]);
	
/*
configmanagerApp.config(['$httpProvider',
	function($httpProvider){
		var authToken = $("meta[name=\"csrf-token\"]").attr("content");
  		$httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
	}]);
*/
	