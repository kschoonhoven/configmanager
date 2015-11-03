/*
 * Parent controller for busy modal
 */
configmanagerControllers.controller('BusyModalCtrl', ['$scope', '$modalInstance', 'title', 'msg',
	function($scope, $modalInstane, title, msg){
		$scope.title = title;
		$scope.msg = msg;
	}]);