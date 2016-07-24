(function(){
	var app = angular.module("soincopy", ["ngRoute", "angular.filter"]);

	app.factory('LoginService', function($http, $location){
		var current_user = null;

		return {
			isLoggedIn: function(){ 
				return current_user != null; 
			},
			logout: function(){
				$http.get("php/unset.php");
			},
			login: function(loginData){
				var promise =  $http({
					method: 'POST',
					url: "php/run.php?fn=login", 
					data: $.param({username:loginData.username, password:loginData.password}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})

				promise.then(function(obj){
					console.log(obj)

					var data = obj.data;

					if (data.error)
						$(".login_alert").removeClass("hidden");
					else
					{
						current_user = data;
				        $location.path("/inicio");
					}
				});

				return promise;
			},
			getCurrentUser: function(){
				return current_user;
			}
		};
	})
}());