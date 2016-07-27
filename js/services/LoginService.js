(function(){
	angular.module("soincopy").factory('LoginService', function($http, $location, AlertService){
		var current_user = null;

		return {
			isLoggedIn: function(){ 
				return current_user != null; 
			},
			logout: function(){
				$http.get("php/unset.php").then(function(){
					window.location.reload();
				});
			},
			login: function(loginData){
				var promise =  $http({
					method: 'POST',
					url: "php/run.php?fn=login", 
					data: $.param({username:loginData.username, password:loginData.password}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})

				promise.then(function(obj){
					console.log(obj)

					var data = obj.data;

					if (data.error)
						AlertService.showError("Usuario o contraseña inválida");
					else
					{
						current_user = data;
				        $location.path("/inicio");
					}
				});

				return promise;
			},
			getCurrentUser: function(){
				return current_user;
			},
			menuGuias: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.anadir_guias || current_user.buscar_guias || current_user.modificar_guias;
			},
			menuOrdenes: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.anadir_orden || current_user.ver_ordenes_web;
			},
			menuPensum: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.plandeestudios_agregar || current_user.plandeestudios_buscar || current_user.plandeestudios_modificar;
			},
			menuAdminPersonal: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.personal_ver || current_user.personal_agregar || current_user.personal_editar || current_user.personal_deshabilitar;
			},
			menuAdminProfesores: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.profesores_agregar || current_user.profesores_editar || current_user.profesores_deshabilitar;
			},
			menuAdminCarreras: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.carreras_agregar || current_user.carreras_editar || current_user.carreras_deshabilitar;
			},
			menuAdminMaterias: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.materias_agregar || current_user.materias_editar || current_user.materias_deshabilitar;
			},
			menuAdminDepartamentosUCAB: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.dptoucab_agregar || current_user.dptoucab_editar || current_user.dptoucab_deshabilitar;
			},
			menuAdminDependencias: function(){
				if (!this.isLoggedIn()) return false;

				return current_user.dependencias_agregar || current_user.dependencias_editar || current_user.dependencias_deshabilitar;
			},
			menuAdmin: function(){
				if (!this.isLoggedIn()) return false;

				return this.menuAdminPersonal() || this.menuAdminProfesores() || this.menuAdminCarreras() || this.menuAdminMaterias() || this.menuAdminDepartamentosUCAB() || this.menuAdminDependencias();
			},
		};
	})
}());