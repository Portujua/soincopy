(function(){
	var PlanDeEstudios = function($scope, $http, $location, $routeParams, $timeout, $window){		
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

		$scope.cargar_carreras = function(){
			$.ajax({
			    url: "php/run.php?fn=cargar_carreras",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.carreras = $.parseJSON(data);
			        	console.log($scope.carreras)
			        })
			    }
			});
		}
	};

	angular.module("soincopy").controller("PlanDeEstudios", PlanDeEstudios);
}());