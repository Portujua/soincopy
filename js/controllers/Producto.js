(function(){
	var Producto = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getProductos($scope);
		SoincopyService.getDepartamentos($scope);
		SoincopyService.getInventario($scope);

		$scope.cargar_producto = function(id){
			SoincopyService.getProducto($scope, id);
		}

		$scope.registrar_producto = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir el producto <strong>' + $scope.producto.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.producto;

					var fn = "agregar_producto";
					var msg = "Producto añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_producto";
						msg = "Producto modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		$location.path("/productos");
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
			    url: "php/run.php?fn=cambiar_estado_producto",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getProductos($scope);
			        })
			    }
			});
		}

		$scope.eliminar_precio = function(id){
			$.confirm({
				title: "Confirmar acción",
				content: "¿Está seguro que desea eliminar este registro de costo?<br/><strong>Este cambio es irreversible</strong>",
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=eliminar_precio_producto",
					    type: "POST",
					    data: {id:id},
					    beforeSend: function(){},
					    success: function(data){
					        $scope.safeApply(function(){
					        	$scope.cargar_producto($routeParams.id);
					        })
					    }
					});
				}
			})
		}

		$scope.anadir_material = function(){
			$scope.producto.materiales.push({
				material: 0,
				cantidad: 1
			})
		}

		$scope.eliminar_material = function(index){
			var aux = [];

			for (var i = 0; i < $scope.producto.materiales.length; i++)
				if (i != index)
					aux.push($scope.producto.materiales[i]);

			$scope.producto.materiales = aux;
		}

		if ($routeParams.id)
		{
			$scope.cargar_producto($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Producto", Producto);
}());