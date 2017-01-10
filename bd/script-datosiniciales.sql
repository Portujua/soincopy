insert into Periodo (tipo, numero) values ("Semestral", 1);
insert into Periodo (tipo, numero) values ("Semestral", 2);
insert into Periodo (tipo, numero) values ("Semestral", 3);
insert into Periodo (tipo, numero) values ("Semestral", 4);
insert into Periodo (tipo, numero) values ("Semestral", 5);
insert into Periodo (tipo, numero) values ("Semestral", 6);
insert into Periodo (tipo, numero) values ("Semestral", 7);
insert into Periodo (tipo, numero) values ("Semestral", 8);
insert into Periodo (tipo, numero) values ("Semestral", 9);
insert into Periodo (tipo, numero) values ("Semestral", 10);

insert into Periodo (tipo, numero) values ("Anual", 1);
insert into Periodo (tipo, numero) values ("Anual", 2);
insert into Periodo (tipo, numero) values ("Anual", 3);
insert into Periodo (tipo, numero) values ("Anual", 4);
insert into Periodo (tipo, numero) values ("Anual", 5);

insert into Periodo (tipo, numero) values ("Otros", 99);

insert into Tipo_Materia(nombre) values ("Normal");
insert into Tipo_Materia(nombre) values ("Electiva");
insert into Tipo_Materia(nombre) values ("Seminario");

insert into Tipo_Guia(nombre) values ("Libro");
insert into Tipo_Guia(nombre) values ("Revista");
insert into Tipo_Guia(nombre) values ("Varios");
insert into Tipo_Guia(nombre) values ("NO APLICA");

insert into Departamento(nombre) values ("Originales");
insert into Departamento(nombre) values ("Diseño");
insert into Departamento(nombre) values ("Caja");

insert into Permiso_Categoria (nombre) values ("Guías");
insert into Permiso_Categoria (nombre) values ("Ordenes");
insert into Permiso_Categoria (nombre) values ("Programas y Pensum");
insert into Permiso_Categoria (nombre) values ("Personal");
insert into Permiso_Categoria (nombre) values ("Profesores");
insert into Permiso_Categoria (nombre) values ("Carreras");
insert into Permiso_Categoria (nombre) values ("Menciones");
insert into Permiso_Categoria (nombre) values ("Materias");
insert into Permiso_Categoria (nombre) values ("Departamentos UCAB");
insert into Permiso_Categoria (nombre) values ("Dependencias");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("anadir_guias", "Podrá añadir nuevas guías al sistema", 4, 1);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("buscar_guias", "Podrá consultar las guías disponibles en el sistema", 2, 1);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("modificar_guias", "Podrá modificar cualquier información de una guía disponible en el sistema", 6, 1);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("personal_ver", "Podrá consultar el personal existente en el sistema", 0, 4);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("personal_agregar", "Podrá añadir nuevo personal al sistema", 4, 4);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("personal_editar", "Podrá editar cualquier información de un personal disponible en el sistema", 6, 4);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("personal_deshabilitar", "Podrá habilitar y deshabilitar personal disponible en el sistema", 3, 4);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("carreras_agregar", "Podrá añadir nuevas carreras al sistema", 4, 6);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("carreras_editar", "Podrá editar cualquier información de una carrera disponible en el sistema", 5, 6);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("carreras_deshabilitar", "Podrá habilitar y deshabilitar carreras disponibles en el sistema", 4, 6);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("materias_agregar", "Podrá añadir nuevas materias al sistema así como nuevos tipos de materia", 4, 8);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("materias_editar", "Podrá editar cualquier información de una materia disponible en el sistema", 5, 8);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("materias_deshabilitar", "Podrá habilitar y deshabilitar materias disponibles en el sistema", 3, 8);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("profesores_agregar", "Podrá añadir nuevos profesores al sistema", 4, 5);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("profesores_editar", "Podrá editar cualquier información de un profesor disponible en el sistema", 6, 5);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("profesores_deshabilitar", "Podrá habilitar y deshabilitar profesores disponibles en el sistema", 3, 5);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("ver_ordenes_web", "Podrá ver las ordenes generadas vía web", 10, 2);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("plandeestudios_agregar", "Podrá añadir planes de estudio al sistema", 4, 3);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("plandeestudios_buscar", "Podrá buscar planes de estudio disponibles en el sistema", 0, 3);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("plandeestudios_modificar", "Podrá modificar planes de estudio disponibles en el sistema", 6, 3);

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("dptoucab_agregar", "Podrá añadir nuevos departamentos de la UCAB al sistema", 3, 9);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("dptoucab_editar", "Podrá editar cualquier información de un departamento de la UCAB disponible en el sistema", 4, 9);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("dptoucab_deshabilitar", "Podrá habilitar y deshabilitar departamentos de la UCAB disponibles en el sistema", 3, 9);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("ordenes_agregar", "Podrá generar nuevas ordenes en el sistema", 6, 2);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("ordenes_editar", "Podrá editar cualquier información de una orden disponible en el sistema", 8, 2);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("ordenes_deshabilitar", "Podrá habilitar y deshabilitar ordenes disponibles en el sistema", 7, 2);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("ordenes_ver", "Podrá consultar las ordenes existentes en el sistema", 1, 2);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("ordenes_ver_detalle", "Podrá consultar el detalle de las ordenes existentes en el sistema", 1, 2);

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("dependencias_agregar", "Podrá añadir nuevas dependencias al sistema", 3, 10);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("dependencias_editar", "Podrá editar cualquier información de una dependencia disponible en el sistema", 3, 10);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("dependencias_deshabilitar", "Podrá habilitar y deshabilitar dependencias disponibles en el sistema", 3, 10);

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("eliminar_pdf_guias", "Podrá eliminar el archivo PDF de una guía disponible en el sistema", 10, 1);



