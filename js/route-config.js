(function(){
	angular.module("soincopy").config(function($routeProvider, $locationProvider){
		$routeProvider
			.when("/login", {
				templateUrl : "views/login.html"
			})
			.when("/inicio", {
				templateUrl : "views/inicio.html"
			})
			.when("/agregarguia", {
				templateUrl : "views/guias/agregar.html"
			})
			.when("/buscarguias", {
				templateUrl : "views/guias/buscar.html"
			})
			.when("/modificarguia/:codigo", {
				templateUrl : "views/guias/modificar.html"
			})


			// Ordenes
			.when("/ordenes", {
				templateUrl : "views/ordenes/buscar.html"
			})
			.when("/ordenes/agregar", {
				templateUrl : "views/ordenes/agregar.html"
			})
			.when("/ordenes/editar/:id", {
				templateUrl : "views/ordenes/agregar.html"
			})
			.when("/buscar_web", {
				templateUrl : "views/ordenes/buscar_web.html"
			})


			// Plan de estudios
			.when("/agregarplandeestudios", {
				templateUrl : "views/plandeestudios/agregar.html"
			})
			.when("/planesdeestudio", {
				templateUrl : "views/plandeestudios/buscar.html"
			})



			// Admin
			.when("/personal", {
				templateUrl : "views/admin/personal.html"
			})
			.when("/personal/agregar", {
				templateUrl : "views/admin/agregarpersonal.html"
			})
			.when("/personal/editar/:id", {
				templateUrl : "views/admin/agregarpersonal.html"
			})



			.when("/profesores", {
				templateUrl : "views/admin/profesores.html"
			})
			.when("/profesores/agregar", {
				templateUrl : "views/admin/agregarprofesor.html"
			})
			.when("/profesores/agregar/express", {
				templateUrl : "views/admin/agregarprofesor.html"
			})
			.when("/profesores/editar/:id", {
				templateUrl : "views/admin/agregarprofesor.html"
			})




			.when("/carreras", {
				templateUrl : "views/admin/carreras.html"
			})
			.when("/carreras/agregar", {
				templateUrl : "views/admin/agregarcarrera.html"
			})
			.when("/carreras/agregar/express", {
				templateUrl : "views/admin/agregarcarrera.html"
			})
			.when("/carreras/editar/:id", {
				templateUrl : "views/admin/agregarcarrera.html"
			})



			.when("/proveedores", {
				templateUrl : "views/admin/proveedores/proveedores.html"
			})
			.when("/proveedores/agregar", {
				templateUrl : "views/admin/proveedores/agregar.html"
			})
			.when("/proveedores/agregar/express", {
				templateUrl : "views/admin/proveedores/agregar.html"
			})
			.when("/proveedores/editar/:id", {
				templateUrl : "views/admin/proveedores/agregar.html"
			})




			.when("/clientes", {
				templateUrl : "views/admin/clientes/clientes.html"
			})
			.when("/clientes/agregar", {
				templateUrl : "views/admin/clientes/agregar.html"
			})
			.when("/clientes/agregar/express", {
				templateUrl : "views/admin/clientes/agregar.html"
			})
			.when("/clientes/editar/:id", {
				templateUrl : "views/admin/clientes/agregar.html"
			})
			.when("/clientes/editar/:id/express", {
				templateUrl : "views/admin/clientes/agregar.html"
			})



			.when("/departamentos/ucab", {
				templateUrl : "views/admin/departamentos_ucab/departamentos.html"
			})
			.when("/departamentos/ucab/agregar", {
				templateUrl : "views/admin/departamentos_ucab/agregar.html"
			})
			.when("/departamentos/ucab/editar/:id", {
				templateUrl : "views/admin/departamentos_ucab/agregar.html"
			})



			.when("/dependencias", {
				templateUrl : "views/admin/dependencias/dependencias.html"
			})
			.when("/dependencias/agregar", {
				templateUrl : "views/admin/dependencias/agregar.html"
			})
			.when("/dependencias/agregar/express", {
				templateUrl : "views/admin/dependencias/agregar.html"
			})
			.when("/dependencias/editar/:id", {
				templateUrl : "views/admin/dependencias/agregar.html"
			})



			.when("/cuentaabiertas", {
				templateUrl : "views/admin/cuentaabiertas/cuentaabiertas.html"
			})
			.when("/cuentaabiertas/agregar", {
				templateUrl : "views/admin/cuentaabiertas/agregar.html"
			})
			.when("/cuentaabiertas/editar/:id", {
				templateUrl : "views/admin/cuentaabiertas/agregar.html"
			})




			.when("/menciones", {
				templateUrl : "views/admin/menciones.html"
			})
			.when("/menciones/agregar", {
				templateUrl : "views/admin/agregarmencion.html"
			})
			.when("/menciones/editar/:id", {
				templateUrl : "views/admin/agregarmencion.html"
			})




			.when("/materias", {
				templateUrl : "views/admin/materias.html"
			})
			.when("/materias/agregar", {
				templateUrl : "views/admin/agregarmateria.html"
			})
			.when("/materias/agregar/express", {
				templateUrl : "views/admin/agregarmateria.html"
			})
			.when("/materias/editar/:id", {
				templateUrl : "views/admin/editarmateria.html"
			})



			.when("/productos", {
				templateUrl : "views/admin/productos/productos.html"
			})
			.when("/productos/agregar", {
				templateUrl : "views/admin/productos/agregar.html"
			})
			.when("/productos/editar/:id", {
				templateUrl : "views/admin/productos/agregar.html"
			})



			.when("/productos/familias", {
				templateUrl : "views/admin/productos/familias/familias.html"
			})
			.when("/productos/familias/agregar", {
				templateUrl : "views/admin/productos/familias/agregar.html"
			})
			.when("/productos/familias/agregar/express", {
				templateUrl : "views/admin/productos/familias/agregar.html"
			})
			.when("/productos/familias/editar/:id", {
				templateUrl : "views/admin/productos/familias/agregar.html"
			})



			.when("/inventario", {
				templateUrl : "views/admin/inventario/inventario.html"
			})
			.when("/inventario/asignar/material", {
				templateUrl : "views/admin/inventario/materiales_asignados.html"
			})
			.when("/inventario/asignar/material/asignar", {
				templateUrl : "views/admin/inventario/asignar_material.html"
			})
			.when("/inventario/material/agregar", {
				templateUrl : "views/admin/inventario/agregar_material.html"
			})
			.when("/inventario/material/editar/:id", {
				templateUrl : "views/admin/inventario/agregar_material.html"
			})
			.when("/inventario/stock/:id", {
				templateUrl : "views/admin/inventario/stock.html"
			})
			.when("/inventario/stock/editar/:id", {
				templateUrl : "views/admin/inventario/agregar_stock.html"
			})
			.when("/inventario/material/danado", {
				templateUrl : "views/admin/inventario/material_danado/material_danado.html"
			})
			.when("/inventario/material/danado/agregar", {
				templateUrl : "views/admin/inventario/material_danado/agregar.html"
			})




			.when("/pedidos", {
				templateUrl : "views/pedidos/buscar.html"
			})
			.when("/pedidos/agregar", {
				templateUrl : "views/pedidos/agregar.html"
			})
			.when("/pedidos/editar/:id", {
				templateUrl : "views/pedidos/agregar.html"
			})
			.when("/pedidos/factura_faltante", {
				templateUrl : "views/pedidos/factura_faltante.html"
			})
			.when("/pedidos/por_procesar", {
				templateUrl : "views/pedidos/por_procesar.html"
			})


			
			.when("/agregardependencia", {
				templateUrl : "views/admin/agregardependencia.html"
			})




			.when("/caja/cobrar/:pid", {
				templateUrl : "views/caja/cobrar.html"
			})


			.when("/caja/retiros", {
				templateUrl : "views/caja/retiros_de_caja/buscar.html"
			})
			.when("/caja/retiros/agregar", {
				templateUrl : "views/caja/retiros_de_caja/agregar.html"
			})
			.when("/caja/retiros/editar/:id", {
				templateUrl : "views/caja/retiros_de_caja/agregar.html"
			})

			.when("/caja/notas_credito/agregar", {
				templateUrl : "views/caja/nota_de_credito/agregar.html"
			})



			.when("/reportes/:reporte", {
				templateUrl : function(params){
					return "views/reportes/" + params.reporte + ".html"
				}
			})

			.when("/iva", {
				templateUrl : "views/admin/iva/iva.html"
			})


			.otherwise({redirectTo : "/inicio"});
	});
}());