(function(){
	angular.module("soincopy").factory('SoincopyService', function($http, $timeout, LoginService){
		return {
			getCarreras: function(s){
				$http.get("api/carreras").then(function(obj){
					s.carreras = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getCarrera: function(s, id){
				$http.get("api/carreras").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.carrera = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},




			getProveedores: function(s, extra = false){
				$http({
					method: 'POST',
					url: "api/proveedores", 
					data: $.param(extra ? {extra: extra} : {}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(obj){
					s.proveedores = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getProveedor: function(s, id){
				$http.get("api/proveedores").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.proveedor = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},




			getMaterias: function(s, cid){
				if (cid == null)
					$http.get("api/materias").then(function(obj){
						s.materias = obj.data;
						$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
					});
				else
					$http.get("api/materias/" + cid).then(function(obj){
						s.materias = obj.data;
						$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
					});
			},
			getMateria: function(s, id){
				$http.get("api/materias").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.materia = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},




			getProfesores: function(s){
				$http.get("api/profesores").then(function(obj){
					s.profesores = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getProfesor: function(s, id){
				$http.get("api/profesores").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.profesor = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},




			getPersonal: function(s){
				$http.get("api/personal").then(function(obj){
					s.personal = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getCajeros: function(s){
				$http.get("api/cajeros").then(function(obj){
					s.cajeros = [];

					if (window.location.hash.indexOf("reportes") != -1)
						s.cajeros.push({
							id: -1,
							nombre_completo: "Todos"
						});

					for (var i = 0; i < obj.data.length; i++)
						s.cajeros.push(obj.data[i]);

					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getCajerosActivos: function(s){
				$http.get("api/cajeros/activos").then(function(obj){
					s.cajeros = [];

					for (var i = 0; i < obj.data.length; i++)
						s.cajeros.push(obj.data[i]);

					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getInventarioDanado: function(s){
				$http.get("api/inventario/danado").then(function(obj){
					s.material_danado = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},




			getMenciones: function(s){
				$http.get("api/menciones").then(function(obj){
					s.menciones = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getMencion: function(s, id){
				$http.get("api/menciones").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.mencion = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},





			getGuias: function(status){
				return $http.get("api/guias/" + status).finally(() => {
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getGuiasWeb: function(s, status){
				$http.get("api/guias/web").then(function(obj){
					s.guias_web = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},



			getProductos: function(s){
				return $http.get("api/productos").finally(() => {
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getProductosVenta: function(s){
				var resturl = "api/productos/" + (LoginService.getCurrentUser().departamento ? LoginService.getCurrentUser().departamento : "1") + "/" + LoginService.getCurrentUser().username;

				$http.get(resturl).then(function(obj){
					s.productos = obj.data;
					console.log(obj.data)
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getProducto: function(s, id){
				$.ajax({
				    url: "api/productos",
				    type: "POST",
				    data: {},
				    beforeSend: function(){},
				    success: function(data){
							for (var i = 0; i < data.length; i++)
								if (parseInt(data[i].id) == parseInt(id))
								{
									data[i].exento_iva = data[i].exento_iva == 1 ? true : false;
									s.producto = data[i];
									$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
									return;
								}
					    }
				});
			},
			getProductosOriginales: function(s){
				$http.get("api/productos/1").then(function(obj){
					s.productos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},





			getDependencias: function(s){
				$http.get("api/dependencias").then(function(obj){
					s.dependencias = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getDependencia: function(s, id){
				$http.get("api/dependencias").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.dependencia = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},






			getClientes: function(s, extra = false){
				$http({
					method: 'POST',
					url: "api/clientes", 
					data: $.param(extra ? {extra: extra} : {}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(obj){
					s.clientes = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getCliente: function(s, id){
				$http.get("api/clientes").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.cliente = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},





			getFamilias: function(s){
				$http.get("api/productos/familias").then(function(obj){
					s.familias = [];

					if (window.location.hash.indexOf("reportes") != -1)
						s.familias.push({
							id: -1,
							nombre: "Todos"
						});

					for (var i = 0; i < obj.data.length; i++)
						s.familias.push(obj.data[i]);

					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getFamilia: function(s, id){
				$http.get("api/productos/familias").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.familia = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},






			getCuentaAbiertas: function(s){
				$http.get("api/cuentaabiertas").then(function(obj){
					s.cuentaabiertas = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getCuentaAbierta: function(s, id){
				$http.get("api/cuentaabiertas").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							if (json[i].inicia)
							{
								var date = json[i].inicia.split('-');
								json[i].inicia = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]), 12, 0, 0, 0);
							}

							if (json[i].vence)
							{
								var date = json[i].vence.split('-');
								json[i].vence = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]), 12, 0, 0, 0);
							}

							for (var k = 0; k < json[i].productos.length; k++)
							{
								json[i].productos[k].nro_copias = parseInt(json[i].productos[k].copias);
								json[i].productos[k].nro_originales = parseInt(json[i].productos[k].originales);
							}

							s.cuentaabierta = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},





			getCondicionesPago: function(s){
				$http.get("api/condicionesdepago").then(function(obj){
					s.condiciones_pago = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},





			getDepartamentos: function(s){
				$http.get("api/departamentos").then(function(obj){
					s.departamentos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getDepartamento: function(s, id){
				$http.get("api/departamentos").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.departamento = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},





			getDepartamentosUCAB: function(s){
				$http.get("api/departamentos/ucab").then(function(obj){
					s.departamentos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getDepartamentoUCAB: function(s, id){
				$http.get("api/departamentos/ucab").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.departamento = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},





			getRetirosCaja: function(s){
				$http.get("api/caja/retiros").then(function(obj){
					s.retiros = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getRetiroCaja: function(s, id){
				$http.get("api/caja/retiros").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.retiro = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},





			getInventario: function(){
				return $http.get("api/inventario").finally(() => {
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getInventarioAsignado: function(s){
				$http.get("api/inventario/asignado").then(function(obj){
					s.inventario_asignado = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getMiInventarioAsignado: function(s){
				$http.get("api/inventario/asignado/mio").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						json[i].restante = parseInt(json[i].restante);

					s.mi_inventario_asignado = json;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
			getMaterial: function(s, id){
				$http.get("api/inventario").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.material = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},
			getMaterialesGuias: function(s){
				$http.get("api/inventario/productos/guias").then(function(obj){
					s.productos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},





			getOrdenes: function(){
				return $http.get("api/ordenes");
			},
			getOrden: function(s, id){
				$http.get("api/ordenes").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							/*var date = json[i].fecha_inicio.split('-');
							json[i].fecha_inicio = new Date(date[0], parseInt(date[1])-1, date[2], 12, 0, 0, 0);

							date = json[i].fecha_fin.split('-');
							json[i].fecha_fin = new Date(date[0], parseInt(date[1])-1, date[2], 12, 0, 0, 0);*/

							if (json[i].fecha)
							{
								var date = json[i].fecha.split('-');
								json[i].fecha = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]), 12, 0, 0, 0);
							}

							json[i].dependencia = json[i].did;

							for (var k = 0; k < json[i].productos.length; k++)
							{
								json[i].productos[k].nro_copias = parseInt(json[i].productos[k].copias);
								json[i].productos[k].nro_originales = parseInt(json[i].productos[k].originales);
							}

							s.orden = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},



			getPedidos: function(){
				return $http.get("api/pedidos")
					.finally(() => {
						//s.pedidos = obj.data;
						$timeout(() => {$('.selectpicker').selectpicker('refresh');}, 500);
					});
			},
			getPedidosSinFactura: function(){
				return $http.get("api/pedidos/sinfactura")
					.finally(() => {
						//s.pedidos = obj.data;
						$timeout(() => {$('.selectpicker').selectpicker('refresh');}, 500);
					});
			},
			getPedidosPorProcesar: function(dpto){
				return $http.get(`api/pedidos/porprocesar/${dpto}`)
					.finally(() => {
						//s.pedidos = obj.data;
						$timeout(() => {$('.selectpicker').selectpicker('refresh');}, 500);
					});
			},
			getPedido: function(s, id){
				$http.get("api/pedidos").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							/*var date = json[i].fecha_inicio.split('-');
							json[i].fecha_inicio = new Date(date[0], parseInt(date[1])-1, date[2], 12, 0, 0, 0);

							date = json[i].fecha_fin.split('-');
							json[i].fecha_fin = new Date(date[0], parseInt(date[1])-1, date[2], 12, 0, 0, 0);*/

							if (json[i].fecha)
							{
								var date = json[i].fecha.split('-');
								json[i].fecha = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]), 12, 0, 0, 0);
							}

							json[i].dependencia = json[i].did;

							for (var k = 0; k < json[i].productos.length; k++)
							{
								json[i].productos[k].nro_copias = parseInt(json[i].productos[k].copias);
								json[i].productos[k].nro_originales = parseInt(json[i].productos[k].originales);
							}

							s.pedido = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},



			/*
			** s : Array = $scope
			** r : String = Nombre del reporte
			** f : Array = Filtros
			*/
			getReporte: function(s, r, f){
				if (f.desde)
					f.desde_ = f.desde.toJSON().slice(0,10);

				if (f.hasta)
					f.hasta_ = f.hasta.toJSON().slice(0,10);

				if (f.dia)
					f.dia_ = f.dia.toJSON().slice(0,10);

				$.ajax({
				    url: "api/reporte/" + r,
				    type: "POST",
				    data: f,
				    beforeSend: function(){},
				    success: function(data){
				    	try 
				    	{
				        	for (var i = 0; i < data.length; i++)
				        	{
				        		if (data[i].total_facturado)
				        			data[i].total_facturado = parseFloat(data[i].total_facturado);

				        		if (data[i].devoluciones)
				        			data[i].devoluciones = parseFloat(data[i].devoluciones);

				        		if (data[i].nota_de_credito)
				        			data[i].nota_de_credito = parseFloat(data[i].nota_de_credito);

				        		if (data[i].retiro_de_caja)
				        			data[i].retiro_de_caja = parseFloat(data[i].retiro_de_caja);



				        		if (data[i].total_facturado)
				        			data[i].total_facturado = parseFloat(data[i].total_facturado);

				        		if (data[i].total_devoluciones)
				        			data[i].total_devoluciones = parseFloat(data[i].total_devoluciones);

				        		if (data[i].total_notas_credito)
				        			data[i].total_notas_credito = parseFloat(data[i].total_notas_credito);
				        	}

				        	s.data = data;
				        }
				        catch (ex)
				        {
				        	console.log(data)
				        }
				    }
				});
			},


		};
	})
}());