(function(){
	var Inventario = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getInventario($scope);

		$scope.cargar_material = function(id){
			SoincopyService.getMaterial($scope, id);
		}

		$scope.registrar_material = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir el material <strong>' + $scope.material.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.material;

					var fn = "agregar_material";
					var msg = "Material añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_material";
						msg = "Material modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		$location.path("/inventario");
				        		AlertService.showSuccess(msg);
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.registrar_stock = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir <strong>' + ($scope.material.nuevo_stock.cantidad + " " + $scope.material.nombre) + '</strong> al inventario?',
				confirm: function(){
					var post = $scope.material.nuevo_stock;
					post.material = $scope.material.id;

					var fn = "agregar_stock";
					var msg = "Material añadido al inventario con éxito";

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		$scope.cargar_material($routeParams.id);
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
			    url: "php/run.php?fn=cambiar_estado_material",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getInventario($scope);
			        })
			    }
			});
		}

		$scope.eliminar_stock = function(id){
			$.confirm({
				title: "Alerta",
				content: "Al eliminar este material se retirará por completo de todo el sistema, ¿está seguro que desea eliminarlo?",
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=eliminar_stock",
					    type: "POST",
					    data: {id:id},
					    beforeSend: function(){},
					    success: function(data){
					        $scope.safeApply(function(){
					        	$scope.cargar_material($routeParams.id);
					        })
					    }
					});
				}
			})
		}

		if ($routeParams.id)
		{
			$scope.cargar_material($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Inventario", Inventario);
}());