(function(){
	var Orden = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval, LoginService, NgTableParams, $filter)
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

		SoincopyService.getDependencias($scope);
		SoincopyService.getDepartamentosUCAB($scope);
		SoincopyService.getCuentaAbiertas($scope);
		SoincopyService.getCondicionesPago($scope);

		SoincopyService.getOrdenes().then((response) => {
			$scope.ordenes = response.data;
			var data = response.data;

			$scope.totalCosto = 0.0;

			for (let i = 0; i < data.length; i++)
				$scope.totalCosto += parseFloat(data[i].costo_total);

			$scope.tableParams = new NgTableParams({ group: 'dependencia' }, { dataset: data });
		});

		$scope.isLastPage = () => {
			if (!$scope.tableParams) return false;
			
			$scope.tableParams.page() === Math.ceil($scope.tableParams.total() / $scope.tableParams.count())
		}

		$scope.cargar_productos_venta = function(){
			SoincopyService.getProductosVenta($scope);
		}

		$scope.init_form_cache = function(){
			if (!$scope.orden && $localStorage.cache.orden)
				$scope.orden = $localStorage.cache.orden;

			$interval(function(){
				if ($scope.orden)
					$localStorage.cache.orden = $scope.orden;
			}, 3000);
		}

		$scope.cargar_orden = function(id){
			SoincopyService.getOrden($scope, id);
		}

		$scope.registrar_orden = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir esta orden?',
				confirm: function(){
					var post = $scope.orden;
					/*post.fecha_inicio_ = post.fecha_inicio.toJSON().slice(0,10);
					post.fecha_fin_ = post.fecha_fin.toJSON().slice(0,10);*/

					if (post.fecha)
						post.fecha_ = post.fecha.toJSON().slice(0,10);

					var fn = "agregar_orden";
					var msg = "Orden añadida con éxito";

					if ($routeParams.id)
					{
						fn = "editar_orden";
						msg = "Orden modificada con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        if (data.ok)
				        	$scope.safeApply(function(){
				        		$scope.orden = {};
				        		$localStorage.cache.orden = $scope.orden;
				        		AlertService.showSuccess(msg);
				        		$location.path("/ordenes");
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_orden",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getOrdenes($scope);
			        	$scope.o_ = null;
			        })
			    }
			});
		}

		$scope.actualizar_costo_unitario = function(index){
			if (!$scope.orden.productos || !$scope.productos)
			{
				$timeout(function(){
					$scope.actualizar_costo_unitario(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.orden.productos[index].producto)
					$scope.orden.productos[index].costo_unitario = parseFloat($scope.productos[i].costo_unitario);
		}

		$scope.anadir_producto = function(){
			$scope.orden.productos.push({
				nro_copias: 1,
				nro_originales: 1,
				costo_unitario: 0
			});

			$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
		}

		$scope.eliminar_producto = function(index){
			var aux = [];

			for (var i = 0; i < $scope.orden.productos.length; i++)
				if (i != index)
					aux.push($scope.orden.productos[i]);

			$scope.orden.productos = aux;
		}

		$scope.anadir_persona = function(){
			$scope.orden.personas.push({
				nombre: "",
				cedula: ""
			})
		}

		$scope.eliminar_persona = function(index){
			var aux = [];

			for (var i = 0; i < $scope.orden.personas.length; i++)
				if (i != index)
					aux.push($scope.orden.personas[i]);

			$scope.orden.personas = aux;
		}

		$scope.agregar_dependencia = function(){
			var nw = window.open("./#/dependencias/agregar/express", "_blank", "menubar=no,status=no,toolbar=no,width=900,height=350");
			nw.onbeforeunload = function(){
				SoincopyService.getDependencias($scope);
			}
		}

		$scope.seleccionar = function(o){
			$scope.o_ = o;
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
				if ($scope.productos[i].id == $scope.orden.productos[index].producto)
				{
					pid = parseInt($scope.productos[i].id);
					cantidad = $scope.orden.productos[index].nro_copias * $scope.orden.productos[index].nro_originales;
				}

			if (pid == null || cantidad == -1) debugger;

			$.ajax({
			    url: "api/check/disponibilidad/producto/" + pid + "/" + cantidad + "/" + LoginService.getCurrentUser().username,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
		        $scope.safeApply(function(){
		        	$scope.orden.productos[index].errores = data.errores;
		        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_orden($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Orden", Orden);
}());