var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/";
		// var gobAbiertoAPI_evento = "?evento_id=1";
		var gobAbiertoAPI_audiencia = "?audiencia_id=4";
		var page_eventos = "&page=";
		var pageNumber = getParameterByName('page');
		if (pageNumber == null){
			pageNumber = 1;
		}
		var page_size_str = "&page_size=";
		var formatJson = "&format=json";
		// var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true)+5;
		// $('body').css('padding-top', bottom);
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+page_eventos+pageNumber+page_size_str+pageSize+formatJson,
			success: handleData
		});
		var start_date = new Date();
		$('#event-list').html('');
		function handleData(data) {
			$.each(data.results, function(i, item) {
				if(item.inicia != null){
					// 	var event_date_aux = new Date(item.inicia);
					start_date = new Date(dateFormat(item.inicia, "mmmm dd, yyyy h:MM TT"));
			 		if (item.image != undefined ){
				 		var event_image = item.image.thumbnail.replace(/^http:\/\//i, 'https://');
			 		}else{
						var event_image = "img/default-event.png";
					}
					var yourString = item.descripcion; //replace with your string.
					var maxLength = 120; // maximum number of characters to extract

					//trim the string to the maximum length
					if(yourString.length > 120 ){
						var trimmedString = yourString.substr(0, maxLength);
						trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ...";
					}else{
						var trimmedString = yourString;
					}
					if (start_date) {
						var month = dateFormat(start_date, "mmm");
						var day = dateFormat(start_date, "dd");
					} else {
						console.log("Error en la fecha " + item.inicia);
						var month = "";
						var day = "";
					}
					//re-trim if we are in the middle of a word
					// 	$('#event-list').append('<div class="row evento"><a href="actividad.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3 col-sm-1"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
					// $('#event-list').append('<div class="row"><a href="actividad.html#act-'+item.id+'"><div class="col-sm-12 act-card-holder"><div class="act-card"><div class="row"><div class="col-xs-9"><h1 class="card-title">'+item.titulo+'</h1><div class="event-divider"></div></div><div class="col-xs-3 event-date"><p>'+month+'<br/>'+day+'</p></div></div><div class="row"><div class="col-xs-3 act-card-img"><div class="evento-img-cont" style="background-image: url('+event_image+');"></div></div><div class="col-xs-9 act-card-info">'+trimmedString+'</div></div><div class="act-card-icons"><a href="actividad.html#act-'+item.id+'" class="pull-right btn vermas">Ver Más</a></div></div></div></a></div>');
					$('#event-list').append('<div class="col-xs-12 col-md-4 act-card-holder"><a href="actividad.html#act-'+item.id+'"><div class="act-card"><div class="row"><div class="col-xs-9"><h1 class="card-title">'+item.titulo+'</h1><div class="event-divider"></div></div><div class="col-xs-3 event-date"><p>'+month+'<br/>'+day+'</p></div></div><div class="row"><div class="col-xs-3 act-card-img padding-15"><div class="evento-img-cont" style="background-image: url('+event_image+');"></div></div><div class="col-xs-9 act-card-info">'+trimmedString+'</div></div><div class="act-card-icons"><a href="actividad.html#act-'+item.id+'" class="pull-right icon-act-card"><i class="material-icons">add</i></a></div></div></a></div>');

	 			}
			});
			var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
			if (data.previous != null){
				var prevPage = getParameterByName('page', data.previous);
				if (prevPage == null){
					prevPage = 1;
				}
				htmlPrvNxt += '<li class="previous"><a href="index.html?page='+prevPage+'" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
			}
			if (data.next != null){
				var nextPage = getParameterByName('page', data.next);
				htmlPrvNxt += '<li class="next"><a href="index.html?page='+nextPage+'" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
			}
			htmlPrvNxt += '</div>'
			$('#event-next').append(htmlPrvNxt);
			// var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			// var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			// $('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			// $('.img-holder').css('height', $('.foreground').outerHeight(true));
			// bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 30;
			// $('body').css('padding-top', bottom);
			$('#loading').hide();

		}

			$(window).on('resize', function(){
				// var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			// var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			// $('.fixed-img').css('height', height  + $('.li-title').outerHeight(true)/2);
			// $('.img-holder').css('height', $('.foreground').outerHeight(true));
			// bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 30;
			// $('body').css('padding-top', bottom);
			// $('#loading').hide();
			});