insert into Personal (nombre, apellido, usuario, contrasena) values ("Administrador", "SoinCopy", "root", "root21115476*");

insert into Condicion_Pago (nombre) values ("Crédito");
insert into Condicion_Pago (nombre) values ("Débito");
insert into Condicion_Pago (nombre) values ("Cheque");
insert into Condicion_Pago (nombre) values ("Efectivo");
insert into Condicion_Pago (nombre) values ("Transferencia");

insert into Permiso_Categoria (nombre) values ("Cuentas Abiertas");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_agregar", "Podrá añadir nuevas cuentas abiertas al sistema", 3, 11);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_editar", "Podrá editar cualquier información de una cuentas abierta disponible en el sistema", 3, 11);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_deshabilitar", "Podrá habilitar y deshabilitar cuentas abiertas disponibles en el sistema", 3, 11);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_ver_detalle", "Podrá visualizar un resumen de las cuentas abiertas disponibles en el sistema", 2, 11);

insert into Permiso_Categoria (nombre) values ("Permisos");
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("permisos_agregar", "Podrá asignar y quitar cualquier permiso a cualquier personal disponible en el sistema.", 10, 12);




insert into Permiso_Categoria (nombre) values ("Inventario");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("inventario_agregar_material", "Podrá añadir nuevo material al inventario del sistema", 3, 13),
	("inventario_editar_material", "Podrá editar cualquier información de un material disponible en el inventario del sistema", 3, 13),
	("inventario_deshabilitar_material", "Podrá habilitar y deshabilitar materiales disponibles en el inventario del sistema", 3, 13),
	("inventario_agregar_stock", "Podrá añadir nuevo stock al inventario del sistema", 7, 13),
	("inventario_eliminar_stock", "Podrá eliminar una entrada de stock al inventario del sistema", 9, 13),
	("inventario_asignar_material", "Podrá asignar material del depósito a un personal disponible en el sistema", 8, 13);




INSERT INTO Personal (id, nombre, segundo_nombre, apellido, segundo_apellido, cedula, telefono, email, usuario, contrasena, fecha_creado, estado) VALUES (NULL, 'pablo', 'evelio', 'martinez', 'medina', '6892160', '4712038', 'pablomartinezmedina@gmail.com', 'pmartinez', '2323$$', '2016-07-21 10:35:02', '1'), (NULL, 'marcos', '', 'salazar', '', '15665702', '4123001280', 'salazarseijas@gmail.com', 'marcos', 'rootroot', '2016-07-25 15:44:43', '1');



