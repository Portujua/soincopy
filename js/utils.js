$(document).on("click", ".scroll_top", function() {
	// No animado
	$(window).scrollTop(0);

	// Animado
	/*var body = $("html, body");
	body.stop().animate({scrollTop:0}, '250', 'swing', function() {});*/
});

function cambiarZIndex()
{
	var z = $(".bg_naranja").css("z-index");

	if (z == "auto" || z == "0")
		$(".bg_naranja").css("z-index", "-1");
	else
		$(".bg_naranja").css("z-index", "0");
}

function fixTwitter()
{
	if ($(".twitter-timeline").contents().find(".TweetAuthor-name").length > 0)
	{
		$(".twitter-timeline").contents().find(".TweetAuthor-name").css("color","white");
		$(".twitter-timeline").contents().find(".timeline-Tweet-text").css("color","white");
	}
	else
		setTimeout("fixTwitter()", 100);
}

fixTwitter();



function check_sesion()
{
	if (location.hash.indexOf("login") == -1)
		$.ajax({
		    url: "php/check_sesion.php",
		    type: "POST",
		    data: {},
		    beforeSend: function(){},
		    success: function(data){
		        if (data == "1")
		        {
		        	location.reload();
		        }
		    }
		});

	setTimeout("check_sesion()", 5000);
}

check_sesion();