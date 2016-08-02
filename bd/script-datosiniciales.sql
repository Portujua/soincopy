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

insert into Departamento(nombre) values ("Originales");
insert into Departamento(nombre) values ("Diseño");	

insert into Producto (nombre, departamento) values ("Imp. Color Carta", 1);
insert into Producto (nombre, departamento) values ("Imp. Color Oficio", 1);
insert into Producto (nombre, departamento) values ("Imp. Color D/C", 1);
insert into Producto (nombre, departamento) values ("Imp. Color D/C con Cartulina", 1);
insert into Producto (nombre, departamento) values ("Copia Color Carta", 1);
insert into Producto (nombre, departamento) values ("Copia Color Oficio", 1);
insert into Producto (nombre, departamento) values ("Copia Color D/C", 1);
insert into Producto (nombre, departamento) values ("Copia B/N Carta (LIBRO)", 1);
insert into Producto (nombre, departamento) values ("Copia B/N Profesores", 1);
insert into Producto (nombre, departamento) values ("Copia B/N Oficio", 1);
insert into Producto (nombre, departamento) values ("Copia B/N D/C", 1);
insert into Producto (nombre, departamento) values ("Imp. B/N Carta", 1);
insert into Producto (nombre, departamento) values ("Imp. B/N Oficio", 1);
insert into Producto (nombre, departamento) values ("Imp. B/N D/C", 1);
insert into Producto (nombre, departamento) values ("Transp. B/N Imp.", 1);
insert into Producto (nombre, departamento) values ("Transp. Color Imp.", 1);
insert into Producto (nombre, departamento) values ("Transp. Color Copia", 1);
insert into Producto (nombre, departamento) values ("Cartulina A", 1);
insert into Producto (nombre, departamento) values ("Plastificado", 1);
insert into Producto (nombre, departamento) values ("Encuadernación", 1);
insert into Producto (nombre, departamento) values ("Digitalización Color", 1);
insert into Producto (nombre, departamento) values ("Digitalización B/N", 1);

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

insert into CuentaAbierta (nombre) values ("UCAB");
insert into CuentaAbierta (nombre) values ("Soincopy");

insert into Permiso_Categoria (nombre) values ("Cuentas Abiertas");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_agregar", "Podrá añadir nuevos cuentaabiertas al sistema", 3, 11);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_editar", "Podrá editar cualquier información de un cuentaabierta disponible en el sistema", 3, 11);
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("cuentaabiertas_deshabilitar", "Podrá habilitar y deshabilitar cuentaabiertas disponibles en el sistema", 3, 11);

insert into Permiso_Categoria (nombre) values ("Permisos");
insert into Permiso (nombre, descripcion, riesgo, categoria) values ("permisos_agregar", "Podrá asignar y quitar cualquier permiso a cualquier personal disponible en el sistema.", 10, 12);




insert into Permiso_Categoria (nombre) values ("Inventario");

insert into Permiso (nombre, descripcion, riesgo, categoria) values ("inventario_agregar_material", "Podrá añadir nuevo material al inventario del sistema", 3, 13),
	("inventario_editar_material", "Podrá editar cualquier información de un material disponible en el inventario del sistema", 3, 13),
	("inventario_deshabilitar_material", "Podrá habilitar y deshabilitar materiales disponibles en el inventario del sistema", 3, 13),
	("inventario_agregar_stock", "Podrá añadir nuevo stock al inventario del sistema", 7, 13),
	("inventario_eliminar_stock", "Podrá eliminar una entrada de stock al inventario del sistema", 9, 13);