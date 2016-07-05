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

		$scope.registrar_personal = function(){
			if (!$scope.agregarpersonal_nombre || !$scope.agregarpersonal_apellido)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			if ($scope.agregarpersonal_nombre.length == 0 || $scope.agregarpersonal_apellido.length == 0)
			{
				alert("Debe llenar los campos obligatorios.");
				return;
			}

			var nombre = $scope.agregarpersonal_nombre;
			var apellido = $scope.agregarpersonal_apellido;
			var snombre = $scope.agregarpersonal_snombre;
			var sapellido = $scope.agregarpersonal_sapellido;

			$.ajax({
			    url: "php/run.php?fn=agregar_personal",
			    type: "POST",
			    data: {
			    	nombre: nombre,
			    	apellido: apellido,
			    	snombre: snombre,
			    	sapellido: sapellido
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

		$scope.registrar_dependencia = function(){
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