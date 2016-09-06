		var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_categories = "/agrupador-actividad/"
		var gobAbiertoAPI_evento = "?evento_id=1"
		var formatJson = "&format=json";

		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_evento+formatJson,
			success: handleData
		});
		function handleData(data) {
			$.each(data.results, function(i, category) {
				var imageToUse = "img/default-event.png";
				if(category.imagen.thumbnail != undefined){
					imageToUse = category.imagen.thumbnail.replace(/^http:\/\//i, 'https://');
				}
				$('#groups-menu').append('<div class="row" style="margin-top:5px; margin-left:5px;"><li><a href="agrupador.html#agr-'+category.id+'"><div class="col-xs-3"><div class="circle-image-li" style="background-image: url('+imageToUse+');"></div></div><div class="col-xs-9">'+category.nombre+'</div></a></li></div>');				
			});
		}
	