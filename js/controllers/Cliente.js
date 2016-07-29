(function(){
	var Cliente = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getClientes($scope);

		$scope.cargar_cliente = function(id){
			SoincopyService.getCliente($scope, id);
		}

		$scope.registrar_cliente = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir el cliente <strong>' + $scope.cliente.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.cliente;

					if (post.vence)
						post.vence_ = post.vence.toJSON().slice(0,10);

					var fn = "agregar_cliente";
					var msg = "Cliente añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_cliente";
						msg = "Cliente modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		$location.path("/clientes");
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
			    url: "php/run.php?fn=cambiar_estado_cliente",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getClientes($scope);
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_cliente($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Cliente", Cliente);
}());