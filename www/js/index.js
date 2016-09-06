
var uuid_analytics = "UA-79840006-1";

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

var app = {
    // Application Constructor
    initialize: function() {
        this.addLog("Initialize");
        var uuid = (undefined === device) ? 'ru237287a121a73r82' : device.uuid;
        ga('create', uuid_analytics, {'storage': 'none','clientId': uuid});    
        ga('set','checkProtocolTask', null); //just for mobile phonegap application
        ga('set','checkStorageTask',null);
        ga('send', 'pageview', {'page': '/agenda-de-la-feria/app-home'}); 
        this.addLog("initialize 2");
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
        this.addLog("onDeviceReady 1");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        
        console.log('Received Event: ' + id);
    },
    fullLog: "",
    addLog: function(txt){
        this.fullLog += "<br />" + txt;
    }
};



// detectar si estamos dentro de la app o no
var inCordova = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

if (inCordova) {
    app.initialize();
    }
else 
    {
    ga('create', uuid_analytics, 'auto');
    }

// para llamar desde la app movil, sino va como auto
window.touchAnalytics = function(page, title){
    app.addLog("touchAnalytics " + page + " -- " + title);
    ga('send', 'pageview', {'page': page,'title': title});
  };