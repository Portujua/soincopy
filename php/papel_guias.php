<?php
	if (!isset($_GET['pedido'])) 
		die();

	include_once("databasehandler.php");
	$dbh = new DatabaseHandler();
	$pedido = json_decode($dbh->cargar_todos_pedidos(array("pedido" => $_GET['pedido'])), true);

?>
<style type="text/css">
	* {
		font-family: 'Verdana';
		font-size: 13px;
	}

	p {
		margin: 3px 0px;
	}
</style>

<div style="width: 200px;">
	
	<center><?php echo $pedido['fecha_anadida']; ?></center>
	<p>Pedido #<?php echo $pedido['id']; ?></p>
	<p>Cliente: <?php echo $pedido['cliente_nombre']; ?></p>

<?php
	foreach ($pedido['productos'] as $p)
	{
		if (preg_match("/Guía \"(.+)\" \(Código: (.+)\) \[(.+) hojas\]/", $p['producto_nombre'], $matches))
		{
			if (isset($_GET['check']))
			{
				echo json_encode(array('result' => true));
				die();
			}

			echo "<p>#".$matches[2]." - ".$matches[3]." - ".intval($p['copias'] * $p['originales'])."</p>";
		}
	}

	if (isset($_GET['check']))
	{
		echo json_encode(array('result' => false));
		die();
	}
?>

</div>