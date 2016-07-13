<?php
	require_once("databasehandler.php");
	$dbh = new DatabaseHandler();

	$dbh->actualizar_hora_sesion();

	$fn = strval($_GET['fn']);
	echo $dbh->$fn($_POST);
?>