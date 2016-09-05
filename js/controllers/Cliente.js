(function(){
	var Cliente = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
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

		$scope.init_form_cache = function(){
			if (!$scope.cliente && $localStorage.cache.cliente)
				$scope.cliente = $localStorage.cache.cliente;

			$interval(function(){
				if ($scope.cliente)
					$localStorage.cache.cliente = $scope.cliente;
			}, 3000);
		}

		$scope.cargar_clientes = function(){
			SoincopyService.getClientes($scope);
		}

		$scope.cargar_cliente = function(id){
			SoincopyService.getCliente($scope, id);
		}

		$scope.registrar_cliente = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la cliente <strong>' + $scope.cliente.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.cliente;

					var fn = "agregar_cliente";
					var msg = "Cliente añadida con éxito";

					if ($routeParams.id)
					{
						fn = "editar_cliente";
						msg = "Cliente modificada con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		$scope.cliente = {};
				        		delete $localStorage.cache.cliente;

				        		if (window.location.hash.indexOf('express') != -1)
					        		window.close();
					        	
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
			        	$scope.cargar_clientes();
			        	$scope.p_ = null;
			        })
			    }
			});
		}

		$scope.seleccionar = function(p){
			$scope.p_ = p;
		}

		if ($routeParams.id)
		{
			$scope.cargar_cliente($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Cliente", Cliente);
}());