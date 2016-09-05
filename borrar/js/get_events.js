var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var formatJson = "?format=json";
		var actividad = '';
		var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true)+10;
				$('body').css('padding-top', bottom);
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+formatJson,
			success: handleData
		});
		function handleData(data) {
			$.each(data.results, function(i, item) {
				if(item.inicia != null){
// 					var date = item.inicia.split("-");
// 					var event_y = date[0];
// 					var event_m = date[1];
// 					var date_splited = date[2].split('T');
// 					var event_d = date_splited[0];
// 					var event_t = date_splited[1];
// 		 			var event_date = event_y+'/'+event_m+'/'+event_d+' '+event_t;
		 			var event_date_aux = new Date(item.inicia);
		 			var now = new Date();
		 			if(event_date_aux > now ){
			 			if (item.image != null ){
				 			var event_image = item.image;	
			 			}else{
				 			var event_image = "img/default-event.png";
			 			}
			 			$('#event-list').append('<div class="row evento"><a href="evento.html#act-'+item.id+'" class="evento"><div class="col-xs-12"><div class="row"><div class="col-xs-3"><div class="circle-image" style="background-image: url('+event_image+')"></div></div><div class="col-xs-9"><div class="row"><div class="col-xs-12"><h5 class="event-title">'+item.titulo+'</h5></div></div><div class="row"><div class="col-xs-12"><p class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</p></div></div></div></div></div></a></div>');
		 			}
	 			}
			});
			
			$(window).on('resize', function(){
				var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true)+10;
				$('body').css('padding-top', bottom);
			});
		}
