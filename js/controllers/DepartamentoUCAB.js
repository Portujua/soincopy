(function(){
	var DepartamentoUCAB = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getDepartamentosUCAB($scope);

		$scope.cargar_departamento = function(id){
			SoincopyService.getDepartamentoUCAB($scope, id);
		}

		$scope.registrar_departamento = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir el departamento <strong>' + $scope.departamento.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.departamento;

					var fn = "agregar_departamento_ucab";
					var msg = "Departamento añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_departamento_ucab";
						msg = "Departamento modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		$location.path("/departamentos/ucab");
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
			    url: "php/run.php?fn=cambiar_estado_departamento_ucab",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getDepartamentosUCAB($scope);
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_departamento($routeParams.id);
		}
	};

	angular.module("soincopy").controller("DepartamentoUCAB", DepartamentoUCAB);
}());