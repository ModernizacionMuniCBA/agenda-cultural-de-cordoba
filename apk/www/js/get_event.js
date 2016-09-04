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
// 			console.log(data);
			
			$('#event-name').html(data.titulo);	
			$(document).prop('title', data.titulo);
			$('#event-date').html(dateFormat(data.inicia, "dddd dd 'de' mmmm"));
			$('#event-time').html(dateFormat(data.inicia, "h:MM TT"));
			$('#event-location').html(data.lugar.nombre);
			$('#event-info').html(data.descripcion);
			
			$.each(data.tipos, function(i, tipo) {
				$('#tags').append(tipo.nombre+' ');
			});
			if (data.imagen != null){
				$('#event-image').css("background-image", "url(/"+data.imagen+")");
			}
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;

// 			console.log(height);
// 			console.log($('.event-date-time').outerHeight(true));
			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true)/2);
			bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			$('body').css('padding-top', bottom);
		}
		$(window).on('resize', function(){
			var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
// 			console.log(height);
// 			console.log($('.event-date-time').outerHeight(true));
			$('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			$('.img-holder').css('height', $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true)/2);
			var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			$('body').css('padding-top', bottom);

		});