(function(){
	var Materia = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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
		SoincopyService.getMaterias($scope);

		$scope.cargar_materia = function(id){
			$http.get("api/materias").then(function(obj){
				var json = obj.data;

				for (var i = 0; i < json.length; i++)
	        		if (json[i].id == id)
	        			$scope.materia = json[i];

	        	$scope.cargar_periodos();
			});
		}

		$scope.cargar_periodos = function(){
			var cid = $scope.materia.carrera_id ? $scope.materia.carrera_id : $scope.materia.carrera;

			$.ajax({
			    url: "api/periodos/" + cid,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.periodos = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.cargar_tipos = function(){
			$.ajax({
			    url: "api/materias/tipos",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.tipos = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.registrar_materia = function(){
			var post = $scope.materia;

			var fn = "agregar_materia";
			var msg = "Materia añadida con éxito";

			if ($routeParams.id)
			{
				fn = "editar_materia";
				msg = "Materia modificada con éxito";
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
		        		$location.path("/materias");
		        	})
			    }
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_materia",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cargar_materias();
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_materia($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Materia", Materia);
}());