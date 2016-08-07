(function(){
	var Dependencia = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		$scope.cargar_dependencia = function(id){
			SoincopyService.getDependencia($scope, id);
		}

		$scope.registrar_dependencia = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la dependencia <strong>' + $scope.dependencia.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.dependencia;

					var fn = "agregar_dependencia";
					var msg = "Dependencia añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_dependencia";
						msg = "Dependencia modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
				        	$scope.safeApply(function(){
				        		if (window.location.hash.indexOf('express') != -1)
					        		window.close();
					        	
				        		$location.path("/dependencias");
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
			    url: "php/run.php?fn=cambiar_estado_dependencia",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getDependencias($scope);
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_dependencia($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Dependencia", Dependencia);
}());