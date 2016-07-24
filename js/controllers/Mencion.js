(function(){
	var Mencion = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getCarreras($scope);
		SoincopyService.getCarreras($scope);
		SoincopyService.getMenciones($scope);

		$scope.cargar_mencion = function(id){
			SoincopyService.getMencion($scope, id);
		}

		$scope.registrar_mencion = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir esta mención?',
				confirm: function(){
					var post = $scope.mencion;

					var fn = "agregar_mencion";
					var msg = "Mención añadida con éxito";

					if ($routeParams.id)
					{
						fn = "editar_mencion";
						msg = "Mención modificada con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
				        	$scope.safeApply(function(){
				        		AlertService.showSuccess(msg);
				        		$location.path("/menciones");
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_mencion",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cargar_menciones();
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_mencion($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Mencion", Mencion);
}());