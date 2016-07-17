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

insert into Permiso (nombre, descripcion) values ("anadir_guias", "Podrá añadir nuevas guías al sistema");
insert into Permiso (nombre, descripcion) values ("buscar_guias", "Podrá consultar las guías disponibles en el sistema");
insert into Permiso (nombre, descripcion) values ("modificar_guias", "Podrá modificar cualquier información de una guía disponible en el sistema");
insert into Permiso (nombre, descripcion) values ("anadir_orden", "Podrá generar ordenes");
insert into Permiso (nombre, descripcion) values ("personal_ver", "Podrá consultar el personal existente en el sistema");
insert into Permiso (nombre, descripcion) values ("personal_agregar", "Podrá añadir nuevo personal al sistema");
insert into Permiso (nombre, descripcion) values ("personal_editar", "Podrá editar cualquier información de un personal disponible en el sistema");
insert into Permiso (nombre, descripcion) values ("personal_deshabilitar", "Podrá habilitar y deshabilitar personal disponible en el sistema");


insert into Personal (nombre, apellido, usuario, contrasena) values ("Administrador", "SoinCopy", "admin", "admin");


insert into Permiso_Asignado (permiso, usuario) values (1, 1);
insert into Permiso_Asignado (permiso, usuario) values (2, 1);
insert into Permiso_Asignado (permiso, usuario) values (3, 1);
insert into Permiso_Asignado (permiso, usuario) values (4, 1);
insert into Permiso_Asignado (permiso, usuario) values (5, 1);
insert into Permiso_Asignado (permiso, usuario) values (6, 1);
insert into Permiso_Asignado (permiso, usuario) values (7, 1);
insert into Permiso_Asignado (permiso, usuario) values (8, 1);