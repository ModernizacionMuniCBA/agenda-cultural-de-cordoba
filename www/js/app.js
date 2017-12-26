var app = angular.module("appCultura", ['ngSanitize']);

app.controller("ctrlListaActividades", ["$scope", "$http", "$location", "$window", function($scope, $http, $location, $window) {


  var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
  var gobAbiertoAPI_actividades = "/actividad-publica/";
  var gobAbiertoAPI_audiencia = "?audiencia_id=4";
  var page_eventos = "&page=";
  var pageNumber = getParameterByName('page');
  if (pageNumber == null){
    pageNumber = 1;
  }
  var page_size_str = "&page_size=";
  var formatJson = "&format=json";


  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.today.setHours(23, 59, 59, 99);
  $scope.today= $scope.today.toISOString();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.tomorrow.setHours(23, 59, 59, 99);
  $scope.tomorrow= $scope.tomorrow.toISOString();



  $scope.getActividades = function (urlGobAbierto) {
    $http.get(urlGobAbierto)
      .then(function(response) {
          $scope.actividades = response.data.results;
          $scope.cant =  $scope.actividades.length;
          $scope.siguiente = response.data.next;
          $scope.anterior = response.data.previous;
          if($scope.siguiente != null){
            $scope.siguienteAct = '';
          }else{
            $scope.siguienteAct = 'disabled';
          }
          if($scope.anterior != null){
            $scope.anteriorAct = '';
          }else{
            $scope.anteriorAct = 'disabled';
          }
          $("#loading").hide();
      }, function errorCallback(response) {
          console.log('Error al conectar!')
      });
  };
  $scope.resetFilter = function () {
  //
  //   $('.circleFa').hide();
  //   $scope.tituloFilter1 = "Próximas";
  //   $scope.tituloFilter2 = "Actividades";
  //   $scope.getActividades(gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+page_eventos+pageNumber+page_size_str+pageSize+formatJson);
  //
    $window.location.reload();
  }


  $scope.filterActividades = function (filterType, eventoID, nombreFiltro) {
    $("#myNavmenu").offcanvas('hide');
    $scope.getActividades(gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+'&'+filterType+'_id='+eventoID+page_eventos+pageNumber+page_size_str+pageSize+formatJson);
    $scope.tituloFilter1 = "Todo";
    $scope.tituloFilter2 = nombreFiltro;
    $('.circleFa').show();
  };


  $scope.textSearch ='';
  $scope.getSearchResults = function() {
    console.log($scope.textSearch);
    $scope.getActividades(gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+'&q='+$scope.textSearch+page_eventos+pageNumber+page_size_str+pageSize+formatJson);
    $(".searchField").removeClass('show');
    $scope.tituloFilter1 = "Resultados de ";
    $scope.tituloFilter2 = $scope.textSearch;
    $('.circleFa').show()
  };

  $scope.getAnteriores = function() {
    $scope.getActividades($scope.anterior);
  };

  $scope.getSiguientes = function() {
    $scope.getActividades($scope.siguiente);
  };

  var searchObject = $location.search().q;
  console.log(searchObject);
  if(searchObject != undefined){
    $scope.getActividades(gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+'&q='+searchObject+page_eventos+pageNumber+page_size_str+pageSize+formatJson);
    $(".searchField").removeClass('show');
    $scope.tituloFilter1 = "Resultados de ";
    $scope.tituloFilter2 = searchObject;
    $('.circleFa').show()
  }else{
    var url = $location.hash();
    if(url != ''){
      var filterType = url.split('-')[0];
      var idFiltro = url.split('-')[1].split('?')[0];
      $scope.getActividades(gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+'&'+filterType+'_id='+idFiltro+page_eventos+pageNumber+page_size_str+pageSize+formatJson);
      $scope.tituloFilter1 = "Todo ";
      var urlGobAbiertoHash;
      if(filterType == 'evento'){
        urlGobAbiertoHash = gobAbiertoAPI+'/eventos-publicos/'+idFiltro;
      }else{
        urlGobAbiertoHash = gobAbiertoAPI+'/'+filterType+'-actividad/'+idFiltro;
      }
      $http.get(urlGobAbiertoHash)
        .then(function(response) {
            $scope.resultado = response.data;
            $scope.tituloFilter2 = $scope.resultado.nombre;
        }, function errorCallback(response) {
            console.log('Error al conectar!')
        });

    }else{

      $('.circleFa').hide();
      $scope.tituloFilter1 = "Próximas";
      $scope.tituloFilter2 = "Actividades";
      $scope.getActividades(gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+page_eventos+pageNumber+page_size_str+pageSize+formatJson);

    }
  }





}]);


app.controller("ctrlMenu", ["$scope", "$http", "$location", "$window", function($scope, $http, $location, $window) {

  $scope.textSearch ='';
  $scope.getSearchResults = function() {
    console.log($scope.textSearch);
    $window.location.href = 'index.html#!?q='+$scope.textSearch;
  };



}]);


