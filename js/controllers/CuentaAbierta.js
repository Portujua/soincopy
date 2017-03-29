(function(){
	var CuentaAbierta = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval, LoginService)
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

		SoincopyService.getCuentaAbiertas($scope);

		$scope.recalcular_iva = function(){
			if ($scope.p_.total_cuenta == 0.00) {
				$timeout($scope.recalcular_iva, 500);
				return;
			}

			if ($scope.p_.total_cuenta >= 200000.00) {
				$scope.$parent.IVA = 0.12;
			}
			else {
				if ($scope.pago.metodo_pago == '4')
					$scope.$parent.IVA = 0.12;
				else
					$scope.$parent.IVA = 0.10;
			}

			console.log("IVA Recalculado a:", $scope.$parent.IVA);
		}

		$scope.cargar_productos_venta = function(){
			SoincopyService.getProductosVenta($scope);
		}

		$scope.init_form_cache = function(){
			if (!$scope.cuentaabierta && $localStorage.cache.cuentaabierta)
				$scope.cuentaabierta = $localStorage.cache.cuentaabierta;

			$interval(function(){
				if ($scope.cuentaabierta)
					$localStorage.cache.cuentaabierta = $scope.cuentaabierta;
			}, 3000);
		}

		$scope.cargar_cuentaabierta = function(id){
			SoincopyService.getCuentaAbierta($scope, id);
		}

		$scope.registrar_cuentaabierta = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la cuenta abierta <strong>' + $scope.cuentaabierta.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.cuentaabierta;

					if (post.inicia)
						post.inicia_ = post.inicia.toJSON().slice(0,10);

					if (post.vence)
						post.vence_ = post.vence.toJSON().slice(0,10);

					var fn = "agregar_cuentaabierta";
					var msg = "Cuenta abierta añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_cuentaabierta";
						msg = "Cuenta abierta modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
				        	$scope.safeApply(function(){
				        		$scope.cuentaabierta = {};
				        		delete $localStorage.cache.cuentaabierta;
				        		$location.path("/cuentaabiertas");
				        		AlertService.showSuccess(msg);
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_cuentaabierta",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getCuentaAbiertas($scope);
			        	$scope.p_ = null;
			        })
			    }
			});
		}

		$scope.anadir_persona = function(){
			$scope.cuentaabierta.personas.push({
				nombre: "",
				cedula: ""
			})
		}

		$scope.eliminar_persona = function(index){
			var aux = [];

			for (var i = 0; i < $scope.cuentaabierta.personas.length; i++)
				if (i != index)
					aux.push($scope.cuentaabierta.personas[i]);

			$scope.cuentaabierta.personas = aux;
		}

		$scope.actualizar_costo_unitario = function(index){
			if (!$scope.productos)
			{
				$timeout(function(){
					$scope.actualizar_costo_unitario(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.cuentaabierta.productos[index].producto)
					$scope.cuentaabierta.productos[index].costo_unitario = parseFloat($scope.productos[i].costo_unitario);
		}

		$scope.anadir_producto = function(){
			$scope.cuentaabierta.productos.push({
				nro_copias: 1,
				nro_originales: 1,
				costo_unitario: 0
			});

			$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
		}

		$scope.eliminar_producto = function(index){
			var aux = [];

			for (var i = 0; i < $scope.cuentaabierta.productos.length; i++)
				if (i != index)
					aux.push($scope.cuentaabierta.productos[i]);

			$scope.cuentaabierta.productos = aux;
		}

		$scope.seleccionar = function(p){
			$scope.p_ = p;
			$scope.recalcular_iva();
		}

		$scope.requerir_autorizacion = function(){
			$.confirm({
				title: "Permiso requerido",
				content: '<p>Se requiere autorización de un administrador para poder efectuar un descuento.</p><div class="form-group"><input autofocus type="password" id="password" placeholder="Contraseña de administrador" class="form-control"></div>',
				keyboardEnabled: true,
				backgroundDismiss: false,
				confirm: function(){
					var pwd = this.$b.find("input").val();
					
					$.ajax({
					    url: "php/run.php?fn=autorizacion_admin",
					    type: "POST",
					    data: {password:pwd},
					    beforeSend: function(){},
					    success: function(data){
					        if (data.resultado)
					        	$scope.safeApply(function(){
					        		$scope.autorizado = true;
					        	});
					        else
					        	$.alert({
					        		title: "Acceso denegado",
					        		content: "La contraseña suministrada no es válida"
					        	});
					    }
					});
				},
				cancel: function(){
					
				}
			});
		}

		$scope.chequear_disponibilidad = function(index){
			var pid = null;
			var cantidad = -1;

			if (!$scope.productos)
			{
				$timeout(function(){
					$scope.chequear_disponibilidad(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.cuentaabierta.productos[index].producto)
				{
					pid = parseInt($scope.productos[i].id);
					cantidad = $scope.cuentaabierta.productos[index].nro_copias * $scope.cuentaabierta.productos[index].nro_originales;
				}

			if (pid == null || cantidad == -1) debugger;

			$.ajax({
			    url: "api/check/disponibilidad/producto/" + pid + "/" + cantidad + "/" + LoginService.getCurrentUser().username,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cuentaabierta.productos[index].errores = data.errores;
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_cuentaabierta($routeParams.id);
		}
	};

	angular.module("soincopy").controller("CuentaAbierta", CuentaAbierta);
}());