(function(){
	angular.module("soincopy").config(function($routeProvider){
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
			.when("/agregarorden", {
				templateUrl : "views/ordenes/agregar.html"
			})
			.when("/buscar_web", {
				templateUrl : "views/ordenes/buscar.html"
			})


			// Plan de estudios
			.when("/agregarplandeestudios", {
				templateUrl : "views/plandeestudios/agregar.html"
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




			.when("/carreras", {
				templateUrl : "views/admin/carreras.html"
			})
			.when("/carreras/agregar", {
				templateUrl : "views/admin/agregarcarrera.html"
			})
			.when("/carreras/editar/:id", {
				templateUrl : "views/admin/agregarcarrera.html"
			})


			
			.when("/agregarmateria", {
				templateUrl : "views/admin/agregarmateria.html"
			})
			.when("/agregardependencia", {
				templateUrl : "views/admin/agregardependencia.html"
			})
			.otherwise({redirectTo : "/login"});
	});
}());