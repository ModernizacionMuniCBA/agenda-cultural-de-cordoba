var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
var gobAbiertoAPI_actividades = "/actividad-publica/"
var gobAbiertoAPI_audiencia = "&audiencia_id=4"
var formatJson = "&format=json";
var search = getParameterByName('search');
var page_eventos = "&page=";
var pageNumber = getParameterByName('page');
if (pageNumber == null) {
    pageNumber = 1;
}
var page_size_str = "&page_size=";
$("#searched-string").html(search);
$.ajax({
    dataType: "json",
    url: gobAbiertoAPI + gobAbiertoAPI_actividades + "?q=" + search + page_eventos + pageNumber + page_size_str + pageSize + gobAbiertoAPI_audiencia + formatJson,
    success: handleData
});

function handleData(data) {
    if (data.count != 0) {
        $.each(data.results, function(i, item) {
            if (item.inicia != null) {
                var event_date_aux = new Date(item.inicia);
                if (item.image != undefined) {
                    var event_image = item.image.original.replace(/^http:\/\//i, 'https://');
                } else {
                    var event_image = "img/default-event.png";
                }
                $('#event-list').append('<a href="actividad.html#act-' + item.id + '" class="evento"><div class="row evento-card"><div class="col-xs-3 act-card-img"><div class="evento-img-cont no-margin-img" style="background-image: url(' + event_image + ');"></div></div><div class="col-xs-9"><span class="event-title">' + item.titulo + '</span><br/><span class="event-date">' + dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT") + '</span></div></div></a><div class="row"><div class="event-divider"></div></div>');
            }
        });
    } else {
        $('#event-list').append('No se encontraron actividades.');
    }
    var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
    if (data.previous != null) {
        var prevPage = getParameterByName('page', data.previous);
        if (prevPage == null) {
            prevPage = 1;
        }
        htmlPrvNxt += '<li class="previous"><a href="search.html?search=' + search + '&page=' + prevPage + '" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
    }
    if (data.next != null) {
        var nextPage = getParameterByName('page', data.next);
        htmlPrvNxt += '<li class="next"><a href="search.html?search=' + search + '&page=' + nextPage + '" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
    }
    htmlPrvNxt += '</div>'
    $('#event-list').append(htmlPrvNxt);
    var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true);
    $('body').css('padding-top', bottom);
    $('#loading').hide();

}

$(window).on('resize', function() {
    var bottom = $('.navbar-feria').position().top + $('.navbar-feria').outerHeight(true);
    $('body').css('padding-top', bottom);
});
