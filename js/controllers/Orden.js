(function(){
	var Orden = function($scope, $http, $location, $routeParams, $timeout, $window){		
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
	};

	angular.module("soincopy").controller("Orden", Orden);
}());