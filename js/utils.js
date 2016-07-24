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