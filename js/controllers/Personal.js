(function(){
	var Personal = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		$scope.cargar_datos_personal = function(id){
			$.ajax({
			    url: "api/personal",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	var json = $.parseJSON(data);

			        	for (var i = 0; i < json.length; i++)
			        		if (json[i].id == id)
			        			$scope.personal_nuevo = json[i];
			        })
			    }
			});
		}

		$scope.cargar_personal = function(){
			$.ajax({
			    url: "api/personal",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.personal = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.cargar_permisos = function(){
			$.ajax({
			    url: "api/permisos",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.permisos = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.cambiar_permiso = function(pid){
			if ($scope.personal_nuevo.permisos.indexOf("[" + pid + "]") == -1)
				$scope.personal_nuevo.permisos += "[" + pid + "]";
			else
			{
				var permisos = "";
				var actuales = $scope.personal_nuevo.permisos.split(']');

				for (var i = 0; i < actuales.length; i++)
					if (actuales[i].substring(1) != pid)
						permisos += "[" + actuales[i].substring(1) + "]";

				$scope.personal_nuevo.permisos = permisos;
			}
		}

		$scope.registrar_personal = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir a <strong>' + $scope.personal_nuevo.nombre + ' ' + $scope.personal_nuevo.apellido + '</strong>?',
				confirm: function(){
					var post = $scope.personal_nuevo;

					var fn = "agregar_personal";
					var msg = "Personal añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_personal";
						msg = "Personal modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
					        if (data == "ok")
					        	$scope.safeApply(function(){
					        		AlertService.showSuccess(msg);
					        		$location.path("/personal");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			/*$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir a <strong>' + $scope.personal_nuevo.nombre + ' ' + $scope.personal_nuevo.apellido + '</strong>?',
				confirm: function(){
					
				},
				cancel: function(){}
			});*/
			
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_personal",
			    type: "POST",
			    data: {pid:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.cargar_personal();
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_datos_personal($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Personal", Personal);
}());