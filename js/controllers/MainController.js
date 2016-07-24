(function(){
	var MainController = function($scope, $http, $location, $routeParams, $interval, $timeout, $window, LoginService, AlertService)
	{		
		$scope.loginService = LoginService;
		$scope.enInicio = true;

		$interval(function(){
			$scope.enInicio = window.location.hash.indexOf("inicio") != -1;
		}, 500);

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

		$scope.logout = function(){
			$.confirm({
				title: '',
				content: '¿Está seguro que desea salir del sistema?',
				confirm: function(){
					window.location.reload();
				},
				cancel: function(){}
			});
		}

		$scope.unset_session = function(){
			LoginService.logout();
		}
	};

	angular.module("soincopy").controller("MainController", MainController);
}());