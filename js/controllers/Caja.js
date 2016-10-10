(function(){
	var Caja = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, LoginService, $localStorage, $interval)
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

		$scope.editar = $routeParams.id;
		$scope.pid = $routeParams.pid;
		$scope.pago = {
			monto: 0.00,
			subtotal: 0.00,
			iva: 0.00,
			total: 0.00
		}

		SoincopyService.getCondicionesPago($scope);

		$scope.cargar_pedido = function(id){
			SoincopyService.getPedido($scope, id);
		}

		$scope.calcularDatos = function(){
			if (!$scope.pedido)
			{
				$timeout($scope.calcularDatos, 200);
				return;
			}

			$scope.pago.subtotal = 0.00;
			$scope.pago.iva = 0.00;
			$scope.pago.total = 0.00;

			var productos = $scope.pedido.productos;

			for (var i = 0; i < productos.length; i++)
			{
				/*$scope.pago.subtotal += productos[i].costo_unitario_facturado / (1.00 + (productos[i].exento_iva == 1 ? 0.00 : $scope.$parent.IVA)) * (productos[i].nro_copias * productos[i].nro_originales);*/
				$scope.pago.total += productos[i].costo_unitario_facturado * (productos[i].nro_copias * productos[i].nro_originales);
				$scope.pago.iva += productos[i].costo_unitario_facturado * (productos[i].exento_iva == 1 ? 0.00 : $scope.$parent.IVA) * (productos[i].nro_copias * productos[i].nro_originales);
			}

			//$scope.pago.total = $scope.pago.subtotal + $scope.pago.iva;
			$scope.pago.subtotal = $scope.pago.total - $scope.pago.iva;
		}

		$scope.procesarPago = function(){
			if (!$scope.pago.metodo_pago)
			{
				$.alert({
					title: "Error",
					content: "Debe seleccionar un método de pago"
				});
				return;
			}

			$scope.pago.usuario = LoginService.getCurrentUser().username;

			var data = $scope.pago;

			$.confirm({
				title: "Confirmar acción",
				content: "¿Está seguro que desea procesar este pago?",
				keyboardEnabled: true,
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=procesar_pago",
					    type: "POST",
					    data: data,
					    beforeSend: function(){},
					    success: function(data){
					        var json = $.parseJSON(data);

					        if (json.status == "ok")
					        {
					        	$location.path("/pedidos");
					        }
					    }
					});
				}
			})
		}

		$scope.cargar_pedido($scope.pid);
	};

	angular.module("soincopy").controller("Caja", Caja);
}());