app.controller("actividadController", ["$scope", "$http" , "$location", "$filter", function($scope, $http, $location, $filter) {
  var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
  var gobAbiertoAPI_actividad = "/actividad-publica/";
  var url = $location.hash();
  var page_title;
  if(url != ''){
    var idActividad = url.split('-')[1].split('?')[0];
    $http.get(gobAbiertoAPI+gobAbiertoAPI_actividad+idActividad)
      .then(function(response) {
          $scope.actividad = response.data;
          page_title = $scope.actividad.titulo;
          console.log($scope.actividad);
          if (window.cordova) {
      			var share_url = "https://modernizacionmunicba.github.io/agenda-cultural-de-cordoba/www/actividad.html#actID-"+idActividad;
      		}else{
      			var share_url = "https://modernizacionmunicba.github.io/agenda-cultural-de-cordoba/www/actividad.html%23actID-"+idActividad;
      		}

        $("#share").attr("href", url);
        $('#share-icons').append('<a href="http://twitter.com/share?url='+share_url+'&text='+page_title+'" target="_blank" class="share-btn twitter">Twitter</a>');
        $('#share-icons').append('<a href="http://www.facebook.com/sharer/sharer.php?u='+share_url+'" target="_blank" class="share-btn facebook">Facebook</a>');
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          $('#share-icons').append('<a href="whatsapp://send?text='+page_title+' '+share_url+'" target="_blank" class="share-btn whatsapp">Whatsapp</a>');
        }

        $scope.addToCalendar = function() {
          var startDate  = new Date($scope.actividad.inicia);
          var endDate =  new Date($scope.actividad.termina);
          var title = page_title;
          var location = $scope.actividad.lugar.nobre;
          var notes = $scope.actividad.descripcion;
          var success = function(message) { alert("Evento agregado con éxito."); };
          var error = function(message) { alert("Error al agregar el evento."); };
          // create (the only function also supported on Android for now)

          window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
        };

        $scope.shareActivity = function() {
          event.preventDefault();
          var options = {
            message: page_title, // not supported on some apps (Facebook, Instagram)
            url: share_url,
            chooserTitle: 'Elegí una app' // Android only, you can override the default share sheet title
          }
          var onSuccess = function(result) {
    				  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    				  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
          }

          var onError = function(msg) {
    				  console.log("Sharing failed with message: " + msg);
          }

          window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        };

      }, function errorCallback(response) {
          console.log('Error al conectar!')
      });


  }

}]);


app.controller("ctrlListaEventos", ["$scope", "$http", function($scope, $http) {
  var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
  var gobAbiertoAPI_categories = "/eventos-publicos/";
  var gobAbiertoAPI_audiencia = "?audiencia_id=4";

  var formatJson = "&format=json";

  $http.get(gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_audiencia+formatJson)
    .then(function(response) {
        $scope.eventos = response.data.results;
        $scope.cant =  $scope.eventos.length;
    }, function errorCallback(response) {
        console.log('Error al conectar!')
    });
}]);

app.controller("ctrlListaCategorias", ["$scope", "$http", function($scope, $http) {
  var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
  var gobAbiertoAPI_categories = "/tipo-actividad/";
  var gobAbiertoAPI_audiencia = "?audiencia_id=4";

  var formatJson = "&format=json";

  $http.get(gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_audiencia+formatJson)
    .then(function(response) {
        $scope.categorias = response.data.results;
        $scope.cant =  $scope.categorias.length;
    }, function errorCallback(response) {
        console.log('Error al conectar!')
    });
}]);

app.controller("ctrlListaDisciplinas", ["$scope", "$http", function($scope, $http) {
  var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
  var gobAbiertoAPI_categories = "/disciplina-actividad/";
  var gobAbiertoAPI_audiencia = "?audiencia_id=4";

  var formatJson = "&format=json";

  $http.get(gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_audiencia+formatJson)
    .then(function(response) {
        $scope.disciplinas = response.data.results;
        $scope.cant =  $scope.disciplinas.length;
    }, function errorCallback(response) {
        console.log('Error al conectar!')
    });
}]);

app.controller("ctrlListaLugares", ["$scope", "$http", function($scope, $http) {
  var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
  var gobAbiertoAPI_categories = "/lugar-actividad/";
  var gobAbiertoAPI_audiencia = "?audiencia_id=4";

  var formatJson = "&format=json";

  $http.get(gobAbiertoAPI+gobAbiertoAPI_categories+gobAbiertoAPI_audiencia+formatJson)
    .then(function(response) {
        $scope.lugares = response.data.results;
        $scope.cant =  $scope.lugares.length;
        // $("#loading").hide();
    }, function errorCallback(response) {
        console.log('Error al conectar!')
    });
}]);
