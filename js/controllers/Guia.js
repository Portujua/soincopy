(function(){
	var Guia = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService, LoginService, $localStorage, $interval)
	{		
		$scope.safeApply = function(fn) {
		    var phase = this.$root.$$phase;
		    if(phase == '$apply' || phase == '$digest') {
		        if(fn && (typeof(fn) === 'function')) {
		          fn();
		        }
		    } else {
		       this.$apply(fn);
		    }
		};

		$scope.buscar_status = 0;
		$scope.estaAnadiendo = window.location.hash.indexOf('agregarguia') != -1;

		$scope.estados = [
			{
				val: 0,
				nombre: "Pendientes"
			},
			{
				val: 1,
				nombre: "Aprobadas"
			},
			{
				val: -1,
				nombre: "Rechazadas"
			},
			{
				val: 2,
				nombre: "Inactivas"
			}
		];

		$scope.periodos = ["1er", "2do", "3er", "4to", "5to", "6to", "7mo", "8vo", "9no", "10mo"];

		SoincopyService.getCarreras($scope);
		SoincopyService.getProfesores($scope);
		SoincopyService.getPersonal($scope);

		$scope.init_form_cache = function(){
			if (!$scope.guia && $localStorage.cache.guia)
				$scope.guia = $localStorage.cache.guia;

			$interval(function(){
				if ($scope.guia)
					$localStorage.cache.guia = $scope.guia;
			}, 3000);
		}

		$scope.ver_pdf = function(url){
			window.open(
				"php/pdf.php?u=" + LoginService.getCurrentUser().username +
				"&f=" + url,
				"_blank",
				"menubar=no,status=no,toolbar=no");
		}

		$scope.cargar_tipos = function(){
			$.ajax({
			    url: "api/guias/tipos",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.tipos = $.parseJSON(data);
			        	$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
			        })
			    }
			});
		}

		$scope.cargar_materias = function(){
			try 
			{
				var cid = $scope.guia.carrera_id ? $scope.guia.carrera_id : $scope.guia.carrera;
				SoincopyService.getMaterias($scope, cid);
				$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 1000);
			}
			catch(ex)
			{
				$timeout($scope.cargar_materias, 200);
			}
		}

		$scope.cargar_guias = function(){
			SoincopyService.getGuias($scope, $scope.buscar_status);
		}

		$scope.cargar_guias_web = function(){
			SoincopyService.getGuiasWeb($scope);

			$timeout($scope.cargar_guias_web, 5000);
		}

		$scope.cargar_guia = function(){
			$scope.guia = null;

			var codigo = $scope.modificar_codigo;

			$.ajax({
			    url: "api/guia/" + codigo,
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.guia = $.parseJSON(data);
			        	$scope.guia_aux = $.parseJSON(data);
			        	$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
			        })
			    }
			});
		}

		$scope.eliminar_pdf = function(){
			$.confirm({
				title: '¡ATENCIÓN!',
				content: '¿Está seguro que desea eliminar el PDF?<br/><strong>ADVERTENCIA: UNA VEZ ELIMINADO NO PODRÁ RECUPERARSE</strong><br/><br/><p>Confirme su contraseña para proceder</p><div class="form-group"><input autofocus type="password" id="password" placeholder="Contraseña" class="form-control"></div>',
				keyboardEnabled: true,
				confirm: function(){
					var pwd = this.$b.find("input").val();

					if (pwd != $localStorage.user.password)
					{
						$.alert({
							title: 'Error',
							content: 'Contraseña inválida'
						});
						return;
					}

					var pdf = $scope.guia.pdf;

					$.ajax({
					    url: "php/carga.php?action=delete",
					    type: "POST",
					    data: {file:pdf},
					    beforeSend: function(){},
					    success: function(data){
					        if (data == "ok")
					        {
					        	$scope.safeApply(function(){
					        		$scope.guia.pdf = null;
					        		$scope.upload_progress = 0;
					        	})
					        }
					        else
					        {
					        	alert("Ha ocurrido un error eliminando el archivo.");
					        	console.log(data);
					        }
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.subir_pdf = function(){
			var file = $(':file')[0].files;

			if (file.length == 0)
			{
				alert("Debe seleccionar un archivo");
				return;
			}

			if (file.length > 1)
			{
				alert("Debe seleccionar solo un archivo");
				return;
			}

			file = file[0];

			if (file.type != "application/pdf")
			{
				alert("Solo se admiten archivos PDF");
				return;
			}

			if (file.size > 100 * 1024 * 1024)
			{
				alert("Este archivo excede el tamaño máximo de archivo (100 MB)");
				return;
			}

			var formData = new FormData();
    		formData.append(file.name, file);

    		$scope.upload_progress = 1;

			$.ajax({
			    url: "php/carga.php?action=upload",
			    type: "POST",
			    data: formData,
			    processData: false,
			    dataType: 'json',
			    contentType: false,
			    beforeSend: function(){
			    	$scope.safeApply(function(){
		    			$scope.upload_progress = 1;
		    		});

		    		$(".progress-bar").addClass("progress-bar-striped").addClass("active");
			    },
			    uploadProgress: function(event, position, total, percentComplete) {
			    	console.log(event, position, total, percentComplete)
					$scope.safeApply(function(){
						$scope.upload_progress = percentComplete;
					})
				},
			    success: function(data){},
			    complete: function(r){
			    	var json = $.parseJSON(r.responseText);

			    	if (json.success)
			    	{
			    		$(".progress-bar").removeClass("progress-bar-striped").removeClass("active");

			    		$scope.safeApply(function(){
			    			$scope.upload_progress = 100;

			    			if (!$routeParams.codigo)
			    			{
				    			$scope.agregarguia_pdf = json.pdf;
				    			$scope.agregarguia_paginas = json.pages;
				    			$scope.agregarguia_hojas = Math.floor(json.pages / 2) + (json.pages % 2);
			    			}
			    			else
			    			{
			    				$scope.guia.pdf_ = json.pdf;
				    			$scope.guia.numero_paginas = json.pages;
				    			$scope.guia.numero_hojas = Math.floor(json.pages / 2) + (json.pages % 2);
			    			}
			    		})
			    	}
			    }
			});
		}

		$scope.cambiar_estado = function(s, id){
			var codigo = id ? id : $scope.guia.codigo;

			var msj = "";

			if (s == -1)
				msj = "¿Está seguro que desea rechazar esta guía?";
			else if (s == 1)
				msj = "¿Está seguro que desea aprobar esta guía?";
			else if (s == 2)
				msj = "¿Está seguro que desea deshabilitar esta guía?";

			$.confirm({
				title: "Confirmar acción",
				content: msj,
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=cambiar_estado",
					    type: "POST",
					    data: {status:s, codigo:codigo},
					    beforeSend: function(){},
					    success: function(data){
					        if (data == "ok")
					        {
					        	$scope.safeApply(function(){
					        		if (id)
					        			$scope.cargar_guias();

					        		if (s == -1)
					        		{
					        			AlertService.showSuccess("La guía ha sido rechazada con éxito");

					        			if ($scope.guia)
					        				$scope.guia.status_str = "rechazada";
					        		}
					        		else if (s == 1)
					        		{
					        			AlertService.showSuccess("La guía ha sido aprobada con éxito");

					        			if ($scope.guia)
					        				$scope.guia.status_str = "aprobada";
					        		}
					        		else if (s == 2)
					        		{
					        			AlertService.showSuccess("La guía ha sido deshabilitada con éxito");

					        			if ($scope.guia)
					        				$scope.guia.status_str = "inactiva";
					        		}

					        		if ($scope.guia)
					        			$scope.guia.status = s;

					        		$scope.g_ = null;
					        	})
					        }
					    }
					});
				}
			});
		}

		$scope.agregar_guia = function(){
			var post = $scope.guia;

			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir esta guía?',
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=agregar_guia",
					    type: "POST",
					    data: post,
					    dataType: "json",
					    beforeSend: function(){},
					    success: function(data){
					    	
					    	window.location = "php/imprimir_codigo_guia.php?codigo=" + data.id_guia;

					        if (data.status == "ok")
					        	$scope.safeApply(function(){
					        		$scope.guia = {};
					        		delete $localStorage.cache.guia;
					        		AlertService.showSuccess("Guía añadida con éxito");
					        		$location.path("/buscarguias");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.borrar_guia_web = function(g){
			$.ajax({
			    url: "php/run.php?fn=borrar_guia_web",
			    type: "POST",
			    data: {id:g.id, file:g.archivo},
			    beforeSend: function(){},
			    success: function(data){
			        
			    }
			});
		}

		$scope.ver_guia_web = function(g){
			$.confirm({
				title: '¡ATENCIÓN!',
				content: 'Una vez abierto el archivo se borrará del sistema y más nunca podrá acceder a el de nuevo. <strong>¿Está seguro que desea abrirlo en este momento?</strong>',
				confirm: function(){
					window.open("http://" + window.location.hostname + "/soincopy_files/guias_web/" + g.archivo);

					$timeout(function(){
						$scope.borrar_guia_web(g);
					}, 5000);
				},
				cancel: function(){}
			});
		}

		$scope.modificar_guia = function(){
			if ($scope.guia.titulo.length == 0 || $scope.guia.materia.length == 0 || $scope.guia.profesor.length == 0 || $scope.guia.seccion.length == 0 || $scope.guia.recibida_por.length == 0)
			{
				alert("Debe llenar todos los campos obligatorios");
				return;
			}

			if (parseInt($(".progress-bar").html()) != 100 && !$scope.guia.pdf)
			{
				alert("Debe cargar el archivo PDF antes de agregar la guía");
				return;
			}

			var post = {
				codigo: $scope.guia.codigo,
				titulo: $scope.guia.titulo,
				materia: $scope.guia.materia,
				profesor: $scope.guia.profesor_id,
				seccion: $scope.guia.seccion,
				comentario: $scope.guia.comentario,
				entregada_por: $scope.guia.entregada_por_id,
				recibida_por: $scope.guia.recibida_por_id,
				pdf: $scope.guia.pdf_ ? $scope.guia.pdf_ : $scope.guia.pdf,
				hojas: $scope.guia.numero_hojas,
				paginas: $scope.guia.numero_paginas
			};

			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea modificar esta guía?',
				confirm: function(){
					$.ajax({
					    url: "php/run.php?fn=modificar_guia",
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					        if (data == "ok")
					        	$scope.safeApply(function(){
					        		AlertService.showSuccess("Guía modificada con éxito");

					        		if ($scope.guia.pdf_)
					        			$scope.guia.pdf = $scope.guia.pdf_;
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.quitarAdmin = function(i){
			if (i.id != 1)
				return i;
		}

		$scope.anadir_profesor = function(){
			var nw = window.open("./#/profesores/agregar/express", "_blank", "menubar=no,status=no,toolbar=no,width=900,height=750");
			nw.onbeforeunload = function(){
				SoincopyService.getProfesores($scope);
			}
		}

		$scope.seleccionar = function(g){
			$scope.g_ = g;
		}

		if ($routeParams.codigo)
		{
			$scope.modificar_codigo = $routeParams.codigo;
			$scope.cargar_guia();
		}
	};

	angular.module("soincopy").controller("Guia", Guia);
}());