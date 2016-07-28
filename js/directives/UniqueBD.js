(function(){
	angular.module("soincopy").directive("uniqueBd", function($http){
		return {
			require: 'ngModel',
			link: function(scope, ele, attrs, c) {
				scope.$watch(attrs.ngModel, function(){
					var val = ele[0].value;
					var obj = attrs.uniqueBd;

					$http.get("api/check/" + obj + "/" + val)
						.success(function(data){
							c.$setValidity('unique', data.esValido);
						})
						.error(function(data){
							c.$setValidity('unique', false);
						})
				})
			}
		}
	})
}());