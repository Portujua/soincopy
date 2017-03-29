(function(){
	var app = angular.module("soincopy", ["ngRoute", 'ngAnimate', "angular.filter", 'ngStorage', 'toastr', 'ngTable', 'ui.toggle', 'mgcrea.ngStrap']);

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

	app.config(function($sceProvider) {
	  // Completely disable SCE.  For demonstration purposes only!
	  // Do not use in new projects.
	  $sceProvider.enabled(false);
	});

	// app.run(['$templateCache',
	//     function($templateCache) {
	// 		$templateCache.put('ng-table/filters/text.html', '<input placeholder="{{ name }}" type="text" name="{{ name }}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" ng-if="filter == \'text\'" class="input-filter form-control" />');
	// 		   }
	//   ]);

	app.filter('quitarGuias', function () {
	    return function (input) {
	    	if (!input) return null;
	    	
	    	var out = [];

	    	for (var i = 0; i < input.length; i++)
	    		if (!(/^Guía "(.+)" \(Código: .+\)/).test(input[i].nombre))
	    			out.push(input[i]);

	    	return out;
	    };
	});

	app.filter('quitarCableados', function () {
	    return function (input) {
	    	if (!input) return null;
	    	
	    	var out = [];

	    	for (var i = 0; i < input.length; i++)
	    		if (input[i].nombre != 'Impresion de Guia')
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

	app.filter('calcularTotalBsDeProductos', function () {
	    return function (productos) {
	    	if (!productos) return null;

	    	var total = 0.0;

			for (var i = 0; i < productos.length; i++)
				total += (productos[i].costo_unitario_facturado ? parseFloat(productos[i].costo_unitario_facturado) : parseFloat(productos[i].costo_unitario)) * parseFloat(parseInt(productos[i].nro_copias) * parseInt(productos[i].nro_originales));

			return total;
	    };
	});

	app.filter('paginar', function () {
	    return function (_items, args) {
	    	/* El formato seria paginar:'resultadosPorPagina|PaginaActual' */
	    	if (!_items) return null;

	    	var items = [];
	    	var nroResultados = parseInt(args.split('|')[0]);
	    	var actual = parseInt(args.split('|')[1]);

	    	if (nroResultados >= _items.length)
	    		return _items;
	    	
	    	for (var i = actual*nroResultados; i < actual*nroResultados+nroResultados; i++)
	    		items.push(_items[i]);

			return items;
	    };
	});

	app.filter('available', function () {
	    return (input, attr) => {
	      attr = attr || attr === '' ? attr : 'N/A';
	      if (_.isString(input)) {
	        input = input.trim();
	      }
	      return (_.isNull(input) || input.length == 0 || _.isUndefined(input)) ? attr : input;
	    };
	});

	app.config(function(toastrConfig) {
		angular.extend(toastrConfig, {
			autoDismiss: false,
			containerId: 'toast-container',
			closeButton: true,
			closeHtml: '<button>&times;</button>',
			maxOpened: 2,    
			newestOnTop: true,
			positionClass: 'toast-top-right',
			timeOut: 3500,
			extendedTimeOut: 1000,
			tapToDismiss: true,
			progressBar: true,
			preventOpenDuplicates: false,
			target: 'body'
		});
	});
}());