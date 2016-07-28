(function(){
	var app = angular.module("soincopy", ["ngRoute", "angular.filter", 'angular-loading-bar', 'ngStorage']);

	app.filter('quitarDeshabilitados', function () {
	    return function (input) {
	    	if (!input) return null;
	    	
	    	var out = [];

	    	for (var i = 0; i < input.length; i++)
	    		if (input[i].estado == 1)
	    			out.push(input[i]);

	    	return out;
	    };
	});

	app.filter('soloCategorias', function () {
	    return function (items_) {
	    	if (!items_) return null;

	    	var items = [];

			for (var i = 0; i < items_.length; i++)
				if ($.inArray(items_[i].categoria, items) == -1)
					items.push(items_[i].categoria);

			return items;
	    };
	});
}());