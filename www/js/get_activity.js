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
			var share_url = "https://modernizacionmunicba.github.io/agenda-cultural-de-cordoba/www/actividad.html#act-"+actividad;
		}else{
			var share_url = "https://modernizacionmunicba.github.io/agenda-cultural-de-cordoba/www/actividad.html%23act-"+actividad;
		}

		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+actividad+formatJson,
			success: handleData,
            error: handleError,
		});
		var start_date = new Date();
		var event_notes = "";
		var event_location = "";
		function handleError(){
			$('.event-date').hide();
			$('#event-esp').hide();
      $('.evento-img-cont').hide();
			$('#event-info').html('Este evento ya no se encuentra disponible');
      var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true)-10;
      $('body').css('padding-top', bottom);
      $('#loading').hide();
		}
		function handleData(data) {
// 			console.log(data);
			start_date = new Date(dateFormat(data.inicia, "mmmm dd, yyyy h:MM TT"));
      $('#event-date-start').html("Inicia: "+dateFormat(data.inicia, "d 'de' mmm, h:MM TT"));
      if(data.termina != null){
			     end_date = new Date(dateFormat(data.termina, "mmmm dd, yyyy h:MM TT"));
           $('#event-date-end').html("Finaliza: "+dateFormat(data.termina, "d 'de' mmm, h:MM TT"));
      }
			$('#event-name').html(data.titulo);
			page_title = data.titulo;
			$("meta[property='og\\:title']").attr("content", page_title);
			$(document).prop('title', data.titulo);


      $.each(data.tipos, function(i, tag) {
        $('.event-tags').append('<span class="tag">'+tag.nombre+'</span>');
      });

      $('#event-location').html(data.lugar.nombre);
			// $('#event-location').html('<a href="http://www.google.com/maps/place/'+data.lugar.latitud+','+data.lugar.longitud+'">'+data.lugar.nombre+'</a>');
			event_location = data.lugar.nombre;
			$('#event-info').html(data.descripcion);
			event_notes = data.descripcion;

      if (data.imagen != undefined ){
        var event_image = data.imagen.original.replace(/^http:\/\//i, 'https://');
      }else{
        var event_image = "img/default-event.png";
      }
      $('.evento-img-cont').css('background-image', "url("+event_image+")");

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
			// if (data.imagen.original != undefined){
			// 	$('#event-image').css("background-image", "url("+data.imagen.original.replace(/^http:\/\//i, 'https://')+")");
			// }
			// if (data.agrupador.imagen.original != undefined){
      //
			// 	$('#esp-image').css("background-image", "url("+data.agrupador.imagen.original.replace(/^http:\/\//i, 'https://')+")");
			// }
			// $('#event-esp-link').attr('href', 'agrupador.html#agr-'+data.agrupador.id);
			// $('#event-esp-txt').append("<p>"+data.agrupador.nombre+"</p>");

      var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true)-20;
			$('body').css('padding-top', bottom);
			$('#loading').hide();
		}
		$(window).on('resize', function(){
      var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true)-20;
			$('body').css('padding-top', bottom);
		});
