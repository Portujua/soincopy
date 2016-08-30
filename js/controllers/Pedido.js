(function(){
	var Pedido = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
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

		SoincopyService.getPedidos($scope);
		SoincopyService.getDependencias($scope);
		SoincopyService.getDepartamentosUCAB($scope);
		SoincopyService.getProductosOriginales($scope);
		SoincopyService.getCuentaAbiertas($scope);
		SoincopyService.getCondicionesPago($scope);

		$scope.init_form_cache = function(){
			if (!$scope.pedido && $localStorage.cache.pedido)
				$scope.pedido = $localStorage.cache.pedido;

			$interval(function(){
				if ($scope.pedido)
					$localStorage.cache.pedido = $scope.pedido;
			}, 3000);
		}

		$scope.cargar_pedido = function(id){
			SoincopyService.getPedido($scope, id);
		}

		$scope.registrar_pedido = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir este pedido?',
				confirm: function(){
					var post = $scope.pedido;
					/*post.fecha_inicio_ = post.fecha_inicio.toJSON().slice(0,10);
					post.fecha_fin_ = post.fecha_fin.toJSON().slice(0,10);*/

					if (post.fecha)
						post.fecha_ = post.fecha.toJSON().slice(0,10);

					var fn = "agregar_pedido";
					var msg = "Pedido añadida con éxito";

					if ($routeParams.id)
					{
						fn = "editar_pedido";
						msg = "Pedido modificada con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
					        if (data == "ok")
					        	$scope.safeApply(function(){
					        		$scope.pedido = {};
					        		delete $localStorage.cache.pedido;
					        		AlertService.showSuccess("Pedido añadido con éxito");
					        		$location.path("/pedidos");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_pedido",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getPedidos($scope);
			        	$scope.o_ = null;
			        })
			    }
			});
		}

		$scope.actualizar_costo_unitario = function(index){
			if (!$scope.pedido.productos)
			{
				$timeout(function(){
					$scope.actualizar_costo_unitario(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.pedido.productos[index].producto)
					$scope.pedido.productos[index].costo_unitario = parseFloat($scope.productos[i].costo_unitario);
		}

		$scope.anadir_producto = function(){
			$scope.pedido.productos.push({
				nro_copias: 1,
				nro_originales: 1,
				costo_unitario: 0
			});

			$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
		}

		$scope.eliminar_producto = function(index){
			var aux = [];

			for (var i = 0; i < $scope.pedido.productos.length; i++)
				if (i != index)
					aux.push($scope.pedido.productos[i]);

			$scope.pedido.productos = aux;
		}

		$scope.anadir_persona = function(){
			$scope.pedido.personas.push({
				nombre: "",
				cedula: ""
			})
		}

		$scope.eliminar_persona = function(index){
			var aux = [];

			for (var i = 0; i < $scope.pedido.personas.length; i++)
				if (i != index)
					aux.push($scope.pedido.personas[i]);

			$scope.pedido.personas = aux;
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

		if ($routeParams.id)
		{
			$scope.cargar_pedido($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Pedido", Pedido);
}());