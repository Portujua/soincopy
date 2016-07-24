(function(){
	angular.module("soincopy").factory('AlertService', function($timeout){
		var time = 3000;
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

				$(".alertas").append('<div role="alert" class="alert text-center alert-danger" id="a'+aid+'"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+text+'</div>');

				$timeout(function(){
					$("#a" + aid).fadeOut(fadeTime, 'swing', function(){ $(this).remove(); });
				}, time);
			},
			showInfo: function(text){
				var aid = Math.floor(Math.random() * 100);

				$(".alertas").append('<div role="alert" class="alert text-center alert-info" id="a'+aid+'"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+text+'</div>');

				$timeout(function(){
					$("#a" + aid).fadeOut(fadeTime, 'swing', function(){ $(this).remove(); });
				}, time);
			},
			showSuccess: function(text){
				var aid = Math.floor(Math.random() * 100);

				$(".alertas").append('<div role="alert" class="alert text-center alert-success" id="a'+aid+'"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+text+'</div>');

				$timeout(function(){
					$("#a" + aid).fadeOut(fadeTime, 'swing', function(){ $(this).remove(); });
				}, time);
			}
		};
	})
}());