(function(){
	var Profesor = function($scope, $http, $location, $routeParams, $timeout, $window){		
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

		$scope.cargar_profesor = function(id){
			$.ajax({
			    url: "api/profesores",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	var json = $.parseJSON(data);

			        	for (var i = 0; i < json.length; i++)
			        		if (json[i].id == id)
			        			$scope.profesor = json[i];
			        })
			    }
			});
		}

		$scope.cargar_profesores = function(){
			$.ajax({
			    url: "api/profesores",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.profesores = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.registrar_profesor = function(){
			var post = $scope.profesor;

			var fn = "agregar_profesor";

			if ($routeParams.id)
				fn = "editar_profesor";

			$.ajax({
			    url: "php/run.php?fn=" + fn,
			    type: "POST",
			    data: post,
			    beforeSend: function(){},
			    success: function(data){
		        	$scope.safeApply(function(){
		        		$location.path("/profesores");
		        	})
			    }
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