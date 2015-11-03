configmanagerServices.factory('AfterLoginService',
[
    '$location',
    'Configer',
    function($location, Configer){
        return {
            go: function() {
                $location.path('/user_configuration/');
            }
        }
}]);