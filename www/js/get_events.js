var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
var gobAbiertoAPI_categories = "/eventos-publicos/"
var gobAbiertoAPI_audiencia = "?audiencia_id=4"
var formatJson = "&format=json";
$.ajax({
	dataType: "json",
	url: gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_audiencia+formatJson,
	success: handleData
});
function handleData(data) {
	$.each(data.results, function(i, category) {
		var imageToUse = "img/default-event-sq.png";
		if(category.imagen.thumbnail != undefined){
			imageToUse = category.imagen.thumbnail.replace(/^http:\/\//i, 'https://');
		}
		$('#events-menu').append('<div class="row row-li-tipo"><li><a href="filtro.html#evt-'+category.id+'"><div class="col-xs-3"><div class="circle-image-li" style="background-image: url('+imageToUse+');"></div></div><div class="col-xs-9 nombre-tipo">'+category.nombre+'</div></a></li></div>');
	});
}