insert into Permiso_Categoria (nombre) values ("Productos");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("productos_agregar", "Podrá añadir nuevos productos al sistema", 5, 14),
	("productos_editar", "Podrá editar cualquier información de un producto disponible en el inventario del sistema", 4, 14),
	("productos_nuevos_precios", "Podrá registrar cambios de precio de un producto disponible en el sistema", 7, 14),
	("productos_eliminar_precios", "Podrá eliminar cambios de precio de un producto disponible en el sistema", 8, 14),
	("productos_deshabilitar", "Podrá habilitar y deshabilitar prodcutos disponibles en el sistema", 4, 14),
	("productos_agregar_familia", "Podrá añadir nuevas familias de productos al sistema", 3, 14),
	("productos_editar_familia", "Podrá editar familias de productos disponibles en el sistema", 3, 14),
	("productos_deshabilitar_familia", "Podrá deshabilitar familias de productos disponibles en el sistema", 3, 14);


insert into Permiso_Categoria (nombre) values ("Proveedores");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("proveedores_agregar", "Podrá añadir nuevos proveedores al sistema", 5, 15),
	("proveedores_editar", "Podrá editar cualquier información de un proveedor disponible en el inventario del sistema", 4, 15),
	("proveedores_deshabilitar", "Podrá deshabilitar un proveedor disponible en el sistema", 6, 15);


insert into Permiso_Categoria (nombre) values ("Pedidos");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_agregar", "Podrá generar nuevos pedidos en el sistema", 6, 16);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_editar", "Podrá editar cualquier información de una orden disponible en el sistema", 8, 16);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_deshabilitar", "Podrá habilitar y deshabilitar pedidos disponibles en el sistema", 7, 16);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_ver", "Podrá consultar los pedidos pendientes por pagar en el sistema", 1, 16);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_ver_detalle", "Podrá consultar el detalle de las pedidos existentes en el sistema", 1, 16);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_ver_falta_factura", "Podrá consultar los pedidos a los que se le debe asignar el número de factura en el sistema", 10, 16);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("pedidos_ver_por_procesar", "Podrá consultar los pedidos pendientes por procesar en el sistema", 10, 16);


insert into Permiso_Categoria (nombre) values ("Clientes");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("clientes_agregar", "Podrá añadir nuevos clientes al sistema", 5, 17),
	("clientes_editar", "Podrá editar cualquier información de un cliente disponible en el inventario del sistema", 4, 17),
	("clientes_deshabilitar", "Podrá deshabilitar un cliente disponible en el sistema", 6, 17);




insert into Material (nombre) values ("Hojas carta"), 
	("Hojas oficio"), 
	("Hojas transparencia");

insert into Producto_Familia (nombre) values ("Guías"), ("Impresiones");

