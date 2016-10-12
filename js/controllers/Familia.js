(function(){
	var Familia = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getFamilias($scope);

		$scope.cargar_familia = function(id){
			SoincopyService.getFamilia($scope, id);
		}

		$scope.registrar_familia = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la familia <strong>' + $scope.familia.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.familia;

					var fn = "agregar_familia";
					var msg = "Familia añadida con éxito";

					if ($routeParams.id)
					{
						fn = "editar_familia";
						msg = "Familia modificada con éxito";
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
					        	
				        		$location.path("/productos/familias");
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
			    url: "php/run.php?fn=cambiar_estado_familia",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getFamilias($scope);
			        	$scope.p_ = null;
			        })
			    }
			});
		}

		$scope.seleccionar = function(p){
			$scope.p_ = p;
		}

		if ($routeParams.id)
		{
			$scope.cargar_familia($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Familia", Familia);
}());