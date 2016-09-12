var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var formatJson = "?format=json";
		var actividad = '';
		var url = document.location.toString();
		var page_title = "";
		if (url.match('#')) {
			var string = url.split('#')[1];
			actividad = string.split('-')[1];
		}
		var share_url = "https://modernizacionmunicba.github.io/feria-del-libro/www/evento.html%23act-"+actividad;

		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+actividad+formatJson,
			success: handleData
		});
		function handleData(data) {
// 			console.log(data);
			
			$('#event-name').html(data.titulo);	
			page_title = data.titulo;
			$(document).prop('title', data.titulo);
			$('#event-date').html(dateFormat(data.inicia, "dddd dd 'de' mmmm"));
			$('#event-time').html(dateFormat(data.inicia, "h:MM TT"));
			$('#event-location').html(data.lugar.nombre);
			$('#event-info').html(data.descripcion);
			$("#share").attr("href", url);
			$('#share-icons').append('<a href="http://twitter.com/share?url='+share_url+'&text='+page_title+'" target="_blank" class="share-btn twitter">Twitter</a>');
			$('#share-icons').append('<a href="http://www.facebook.com/sharer/sharer.php?u='+share_url+'" target="_blank" class="share-btn facebook">Facebook</a>');
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$('#share-icons').append('<a href="whatsapp://send?text='+page_title+' '+share_url+'" target="_blank" class="share-btn whatsapp">Whatsapp</a>');
			}
			var totalTipos = data.tipos.length;
			$.each(data.tipos, function(i, tipo) {
				$('#tags').append('<a href="agrupador.html#tipo-'+tipo.id+'">'+tipo.nombre+'</a>');
				if(i!=totalTipos-1){
					$('#tags').append(' | ');
				}
			});
			if (data.imagen.thumbnail != undefined){
				$('#event-image').css("background-image", "url("+data.imagen.thumbnail.replace(/^http:\/\//i, 'https://')+")");
			}
			if (data.agrupador.imagen.thumbnail != undefined){
// 				console.log(data.agrupador.imagen.thumbnail);
				$('#esp-image').css("background-image", "url("+data.agrupador.imagen.thumbnail.replace(/^http:\/\//i, 'https://')+")");
			}
			$('#event-esp-link').attr('href', 'agrupador.html#agr-'+data.agrupador.id);
			$('#event-esp-txt').append("<p>"+data.agrupador.nombre+"</p>");

			// if (data.organizador.imagen.thumbnail != undefined){
			// 	$('#event-org').append("<img src='"+data.organizador.imagen.thumbnail.replace(/^http:\/\//i, 'https://')+"' class='img-responsive' />");
			// }
			// $('#event-org').append("<p>"+data.organizador.nombre+"</p>");
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;

// 			console.log(height);
// 			console.log($('.event-date-time').outerHeight(true));
			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			$('body').css('padding-top', bottom);
			$('#loading').hide();
		}
		$(window).on('resize', function(){
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
// 			console.log(height);
// 			console.log($('.event-date-time').outerHeight(true));
			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			$('body').css('padding-top', bottom);

		});