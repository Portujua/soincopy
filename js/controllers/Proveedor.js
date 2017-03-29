(function(){
	var Proveedor = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
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

		SoincopyService.getProveedores($scope);

		$scope.init_form_cache = function(){
			if (!$scope.proveedor && $localStorage.cache.proveedor)
				$scope.proveedor = $localStorage.cache.proveedor;

			$interval(function(){
				if ($scope.proveedor)
					$localStorage.cache.proveedor = $scope.proveedor;
			}, 3000);
		}

		$scope.cargar_proveedores = function(){
			SoincopyService.getProveedores($scope);
		}

		$scope.cargar_proveedor = function(id){
			SoincopyService.getProveedor($scope, id);
		}

		$scope.registrar_proveedor = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir el proveedor <strong>' + $scope.proveedor.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.proveedor;

					var fn = "agregar_proveedor";
					var msg = "Proveedor añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_proveedor";
						msg = "Proveedor modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
			        	$scope.safeApply(function(){
			        		$scope.proveedor = {};
			        		delete $localStorage.cache.proveedor;
			        		if (window.location.hash.indexOf('express') != -1) 
				        		window.close();
			        		$location.path("/proveedores");
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
			    url: "php/run.php?fn=cambiar_estado_proveedor",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cargar_proveedores();
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
			$scope.cargar_proveedor($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Proveedor", Proveedor);
}());