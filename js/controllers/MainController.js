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

			$.ajax({
			    url: "php/run.php?fn=login",
			    type: "POST",
			    data: {username:username, password:password},
			    beforeSend: function(){},
			    success: function(data){
			        var json = $.parseJSON(data);
			        console.log(json)

			        if (json.error)
			        	$(".login_alert").removeClass("hidden");
			        else
			        	$scope.safeApply(function(){
			        		$scope.login_info = json;
			        		$location.path("/inicio");
			        	})
			    }
			});
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