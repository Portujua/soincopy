(function(){
	angular.module("soincopy").config(function($routeProvider, $locationProvider){
		$routeProvider
			.when("/login", {
				templateUrl : "views/login.html"
			})
			.when("/inicio", {
				templateUrl : "views/inicio.html"
			})
			.when("/agregarguia", {
				templateUrl : "views/guias/agregar.html"
			})
			.when("/buscarguias", {
				templateUrl : "views/guias/buscar.html"
			})
			.when("/modificarguia/:codigo", {
				templateUrl : "views/guias/modificar.html"
			})


			// Ordenes
			.when("/ordenes", {
				templateUrl : "views/ordenes/buscar.html"
			})
			.when("/ordenes/agregar", {
				templateUrl : "views/ordenes/agregar.html"
			})
			.when("/ordenes/editar/:id", {
				templateUrl : "views/ordenes/agregar.html"
			})
			.when("/buscar_web", {
				templateUrl : "views/ordenes/buscar_web.html"
			})


			// Plan de estudios
			.when("/agregarplandeestudios", {
				templateUrl : "views/plandeestudios/agregar.html"
			})
			.when("/planesdeestudio", {
				templateUrl : "views/plandeestudios/buscar.html"
			})



			// Admin
			.when("/personal", {
				templateUrl : "views/admin/personal.html"
			})
			.when("/personal/agregar", {
				templateUrl : "views/admin/agregarpersonal.html"
			})
			.when("/personal/editar/:id", {
				templateUrl : "views/admin/agregarpersonal.html"
			})



			.when("/profesores", {
				templateUrl : "views/admin/profesores.html"
			})
			.when("/profesores/agregar", {
				templateUrl : "views/admin/agregarprofesor.html"
			})
			.when("/profesores/editar/:id", {
				templateUrl : "views/admin/agregarprofesor.html"
			})




			.when("/carreras", {
				templateUrl : "views/admin/carreras.html"
			})
			.when("/carreras/agregar", {
				templateUrl : "views/admin/agregarcarrera.html"
			})
			.when("/carreras/editar/:id", {
				templateUrl : "views/admin/agregarcarrera.html"
			})



			.when("/departamentos/ucab", {
				templateUrl : "views/admin/departamentos_ucab/departamentos.html"
			})
			.when("/departamentos/ucab/agregar", {
				templateUrl : "views/admin/departamentos_ucab/agregar.html"
			})
			.when("/departamentos/ucab/editar/:id", {
				templateUrl : "views/admin/departamentos_ucab/agregar.html"
			})




			.when("/menciones", {
				templateUrl : "views/admin/menciones.html"
			})
			.when("/menciones/agregar", {
				templateUrl : "views/admin/agregarmencion.html"
			})
			.when("/menciones/editar/:id", {
				templateUrl : "views/admin/agregarmencion.html"
			})




			.when("/materias", {
				templateUrl : "views/admin/materias.html"
			})
			.when("/materias/agregar", {
				templateUrl : "views/admin/agregarmateria.html"
			})
			.when("/materias/editar/:id", {
				templateUrl : "views/admin/editarmateria.html"
			})


			
			.when("/agregardependencia", {
				templateUrl : "views/admin/agregardependencia.html"
			})
			.otherwise({redirectTo : "/login"});
	});
}());