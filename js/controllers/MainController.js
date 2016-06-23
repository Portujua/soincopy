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

		$scope.filtro_pais = "todos";

		$scope.clients = [
			{
				img: "img/clients/1.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/2.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/5.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/6.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/7.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/10.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/11.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/12.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/13.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/15.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/16.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},
			{
				img: "img/clients/22.jpg",
				tipo: "finanzas",
				pais: "Bolivia"
			},



			
			// Gobierno
			{
				img: "img/clients/1.jpg",
				tipo: "gobierno",
				pais: "Bolivia"
			},
			{
				img: "img/clients/2.jpg",
				tipo: "gobierno",
				pais: "Bolivia"
			},
			{
				img: "img/clients/5.jpg",
				tipo: "gobierno",
				pais: "Bolivia"
			},
			{
				img: "img/clients/6.jpg",
				tipo: "gobierno",
				pais: "Bolivia"
			},
			{
				img: "img/clients/7.jpg",
				tipo: "gobierno",
				pais: "Bolivia"
			},
			{
				img: "img/clients/10.jpg",
				tipo: "gobierno",
				pais: "Bolivia"
			},



			// Industria
			{
				img: "img/clients/1.jpg",
				tipo: "industria",
				pais: "Bolivia"
			},
			{
				img: "img/clients/2.jpg",
				tipo: "industria",
				pais: "Bolivia"
			},
			{
				img: "img/clients/5.jpg",
				tipo: "industria",
				pais: "Bolivia"
			},
			{
				img: "img/clients/6.jpg",
				tipo: "industria",
				pais: "Bolivia"
			},
			{
				img: "img/clients/7.jpg",
				tipo: "industria",
				pais: "Bolivia"
			},
			{
				img: "img/clients/10.jpg",
				tipo: "industria",
				pais: "Bolivia"
			},




			// Comercio
			{
				img: "img/clients/1.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/2.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/5.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/6.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/7.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/10.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/11.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/12.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/13.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/15.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/16.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},
			{
				img: "img/clients/22.jpg",
				tipo: "comercio",
				pais: "Bolivia"
			},



			// Peru
			{
				img: "img/clients/23.jpg",
				tipo: "finanzas",
				pais: "Peru"
			},
			{
				img: "img/clients/25.jpg",
				tipo: "gobierno",
				pais: "Peru"
			},
			{
				img: "img/clients/26.jpg",
				tipo: "industria",
				pais: "Peru"
			},
			{
				img: "img/clients/27.jpg",
				tipo: "comercio",
				pais: "Peru"
			},
		];

		$scope.cambiar_pais = function(p){
			$scope.filtro_pais = p;

			// apago todos
			$(".todos").removeClass("active");
			$(".bolivia").removeClass("active");
			$(".peru").removeClass("active");
			$(".paraguay").removeClass("active");
			$(".panama").removeClass("active");
			$(".mexico").removeClass("active");

			if (p == "todos")
				$(".todos").addClass("active");
			else if (p == "Bolivia")
				$(".bolivia").addClass("active");
			else if (p == "Peru")
				$(".peru").addClass("active");
			else if (p == "Paraguay")
				$(".paraguay").addClass("active");
			else if (p == "Panama")
				$(".panama").addClass("active");
			else if (p == "Mexico")
				$(".mexico").addClass("active");
		}
	};

	angular.module("gcg").controller("MainController", MainController);
}());