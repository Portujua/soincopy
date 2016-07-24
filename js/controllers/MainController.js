(function(){
	var MainController = function($scope, $http, $location, $routeParams, $timeout, $window, LoginService){		
		$scope.safeApply = function(fn) {
		    var phase = this.$root.$$phase;
		    if(phase == '$apply' || phase == '$digest') {
		        if(fn && (typeof(fn) === 'function')) {
		          fn();
		        }
		    } else {
		       this.$apply(fn);
		    }
		};

		$scope.loginService = LoginService;

		if (window.location.port != 8080)
			$scope.login_form = {
				username: "admin",
				password: "admin"
			};

		if (!LoginService.isLoggedIn())
			$location.path("/login");

		$scope.login = function(){
			LoginService.login($scope.login_form);
		}

		$scope.unset_session = function(){
			LoginService.logout();
		}
	};

	angular.module("soincopy").controller("MainController", MainController);
}());