(function(){
	var Orden = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getCarreras($scope);
		SoincopyService.getMaterias($scope);

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

			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir esta orden?',
				confirm: function(){
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
				},
				cancel: function(){}
			});
		}
	};

	angular.module("soincopy").controller("Orden", Orden);
}());