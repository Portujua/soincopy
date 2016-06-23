(function(){
	var app = angular.module("gcg", ["ngRoute"]);

	app.filter('setDecimal', function ($filter) {
	    return function (input, places) {
	    	if (input == "N/A") return input;
	        if (isNaN(input)) return "0,00";
	        // If we want 1 decimal place, we want to mult/div by 10
	        // If we want 2 decimal places, we want to mult/div by 100, etc
	        // So use the following to create that factor
	        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
	        var numero = Math.round(input * factor) / factor;
	        var str_num = String(numero);

	        // Otra manera..
	        var partes = str_num.split(".");
	        var negativo = str_num.indexOf("-") == -1 ? "" : "-";
	        var entero = partes[0].replace("-", "");
	        var decimal = partes.length > 1 ? partes[1] : "";

	        while(decimal.length < 2)
	        	decimal += "0";

	        if (decimal.length == 3)
	        	decimal = decimal.substring(0, 2);

	        return negativo + entero + "," + decimal;
	    };
	});
}());