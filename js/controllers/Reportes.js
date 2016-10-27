(function(){
	var Reportes = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
	{		
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

		$scope.cargar_cajeros = function(){
			SoincopyService.getCajeros($scope);
		}

		$scope.cargar_familias = function(){
			SoincopyService.getFamilias($scope);
		}

		$scope.cargar_productos = function(){
			SoincopyService.getProductos($scope);
		}

		$scope.cargar_reporte = function(){
			SoincopyService.getReporte($scope, $routeParams.reporte, $scope.filtros);
		}

		$scope.exportar = function(){
			var filtros = $scope.filtros;

			$.ajax({
			    url: "php/save.php",
			    type: "POST",
			    data: filtros,
			    beforeSend: function(){},
			    success: function(data){
			    	$scope.safeApply(function(){
			    		window.open("api/export/reporte/" + $routeParams.reporte, "_blank")
			    	})			        
			    }
			});
		}

		$scope.seleccionar = function(o){
			$scope.o_ = o;
		}
	};

	angular.module("soincopy").controller("Reportes", Reportes);
}());