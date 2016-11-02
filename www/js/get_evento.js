var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var formatJson = "&format=json";
// 		var gobAbiertoAPI_evento = "&evento_id=1"
		var gobAbiertoAPI_audiencia = "&audiencia_id=4"
		var actividad = '';

		var page_eventos = "&page=";
		var pageNumber = getParameterByName('page');
		if (pageNumber == null){
			pageNumber = 1;
		}
		var page_size_str = "&page_size=";

		var url = document.location.toString();
		if (url.match('#')) {
			var string = url.split('#')[1];
			if (string.split('-')[0] == "evt"){
				var dataType = "evento";
			}else if (string.split('-')[0] == "tipo"){
				var dataType = "tipo";
			}else if(string.split('-')[0] == "dsp"){
				var dataType = "disciplina";
			}else{
				var dataType = "lugar";
			}
			actividad = string.split('-')[1].split('?')[0];

		}
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+"?"+dataType+"_id="+actividad+page_eventos+pageNumber+page_size_str+pageSize+gobAbiertoAPI_audiencia+formatJson,
			success: handleData
		});
		// console.log(gobAbiertoAPI+gobAbiertoAPI_actividades+"?"+dataType+"_id="+actividad+page_eventos+pageNumber+page_size_str+pageSize+gobAbiertoAPI_audiencia+formatJson);
		function handleData(data) {
// 			console.log(data);
			$.each(data.results, function(i, item) {
				if(item.inicia != null){
		 			var event_date_aux = new Date(item.inicia);
		 			if (item.image != undefined ){
				 		var event_image = item.image.original.replace(/^http:\/\//i, 'https://');
			 		}else{
				 		var event_image = "img/default-event.png";
			 		}
					// 	$('#event-list').append('<div class="row evento"><a href="evento.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3 col-sm-1"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
					$('#event-list').append('<a href="actividad.html#act-'+item.id+'" class="evento"><div class="row evento-card"><div class="col-xs-3 act-card-img"><div class="evento-img-cont no-margin-img" style="background-image: url('+event_image+');"></div></div><div class="col-xs-9"><span class="event-title">'+item.titulo+'</span><br/><span class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</span></div></div></a><div class="row"><div class="event-divider"></div></div>');


	 			}
			});
			var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
			if (data.previous != null){
				var prevPage = getParameterByName('page', data.previous);
				if (prevPage == null){
					prevPage = 1;
				}
				htmlPrvNxt += '<li class="previous"><a href="evento.html#'+string.split('?')[0]+'?page='+prevPage+'" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
			}
			if (data.next != null){
				var nextPage = getParameterByName('page', data.next);
				htmlPrvNxt += '<li class="next"><a href="evento.html#'+string.split('?')[0]+'?page='+nextPage+'" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
			}
			htmlPrvNxt += '</div>'
			if(data.previous != null || data.next != null){
				$('#event-list').append(htmlPrvNxt);
			}

			if(data.results[0] != undefined){
				if (dataType == "tipo"){
					$.each(data.results[0].tipos, function(i, tipo) {
						if(tipo.id == actividad){
							$('.navmenu-brand').html(tipo.nombre);
							$(document).prop('title', tipo.nombre);
						}
					});
				}else if (dataType == "lugar"){
					$('.navmenu-brand').html(data.results[0].lugar.nombre);
					$(document).prop('title', data.results[0].lugar.nombre);
				}else if (dataType == "disciplina"){
					$.each(data.results[0].disciplinas, function(i, disciplina) {
						if(disciplina.id == actividad){
							$('.navmenu-brand').html(disciplina.nombre);
							$(document).prop('title', disciplina.nombre);
						}
					});
				}

			}else{
				$('#event-list').append('No se encontraron actividades');
			}
			$('#loading').hide();
			var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true);
			$('body').css('padding-top', bottom);
		}
		if (dataType == "evento"){
			$.ajax({
				dataType: "json",
				url: gobAbiertoAPI+"/eventos-publicos/"+actividad+"?format=json",
				success: handleDataEvento
			});
			function handleDataEvento(data) {
					$('.navmenu-brand').html(data.nombre);
					$(document).prop('title', data.nombre);
			}
			var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true);
			$('body').css('padding-top', bottom);
		}

		$(window).on('resize', function(){
			var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true);
			$('body').css('padding-top', bottom);
		});
