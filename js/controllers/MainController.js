(function(){
	var MainController = function($scope, $http, $location, $routeParams, $timeout, $window){		
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

		$scope.login_user = "admin";
		$scope.login_password = "admin";

		if (typeof $scope.login_info == "undefined")
		{
			console.log("Not logged in");
			$location.path("/login");
		}

		$scope.login = function(){
			var username = $scope.login_user ? $scope.login_user : "";
			var password = $scope.login_password ? $scope.login_password : "";

			$http({
				method: 'POST',
				url: "php/run.php?fn=login", 
				data: $.param({username:username, password:password}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(obj){
				console.log(obj)

				var data = obj.data;

				if (data.error)
					$(".login_alert").removeClass("hidden");
				else
				{
					$scope.login_info = data;
			        $location.path("/inicio");
				}
			})
		}

		$scope.unset_session = function(){
			$.ajax({
			    url: "php/unset.php",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        
			    }
			});
		}

		$scope.unset_session();
	};

	angular.module("soincopy").controller("MainController", MainController);
}());