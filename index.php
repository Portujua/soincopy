<!DOCTYPE html>
<html ng-app="soincopy">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta charset="utf-8">
		<link id="favicon" rel="shortcut icon" href="favicon.ico">
		<meta http-equiv='cleartype' content='on'>

		<!--<base href="/soincopy/">-->

		<meta name="description" content="">
		<meta name='keywords' content=''>
		<meta name='copyright' content=''>
		<meta name='language' content='ES'>
		<meta name='robots' content=''>
		<meta name='Classification' content='Business'>
		<meta name='author' content='Eduardo Lorenzo, ejlorenzo19@gmail.com'>
		<meta name='rating' content='General'>
		<meta name='revisit-after' content='7 days'>
		<meta name='subtitle' content=''>
		<meta name='target' content='all'>

		<title id="website_title">SoinCopy</title>

		<script type="text/javascript" src="js/version.js"></script>

		<?php
			$folder_includes = array('./css/', './js/lib/first/', './js/', './js/lib/', './js/services/', './js/directives/', './js/controllers/');

			foreach ($folder_includes as $folder)
			{
				$files = array_diff(scandir($folder), array('.', '..'));

				echo '<!-- '.strtoupper(str_replace(array('.', '/'), '', $folder)).' Includes -->';

				foreach ($files as $f)
				{
					$ext = explode('.', $f);
					$ext = $ext[count($ext) - 1];

					$path = $folder . $f;

					if ($ext == 'css')
						echo '<link rel="stylesheet" type="text/css" href="'.$path.'" />';
					elseif ($ext == 'js')
						echo '<script type="text/javascript" src="'.$path.'"></script>';
				}

				echo '<!-- End '.strtoupper(str_replace(array('.', '/'), '', $folder)).' Includes -->';
			}
		?>
	</head>

	<body>
		<div class="container-fluid" ng-controller="MainController">
			<div ng-include="'views/navbar.html'" ng-show="loginService.isLoggedIn()"></div>

			<div class="alertas"></div>

			<div class="animacionNgView" ng-view style="margin-left: -15px;"></div>
		</div>
	</body>
</html>