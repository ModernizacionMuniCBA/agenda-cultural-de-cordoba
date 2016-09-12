var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var formatJson = "&format=json";
// 		var gobAbiertoAPI_evento = "&evento_id=1"
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
			if (string.split('-')[0] == "agr"){
				var dataType = "agrupador";
			}else{
				var dataType = "tipo";
			}
			actividad = string.split('-')[1].split('?')[0];
		
		}		
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+"?"+dataType+"_id="+actividad+page_eventos+pageNumber+page_size_str+pageSize+formatJson,
			success: handleData
		});
		console.log(gobAbiertoAPI+gobAbiertoAPI_actividades+"?"+dataType+"_id="+actividad+gobAbiertoAPI_evento+page_eventos+pageNumber+page_size_str+pageSize+formatJson);
		function handleData(data) {
// 			console.log(data);
			$.each(data.results, function(i, item) {
				if(item.inicia != null){
		 			var event_date_aux = new Date(item.inicia);
		 			var now = new Date();
		 			if(event_date_aux > now ){
			 			if (item.image != undefined ){
				 			var event_image = item.image.thumbnail.replace(/^http:\/\//i, 'https://');	
			 			}else{
				 			var event_image = "img/default-event.png";
			 			}
			 			$('#event-list').append('<div class="row evento"><a href="evento.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3 col-sm-1"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
		 			}
	 			}
			});
			var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
			if (data.previous != null){
				var prevPage = getParameterByName('page', data.previous);
				if (prevPage == null){
					prevPage = 1;
				}
				htmlPrvNxt += '<li class="previous"><a href="agrupador.html#'+string.split('?')[0]+'?page='+prevPage+'" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
			}
			if (data.next != null){
				var nextPage = getParameterByName('page', data.next);
				htmlPrvNxt += '<li class="next"><a href="agrupador.html#'+string.split('?')[0]+'?page='+nextPage+'" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
			}
			htmlPrvNxt += '</div>'
			if(data.previous != null || data.next != null){
				$('#event-list').append(htmlPrvNxt);
			}
			
			if(data.results[0] != undefined){
				if(dataType == "agrupador"){
					$('#event-name').html(data.results[0].agrupador.nombre);	
					if (data.results[0].agrupador.descripcion != ''){
						$('#group-description').html(data.results[0].agrupador.descripcion);
					}else{
						$('#group-description').hide();
					}
					if (data.results[0].agrupador.imagen.thumbnail != undefined){
						$('#event-image').css("background-image", "url("+data.results[0].agrupador.imagen.thumbnail.replace(/^http:\/\//i, 'https://')+")");
					}
					if (data.results[0].agrupador.flyer != undefined){
						if (data.results[0].agrupador.flyer.original != undefined){
							$('#group-flyer').html('<img src="'+data.results[0].agrupador.flyer.original+'" class="img-responsive"/>');
						}
					}else{
						$('#group-flyer').hide();
					}
				}else{
					$.each(data.results[0].tipos, function(i, tipo) {
						if(tipo.id == actividad){
							$('#event-name').html(tipo.nombre);
							$(document).prop('title', tipo.nombre);
						}
					});		
				}
			}else{
				$('#event-list').append('No se encontraron actividades');
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