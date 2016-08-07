(function(){
	var Profesor = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		$scope.tipos_de_profesor = ["Semestral", "Anual"];
		$scope.editar = $routeParams.id;

		SoincopyService.getProfesores($scope);

		$scope.cargar_profesores = function(){
			SoincopyService.getProfesores($scope);
		}

		$scope.cargar_profesor = function(id){
			SoincopyService.getProfesor($scope, id);
		}

		$scope.registrar_profesor = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir a <strong>' + $scope.profesor.nombre + ' ' + $scope.profesor.apellido + '</strong>?',
				confirm: function(){
					var post = $scope.profesor;

					var fn = "agregar_profesor";
					var msg = "Profesor añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_profesor";
						msg = "Profesor modificado con éxito";
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
					        	
				        		AlertService.showSuccess(msg);
				        		$location.path("/profesores");
				        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_profesor",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cargar_profesores();
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_profesor($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Profesor", Profesor);
}());