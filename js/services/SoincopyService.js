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
							var date = json[i].fecha_inicio.split('-');
							json[i].fecha_inicio = new Date(date[0], date[1], date[2], 12, 0, 0, 0);

							date = json[i].fecha_fin.split('-');
							json[i].fecha_fin = new Date(date[0], date[1], date[2], 12, 0, 0, 0);


							json[i].nro_copias = parseInt(json[i].nro_copias);
							json[i].nro_originales = parseInt(json[i].nro_originales);
							json[i].producto = json[i].pid;
							json[i].dependencia = json[i].did;
							s.orden = json[i];
							return;
						}
				});
			},
		};
	})
}());