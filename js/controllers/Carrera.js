(function(){
	var Carrera = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
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

		$scope.init_form_cache = function(){
			if (!$scope.carrera && $localStorage.cache.carrera)
				$scope.carrera = $localStorage.cache.carrera;

			$interval(function(){
				if ($scope.carrera)
					$localStorage.cache.carrera = $scope.carrera;
			}, 3000);
		}

		$scope.cargar_carreras = function(){
			SoincopyService.getCarreras($scope);
		}

		$scope.cargar_carrera = function(id){
			SoincopyService.getCarrera($scope, id);
		}

		$scope.registrar_carrera = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la carrera <strong>' + $scope.carrera.nombre + '</strong>?',
				confirm: function(){
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
				        		$scope.carrera = {};
				        		delete $localStorage.cache.carrera;
				        		$location.path("/carreras");
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