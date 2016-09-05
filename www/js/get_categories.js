		var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_categories = "/tipo-actividad/"
		var formatJson = "?format=json";

		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_categories+formatJson,
			success: handleData
		});
		function handleData(data) {
			$.each(data.results, function(i, category) {
				$('#categories-menu').append('<div class="row" style="margin-top:5px; margin-left:5px;"><li><a href="#tipo-'+category.id+'"><div class="col-xs-3"><div class="circle-image-li" style="background-image: url(img/default-event.png);"></div></div><div class="col-xs-9">'+category.nombre+'</div></a></li></div>');
			});
		}