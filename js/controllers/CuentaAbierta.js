(function(){
	var CuentaAbierta = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		$scope.cargar_cuentaabierta = function(id){
			SoincopyService.getCuentaAbierta($scope, id);
		}

		$scope.registrar_cuentaabierta = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la cuenta abierta <strong>' + $scope.cuentaabierta.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.cuentaabierta;

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
				        	$scope.safeApply(function(){
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