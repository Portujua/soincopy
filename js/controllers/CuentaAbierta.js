(function(){
	var CuentaAbierta = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
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

		SoincopyService.getCuentaAbiertas($scope);
		SoincopyService.getProductos($scope);

		$scope.init_form_cache = function(){
			if (!$scope.cuentaabierta && $localStorage.cache.cuentaabierta)
				$scope.cuentaabierta = $localStorage.cache.cuentaabierta;

			$interval(function(){
				if ($scope.cuentaabierta)
					$localStorage.cache.cuentaabierta = $scope.cuentaabierta;
			}, 3000);
		}

		$scope.cargar_cuentaabierta = function(id){
			SoincopyService.getCuentaAbierta($scope, id);
		}

		$scope.registrar_cuentaabierta = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir la cuenta abierta <strong>' + $scope.cuentaabierta.nombre + '</strong>?',
				confirm: function(){
					var post = $scope.cuentaabierta;

					if (post.inicia)
						post.inicia_ = post.inicia.toJSON().slice(0,10);

					if (post.vence)
						post.vence_ = post.vence.toJSON().slice(0,10);

					var fn = "agregar_cuentaabierta";
					var msg = "Cuenta abierta añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_cuentaabierta";
						msg = "Cuenta abierta modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data)
				        	$scope.safeApply(function(){
				        		$scope.cuentaabierta = {};
				        		delete $localStorage.cache.cuentaabierta;
				        		$location.path("/cuentaabiertas");
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
			    url: "php/run.php?fn=cambiar_estado_cuentaabierta",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getCuentaAbiertas($scope);
			        	$scope.p_ = null;
			        })
			    }
			});
		}

		$scope.anadir_persona = function(){
			$scope.cuentaabierta.personas.push({
				nombre: "",
				cedula: ""
			})
		}

		$scope.eliminar_persona = function(index){
			var aux = [];

			for (var i = 0; i < $scope.cuentaabierta.personas.length; i++)
				if (i != index)
					aux.push($scope.cuentaabierta.personas[i]);

			$scope.cuentaabierta.personas = aux;
		}

		$scope.actualizar_costo_unitario = function(index){
			if (!$scope.productos)
			{
				$timeout(function(){
					$scope.actualizar_costo_unitario(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.cuentaabierta.productos[index].producto)
					$scope.cuentaabierta.productos[index].costo_unitario = parseFloat($scope.productos[i].costo_unitario);
		}

		$scope.anadir_producto = function(){
			$scope.cuentaabierta.productos.push({
				nro_copias: 1,
				nro_originales: 1,
				costo_unitario: 0
			});

			$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
		}

		$scope.eliminar_producto = function(index){
			var aux = [];

			for (var i = 0; i < $scope.cuentaabierta.productos.length; i++)
				if (i != index)
					aux.push($scope.cuentaabierta.productos[i]);

			$scope.cuentaabierta.productos = aux;
		}

		$scope.seleccionar = function(p){
			$scope.p_ = p;
		}

		$scope.mostrar_detalle = function(ca){
			console.log(ca);
		}

		if ($routeParams.id)
		{
			$scope.cargar_cuentaabierta($routeParams.id);
		}
	};

	angular.module("soincopy").controller("CuentaAbierta", CuentaAbierta);
}());