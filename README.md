# Agenda cultural de la Ciudad de Córdoba
Aplicacion web/mobile con la agenda cultural de la Ciudad.  

Ya disponible en el [market de Android](https://play.google.com/store/apps/details?id=ar.gob.cordoba.gobiernoabierto.agendacultural).    
Puede verse tambien [vía web](https://modernizacionmunicba.github.io/agenda-cultural-de-cordoba) desde mobile.  

100% HTML5/JS con llamadas al [API de eventos de la Municipalidad de Córdoba](https://gobiernoabierto.cordoba.gob.ar/api/).  
Se usa como [web](https://modernizacionmunicba.github.io/agenda-cultural-de-cordoba/) y embebida vía [Cordova](https://cordova.apache.org/) a aplicación Android.

Los datos están estructurados como:
 - Eventos: Agrupador principal. 
 - Agrupador: Grupo de eventos relacionados.
 - Actividades: Cada actividad en particular. Se pueden buscar por tipos, disciplinas o lugares. 

Los datos sobre las llamadas API para cada objetos estan en [este documento](https://docs.google.com/document/d/1VuhbKmbkRHFx0L2HRRUuWv1HWqfk2LyCPOHAlIgq05g)

## De HTML5 a APK vía Cordova

Instalar [android-sdk-linux](https://developer.android.com/studio/index.html).   

Instalar cordova, crear el entorno y agregarle la plataforma Android cómo salida.  

```
npm install -g cordova
# ir al directorio donde quiero poner mi app
cordova create agendacultural
cordova platform add android
```

Colocar el html en la carpeta _www_ que se creó en el entorno. Asegurarse de usar los metas y JS de _cordova_.  
El que define las políticas de seguridad es importante.  
```
<meta http-equiv="Content-Security-Policy" 
        content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' https://gobiernoabierto.cordoba.gob.ar; 
                    style-src 'self' 'unsafe-inline';
                    media-src *; 
                    script-src 'self' https://gobiernoabierto.cordoba.gob.ar;
                    font-src 'self' https://fonts.gstatic.com">
```

Antes de probar la app asegurarse de definir las variables de entorno.
En linux
```
export ANDROID_HOME=/<installation location>/android-sdk-linux
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

Compilar sin firma para el market y tener un APK para probar en el teléfono.  
```
cordova build android
```

Para probar la app en una maquina virtual. Requiere instalar mas de 1GB en repos y maquinas virtuales.  
Se requerirá android-sdk-tools, android-build-tools, java8 (la de Oracle, OpenJDK para no funcionar) y muchas otras cosas.  
No es necesario, el APK ya es funcional

```
cordova run agendacultural
```
 
Para compilar con las llaves necesarias y [firmar para el market de android](https://developer.android.com/studio/publish/app-signing.html).  

```
#Solo una vez, crear la llave
keytool -genkey -v -keystore agenda-cultural.keystore -alias AgendaCultural -keyalg RSA -keysize 2048 -validity 10000
cordova build android --release
# queda en platforms/android/build/outputs/apk/android-release-unsigned.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore agenda-cultural-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk AgendaCultural

# borrar el anterior comppilado
rm platforms/android/build/outputs/apk/AgendaCultural-release.apk

# revisar el path de zipalign uno por cada version del sdk, em mi caso _android-sdk-linux/build-tools/23.0.3/zipalign_   
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/AgendaCultural-release.apk
```

### Instrucciones para compilar y publicar

Cambiar el número de versión y otros detalles en config.xml.  


### Plugins y permisos

Usa el plugin [SocialSharing](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin) que requiere permisos de escritura ya que según indica
```
For sharing remote images (or other files) on Android, the file needs to be stored locally first, so add this permission to AndroidManifest.xml
```