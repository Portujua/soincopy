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

function refresh_selectpicker()
{
	$('.selectpicker').selectpicker('refresh');
	setTimeout("refresh_selectpicker()", 1000);
	console.log("Refresheando")
}

//refresh_selectpicker();

Array.prototype.contains = function(obj){
	var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.containsObject = function(search, key) {
	for (var i = 0; i < this.length; i++) {
        if (this[i][key].toUpperCase().indexOf(search.toUpperCase()) != -1) {
            return true;
        }
    }
    
    return false;
}