insert into Producto (nombre, descripcion, departamento, fecha_creado, familia, exento_iva, estado, tokens) values 
	("Impresión de Guía B/N Hoja carta", "", 1, now(), 2, 0, 1, "impresion guia bn hoja carta"),
	("Impresión de Guía B/N Hoja carta", "", 2, now(), 2, 0, 1, "impresion guia bn hoja carta"),
	("Impresión de Guía B/N Hoja carta", "", 3, now(), 2, 0, 1, "impresion guia bn hoja carta"),

	("Impresión de Guía COLOR Hoja carta", "", 1, now(), 2, 0, 1, "impresion guia color hoja carta"),
	("Impresión de Guía COLOR Hoja carta", "", 2, now(), 2, 0, 1, "impresion guia color hoja carta"),
	("Impresión de Guía COLOR Hoja carta", "", 3, now(), 2, 0, 1, "impresion guia color hoja carta"),

	("Impresión de Guía B/N Hoja carta DOBLE CARA", "", 1, now(), 2, 0, 1, "impresion guia bn hoja carta doble cara"),
	("Impresión de Guía B/N Hoja carta DOBLE CARA", "", 2, now(), 2, 0, 1, "impresion guia bn hoja carta doble cara"),
	("Impresión de Guía B/N Hoja carta DOBLE CARA", "", 3, now(), 2, 0, 1, "impresion guia bn hoja carta doble cara"),

	("Impresión de Guía COLOR Hoja carta DOBLE CARA", "", 1, now(), 2, 0, 1, "impresion guia color hoja carta doble cara"),
	("Impresión de Guía COLOR Hoja carta DOBLE CARA", "", 2, now(), 2, 0, 1, "impresion guia color hoja carta doble cara"),
	("Impresión de Guía COLOR Hoja carta DOBLE CARA", "", 3, now(), 2, 0, 1, "impresion guia color hoja carta doble cara"),



	("Impresión de Guía B/N Hoja oficio", "", 1, now(), 2, 0, 1, "impresion guia bn hoja oficio"),
	("Impresión de Guía B/N Hoja oficio", "", 2, now(), 2, 0, 1, "impresion guia bn hoja oficio"),
	("Impresión de Guía B/N Hoja oficio", "", 3, now(), 2, 0, 1, "impresion guia bn hoja oficio"),

	("Impresión de Guía COLOR Hoja oficio", "", 1, now(), 2, 0, 1, "impresion guia color hoja oficio"),
	("Impresión de Guía COLOR Hoja oficio", "", 2, now(), 2, 0, 1, "impresion guia color hoja oficio"),
	("Impresión de Guía COLOR Hoja oficio", "", 3, now(), 2, 0, 1, "impresion guia color hoja oficio"),

	("Impresión de Guía B/N Hoja oficio DOBLE CARA", "", 1, now(), 2, 0, 1, "impresion guia bn hoja oficio doble cara"),
	("Impresión de Guía B/N Hoja oficio DOBLE CARA", "", 2, now(), 2, 0, 1, "impresion guia bn hoja oficio doble cara"),
	("Impresión de Guía B/N Hoja oficio DOBLE CARA", "", 3, now(), 2, 0, 1, "impresion guia bn hoja oficio doble cara"),

	("Impresión de Guía COLOR Hoja oficio DOBLE CARA", "", 1, now(), 2, 0, 1, "impresion guia color hoja oficio doble cara"),
	("Impresión de Guía COLOR Hoja oficio DOBLE CARA", "", 2, now(), 2, 0, 1, "impresion guia color hoja oficio doble cara"),
	("Impresión de Guía COLOR Hoja oficio DOBLE CARA", "", 3, now(), 2, 0, 1, "impresion guia color hoja oficio doble cara"),



	("Impresión de Guía B/N Hoja transparencia", "", 1, now(), 2, 0, 1, "impresion guia bn hoja transparencia"),
	("Impresión de Guía B/N Hoja transparencia", "", 2, now(), 2, 0, 1, "impresion guia bn hoja transparencia"),
	("Impresión de Guía B/N Hoja transparencia", "", 3, now(), 2, 0, 1, "impresion guia bn hoja transparencia"),

	("Impresión de Guía COLOR Hoja transparencia", "", 1, now(), 2, 0, 1, "impresion guia color hoja transparencia"),
	("Impresión de Guía COLOR Hoja transparencia", "", 2, now(), 2, 0, 1, "impresion guia color hoja transparencia"),
	("Impresión de Guía COLOR Hoja transparencia", "", 3, now(), 2, 0, 1, "impresion guia color hoja transparencia"),


	("Impresión de Guía B/N Hoja transparencia DOBLE CARA", "", 1, now(), 2, 0, 1, "impresion guia bn hoja transparencia doble cara"),
	("Impresión de Guía B/N Hoja transparencia DOBLE CARA", "", 2, now(), 2, 0, 1, "impresion guia bn hoja transparencia doble cara"),
	("Impresión de Guía B/N Hoja transparencia DOBLE CARA", "", 3, now(), 2, 0, 1, "impresion guia bn hoja transparencia doble cara"),

	("Impresión de Guía COLOR Hoja transparencia DOBLE CARA", "", 1, now(), 2, 0, 1, "impresion guia color hoja transparencia doble cara"),
	("Impresión de Guía COLOR Hoja transparencia DOBLE CARA", "", 2, now(), 2, 0, 1, "impresion guia color hoja transparencia doble cara"),
	("Impresión de Guía COLOR Hoja transparencia DOBLE CARA", "", 3, now(), 2, 0, 1, "impresion guia color hoja transparencia doble cara");

