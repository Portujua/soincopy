<?php
	class DatabaseHandler
	{
        /* Documentacion PDO: 
        *  http://php.net/manual/es/book.pdo.php
        */

        // local, main, test
        private $connect_to = "local";

		private $db;

        private $session_duration = 5 * 60;

        public function __construct()
        {
            if ($this->connect_to == "local")
            {
                $this->username = "root";
                $this->password = "21115476";
                $this->dsn = "mysql:dbname=soincopy;host=localhost";
            }
            elseif ($this->connect_to == "main")
            {
                $this->username = "salazars_eduardo";
                $this->password = "21115476";
                $this->dsn = "mysql:dbname=salazars_soincopy;host=localhost";
            }
            elseif ($this->connect_to == "test")
            {
                $this->username = "folkanda_admin";
                $this->password = "dEusk28dnAuskedg";
                $this->dsn = "mysql:dbname=folkanda_test;host=localhost";
            }

            $this->connect();
        }

		public function connect()
        {
            if (!$this->db instanceof PDO)
            {
                $this->db = new PDO($this->dsn, $this->username, $this->password);       
                $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }

            $this->db->query("SET CHARSET utf8");
        }

        public function dbDeleteAll()
        {
            $fileName = "../bd/script-drops.sql";
            $fp = fopen($fileName, "r");
            $content = fread($fp, filesize($fileName));
            fclose($fp);
            

            $query = $content;

            $this->connect();
            $this->db->query($query);
        }

        public function dbCreateAll()
        {
            $fileName = "../bd/script-creacion.sql";
            $fp = fopen($fileName, "r");
            $content = fread($fp, filesize($fileName));
            fclose($fp);
            

            $query = $content;

            $this->connect();
            $this->db->query($query);
        }

        public function dbAddBasicData()
        {
            $fileName = "../bd/script-datosiniciales.sql";
            $fp = fopen($fileName, "r");
            $content = fread($fp, filesize($fileName));
            fclose($fp);


            $query = $content;

            $this->connect();
            $this->db->query($query);
        }

        public function cleanImagesFolder()
        {
            $files = glob('../images/*'); // get all file names
            foreach($files as $file){ // iterate files
              if(is_file($file))
                unlink($file); // delete file
            }
        }










        public function fixAntiSqlInject($text)
        {
            $text = str_replace("\"", "", $text);
            $text = str_replace("'", "", $text);
            return $text;
        }

        private $KEY = "oSsZoInSsCoToO";
    
        /**
         * Encriptar un string 
         * 
         * @param string $string El string que queremos encriptar
         * 
         * @return String
         */
        function encrypt($string) 
        {
            $iv = md5(md5($this->KEY));
            
            $enc = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($this->KEY), $string, MCRYPT_MODE_CBC, $iv);
            $enc = base64_encode($enc);
            
            return $enc;
        }

        /**
         * Encriptar un string 
         * 
         * @param string $string El string que queremos encriptar
         * 
         * @return String
         */
        function encryptForDb($string) 
        {
            $iv = md5(md5($this->KEY));
            
            $enc = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($this->KEY), $string, MCRYPT_MODE_CBC, $iv);
            $enc = base64_encode($enc);

            $enc = $this->fixAntiSqlInject($enc);
            
            return $enc;
        }
        
        /**
         * Desencripta un string
         * 
         * @param string $string El string que vamos a desencriptar
         */
        function decrypt($string) 
        {
            $iv = md5(md5($this->KEY));
            
            $dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($this->KEY), base64_decode($string), MCRYPT_MODE_CBC, $iv);
            $dec = rtrim($dec, "");
            
            return $dec;
        }

        public function getTodayDate()
		{
			date_default_timezone_set('America/Caracas');
			$today = array(
				"ano" => (int)date('Y', time()),
				"mes" => (int)date('m', time()),
				"dia" => (int)date('d', time()),
			);
			
			return $today;
		}

        public function getTodayDateString()
        {
            date_default_timezone_set('America/Caracas');
            $today = array(
                "ano" => (int)date('Y', time()),
                "mes" => (int)date('m', time()),
                "dia" => (int)date('d', time()),
            );
            
            return $today['dia'] . '-' . $today['mes'] . '-' . $today['ano'];
        }

        public function getTodayDateStringDB()
        {
            date_default_timezone_set('America/Caracas');
            $today = array(
                "ano" => (int)date('Y', time()),
                "mes" => (int)date('m', time()),
                "dia" => (int)date('d', time()),
            );
            
            return $today['ano'] . '-' . $today['mes'] . '-' . $today['dia'];
        }






        /* Funciones ejemplo */

        public function ejemploInsert($nombre, $apellido)
        {
            $query = $this->db->prepare("
                INSERT INTO Persona (nombre, apellido)
                VALUES (':nombre', ':apellido')
            ");

            $query->execute(array(
                ":nombre" => $nombre,
                ":apellido" => $apellido
            ));

            // Ejemplo obtener el id de eso que acabamos de añadir
            $ultimoIdAnadido = $this->db->lastInsertId();
        }

        public function ejemploLeer()
        {
            $query = $this->db->prepare("SELECT * FROM Persona");
            $query->execute(); 
            // En este punto $query es un objeto de PDO
            // Sin embargo aun no contiene lo que pedimos
            // Para ello hacemos:
            $datos = $query->fetchAll();
            // fetchAll devuelve un arreglo con las filas de respuesta
            // No es recomendable cambiar el valor de $query
            // Por ejemplo: $query = $query->fetchAll()
            // Ya que perderiamos la posibilidad de obtener cosas como:
            // La cantidad de filas respuesta:
            $nroFilasRespuesta = $query->rowCount();
            // Asi como tambien la posibilidad de recorrerlo con un foreach
            foreach ($query as $filaRespuesta)
            {
                // algo
            }
        }





        /* Funciones nuevas aqui abajo */
        public function actualizar_hora_sesion()
        {
            @session_start();
            $_SESSION['login_time'] = time();
        }

        public function session_expired()
        {
            @session_start();

            if (!isset($_SESSION['login_time']))
                return true;

            if (time() - $_SESSION['login_time'] > $this->session_duration)
                return true;

            return false;
        }

        public function login($post)
        {
            $query = $this->db->prepare("
                select u.id as id, u.usuario as username, u.nombre as nombre, u.apellido as apellido, u.cedula as cedula, u.email as email, u.telefono as tlf
                from Personal as u
                where u.usuario=:username and u.contrasena=:password and u.estado=1
                limit 1
            ");

            $query->execute(array(
                ":username" => $post['username'],
                ":password" => $post['password']
            ));

            $u = $query->fetchAll();

            if (count($u) > 0)
            {
                /* Obtengo los permisos */
                $user = $u[0];

                $query = $this->db->prepare("
                    select nombre
                    from Permiso_Asignado as pa, Permiso as p
                    where pa.permiso=p.id and pa.usuario=:uid
                ");

                $query->execute(array(
                    ":uid" => $user['id']
                ));

                $permisos = $query->fetchAll();

                foreach ($permisos as $p)
                    $user[$p['nombre']] = 1;

                /* Setteo la sesion y registro el login */
                @session_start();
                $_SESSION['login_username'] = $post['username'];
                $this->actualizar_hora_sesion();

                $query = $this->db->prepare("
                    insert into Log_Login (fecha, username)
                    values (now(), :username)
                ");

                $query->execute(array(
                    ":username" => $post['username']
                ));

                return json_encode($user);
            }
            else
                return json_encode(array("error" => 1));
        }

        public function cargar_materias($post)
        {
            $query = $this->db->prepare("call obtener_todas_las_materias()");
            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_carreras($post)
        {
            $query = $this->db->prepare("call obtener_carreras()");
            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_profesores($post)
        {
            $query = $this->db->prepare("call obtener_profesores()");
            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_dependencias($post)
        {
            $query = $this->db->prepare("
                select * from Dependencia
            ");
            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cambiar_estado_personal($post)
        {
            $query = $this->db->prepare("
                update Personal set estado=:estado where id=:pid
            ");

            $query->execute(array(
                ":pid" => $post['pid'],
                ":estado" => $post['estado']
            ));
        }

        public function cargar_personal($post)
        {
            $query = $this->db->prepare("
                select *, concat(nombre, ' ', apellido) as nombre_completo
                from Personal
                order by nombre asc
            ");

            $query->execute();
            $ret = $query->fetchAll();

            /* Permisos */
            for ($i = 0; $i < count($ret); $i++)
            {
                $ret[$i]["permisos"] = "";
                $ret[$i]["snombre"] = $ret[$i]["segundo_nombre"];
                $ret[$i]["sapellido"] = $ret[$i]["segundo_apellido"];

                $query = $this->db->prepare("
                    select p.id as id
                    from Permiso_Asignado as pa, Permiso as p
                    where pa.permiso=p.id and usuario=:usuario
                ");

                $query->execute(array(
                    ":usuario" => $ret[$i]['id']
                ));

                $permisos = $query->fetchAll();

                foreach ($permisos as $p)
                    $ret[$i]["permisos"] .= $p['id'];
            }

            return json_encode($ret);
        }

        public function cargar_permisos($post)
        {
            $query = $this->db->prepare("
                select *
                from Permiso
                order by id asc
            ");
            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_profesor($id)
        {
            $query = $this->db->prepare("call obtener_profesor(:id)");

            $query->execute(array(
                ":id" => $id
            ));

            $d = $query->fetchAll();
            $d = $d[0];

            return $d;
        }

        public function cargar_personal_($id)
        {
            $query = $this->db->prepare("call obtener_personal_id(:id)");
            
            $query->execute(array(
                ":id" => $id
            ));

            $d = $query->fetchAll();
            $d = $d[0];

            return $d;
        }

        public function obtener_carrera_desde_materia($id_materia)
        {
            $query = $this->db->prepare("
                select c.id as id, c.nombre as nombre
                from Materia as m, Car_Per as cp, Carrera as c
                where m.dictada_en=cp.id and cp.carrera=c.id and m.id=:id
            ");
            
            $query->execute(array(
                ":id" => $id_materia
            ));

            $d = $query->fetchAll();
            $d = $d[0];

            return $d;
        }

        public function borrar_guia_web($post)
        {
            unlink("../../soincopy_files/guias_web/" . $post['file']);
            $query = $this->db->prepare("
                update Guia_Web set revisada=1 where id=:id
            ");

            $query->execute(array(
                ":id" => $post['id']
            ));
        }

        public function cargar_guias_web($post)
        {
            $query = $this->db->prepare("
                select *, date_format(fecha, '%d/%m/%Y') as fecha_arreglada, time_format(fecha, '%h:%i:%s %p') as hora
                from Guia_Web
                where revisada=0
                order by fecha desc
            ");

            $query->execute();

            return json_encode($query->fetchAll());
        }

        public function cargar_guias($post)
        {
            $query = $this->db->prepare("select * from Lista_Todas where status=:status order by id desc");

            $query->execute(array(
                ":status" => $post["status"]
            ));

            $gs = $query->fetchAll();
            $guias = array();

            foreach ($gs as $g)
            {
                $row = $g;
                // Guardo los ID
                $row["entregada_por_id"] = $row["entregada_por"];
                $row["profesor_id"] = $row["profesor"];
                $row["recibida_por_id"] = $row["recibida_por"];
                $carrera = $this->obtener_carrera_desde_materia($g['materia']);
                $row["carrera_id"] = $carrera['id'];
                $row["carrera_nombre"] = $carrera['nombre'];

                // Reemplazo por los valores de la foranea
                $row["entregada_por"] = $this->cargar_profesor($row["profesor"]);
                $row["profesor"] = $this->cargar_profesor($row["profesor"]);
                $row["recibida_por"] = $this->cargar_personal_($row["recibida_por"]);

                if ($row["status"] == -1)
                    $row["status_str"] = "rechazada";
                else if ($row["status"] == 0)
                    $row["status_str"] = "pendiente";
                else if ($row["status"] == 1)
                    $row["status_str"] = "aprobada";
                else if ($row["status"] == 2)
                    $row["status_str"] = "inactiva";

                $guias[] = $row;
            }

            return json_encode($guias);
        }

        public function cargar_guia($post)
        {
            $query = $this->db->prepare("select * from Lista_Todas where codigo=:codigo order by id desc");

            $query->execute(array(
                ":codigo" => $post["codigo"]
            ));

            $gs = $query->fetchAll();
            $guias = array();

            foreach ($gs as $g)
            {
                $row = $g;
                // Guardo los ID
                $row["entregada_por_id"] = $row["entregada_por"];
                $row["profesor_id"] = $row["profesor"];
                $row["recibida_por_id"] = $row["recibida_por"];
                $carrera = $this->obtener_carrera_desde_materia($g['materia']);
                $row["carrera_id"] = $carrera['id'];
                $row["carrera_nombre"] = $carrera['nombre'];

                // Reemplazo por los valores de la foranea
                $row["entregada_por"] = $this->cargar_profesor($row["profesor"]);
                $row["profesor"] = $this->cargar_profesor($row["profesor"]);
                $row["recibida_por"] = $this->cargar_personal_($row["recibida_por"]);

                if ($row["status"] == -1)
                    $row["status_str"] = "rechazada";
                else if ($row["status"] == 0)
                    $row["status_str"] = "pendiente";
                else if ($row["status"] == 1)
                    $row["status_str"] = "aprobada";
                else if ($row["status"] == 2)
                    $row["status_str"] = "inactiva";

                $guias[] = $row;
            }

            return json_encode($guias[0]);
        }

        public function agregar_guia($post)
        {
            try 
            {
                $id_prof = -1;

                if ($post['nuevo_prof'] != null)
                {
                    $p = array(
                        "nombre" => $post['nuevo_prof']['nombre'],
                        "apellido" => $post['nuevo_prof']['apellido'],
                        "snombre" => isset($post['nuevo_prof']['snombre']) ? $post['nuevo_prof']['snombre'] : null,
                        "sapellido" => isset($post['nuevo_prof']['sapellido']) ? $post['nuevo_prof']['sapellido'] : null,
                        "cedula" => isset($post['nuevo_prof']['cedula']) ? $post['nuevo_prof']['cedula'] : null,
                        "tlfs" => isset($post['nuevo_prof']['tlfs']) ? $post['nuevo_prof']['tlfs'] : null,
                        "email" => isset($post['nuevo_prof']['email']) ? $post['nuevo_prof']['email'] : null
                    );

                    $this->agregar_profesor($p);

                    $q = $this->db->prepare("select id from Profesor order by id desc limit 1");
                    $q->execute();

                    $id_prof = $q->fetchAll();
                    $id_prof = $id_prof[0]['id'];
                }
                else
                    $id_prof = $post['profesor'];

                if ($id_prof == -1)
                {
                    echo "Error (id_profesor)";
                    return;
                }

                $query = $this->db->prepare("call agregar_guia(:titulo, :seccion, :comentario, :pdf, :profesor, :materia, :entregada_por, :recibida_por, :nro_hojas, :nro_paginas, :tipo)");

                $query->execute(array(
                    ":titulo" => $post['titulo'],
                    ":seccion" => $post['seccion'],
                    ":comentario" => isset($post['comentario']) ? $post['comentario'] : null,
                    ":pdf" => $post['pdf'],
                    ":profesor" => $id_prof,
                    ":materia" => $post['materia'],
                    ":entregada_por" => $post['entregada_por'],
                    ":recibida_por" => $post['recibida_por'],
                    ":nro_hojas" => $post['hojas'],
                    ":nro_paginas" => $post['paginas'],
                    ":tipo" => isset($post['tipo']) ? $post['tipo'] : null
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function agregar_profesor($post)
        {
            try 
            {
                $query = $this->db->prepare("call agregar_profesor(:nombre, :snombre, :apellido, :sapellido, :cedula, :tlfs, :email)");

                $query->execute(array(
                    ":nombre" => $post['nombre'],
                    ":apellido" => $post['apellido'],
                    ":snombre" => isset($post['snombre']) ? $post['snombre'] : null,
                    ":sapellido" => isset($post['sapellido']) ? $post['sapellido'] : null,
                    ":cedula" => isset($post['cedula']) ? $post['cedula'] : null,
                    ":tlfs" => isset($post['tlfs']) ? $post['tlfs'] : null,
                    ":email" => isset($post['email']) ? $post['email'] : null
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function agregar_dependencia($post)
        {
            try 
            {
                $query = $this->db->prepare("insert into Dependencia (nombre) values (:nombre)");

                $query->execute(array(
                    ":nombre" => $post['nombre']
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function agregar_carrera($post)
        {
            try 
            {
                $query = $this->db->prepare("call agregar_carrera(:nombre, :tipo)");

                $query->execute(array(
                    ":nombre" => $post['nombre'],
                    ":tipo" => $post['tipo']
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function agregar_materia($post)
        {
            try 
            {
                $query = $this->db->prepare("call agregar_materia(:nombre, :carrera, :periodo)");

                $query->execute(array(
                    ":nombre" => $post['nombre'],
                    ":carrera" => $post['carrera'],
                    ":periodo" => $post['periodo']
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function agregar_personal($post)
        {
            try 
            {
                $query = $this->db->prepare("
                    insert into Personal (nombre, segundo_nombre, apellido, segundo_apellido, cedula, telefono, email, usuario, contrasena, fecha_creado)
                    values (:nombre, :snombre, :apellido, :sapellido, :cedula, :telefono, :email, :usuario, :contrasena, now())
                ");

                $query->execute(array(
                    ":nombre" => $post['nombre'],
                    ":apellido" => $post['apellido'],
                    ":snombre" => $post['snombre'],
                    ":sapellido" => $post['sapellido'],
                    ":cedula" => $post['cedula'],
                    ":telefono" => $post['telefono'],
                    ":email" => $post['email'],
                    ":usuario" => $post['usuario'],
                    ":contrasena" => $post['contrasena']
                ));

                $uid = $this->db->lastInsertId();

                // Añado los permisos
                for ($i = 0; $i < strlen($post['permisos']); $i++)
                {
                    $query = $this->db->prepare("
                        insert into Permiso_Asignado (permiso, usuario)
                        values (:pid, :uid)
                    ");

                    $query->execute(array(
                        ":pid" => $post['permisos'][$i],
                        ":uid" => $uid
                    ));
                }

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function editar_personal($post)
        {
            try 
            {
                $query = $this->db->prepare("
                    update Personal set 
                        nombre=:nombre,
                        segundo_nombre=:snombre,
                        apellido=:apellido,
                        segundo_apellido=:sapellido,
                        cedula=:cedula,
                        telefono=:telefono,
                        email=:email,
                        usuario=:usuario,
                        contrasena=:contrasena
                    where id=:id
                ");

                $query->execute(array(
                    ":nombre" => $post['nombre'],
                    ":apellido" => $post['apellido'],
                    ":snombre" => $post['snombre'],
                    ":sapellido" => $post['sapellido'],
                    ":cedula" => $post['cedula'],
                    ":telefono" => $post['telefono'],
                    ":email" => $post['email'],
                    ":usuario" => $post['usuario'],
                    ":contrasena" => $post['contrasena'],
                    ":id" => $post['id']
                ));

                // Borro los permisos
                $query = $this->db->prepare("
                    delete from Permiso_Asignado where usuario=:uid
                ");

                $query->execute(array(
                    ":uid" => $post['id']
                ));

                // Añado los permisos
                for ($i = 0; $i < strlen($post['permisos']); $i++)
                {
                    $query = $this->db->prepare("
                        insert into Permiso_Asignado (permiso, usuario)
                        values (:pid, :uid)
                    ");

                    $query->execute(array(
                        ":pid" => $post['permisos'][$i],
                        ":uid" => $post['id']
                    ));
                }

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function eliminar_pdf($pdf)
        {
            $query = $this->db->prepare("
                update Guia set pdf=null where pdf=:pdf
            ");

            $query->execute(array(
                ":pdf" => $pdf
            ));
        }

        public function cambiar_estado($post)
        {
            $query = $this->db->prepare("
                call cambiar_estado_guia(:status, :codigo);
            ");

            $query->execute(array(
                ":status" => $post['status'],
                ":codigo" => $post['codigo']
            ));

            return "ok";
        }

        public function modificar_guia($post)
        {
            try 
            {
                $query = $this->db->prepare("call modificar_guia(:codigo, :titulo, :seccion, :comentario, :pdf, :profesor, :materia, :entregada_por, :recibida_por, :nro_hojas, :nro_paginas)");

                $query->execute(array(
                    ":codigo" => $post['codigo'],
                    ":titulo" => $post['titulo'],
                    ":seccion" => $post['seccion'],
                    ":comentario" => isset($post['comentario']) ? $post['comentario'] : null,
                    ":pdf" => $post['pdf'],
                    ":profesor" => $post['profesor'],
                    ":materia" => $post['materia'],
                    ":entregada_por" => $post['entregada_por'],
                    ":recibida_por" => $post['recibida_por'],
                    ":nro_hojas" => $post['hojas'],
                    ":nro_paginas" => $post['paginas']
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }

        public function registrar_vista_guia($username, $archivo, $resultado, $errores)
        {
            try 
            {
                $query = $this->db->prepare("
                    insert into Log_Vista_Guias (fecha, username, resultado, errores, archivo)
                    values (now(), :username, :resultado, :errores, :archivo)
                ");

                $query->execute(array(
                    ":username" => $username,
                    ":resultado" => $resultado,
                    ":errores" => $errores,
                    ":archivo" => $archivo
                ));

                return "ok";
            }
            catch (Exception $e)
            {
                return "error";
            }
        }
        
	}
?>