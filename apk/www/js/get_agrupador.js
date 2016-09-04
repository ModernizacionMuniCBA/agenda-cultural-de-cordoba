var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
// 		var dataType = "?agrupador_id=";
		var formatJson = "&format=json";
		var actividad = '';
		var url = document.location.toString();
		if (url.match('#')) {
			var string = url.split('#')[1];
			if (string.split('-')[0] == "agr"){
				var dataType = "?agrupador_id=";
			}else{
				var dataType = "?tipo_id=";
			}
			actividad = string.split('-')[1];
		}
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+dataType+actividad+formatJson,
			success: handleData
		});
		function handleData(data) {
// 			console.log(data);
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
			 			$('#event-list').append('<div class="row evento"><a href="evento.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
		 			}
	 			}
			});
			console.log(data.results[0]);
			$('#event-name').html(data.results[0].agrupador.nombre);	
			$(document).prop('title', data.results[0].agrupador.nombre);
			if (data.results[0].agrupador.imagen.thumbnail != undefined){
				$('#event-image').css("background-image", "url("+data.results[0].agrupador.imagen.thumbnail+")");
			}
			$('#loading').hide();
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			$('body').css('padding-top', $('.foreground').outerHeight(true)+10);
		}
		$(window).on('resize', function(){
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			$('body').css('padding-top', $('.foreground').outerHeight(true)+10);

		});