insert into Producto_Costo (producto, costo, fecha) values 
	(1, 1, now()),
	(2, 1, now()),
	(3, 1, now()),
	(4, 1, now()),
	(5, 1, now()),
	(6, 1, now()),
	(7, 1, now()),
	(8, 1, now()),
	(9, 1, now()),
	(10, 1, now()),
	(11, 1, now()),
	(12, 1, now()),
	(13, 1, now()),
	(14, 1, now()),
	(15, 1, now()),
	(16, 1, now()),
	(17, 1, now()),
	(18, 1, now()),
	(19, 1, now()),
	(20, 1, now()),
	(21, 1, now()),
	(22, 1, now()),
	(23, 1, now()),
	(24, 1, now()),
	(25, 1, now()),
	(26, 1, now()),
	(27, 1, now()),
	(28, 1, now()),
	(29, 1, now()),
	(30, 1, now()),
	(31, 1, now()),
	(32, 1, now()),
	(33, 1, now()),
	(34, 1, now()),
	(35, 1, now()),
	(36, 1, now());

insert into Producto_Material (producto, material, cantidad, creado_por, fecha_creado) values 
	(1, 1, 1, 'root', now()),
	(2, 1, 1, 'root', now()),
	(3, 1, 1, 'root', now()),
	(4, 1, 1, 'root', now()),
	(5, 1, 1, 'root', now()),
	(6, 1, 1, 'root', now()),
	(7, 1, 1, 'root', now()),
	(8, 1, 1, 'root', now()),
	(9, 1, 1, 'root', now()),
	(10, 1, 1, 'root', now()),
	(11, 1, 1, 'root', now()),
	(12, 1, 1, 'root', now()),

	(13, 2, 1, 'root', now()),
	(14, 2, 1, 'root', now()),
	(15, 2, 1, 'root', now()),
	(16, 2, 1, 'root', now()),
	(17, 2, 1, 'root', now()),
	(18, 2, 1, 'root', now()),
	(19, 2, 1, 'root', now()),
	(20, 2, 1, 'root', now()),
	(21, 2, 1, 'root', now()),
	(22, 2, 1, 'root', now()),
	(23, 2, 1, 'root', now()),
	(24, 2, 1, 'root', now()),

	(25, 3, 1, 'root', now()),
	(26, 3, 1, 'root', now()),
	(27, 3, 1, 'root', now()),
	(28, 3, 1, 'root', now()),
	(29, 3, 1, 'root', now()),
	(30, 3, 1, 'root', now()),
	(31, 3, 1, 'root', now()),
	(32, 3, 1, 'root', now()),
	(33, 3, 1, 'root', now()),
	(34, 3, 1, 'root', now()),
	(35, 3, 1, 'root', now()),
	(36, 3, 1, 'root', now());



insert into Permiso_Categoria (nombre) values ("Caja");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("caja_realizarcobro", "Podrá realizar el cobro de cualquier pedido disponible en el sistema.", 10, 18);

insert into Permiso_Categoria (nombre) values ("Reportes");

insert into Permiso (nombre, descripcion, riesgo, categoria) values 
	("reportes_libro_de_ventas", "Podrá visualizar el reporte de libro de ventas.", 10, 19),
	("reportes_cuadre_ventas_diarias", "Podrá visualizar el reporte de cuadre de ventas diarias.", 10, 19),
	("reportes_venta_productos", "Podrá visualizar el reporte de ventas por productos.", 10, 19),
	("reportes_corte_de_caja", "Podrá generar el reporte de corte de caja.", 10, 19);


insert into IVA (valor, fecha) values (0.10, now());


insert into Permiso (nombre, descripcion, riesgo, categoria) values 
	("reportescaja_agregar", "Podrá agregar retiros de caja. Nota: aun teniendo este permiso se necesita la aprobación de un administrador a la hora de realizar un retiro.", 10, 18),
	("notascredito_agregar", "Podrá agregar notas de crédito.", 10, 18);