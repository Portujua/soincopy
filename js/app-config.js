(function(){
	var app = angular.module("soincopy", ["ngRoute", "angular.filter"]);

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
}());