(function(){
	angular.module("soincopy").factory('LoginService', function($http, $location, AlertService, $localStorage, $interval){
		if (typeof $localStorage.user == 'undefined')
			delete $localStorage.idle_time;

		$localStorage.session_time = 300;
		$localStorage.idle_time = $localStorage.idle_time ? $localStorage.idle_time : 0;

		window.onmousemove = function(){ $localStorage.idle_time = 0; };
		window.onkeypress = function(){ $localStorage.idle_time = 0; };

		$localStorage.now_key = Math.random();

		return {
			isLoggedIn: function(){
				return typeof $localStorage.user != 'undefined';
			},
			logout: function(){
				$http.get("php/unset.php").then(function(){
					delete $localStorage.user;
					window.location.reload();
				});
			},
			updateSessionTime: function(){
				$http.get("php/run.php?fn=actualizar_hora_sesion");
			},
			login: function(loginData){
				$http({
					method: 'POST',
					url: "php/run.php?fn=login", 
					data: $.param({username:loginData.username, password:loginData.password}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function(obj){
					console.log(obj)
					var data = obj.data;
					if (data.error)
						AlertService.showError("Usuario o contraseña inválida");
					else
					{
						$localStorage.user = data;
						$localStorage.user.password = loginData.password;
						$localStorage.session_key = $localStorage.now_key ? $localStorage.now_key : Math.random();
				        $location.path("/inicio");
					}
				});
			},
			getCurrentUser: function(){
				return $localStorage.user;
			},
			startTimer: function(){
				var loginService = this;

				$interval(function(){
					if ($localStorage.user.username == "root") return;
					
					$localStorage.idle_time++;

					if ($(".jconfirm").length == 0)
						if (
							($localStorage.idle_time > $localStorage.session_time && loginService.isLoggedIn()) || 
							($localStorage.now_key != $localStorage.session_key && window.location.hash.indexOf("login") == -1)
							)
						{
							$localStorage.now_key = $localStorage.session_key;

							$.confirm({
								title: "Confirmar contraseña",
								content: '<p>Has estado un tiempo inactivo o bien has refrescado la página, por favor introduce tu clave de nuevo para desbloquear el sistema.</p><div class="form-group"><input autofocus type="password" id="password" placeholder="Contraseña" class="form-control"></div>',
								keyboardEnabled: true,
								backgroundDismiss: false,
								confirm: function(){
									var pwd = this.$b.find("input").val();
									
									if (pwd != $localStorage.user.password)
										loginService.logout();
									else
										loginService.updateSessionTime();
								},
								cancel: function(){
									loginService.logout();
								}
							});
						}
				}, 1000)
			},
			resetIdle: function(){
				window.onmousemove = function(){ console.log("Movio!"); $localStorage.idle_time = 0; };
				window.onkeypress = function(){ console.log("Movio!"); $localStorage.idle_time = 0; };
			},
			menuGuias: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.anadir_guias || $localStorage.user.buscar_guias || $localStorage.user.modificar_guias;
			},
			menuOrdenes: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.anadir_orden || $localStorage.user.ver_ordenes_web;
			},
			menuPensum: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.plandeestudios_agregar || $localStorage.user.plandeestudios_buscar || $localStorage.user.plandeestudios_modificar;
			},
			menuAdminPersonal: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.personal_ver || $localStorage.user.personal_agregar || $localStorage.user.personal_editar || $localStorage.user.personal_deshabilitar;
			},
			menuAdminProfesores: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.profesores_agregar || $localStorage.user.profesores_editar || $localStorage.user.profesores_deshabilitar;
			},
			menuAdminCarreras: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.carreras_agregar || $localStorage.user.carreras_editar || $localStorage.user.carreras_deshabilitar;
			},
			menuAdminMaterias: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.materias_agregar || $localStorage.user.materias_editar || $localStorage.user.materias_deshabilitar;
			},
			menuAdminDepartamentosUCAB: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.dptoucab_agregar || $localStorage.user.dptoucab_editar || $localStorage.user.dptoucab_deshabilitar;
			},
			menuAdminDependencias: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return $localStorage.user.dependencias_agregar || $localStorage.user.dependencias_editar || $localStorage.user.dependencias_deshabilitar;
			},
			menuAdmin: function(){
				if (!this.isLoggedIn()) return false;

				if ($localStorage.user.username == "root") return true;

				return this.menuAdminPersonal() || this.menuAdminProfesores() || this.menuAdminCarreras() || this.menuAdminMaterias() || this.menuAdminDepartamentosUCAB() || this.menuAdminDependencias();
			},
		};
	})
}());