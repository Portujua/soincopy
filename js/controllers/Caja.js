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
			total: 0.00,
			metodo_pago: '4'
		}

		SoincopyService.getCondicionesPago($scope);

		$scope.recalcular_iva = function(){
			if ($scope.pago.iva == 0.00) {
				$timeout($scope.recalcular_iva, 500);
				return;
			}

			if ($scope.pago.subtotal >= 200000.00) {
				$scope.$parent.IVA = 0.12;
			}
			else {
				if ($scope.pago.metodo_pago == '4')
					$scope.$parent.IVA = 0.12;
				else
					$scope.$parent.IVA = 0.10;
			}

			console.log("IVA Recalculado a:", $scope.$parent.IVA);

			$scope.calcularDatos();
		}

		$scope.cargar_retiros_de_caja = function(){
			SoincopyService.getRetirosCaja($scope);
		}

		$scope.cargar_pedido = function(id){
			SoincopyService.getPedido($scope, id);
		}

		$scope.cargar_cajeros = function(){
			SoincopyService.getCajerosActivos($scope);
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
				$scope.pago.subtotal += productos[i].costo_unitario_facturado / (1.00 + (productos[i].exento_iva == 1 ? 0.00 : $scope.$parent.IVA)) * (productos[i].nro_copias * productos[i].nro_originales);
				$scope.pago.total += productos[i].costo_unitario_facturado * (productos[i].nro_copias * productos[i].nro_originales);
				/*$scope.pago.iva += productos[i].costo_unitario_facturado * (productos[i].exento_iva == 1 ? 0.00 : $scope.$parent.IVA) * (productos[i].nro_copias * productos[i].nro_originales);*/
			}

			//$scope.pago.total = $scope.pago.subtotal + $scope.pago.iva;
			$scope.pago.iva = $scope.pago.total - $scope.pago.subtotal;
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

			if ($scope.pago.metodo_pago == 1 && !$scope.pago.tipo_tarjeta)
			{
				$.alert({
					title: "Error",
					content: "Debe seleccionar un tipo de tarjeta"
				});
				return;
			}

			$scope.pago.usuario = LoginService.getCurrentUser().username;

			var data_pago = $scope.pago;

			$.confirm({
				title: "Confirmar acción",
				content: "¿Está seguro que desea procesar este pago?",
				keyboardEnabled: true,
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=procesar_pago",
					    type: "POST",
					    data: data_pago,
					    beforeSend: function(){},
					    success: function(data){
					    	try {
						        var json = $.parseJSON(data);

						        if (json.status == "ok")
						        {
						        	$location.path("/pedidos");

						        	window.open(
										"./factura/" + json.factura,
										"_blank",
										"menubar=no,status=no,toolbar=no,width=285,height=400");
						        }
						    }
						    catch (ex)
						    {
						    	console.log(data)
						    }
					    }
					});
				}
			})
		}

		$scope.cargar_retiro_caja = function(id){
			SoincopyService.getRetiroCaja($scope, id);
		}

		$scope.registrar_retiro_caja = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir este retiro de caja?',
				confirm: function(){
					var post = $scope.retiro;

					var fn = "agregar_retiro_caja";
					var msg = "Retiro de Caja añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_retiro_caja";
						msg = "Retiro de Caja modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
					    	var json = $.parseJSON(data);

				        	$scope.safeApply(function(){
				        		if (!json.error)
				        		{
				        			AlertService.showSuccess(json.msg);
				        			$location.path("/");
				        		}
				        		else
				        		{
				        			$scope.retiro.contrasena = "";
				        			AlertService.showError(json.msg);
				        		}
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.registrar_nota_credito = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir esta nota de crédito?',
				confirm: function(){
					var post = $scope.nota;
					post.creado_por = LoginService.getCurrentUser().username;

					var fn = "agregar_nota_credito";

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
					    	var json = $.parseJSON(data);

				        	$scope.safeApply(function(){
				        		if (!json.error)
				        		{
				        			AlertService.showSuccess(json.msg);
				        			$location.path("/");
				        		}
				        		else
				        			AlertService.showError(json.msg);
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		if ($routeParams.pid)
			$scope.cargar_pedido($scope.pid);
	};

	angular.module("soincopy").controller("Caja", Caja);
}());