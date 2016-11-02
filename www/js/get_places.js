		var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_categories = "/lugar-actividad/"
		var gobAbiertoAPI_audiencia = "?audiencia_id=4"
		var formatJson = "&format=json";
// https://gobiernoabierto.cordoba.gob.ar/api/tipo-actividad/?audiencia_id=4
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_audiencia+formatJson,
			success: handleData
		});
		function handleData(data) {
			$.each(data.results, function(i, category) {
				$('#places-menu').append('<div class="row" style="margin-top:5px; margin-left:5px;"><li><a href="filtro.html#lugar-'+category.id+'"><div class="col-xs-3"><div class="circle-image-li" style="background-image: url(img/default-event-sq.png);"></div></div><div class="col-xs-9">'+category.nombre+'</div></a></li></div>');
			});
		}
