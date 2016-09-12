Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

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
		if (window.cordova) {
			var share_url = "https://modernizacionmunicba.github.io/feria-del-libro/www/evento.html#act-"+actividad;
		}else{
			var share_url = "https://modernizacionmunicba.github.io/feria-del-libro/www/evento.html%23act-"+actividad;
		}

		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+actividad+formatJson,
			success: handleData
		});
		var start_date = new Date();
		var end_date = new Date().addHours(1);
		var event_notes = "";
		var event_location = "";
		function handleData(data) {
// 			console.log(data);
			start_date = new Date(dateFormat(data.inicia, "mmmm dd, yyyy h:MM TT"));
			end_date = new Date(dateFormat(data.inicia, "mmmm dd, yyyy h:MM TT")).addHours(1);
			$('#event-name').html(data.titulo);	
			page_title = data.titulo;
			$(document).prop('title', data.titulo);
			$('#event-date').html(dateFormat(data.inicia, "dddd dd 'de' mmmm"));
			$('#event-time').html(dateFormat(data.inicia, "h:MM TT"));
			$('#event-location').html(data.lugar.nombre);
			event_location = data.lugar.nombre;
			$('#event-info').html(data.descripcion);
			event_notes = data.descripcion;
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
			if (data.imagen.original != undefined){
				$('#event-image').css("background-image", "url("+data.imagen.original.replace(/^http:\/\//i, 'https://')+")");
			}
			if (data.agrupador.imagen.original != undefined){

				$('#esp-image').css("background-image", "url("+data.agrupador.imagen.original.replace(/^http:\/\//i, 'https://')+")");
			}
			$('#event-esp-link').attr('href', 'agrupador.html#agr-'+data.agrupador.id);
			$('#event-esp-txt').append("<p>"+data.agrupador.nombre+"</p>");

			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;

			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			$('body').css('padding-top', bottom);
			$('#loading').hide();
		}
		$(window).on('resize', function(){
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);

			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			$('body').css('padding-top', bottom);

		});