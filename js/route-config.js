(function(){
	angular.module("gcg").config(function($routeProvider){
		$routeProvider
			.when("/home", {
				templateUrl : "views/home.html"
			})
			.when("/aboutus", {
				templateUrl : "views/aboutus.html"
			})
			.when("/ourpeople", {
				templateUrl : "views/ourpeople.html"
			})
			.when("/contact", {
				templateUrl : "views/contact.html"
			})
			.when("/clients", {
				templateUrl : "views/clients.html"
			})
			.otherwise({redirectTo : "/home"});
	});
}());