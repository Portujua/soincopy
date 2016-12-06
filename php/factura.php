<?php
	if (!isset($_GET['factura']))
		die();

	require_once("databasehandler.php");
	$dbh = new DatabaseHandler();

	$factura = $dbh->cargar_factura($_GET);
	$iva = floatval($factura['iva']) / floatval($factura['total']);
?>

<style type="text/css">
	.factura {
		display: inline-block;
		width: 68mm;
		border: 1px solid black;
		padding: 5px 1mm;
	}

	.fecha {
		font-size: 10px;
	}

	.producto {
		width: 100%;
		float: left;
		height: 25px;
	}

	.nombre_producto {
		font-size: 10px;
		text-align: left;
		max-width: 60%;
		float: left;
		height: 25px;
	}

	.costo_producto {
		font-size: 10px;
		text-align: right;
		max-width: 30%;
		float: right;
		height: 25px;
	}
</style>

<div class="factura">
	<center class="fecha"><?php echo $factura["fecha"]; ?></center>
	<center>Factura #<?php echo $factura["nro_factura"]; ?></center>
	<center><?php echo $factura["cliente"]; ?></center>
	<hr>
	<?php foreach ($factura['productos'] as $p): ?>
		<div class="producto">
			<div class="nombre_producto">
				<?php echo $p['producto_nombre']; ?>
				<strong>
					x <?php echo $p['copias'] * $p['originales']; ?> unidad(es)
				</strong>
			</div>
			<div class="costo_producto">Bs. <?php echo number_format(floatval($p['costo_unitario_facturado']) / (1.00 + $iva), 2, ",", ""); ?></div>
		</div>
	<?php endforeach; ?>
	<hr>
	<p style="text-align: right; font-size: 11px; font-weight: bold;">
		Subtotal Bs. <?php echo number_format($factura['subtotal'], 2, ",", ""); ?>
	</p>
	<p style="text-align: right; font-size: 11px; font-weight: bold;">
		IVA 12% Bs. <?php echo number_format($factura['iva'], 2, ",", ""); ?>
	</p>
	<p style="text-align: right; font-size: 11px; font-weight: bold;">
		Total Bs. <?php echo number_format($factura['total'], 2, ",", ""); ?>
	</p>
</div>