
var uuid_analytics = "UA-79840006-1";

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var uuid = (undefined === device) ? 'ru237287a121a73r82' : device.uuid;
        ga('create', uuid_analytics, {'storage': 'none','clientId': uuid});    
        ga('set','checkProtocolTask', null); //just for mobile phonegap application
        ga('set','checkStorageTask',null);
        ga('send', 'pageview', {'page': '/agenda-de-la-feria/app-home'}); 
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



// detectar si estamos dentro de la app o no
var inCordova = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

if (inCordova) {
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", "cordoba.js");
    document.getElementsByTagName("head")[0].appendChild(fileref);

    app.initialize();

    }
else 
    {
    ga('create', uuid_analytics, 'auto');
    }

// para llamar desde la app movil, sino va como auto
window.touchAnalytics = function(page, title){
    ga('send', 'pageview', {'page': page,'title': title});
  };