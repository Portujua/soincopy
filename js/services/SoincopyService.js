(function(){
	angular.module("soincopy").factory('SoincopyService', function($http){
		return {
			getCarreras: function(s){
				$http.get("api/carreras").then(function(obj){
					s.carreras = obj.data;
				});
			},
			getCarrera: function(s, id){
				$http.get("api/carreras").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.carrera = json[i];
							return;
						}
				});
			},




			getMaterias: function(s, cid){
				if (cid == null)
					$http.get("api/materias").then(function(obj){
						s.materias = obj.data;
					});
				else
					$http.get("api/materias/" + cid).then(function(obj){
						s.materias = obj.data;
					});
			},
			getMateria: function(s, id){
				$http.get("api/materias").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.materia = json[i];
							return;
						}
				});
			},




			getProfesores: function(s){
				$http.get("api/profesores").then(function(obj){
					s.profesores = obj.data;
				});
			},
			getProfesor: function(s, id){
				$http.get("api/profesores").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.profesor = json[i];
							return;
						}
				});
			},




			getPersonal: function(s){
				$http.get("api/personal").then(function(obj){
					s.personal = obj.data;
				});
			},




			getMenciones: function(s){
				$http.get("api/menciones").then(function(obj){
					s.menciones = obj.data;
				});
			},
			getMencion: function(s, id){
				$http.get("api/menciones").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.mencion = json[i];
							return;
						}
				});
			},





			getGuias: function(s, status){
				$http.get("api/guias/" + status).then(function(obj){
					s.guias = obj.data;
				});
			},
			getGuiasWeb: function(s, status){
				$http.get("api/guias/web").then(function(obj){
					s.guias_web = obj.data;
				});
			},



			getProductos: function(s){
				$http.get("api/productos").then(function(obj){
					s.productos = obj.data;
				});
			},
			getProducto: function(s, id){
				$http.get("api/productos").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.producto = json[i];
							return;
						}
				});
			},
			getProductosOriginales: function(s){
				$http.get("api/productos/1").then(function(obj){
					s.productos = obj.data;
				});
			},





			getDependencias: function(s){
				$http.get("api/dependencias").then(function(obj){
					s.dependencias = obj.data;
				});
			},
			getDependencia: function(s, id){
				$http.get("api/dependencias").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.dependencia = json[i];
							return;
						}
				});
			},






			getCuentaAbiertas: function(s){
				$http.get("api/cuentaabiertas").then(function(obj){
					s.cuentaabiertas = obj.data;
				});
			},
			getCuentaAbierta: function(s, id){
				$http.get("api/cuentaabiertas").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							if (json[i].vence)
							{
								var date = json[i].vence.split('-');
								json[i].vence = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]), 12, 0, 0, 0);
							}

							s.cuentaabierta = json[i];
							return;
						}
				});
			},





			getCondicionesPago: function(s){
				$http.get("api/condicionesdepago").then(function(obj){
					s.condiciones_pago = obj.data;
				});
			},





			getDepartamentos: function(s){
				$http.get("api/departamentos").then(function(obj){
					s.departamentos = obj.data;
				});
			},
			getDepartamento: function(s, id){
				$http.get("api/departamentos").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.departamento = json[i];
							return;
						}
				});
			},





			getDepartamentosUCAB: function(s){
				$http.get("api/departamentos/ucab").then(function(obj){
					s.departamentos = obj.data;
				});
			},
			getDepartamentoUCAB: function(s, id){
				$http.get("api/departamentos/ucab").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.departamento = json[i];
							return;
						}
				});
			},





			getInventario: function(s){
				$http.get("api/inventario").then(function(obj){
					s.inventario = obj.data;
				});
			},
			getMaterial: function(s, id){
				$http.get("api/inventario").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							s.material = json[i];
							return;
						}
				});
			},





			getOrdenes: function(s){
				$http.get("api/ordenes").then(function(obj){
					s.ordenes = obj.data;
				});
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

							json[i].dependencia = json[i].did;

							for (var k = 0; k < json[i].productos.length; k++)
							{
								json[i].productos[k].nro_copias = parseInt(json[i].productos[k].copias);
								json[i].productos[k].nro_originales = parseInt(json[i].productos[k].originales);
							}

							s.orden = json[i];
							return;
						}
				});
			},
		};
	})
}());