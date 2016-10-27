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

		$scope.totalizar = function(){
			$scope.total = {
				subtotal: 0.00,
				iva: 0.00,
				total: 0.00,

				total_facturado: 0.00,
				devoluciones: 0.00,
				nota_de_credito: 0.00,
				retiro_de_caja: 0.00
			}

			if (window.location.hash.indexOf('libro_de_ventas') != -1)
				for (var i = 0; i < $scope.data.length; i++)
				{
					$scope.total.iva += parseFloat($scope.data[i].iva);
					$scope.total.subtotal += parseFloat($scope.data[i].subtotal);
					$scope.total.total += parseFloat($scope.data[i].total);
				}
			else if (window.location.hash.indexOf('cuadre_ventas_diarias') != -1)
				for (var i = 0; i < $scope.data.length; i++)
				{
					$scope.total.total_facturado += parseFloat($scope.data[i].total_facturado);
					$scope.total.devoluciones += parseFloat($scope.data[i].devoluciones);
					$scope.total.nota_de_credito += parseFloat($scope.data[i].nota_de_credito);
					$scope.total.retiro_de_caja += parseFloat($scope.data[i].retiro_de_caja);
				}

			$timeout($scope.totalizar, 1000);
		}
	};

	angular.module("soincopy").controller("Reportes", Reportes);
}());