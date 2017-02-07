<?php
	if (!isset($_GET['factura']))
		die();

	require_once("databasehandler.php");
	$dbh = new DatabaseHandler();

	$factura = $dbh->cargar_factura($_GET);
	$iva = floatval($factura['iva']) / floatval($factura['total']);
?>

<style type="text/css">
	* {
		font-family: "Segoe UI";
	}

	.factura {
		display: inline-block;
		width: 68mm;
		padding: 5px 1mm;
	}

	.fecha {
		font-size: 10px;
	}

	.producto {
		width: 100%;
		float: left;
		height: 25px;
		margin-bottom: 10px;
	}

	.nombre_producto {
		font-size: 11px;
		text-align: left;
		max-width: 80%;
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
	<center><strong>SENIAT</strong></center>
	<center style="font-size: 13px;">Corporación Soincopy, C.A.</center>
	<center style="font-size: 11px;">Av. Principal de Montalbán Edif. UCAB, módulo 4</center>
	<center style="font-size: 11px;">piso PB. local-Urb. Montalbán. Zona Postal 1020</center>
	<center style="font-size: 11px;">Teléfono: (0212) 4712038 / 4074133</center>
	<span style="font-size: 11px;">RIF: J-31214470-0</span><br/>
	<span style="font-size: 11px;"><?php echo $factura["fecha"]; ?> <?php echo $factura["hora"]; ?>&nbsp;&nbsp;&nbsp;&nbsp;COO: 173339 <strong>Factura: <?php echo $factura["nro_factura"]; ?></strong></span><br>
	<center style="font-size: 13px;">-------Datos del Consumidor-------</center>
	<span style="font-size: 12px;">NOMBRE: <?php echo $factura["cliente"]; ?></span><br>
	<span style="font-size: 12px;">RIF: <?php echo $factura["cliente_ni"]; ?></span><br>
	<hr>
	<center><strong>FACTURA</strong></center>
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
		IVA <?php echo intval($factura['iva_usado'] * 100); ?>% Bs. <?php echo number_format($factura['iva'], 2, ",", ""); ?>
	</p>
	<p style="text-align: right; font-size: 11px; font-weight: bold;">
		Total Bs. <?php echo number_format($factura['total'], 2, ",", ""); ?>
	</p>
</div>