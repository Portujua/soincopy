(function(){
	var Pedido = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval, LoginService)
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

		SoincopyService.getPedidos($scope);
		SoincopyService.getDepartamentosUCAB($scope);
		SoincopyService.getCuentaAbiertas($scope);
		SoincopyService.getCondicionesPago($scope);
		SoincopyService.getClientes($scope);

		SoincopyService.getCarreras($scope);
		SoincopyService.getProfesores($scope);

		$scope.cargar_productos_venta = function(){
			SoincopyService.getProductosVenta($scope);
		}

		$scope.init_form_cache = function(){
			if (!$scope.pedido && $localStorage.cache.pedido)
				$scope.pedido = $localStorage.cache.pedido;

			$interval(function(){
				if ($scope.pedido)
					$localStorage.cache.pedido = $scope.pedido;
			}, 3000);
		}

		$scope.cargar_pedido = function(id){
			SoincopyService.getPedido($scope, id);
		}

		$scope.registrar_pedido = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir este pedido?',
				confirm: function(){
					var post = $scope.pedido;
					/*post.fecha_inicio_ = post.fecha_inicio.toJSON().slice(0,10);
					post.fecha_fin_ = post.fecha_fin.toJSON().slice(0,10);*/

					if (post.fecha)
						post.fecha_ = post.fecha.toJSON().slice(0,10);

					var fn = "agregar_pedido";
					var msg = "Pedido añadida con éxito";

					if ($routeParams.id)
					{
						fn = "editar_pedido";
						msg = "Pedido modificada con éxito";
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
					        		$scope.pedido = {};
					        		delete $localStorage.cache.pedido;
					        		AlertService.showSuccess("Pedido añadido con éxito");
					        		$location.path("/pedidos");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_pedido",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getPedidos($scope);
			        	$scope.o_ = null;
			        })
			    }
			});
		}

		$scope.actualizar_costo_unitario = function(index){
			if (!$scope.pedido.productos || !$scope.productos)
			{
				$timeout(function(){
					$scope.actualizar_costo_unitario(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.pedido.productos[index].producto)
					$scope.pedido.productos[index].costo_unitario = parseFloat($scope.productos[i].costo_unitario);
		}

		$scope.anadir_producto = function(){
			$scope.pedido.productos.push({
				nro_copias: 1,
				nro_originales: 1,
				costo_unitario: 0
			});

			$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
		}

		$scope.eliminar_producto = function(index){
			var aux = [];

			for (var i = 0; i < $scope.pedido.productos.length; i++)
				if (i != index)
					aux.push($scope.pedido.productos[i]);

			$scope.pedido.productos = aux;
		}

		$scope.anadir_persona = function(){
			$scope.pedido.personas.push({
				nombre: "",
				cedula: ""
			})
		}

		$scope.eliminar_persona = function(index){
			var aux = [];

			for (var i = 0; i < $scope.pedido.personas.length; i++)
				if (i != index)
					aux.push($scope.pedido.personas[i]);

			$scope.pedido.personas = aux;
		}

		$scope.agregar_dependencia = function(){
			var nw = window.open("./#/dependencias/agregar/express", "_blank", "menubar=no,status=no,toolbar=no,width=900,height=350");
			nw.onbeforeunload = function(){
				SoincopyService.getDependencias($scope);
			}
		}

		$scope.agregar_cliente = function(){
			var nw = window.open("./#/clientes/agregar/express", "_blank", "menubar=no,status=no,toolbar=no,width=900,height=550");
			nw.onbeforeunload = function(){
				SoincopyService.getClientes($scope);
			}
		}

		$scope.seleccionar = function(o){
			$scope.o_ = o;
		}

		$scope.requerir_autorizacion = function(){
			$.confirm({
				title: "Permiso requerido",
				content: '<p>Se requiere autorización de un administrador para poder efectuar un descuento.</p><div class="form-group"><input autofocus type="password" id="password" placeholder="Contraseña de administrador" class="form-control"></div>',
				keyboardEnabled: true,
				backgroundDismiss: false,
				confirm: function(){
					var pwd = this.$b.find("input").val();
					
					$.ajax({
					    url: "php/run.php?fn=autorizacion_admin",
					    type: "POST",
					    data: {password:pwd},
					    beforeSend: function(){},
					    success: function(data){
					        var json = $.parseJSON(data);

					        if (json.resultado)
					        	$scope.safeApply(function(){
					        		$scope.autorizado = true;
					        	});
					        else
					        	$.alert({
					        		title: "Acceso denegado",
					        		content: "La contraseña suministrada no es válida"
					        	});
					    }
					});
				},
				cancel: function(){
					
				}
			});
		}

		$scope.cargar_guias = function(){
			$scope.guias = [];
			var self = $scope;

			$.ajax({
			    url: "api/guias/1",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        var json = $.parseJSON(data);
			        var guias = [];

			        var availableTags = [];

			        for (var i = 0; i < json.length; i++)
			        {
			        	if (json[i].status != 1)
			        		continue;

		        		if (self.filtros.carrera != json[i].carrera_id && self.filtros.carrera != -1)
		        			continue;

		        		if (self.filtros.materia != json[i].materia_id && self.filtros.materia != -1)
		        			continue;

		        		if (self.filtros.periodo != json[i].periodo && self.filtros.periodo != -1)
		        			continue;

		        		if (self.filtros.profesor != json[i].profesor.nombre_completo && self.filtros.profesor != -1)
		        			continue;

		        		if (self.filtros.nro_paginas)
		        			if (self.filtros.nro_paginas != json[i].numero_paginas && self.filtros.nro_paginas > 0)
		        				continue;

		        		if (self.filtros.codigo)
		        			if (self.filtros.codigo != json[i].codigo && self.filtros.codigo > 0)
		        				continue;


			        	availableTags.push({
			        		label: json[i].tokens,
			        		value: json[i].id
			        	})

			        	guias.push(json[i]);
			        }

			        $scope.safeApply(function(){
			        	$scope.guias = guias;
			        	console.log($scope.guias)
			        })

					$( "input[name=guia]" ).autocomplete({
						source: availableTags,
						minLength: 1,
						delay: 0,
						select: function (event, ui) {
							var id = ui.item.value;

							$scope.pedido.productos.push({
								nro_copias: 1,
								nro_originales: 1,
								costo_unitario: 0,
								producto: id
							});

							$timeout(function(){
								$('.selectpicker').selectpicker('refresh');
								$("input[name=guia]").val("");
							}, 500);
						}
					});
			    }
			});
		}

		$scope.agregar_guia = function(id, titulo){
			$scope.pedido.productos.push({
				nro_copias: 1,
				nro_originales: 1,
				costo_unitario: 0,
				producto: id,
				producto_nombre: titulo
			});
		}

		$scope.cargar_materias = function(){
			try 
			{
				var cid = $scope.filtros.carrera;

				if (cid == -1)
					$scope.filtros.materia = -1;

				SoincopyService.getMaterias($scope, cid);
				$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 1000);
			}
			catch(ex)
			{
				$timeout($scope.cargar_materias, 200);
			}
		}

		$scope.cargar_periodos = function(){
			var cid = $scope.filtros.carrera;

			if (cid == -1)
				$scope.filtros.periodo = -1;

			$.ajax({
			    url: "api/periodos/" + cid,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.periodos = $.parseJSON(data);
			        	$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
			        })
			    }
			});
		}

		$scope.chequear_disponibilidad = function(index){
			var pid = null;
			var cantidad = -1;

			if (!$scope.productos)
			{
				$timeout(function(){
					$scope.chequear_disponibilidad(index);
				}, 200);
				return;
			}

			for (var i = 0; i < $scope.productos.length; i++)
				if ($scope.productos[i].id == $scope.pedido.productos[index].producto)
				{
					pid = parseInt($scope.productos[i].id);
					cantidad = $scope.pedido.productos[index].nro_copias * $scope.pedido.productos[index].nro_originales;
				}

			if (pid == null || cantidad == -1) debugger;

			$.ajax({
			    url: "api/check/disponibilidad/producto/" + pid + "/" + cantidad + "/" + LoginService.getCurrentUser().username,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	var json = $.parseJSON(data);
			        	console.log(json)
			        	$scope.pedido.productos[index].errores = json.errores;
			        })
			    }
			});
		}

		if ($routeParams.id)
		{
			$scope.cargar_pedido($routeParams.id);
		}
	};

	angular.module("soincopy").controller("Pedido", Pedido);
}());