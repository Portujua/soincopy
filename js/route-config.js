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
			.when("/agregarcarrera", {
				templateUrl : "views/admin/agregarcarrera.html"
			})
			.when("/agregarmateria", {
				templateUrl : "views/admin/agregarmateria.html"
			})
			.when("/agregarpersonal", {
				templateUrl : "views/admin/agregarpersonal.html"
			})
			.when("/agregardependencia", {
				templateUrl : "views/admin/agregardependencia.html"
			})
			.otherwise({redirectTo : "/login"});
	});
}());