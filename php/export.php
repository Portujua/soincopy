<?php
	require_once("databasehandler.php");
	$dbh = new DatabaseHandler();

	if (!isset($_GET['t']))
		die();

	function array_to_csv_download($array, $filename = "export.csv", $delimiter=";")
    {
        header('Content-Type: application/csv; charset=utf-8');
        header('Content-Disposition: attachement; filename="'.$filename.'";');

        $f = fopen('php://output', 'w');

        foreach ($array as $line) {
            fputcsv($f, $line, $delimiter);
        }
    }

	if ($_GET['t'] == "productos")
		array_to_csv_download($dbh->csv_productos(), "productos.csv");

	if ($_GET['t'] == "inventario")
		array_to_csv_download($dbh->csv_inventario(), "inventario.csv");

	if ($_GET['t'] == "reporte_pedidos")
		array_to_csv_download($dbh->csv_reporte_pedidos(), "reporte_pedidos.csv");
?>