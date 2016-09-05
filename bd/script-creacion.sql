create table Carrera (
	id int not null auto_increment,
	nombre varchar(64) not null,
	estado tinyint(1) default 1,
	primary key(id), unique(nombre)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Periodo (
	id int not null auto_increment,
	tipo varchar(12) not null default 'Semestral',
	numero int not null comment '1 = 1er semestre o año, depende del tipo',
	primary key(id),
	constraint check_tipo check (tipo in ("Semestral", "Anual"))
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Car_Per (
	id int not null auto_increment,
	periodo int not null,
	carrera int not null,
	primary key(id),
	foreign key (periodo) references Periodo(id),
	foreign key (carrera) references Carrera(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Mencion (
	id int not null auto_increment,
	nombre varchar(64) not null,
	estado tinyint(1) default 1,
	carrera int not null,
	primary key(id),
	foreign key (carrera) references Carrera(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Profesor (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	cedula varchar(32),
	telefono varchar(64),
	email varchar(64),
	estado tinyint(1) default 1,
	primary key(id), unique(cedula)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Departamento (
	id int not null auto_increment,
	nombre varchar(32) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Personal (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	cedula varchar(32),
	telefono varchar(128),
	email varchar(128),
	usuario varchar(32) not null,
	contrasena varchar(32) not null,
	fecha_creado datetime,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Personal_Departamento (
	id int not null auto_increment,
	departamento int not null,
	personal int not null,
	primary key(id),
	foreign key (departamento) references Departamento(id),
	foreign key (personal) references Personal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Tipo_Materia (
	id int not null auto_increment,
	nombre varchar(32) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Materia (
	id int not null auto_increment,
	nombre varchar(64) not null,
	dictada_en int not null comment 'Foranea a la N a N entre periodo y carrera',
	estado tinyint(1) default 1,
	tipo int default 1 comment '1 es el id de NORMAL',
	primary key(id),
	foreign key (dictada_en) references Car_Per(id),
	foreign key (tipo) references Tipo_Materia(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Dependencia(
	id int not null auto_increment,
	nombre varchar(64) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Tipo_Guia (
	id int not null auto_increment,
	nombre varchar(32) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Guia (
	id int not null auto_increment,
	codigo varchar(20),
	titulo varchar(128) not null,
	seccion varchar(12),
	comentario text,
	status int default 0 comment '-1 = rechazada, 0 = sin revisar, 1 = aprobada, 2 = inactiva.. 3 = devuelta(?)',
	pdf varchar(128) not null comment 'link al archivo pdf',
	profesor int,
	materia int,
	entregada_por varchar(128) not null comment 'Puede ser un nombre de una persona nueva o si es un numero es el id del profesor que la entrego',
	recibida_por int not null comment 'Foranea a personal',
	fecha_anadida datetime,
	numero_hojas int,
	numero_paginas int,
	tipo int,
	primary key(id), unique(codigo),
	foreign key (profesor) references Profesor(id),
	foreign key (materia) references Materia(id),
	foreign key (recibida_por) references Personal(id),
	foreign key (tipo) references Tipo_Guia(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Cambio_de_Status (
	id int not null auto_increment,
	guia int not null,
	status_previo int not null,
	status_nuevo int not null,
	comentario text,
	fecha timestamp,
	usuario int comment 'Foranea a personal que realizo el cambio de status',
	primary key(id),
	foreign key (usuario) references Personal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Permiso_Categoria (
	id int not null auto_increment,
	nombre varchar(64) not null,
	descripcion varchar(128),
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Permiso (
	id int not null auto_increment,
	nombre varchar(32) not null,
	descripcion varchar(128) not null,
	riesgo int default 0,
	categoria int not null,
	primary key(id),
	foreign key (categoria) references Permiso_Categoria(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Permiso_Asignado (
	id int not null auto_increment,
	permiso int not null,
	usuario int not null,
	primary key(id),
	unique(permiso, usuario),
	foreign key (permiso) references Permiso(id),
	foreign key (usuario) references Personal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


create table Log_Vista_Guias (
	id int not null auto_increment,
	fecha datetime not null,
	username varchar(32) not null,
	resultado varchar(32) not null,
	archivo varchar(64) not null,
	errores varchar(32) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Log_Login (
	id int not null auto_increment,
	fecha datetime not null,
	username varchar(32) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Plan_de_Estudio (
	id int not null auto_increment,
	titulo varchar(128) not null,
	carrera int not null,
	mencion int comment 'Solo si es un plan para una carrera.. Si es -1 no es de ninguna mencion',
	materia int comment 'Solo si es un plan para una materia',
	tipo varchar(32) not null,
	comentario text,
	pdf varchar(256) not null,
	paginas int,
	hojas int,
	fecha datetime,
	primary key(id),
	foreign key (carrera) references Carrera(id),
	foreign key (mencion) references Mencion(id),
	foreign key (materia) references Materia(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Guia_Web (
	id int not null auto_increment,
	archivo varchar(128) not null,
	tipo_archivo varchar(32) not null,
	nombre_completo varchar(128) not null,
	email varchar(64),
	tlf varchar(64),
	motivo text,
	comentarios text,
	revisada tinyint(1) default 0,
	fecha datetime,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Producto_Familia (
	id int not null auto_increment,
	nombre varchar(64) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Producto (
	id int not null auto_increment,
	nombre varchar(64) not null,
	descripcion text,
	departamento int not null comment 'El departamento donde es ofrecido este producto',
	fecha_creado datetime,
	familia int not null,
	exento_iva tinyint(1) default 0,
	estado tinyint(1) default 1,
	primary key(id),
	foreign key (departamento) references Departamento(id),
	foreign key (familia) references Producto_Familia(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Departamento_UCAB (
	id int not null auto_increment,
	nombre varchar(64) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table CuentaAbierta (
	id int not null auto_increment,
	nombre varchar(128) not null,
	inicia date,
	vence date,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Condicion_Pago (
	id int not null auto_increment,
	nombre varchar(32) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Orden (
	id int not null auto_increment,
	numero varchar(32) not null,
	dependencia int not null,
	fecha_anadida datetime not null,
	fecha_modificada datetime,
	observaciones text,
	procesada tinyint(1) default 0,
	estado tinyint(1) default 1,
	creado_por int not null,
	cond_pago int,
	fecha date comment 'Es la fecha de la orden introducida por el usuario',
	primary key(id),
	foreign key (dependencia) references Dependencia(id),
	foreign key (creado_por) references Personal(id),
	foreign key (cond_pago) references Condicion_Pago(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Orden_Producto (
	id int not null auto_increment,
	orden int not null,
	producto int not null,
	cantidad int not null comment 'Cantidad del producto.. en caso de ser copias seria nro_copias*nro_originales',
	nro_copias int,
	nro_originales int,
	precio_unitario float not null,
	precio_total float not null,
	fecha_anadido datetime,
	primary key(id),
	foreign key (orden) references Orden(id),
	foreign key (producto) references Producto(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table CuentaAbierta_Producto (
	id int not null auto_increment,
	cuentaabierta int not null,
	producto int not null,
	cantidad int not null comment 'Cantidad del producto.. en caso de ser copias seria nro_copias*nro_originales',
	nro_copias int,
	nro_originales int,
	precio_unitario float not null,
	precio_total float not null,
	fecha_anadido datetime,
	primary key(id),
	foreign key (cuentaabierta) references CuentaAbierta(id),
	foreign key (producto) references Producto(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Producto_Costo (
	id int not null auto_increment,
	producto int not null,
	costo float not null,
	fecha datetime not null,
	eliminado tinyint(1) default 0,
	primary key(id),
	foreign key (producto) references Producto(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Persona_Autorizada (
	id int not null auto_increment,
	nombre_completo varchar(256) not null,
	cedula varchar(32) not null,
	cuentaabierta int not null,
	primary key (id),
	foreign key (cuentaabierta) references CuentaAbierta(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Material (
	id int not null auto_increment,
	nombre varchar(32) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Proveedor (
	id int not null auto_increment,
	nombre varchar(128) not null,
	ni varchar(32) not null comment 'Numero de identificacion: RIF o CI',
	direccion varchar(256),
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Stock (
	id int not null auto_increment,
	cantidad int not null,
	fecha_anadido datetime,
	costo float default 0,
	material int not null,
	eliminado tinyint(1) default 0 comment 'Para eliminar stock sin borrarlo del sistema',
	proveedor int not null,
	cantidad_disponible int,
	primary key(id),
	foreign key (material) references Material(id),
	foreign key (proveedor) references Proveedor(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Producto_Material (
	id int not null auto_increment,
	producto int not null,
	material int not null,
	cantidad int default 1 comment 'cantidad de material para este producto',
	creado_por varchar(32) not null comment 'el usuario que lo crea',
	fecha_creado datetime,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Stock_Personal (
	id int not null auto_increment,
	personal int not null,
	material int not null,
	cantidad int not null,
	fecha datetime,
	asignado_por int,
	agotado tinyint(1) default 0,
	restante int,
	eliminado tinyint(1) default 0,
	eliminado_por varchar(32),
	primary key(id),
	foreign key (personal) references Personal(id),
	foreign key (material) references Material(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Stock_Personal_Danado (
	id int not null auto_increment,
	stock int not null,
	cantidad int not null,
	motivo varchar(128),
	fecha datetime,
	primary key(id),
	foreign key (stock) references Stock_Personal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Cliente (
	id int not null auto_increment,
	nombre varchar(256) not null,
	ni varchar(128) comment 'cedula o rif' not null,
	email varchar(128),
	tlf varchar(32),
	direccion varchar(256),
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Pedido (
	id int not null auto_increment,
	numero varchar(32),
	dependencia int,
	fecha_anadida datetime not null,
	fecha_modificada datetime,
	observaciones text,
	procesada tinyint(1) default 0,
	estado tinyint(1) default 1,
	creado_por int not null,
	cond_pago int,
	cliente int not null,
	fecha date comment 'Es la fecha de la orden introducida por el usuario',
	primary key(id),
	foreign key (dependencia) references Dependencia(id),
	foreign key (creado_por) references Personal(id),
	foreign key (cond_pago) references Condicion_Pago(id),
	foreign key (cliente) references Cliente(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Pedido_Producto (
	id int not null auto_increment,
	pedido int not null,
	producto int not null,
	cantidad int not null comment 'Cantidad del producto.. en caso de ser copias seria nro_copias*nro_originales',
	nro_copias int,
	nro_originales int,
	precio_unitario float not null,
	precio_total float not null,
	fecha_anadido datetime,
	primary key(id),
	foreign key (pedido) references Pedido(id),
	foreign key (producto) references Producto(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Producto_Guia (
	id int not null auto_increment,
	producto int not null,
	guia int not null,
	creado_por varchar(32) not null comment 'el usuario que lo crea',
	fecha_creado datetime,
	primary key(id),
	foreign key (guia) references Guia(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


/* Views */
create view Lista_Pendientes_Por_Revision as
select *, date_format(fecha_anadida, "%d/%m/%Y") as fecha, time_format(fecha_anadida, '%h:%i:%s %p') as hora
from Guia where status=0;

create view Lista_Rechazadas as
select *, date_format(fecha_anadida, "%d/%m/%Y") as fecha, time_format(fecha_anadida, '%h:%i:%s %p') as hora
from Guia where status=-1;

create view Lista_Aprobadas as
select *, date_format(fecha_anadida, "%d/%m/%Y") as fecha, time_format(fecha_anadida, '%h:%i:%s %p') as hora
from Guia where status=1;

create view Lista_Inactivas as
select *, date_format(fecha_anadida, "%d/%m/%Y") as fecha, time_format(fecha_anadida, '%h:%i:%s %p') as hora
from Guia where status=2;

create view Lista_Devueltas as
select *, date_format(fecha_anadida, "%d/%m/%Y") as fecha, time_format(fecha_anadida, '%h:%i:%s %p') as hora
from Guia where status=3;

create view Lista_Todas as
select *, date_format(fecha_anadida, "%d/%m/%Y") as fecha, time_format(fecha_anadida, '%h:%i:%s %p') as hora
from Guia;

create view Log_Vista_Guias_Errores as
select *, date_format(fecha, "%d/%m/%Y") as fecha_, time_format(fecha, '%h:%i:%s %p') as hora
from Log_Vista_Guias
where resultado!='ok'
order by fecha desc;



/* Procedimientos */
delimiter //

/* Obtener */
DROP PROCEDURE IF EXISTS obtener_personal_id//
create procedure obtener_personal_id(in id_ int)
comment 'Obtener personal en especifico por ID'
begin
	select id, nombre, apellido, concat(nombre, ' ', apellido) as nombre_completo
	from Personal
	where id=id_;
end//

DROP PROCEDURE IF EXISTS obtener_profesor//
create procedure obtener_profesor(in id_ int)
comment 'Obtener profesor'
begin
	select id, nombre, apellido, cedula, telefono, concat(nombre, ' ', apellido) as nombre_completo
	from Profesor
	where id=id_;
end//

/* Agregar */
DROP PROCEDURE IF EXISTS agregar_carrera//
create procedure agregar_carrera(in nombre_carrera varchar(64), in tipo_carrera varchar(12))
comment 'Agrega una carrera con sus semestres/años'
begin
	declare last_id int;

	insert into Carrera (nombre) values (nombre_carrera);

	set last_id = (select id from Carrera order by id desc limit 1);

	if tipo_carrera = "Semestral" then
		insert into Car_Per (periodo, carrera) values (1, last_id);
		insert into Car_Per (periodo, carrera) values (2, last_id);
		insert into Car_Per (periodo, carrera) values (3, last_id);
		insert into Car_Per (periodo, carrera) values (4, last_id);
		insert into Car_Per (periodo, carrera) values (5, last_id);
		insert into Car_Per (periodo, carrera) values (6, last_id);
		insert into Car_Per (periodo, carrera) values (7, last_id);
		insert into Car_Per (periodo, carrera) values (8, last_id);
		insert into Car_Per (periodo, carrera) values (9, last_id);
		insert into Car_Per (periodo, carrera) values (10, last_id);
	else
		insert into Car_Per (periodo, carrera) values (11, last_id);
		insert into Car_Per (periodo, carrera) values (12, last_id);
		insert into Car_Per (periodo, carrera) values (13, last_id);
		insert into Car_Per (periodo, carrera) values (14, last_id);
		insert into Car_Per (periodo, carrera) values (15, last_id);
	end if;

	insert into Car_Per (periodo, carrera) values (16, last_id);
end//

DROP PROCEDURE IF EXISTS agregar_guia_//
create procedure agregar_guia_(in codigo_ varchar(20), in titulo_ varchar(128), in seccion_ varchar(12), in comentario_ text, in pdf_ varchar(128), in profesor_ int, in materia_ int, in entregada_por_ varchar(128), in recibida_por_ int, in numero_hojas_ int, in numero_paginas_ int)
comment 'Añade una guia (para carga masiva porque incluye el codigo como parametro'
begin
	insert into Guia (codigo, titulo, seccion, comentario, pdf, profesor, materia, entregada_por, recibida_por, numero_hojas, numero_paginas, fecha_anadida)
	values (codigo_, titulo_, seccion_, comentario_, pdf_, profesor_, materia_, entregada_por_, recibida_por_, numero_hojas_, numero_paginas_, now());

	select id from Guia order by id desc limit 1;
end//

DROP PROCEDURE IF EXISTS agregar_profesor//
create procedure agregar_profesor(in nombre_ varchar(32), in segundo_nombre_ varchar(32), in apellido_ varchar(32), in segundo_apellido_ varchar(32), in cedula_ varchar(32), in telefono_ varchar(64), in email_ varchar(64))
comment 'añade un profesor'
begin
	insert into Profesor (nombre, segundo_nombre, apellido, segundo_apellido, cedula, telefono, email)
	values (nombre_, segundo_nombre_, apellido_, segundo_apellido_, cedula_, telefono_, email_);

	select id from Profesor order by id desc limit 1;
end//

DROP PROCEDURE IF EXISTS modificar_guia//
create procedure modificar_guia(in codigo_ varchar(20), in titulo_ varchar(128), in seccion_ varchar(12), in comentario_ text, in pdf_ varchar(128), in profesor_ int, in materia_ int, in entregada_por_ varchar(128), in recibida_por_ int, in numero_hojas_ int, in numero_paginas_ int)
comment 'modifica una guia'
begin
	update Guia set titulo=titulo_, seccion=seccion_, comentario=comentario_, pdf=pdf_, profesor=profesor_, materia=materia_, entregada_por=entregada_por_, recibida_por=recibida_por_, numero_hojas=numero_hojas_, numero_paginas=numero_paginas_ where codigo=codigo_;
end//

DROP PROCEDURE IF EXISTS cambiar_estado_guia//
create procedure cambiar_estado_guia(in status_ int, in codigo_ varchar(20))
begin
	declare status_previo_ int;

	set status_previo_ = (select status from Guia where codigo=codigo_);

	update Guia set status=status_ where codigo=codigo_;

	insert into Cambio_de_Status (guia, status_previo, status_nuevo, fecha)
	values ((select id from Guia where codigo=codigo_), status_previo_, status_, now());
end