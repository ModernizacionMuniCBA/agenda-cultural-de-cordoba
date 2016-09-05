var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var gobAbiertoAPI_evento = "?evento_id=1"
		var formatJson = "&format=json";
		var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true)+5;
		$('body').css('padding-top', bottom);
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_evento+formatJson,
			success: handleData
		});
		function handleData(data) {
			$.each(data.results, function(i, item) {
				if(item.inicia != null){
		 			var event_date_aux = new Date(item.inicia);
		 			var now = new Date();
		 			if(event_date_aux > now ){
			 			if (item.image != undefined ){
				 			var event_image = item.image.thumbnail;	
			 			}else{
				 			var event_image = "img/default-event.png";
			 			}
			 			$('#event-list').append('<div class="row evento"><a href="evento.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3 col-sm-1"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
		 			}
	 			}
			});
			$('#loading').hide();

		}

			$(window).on('resize', function(){
				var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true)+10;
				$('body').css('padding-top', bottom);
			});