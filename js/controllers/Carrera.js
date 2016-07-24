(function(){
	var Carrera = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		$scope.tipos_de_carrera = ["Semestral", "Anual"];
		$scope.editar = $routeParams.id;

		SoincopyService.getCarreras($scope);

		$scope.cargar_carrera = function(id){
			SoincopyService.getCarrera($scope, id);
		}

		$scope.registrar_carrera = function(){
			var post = $scope.carrera;

			var fn = "agregar_carrera";
			var msg = "Carrera añadida con éxito";

			if ($routeParams.id)
			{
				fn = "editar_carrera";
				msg = "Carrera modificada con éxito";
			}

			$.ajax({
			    url: "php/run.php?fn=" + fn,
			    type: "POST",
			    data: post,
			    beforeSend: function(){},
			    success: function(data){
		        	$scope.safeApply(function(){
		        		$location.path("/carreras");
		        		AlertService.showSuccess(msg);
		        	})
			    }
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_carrera",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cargar_carreras();
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_carrera($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Carrera", Carrera);
}());