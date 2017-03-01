(function(){
	var MainController = function($scope, $http, $location, $routeParams, $interval, $timeout, $window, LoginService, AlertService)
	{		
		$scope.loginService = LoginService;
		$scope.enInicio = true;
		$scope.express = window.location.hash.indexOf('express') != -1;

		$scope.nroResultados = 25; 
		$scope.IVA = null;
		$scope.REFRESH_INTERVAL = 10000;
		$scope.currentVersion = null;

		$timeout(() => {
			$scope.currentVersion = ver;
		}, 1000);

		$interval(function(){
			$scope.enInicio = window.location.hash.indexOf("inicio") != -1;
		}, 500);

		if (window.location.port != 8080)
			$scope.login_form = {
				username: "root",
				password: "root21115476*"
			};

		if (!LoginService.isLoggedIn())
			$location.path("/login");
		else if (window.location.hash.indexOf("login") != -1)
			$location.path("/inicio");

		LoginService.startTimer();

		$scope._sum = function(data, field) {
			let sum = 0.0;

			_.each(data, (value, key, list) => {
				sum += parseFloat(value[field]);
			});

			return sum;
		}

		$scope.paginationCount = function(n, total){
			var k = Math.ceil(total/n);
			var a = [];

			for (var i = 0; i < k; i++)
				a.push(i);

			return a;
		}

		$scope.cerrar_seccion = function(){
			if (window.location.hash.indexOf("editar") != -1 || window.location.hash.indexOf("agregar") != -1)
				$.confirm({
					title: "Confirmar acción",
					content: "Todo los cambios serán descartados, <strong>¿está seguro que desea cerrar esta ventana?</strong>",
					confirm: function(){
						$location.path("/inicio");
					}
				})
			else
				$location.path("/inicio");
		}

		$scope.login = function(){
			LoginService.login($scope.login_form);
		}

		$scope.logout = function(){
			$.confirm({
				title: '',
				content: '¿Está seguro que desea salir del sistema?',
				confirm: function(){
					LoginService.logout();
				},
				cancel: function(){}
			});
		}

		$scope.unset_session = function(){
			LoginService.logout();
		}

		$scope.cargar_iva = function(){
			$.ajax({
			    url: "php/run.php?fn=obtener_iva",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			    	$scope.IVA = parseFloat(data);
			    	console.log("IVA cargado con éxito (" + $scope.IVA + ")");
			    }
			});
		}

		$scope.modificar_iva = function(){
			var iva = parseFloat($scope.utils.iva);

			$.confirm({
				title: '',
				content: '¿Está seguro que desea modificar el IVA a ' + (iva * 100) + '%?',
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=modificar_iva",
					    type: "POST",
					    data: {iva:iva},
					    beforeSend: function(){},
					    success: function(data){
					    	$scope.IVA = iva;
						    AlertService.showSuccess("IVA modificado con éxito!");
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cargar_iva();
	};

	angular.module("soincopy").controller("MainController", MainController);
}());