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
			.otherwise({redirectTo : "/login"});
	});
}());