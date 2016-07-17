(function(){
	var Admin = function($scope, $http, $location, $routeParams, $timeout, $window){		
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

		$scope.periodos = [1,2,3,4,5,6,7,8,9,10];

		$scope.cargar_carreras = function(){
			$.ajax({
			    url: "php/run.php?fn=cargar_carreras",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.carreras = $.parseJSON(data);
			        	console.log($scope.carreras)
			        })
			    }
			});
		}

		$scope.registrar_carrera = function(){
			if (!$scope.agregarcarrera_nombre || !$scope.agregarcarrera_tipo)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			if ($scope.agregarcarrera_nombre.length == 0)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			var nombre = $scope.agregarcarrera_nombre;
			var tipo = $scope.agregarcarrera_tipo;

			$.ajax({
			    url: "php/run.php?fn=agregar_carrera",
			    type: "POST",
			    data: {
			    	nombre: nombre,
			    	tipo: tipo
			    },
			    beforeSend: function(){},
			    success: function(data){
			        if (data == "ok")
			        	$scope.safeApply(function(){
			        		$location.path("/inicio");
			        	})
			    }
			});
		}

		$scope.registrar_materia = function(){
			if (!$scope.agregarmateria_nombre || !$scope.agregarmateria_carrera || !$scope.agregarmateria_periodo)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			if ($scope.agregarmateria_nombre.length == 0)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			var nombre = $scope.agregarmateria_nombre;
			var carrera = $scope.carreras[$scope.agregarmateria_carrera].nombre;
			var periodo = $scope.agregarmateria_periodo;

			$.ajax({
			    url: "php/run.php?fn=agregar_materia",
			    type: "POST",
			    data: {
			    	nombre: nombre,
			    	carrera: carrera,
			    	periodo: periodo
			    },
			    beforeSend: function(){},
			    success: function(data){
			        if (data == "ok")
			        	$scope.safeApply(function(){
			        		$location.path("/inicio");
			        	})
			    }
			});
		}
	};

	angular.module("soincopy").controller("Admin", Admin);
}());