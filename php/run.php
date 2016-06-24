<?php
	require_once("databasehandler.php");
	$dbh = new DatabaseHandler();

	$fn = strval($_GET['fn']);
	echo $dbh->$fn($_POST);
?>