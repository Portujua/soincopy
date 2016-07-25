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
		SoincopyService.getProductosOriginales($scope);

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
			console.log("Registrando orden...")
			var post = $scope.orden;

			console.log($scope.orden)
			return;

			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir esta orden?',
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=agregar_dependencia",
					    type: "POST",
					    data: post,
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