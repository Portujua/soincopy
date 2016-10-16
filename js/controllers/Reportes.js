(function(){
	var Reportes = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, $localStorage, $interval)
	{		
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

		$scope.cargar_reporte = function(){
			SoincopyService.getReporte($scope, $routeParams.reporte);
		}
	};

	angular.module("soincopy").controller("Reportes", Reportes);
}());