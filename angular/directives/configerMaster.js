/*
 * Directive 
 */
configmanagerDirectives.directive('configerMaster', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/angular/views/directives/configerMaster.html',
		scope: {
			selectedTab: '=',
			resourceCount: '=',
			buttons: '='
		},
		controller: function($scope, $element, $attrs, $injector) {
			// Get the services we need
			var $location = $injector.get('$location');
			var $modal = $injector.get('$modal');
			var $window = $injector.get('$window');
			var $sce = $injector.get('$sce');
			var ConfigerTabs = $injector.get('ConfigerTabs');
			var Configer = $injector.get('Configer');
			var Config = $injector.get('Config');
			var User = $injector.get('User');

			function setTab() {
				var tabId = $scope.selectedTab;
				for (var k = 0; k < $scope.tabs.list.length; k++) {
					var tab = $scope.tabs.list[k];
					if (tab.id == tabId) {
						tab.statusClass = "active";
						$scope.tabs.active = tab;
					} else {
						tab.statusClass = null;
					}
				}
			}
			
			function setConfigerInfo() {
				if (Configer.getCurrent() != undefined) {
					$scope.configer.id = Configer.getCurrent().id;
					$scope.configer.seller_report_exists = Configer.getCurrent().seller_report != undefined;
					$scope.subscription.id = Configer.getCurrent().subscription.id;
					$scope.subscription.text = Configer.getCurrent().plan_id == 'free' ? 'Upgrade' : 'Standard';
					$scope.subscription.url = Configer.getCurrent().plan_id == 'free' ?
						"#/subscriptions/" + $scope.subscription.id + "/upgrade" :
						"#/subscriptions/" + $scope.subscription.id + "/update";
					$scope.subscription.failed = Configer.getCurrent().subscription.payment_status == 'failed';
					$scope.subscription.visible = Configer.getCurrent().subscription.plan_id == 'free';
					$scope.permissions.can_share = Configer.getCurrent().can_share;
					$scope.permissions.can_subscribe = Configer.getCurrent().can_subscribe;
					$scope.permissions.can_report = Configer.getCurrent().can_view_master_report;
					$scope.permissions.can_create_seller_report = Configer.getCurrent().can_create_seller_report && Configer.getCurrent().seller_report == undefined;
					$scope.permissions.can_edit_seller_report = Configer.getCurrent().can_edit_seller_report && Configer.getCurrent().seller_report != undefined;
					$scope.permissions.can_transfer = Configer.getCurrent().can_transfer;
					$scope.configer.transfer_url = Configer.getCurrent() ? '#/configers/' + Configer.getCurrent().id + '/transfer' : undefined;
					$scope.configer.report_url = "/api/v1/reports?configer_id=" + Configer.getCurrent().id;
					$scope.configer.report_url += "&api_key=" + Config.getApiKey();
					$scope.configer.report_url += "&user_token="+ User.current().authentication_token;
					$scope.configer.seller_report_url = Configer.getCurrent().seller_report == undefined ?
						undefined : 
						"#/SellerReport/" + Configer.getCurrent().seller_report.code;
					$scope.configer.edit_seller_report_url = Configer.getCurrent().seller_report == undefined ?
						undefined : 
						"#/SellerReport/" + Configer.getCurrent().seller_report.code + "/edit";
					$scope.configer.logo_url = Configer.getCurrent().partner && Configer.getCurrent().partner.configer_logo ?
						Configer.getCurrent().partner.configer_logo.location :
						"/assets/landing/flatlogo.png";
				}
			}
			
			$scope.permissions = {};
			$scope.subscription = {};
			$scope.tabs = {};
			$scope.tabs.list = ConfigerTabs.tabs();
			
			$scope.configer = {};
			
			$scope.$on('configer.selected', function() {
				setConfigerInfo();
			});
			
			$scope.clickToolbarButton = function(button) {
				button.click();
			};

			setTab();
			setConfigerInfo();
		}
	};
});