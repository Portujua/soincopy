(function(){
	var PlanDeEstudios = function($scope, $http, $location, $routeParams, $timeout, $window){		
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

		$scope.tipos = ["Semestral", "Anual"];

		$scope.menciones = [
			{
				id: -1,
				nombre: "------ NO APLICA ------",
				estado: 1
			}
		];

		$scope.cargar_planes = function(){
			$.ajax({
			    url: "php/run.php?fn=cargar_planes_de_estudio",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.planes = $.parseJSON(data);
			        	console.log($scope.planes)
			        })
			    }
			});
		}

		$scope.cargar_carreras = function(){
			$.ajax({
			    url: "php/run.php?fn=cargar_carreras",
			    type: "POST",
			    data: {},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.carreras = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.cargar_materias = function(){
			var cid = $scope.plan.carrera;

			$.ajax({
			    url: "php/run.php?fn=cargar_materias_carrera",
			    type: "POST",
			    data: {cid:cid},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$scope.materias = $.parseJSON(data);
			        })
			    }
			});
		}

		$scope.cargar_menciones = function(){
			$scope.menciones = [
				{
					id: -1,
					nombre: "------ NO APLICA ------",
					estado: 1
				}
			];

			var cid = $scope.plan.carrera;

			$.ajax({
			    url: "php/run.php?fn=cargar_menciones_de",
			    type: "POST",
			    data: {cid:cid},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	var json = $.parseJSON(data);
			        	
			        	for (var i = 0; i < json.length; i++)
			        		$scope.menciones.push(json[i]);
			        })
			    }
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
			    url: "php/carga.php?action=upload&tipo=plan",
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

			    			$scope.plan.pdf = json.pdf;
			    			$scope.plan.paginas = json.pages;
			    			$scope.plan.hojas = Math.floor(json.pages / 2) + (json.pages % 2);
			    		})
			    	}
			    }
			});
		}

		$scope.registrar_plan = function(){
			if (parseInt($(".progress-bar").html()) != 100)
			{
				alert("Debe cargar el archivo PDF antes de agregar el plan de estudios");
				return;
			}

			var plan = $scope.plan;

			$.ajax({
			    url: "php/run.php?fn=agregar_plan_de_estudio",
			    type: "POST",
			    data: plan,
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	$location.path("/planesdeestudio");
			        })
			    }
			});
		}
	};

	angular.module("soincopy").controller("PlanDeEstudios", PlanDeEstudios);
}());