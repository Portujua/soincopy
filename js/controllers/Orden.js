(function(){
	var Orden = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService){		
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

		$scope.cargar_dependencias = function(){
			$.ajax({
			    url: "php/run.php?fn=cargar_dependencias",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.dependencias = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.cargar_materias = function(){
			$.ajax({
			    url: "php/run.php?fn=cargar_materias",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			    	var json = $.parseJSON(data);

			        $scope.safeApply(function(){
			        	$scope.materias = json;

			        	// Creo solo las carreras
			        	var cs = [];
			        	var carreras = [];

			        	for (var i = 0; i < json.length; i++)
			        		if (cs.indexOf(json[i].carrera) == -1)
			        		{
			        			cs.push(json[i].carrera);
			        			carreras.push({
			        				nombre: json[i].carrera,
			        				id: json[i].carrera_id
			        			});
			        		}

			        	$scope.carreras = carreras;
			        })
			    }
			});
		}

		$scope.registrar_orden = function(){
			if (!$scope.agregardependencia_nombre)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			if ($scope.agregardependencia_nombre.length == 0)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			var nombre = $scope.agregardependencia_nombre;

			$.ajax({
			    url: "php/run.php?fn=agregar_dependencia",
			    type: "POST",
			    data: {
			    	nombre: nombre
			    },
			    beforeSend: function(){},
			    success: function(data){
			    	console.log(data)
			        if (data == "ok")
			        	$scope.safeApply(function(){
			        		AlertService.showSuccess("Orden añadida con éxito");
			        		$location.path("/inicio");
			        	})
			    }
			});
		}
	};

	angular.module("soincopy").controller("Orden", Orden);
}());