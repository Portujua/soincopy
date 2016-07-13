<?php
	@session_start();

	include_once("databasehandler.php");
	$dbh = new DatabaseHandler();

	$log_username = "Sin especificar";
	$log_archivo = "Sin especificar";
	$log_resultado = "Sin especificar";
	$log_errores = "";

	$base = "../../soincopy_files/guias/";

	if (isset($_GET['u']) && isset($_GET['f']))
	{
		$log_username = $_GET['u'];
		$log_archivo = $_GET['f'];

		if (file_exists($base . $_GET['f']))
			if (isset($_SESSION['login_username']) && isset($_SESSION['login_time']))
			{
				if ($_SESSION['login_username'] == $_GET['u'] && !$dbh->session_expired())
				{
					header('Content-Type: application/pdf');
					$fp = fopen($base . $_GET['f'], "rb");
					$fsize = filesize($base . $_GET['f']);
					$contents = fread($fp, $fsize);

					echo $contents;

					$log_resultado = "ok";

					$dbh->registrar_vista_guia($log_username, $log_archivo, $log_resultado, $log_errores);
					die();
				}
			}
	}
	
	echo "Usuario: " . (isset($_GET['u']) ? $_GET['u'] : 'Sin especificar') . "<br/>";
	echo "Archivo: " . (isset($_GET['f']) ? $_GET['f'] : 'Sin especificar') . "<br/>";
	echo "<h2>Acceso denegado.</h2>";

	$log_resultado = "Acceso denegado";

	if (!isset($_GET['u']))
	{
		echo "Error #1</br>";
		$log_errores .= "1";
	}
	if (!isset($_GET['f']))
	{
		echo "Error #2</br>";
		$log_errores .= "2";
	}
	if (!file_exists($base . $_GET['f']))
	{
		echo "Error #3</br>";
		$log_errores .= "3";
	}
	if (!isset($_SESSION['login_username']))
	{
		echo "Error #4</br>";
		$log_errores .= "4";
	}
	if (!isset($_SESSION['login_time']))
	{
		echo "Error #5</br>";
		$log_errores .= "5";
	}
	if ($dbh->session_expired())
	{
		echo "Error #6: La sesión ha expirado</br>";
		$log_errores .= "6";
	}

	$dbh->registrar_vista_guia($log_username, $log_archivo, $log_resultado, $log_errores);
	die();
?>