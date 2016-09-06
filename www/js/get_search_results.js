var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var gobAbiertoAPI_evento = "?evento_id=1"
		var formatJson = "&format=json";
		var search = getParameterByName('search'); 
		var page_eventos = "&page=";
		var pageNumber = getParameterByName('page'); 
		if (pageNumber == null){
			pageNumber = 1;
		}
		var page_size_str = "&page_size=";
		$("#searched-string").html(search);
		var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true)+10;
		$('body').css('padding-top', bottom);
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+"?q="+search+page_eventos+pageNumber+page_size_str+pageSize+formatJson,
			success: handleData
		});
		function handleData(data) {
			if (data.count != 0){
				$.each(data.results, function(i, item) {
					if (item.image != undefined ){
				 		var event_image = item.image.thumbnail;	
			 		}else{
				 		var event_image = "img/default-event.png";
			 		}
					$('#event-list').append('<div class="row evento"><a href="evento.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3 col-sm-1"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
				});
			}else{
			 	$('#event-list').append('No se encontraron actividades.');
		 	}
		 	var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
			if (data.previous != null){
				var prevPage = getParameterByName('page', data.previous);
				if (prevPage == null){
					prevPage = 1;
				}
				htmlPrvNxt += '<li class="previous"><a href="search.html?search='+search+'&page='+prevPage+'" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
			}
			if (data.next != null){
				var nextPage = getParameterByName('page', data.next);
				htmlPrvNxt += '<li class="next"><a href="search.html?search='+search+'&page='+nextPage+'" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
			}
			htmlPrvNxt += '</div>'
			$('#event-list').append(htmlPrvNxt);
			$('#loading').hide();

		}

			$(window).on('resize', function(){
				var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true)+10;
				$('body').css('padding-top', bottom);
			});
			