var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var formatJson = "?format=json";
		var actividad = '';
		var url = document.location.toString();
		if (url.match('#')) {
			var string = url.split('#')[1];
			actividad = string.split('-')[1];
		}
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+actividad+'/'+formatJson,
			success: handleData
		});
		function handleData(data) {
			console.log(data);
			
			$('#event-name').html(data.titulo);	
			$(document).prop('title', data.titulo);
			var date = data.inicia.split("-");
			var curr_y = date[0];
			var curr_m = date[1];
			var date_splited = date[2].split('T');
			var curr_d = date_splited[0];
			var curr_t = date_splited[1].slice(0, -1);
 			var real_date = curr_m+'/'+curr_d+'/'+curr_y+' '+curr_t;
 			console.log(real_date);
			$('#event-date').html(dateFormat(real_date, "dddd dd 'de' mmmm, h:MM TT"));
			$('#event-location').html(data.lugar.nombre);
			$('#event-info').html(data.descripcion);
			
			$.each(data.tipos, function(i, tipo) {
				$('#tags').append('<button type="button" class="btn btn-feria inverted" id="event-category">'+tipo.nombre+'</button>')
			});
			if (data.imagen != null){
				$('#event-image').css("background-image", "url(/"+data.imagen+")");
			}
			
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			$('.fixed-img').css('height', $('.foreground').outerHeight(true));
			var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true);
			$('body').css('padding-top', bottom);
		}
		$(window).on('resize', function(){
			var bottom = $('.foreground').position().top + $('.foreground').outerHeight(true);
			$('.img-holder').css('height', $('.foreground').outerHeight(true));
			$('.fixed-img').css('height', $('.foreground').outerHeight(true));
			$('body').css('padding-top', bottom);
		});