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

call agregar_carrera('Ingeniería Informática', 'Semestral');
call agregar_carrera('Ingeniería Civil', 'Semestral');
call agregar_carrera('Derecho', 'Semestral');

call agregar_materia("Introducción a la Informática", "Ingeniería Informática", 1);
call agregar_materia("Matemática Básica", "Ingeniería Informática", 1);
call agregar_materia("Calculo 1", "Ingeniería Informática", 2);
call agregar_materia("Calculo 2", "Ingeniería Informática", 3);
call agregar_materia("Calculo 3", "Ingeniería Informática", 4);
call agregar_materia("Calculo 4", "Ingeniería Informática", 5);

call agregar_materia("Calculo 1", "Ingeniería Civil", 1);
call agregar_materia("Calculo 2", "Ingeniería Civil", 2);
call agregar_materia("Calculo 3", "Ingeniería Civil", 3);
call agregar_materia("Calculo 4", "Ingeniería Civil", 4);

call agregar_profesor("Marcos", "Gabriel", "Salazar", "Seijas", "123456789", "0412 300 1280", null);
call agregar_profesor("Profesor", null, "Uno", null, "0123456789", "xxxxxxxx", null);

call agregar_personal("Eduardo", "Jose", "Lorenzo", null);
call agregar_personal("Empleado", null, "Prueba", null);

insert into Usuario (usuario, contrasena) values ("admin", "admin");
insert into Usuario (usuario, contrasena) values ("solobuscar", "solobuscar");

insert into Permisos (anadir_guias, buscar_guias, modificar_guias, usuario) values (1, 1, 1, 1);
insert into Permisos (anadir_guias, buscar_guias, modificar_guias, usuario) values (0, 1, 0, 2);