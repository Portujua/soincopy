(function(){
	angular.module("soincopy").factory('AlertService', function($timeout){
		var time = 5000;
		var fadeTime = 500;

		return {
			setTime: function(t){
				time = t;
			},
			setFadeTime: function(t){
				fadeTime = t;
			},
			showError: function(text){
				var aid = Math.floor(Math.random() * 100);

				$(".alertas").append('<div role="alert" class="alert alert-danger" id="a'+aid+'">'+text+'</div>');

				$timeout(function(){
					$("#a" + aid).fadeOut(fadeTime);
				}, time);
			},
			showInfo: function(text){
				var aid = Math.floor(Math.random() * 100);

				$(".alertas").append('<div role="alert" class="alert alert-info" id="a'+aid+'">'+text+'</div>');

				$timeout(function(){
					$("#a" + aid).fadeOut(fadeTime);
				}, time);
			},
			showSuccess: function(text){
				var aid = Math.floor(Math.random() * 100);

				$(".alertas").append('<div role="alert" class="alert alert-success" id="a'+aid+'">'+text+'</div>');

				$timeout(function(){
					$("#a" + aid).fadeOut(fadeTime);
				}, time);
			}
		};
	})
}());