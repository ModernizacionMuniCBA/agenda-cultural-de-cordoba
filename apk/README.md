# HTML5 => app en Cordova

Instalar [android-sdk-linux](https://developer.android.com/studio/index.html).   

Instalar cordova y crear el entorno

```
npm install -g cordova
# ir al directorio donde quiero poner mi app
cordova create feriadellibro
cordova platform add android
```

Meter el html en la carpeta _www_ que se creó en el entorno. Asegurarse de usar los metas y JS de _cordova_.  
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

Compilar sin firma para el market y tener un APK para probar en el teléfono
```
cordova build android
```

Para probar la app en una maquina virtual

```
cordova run feriadellibro
```
Se requerirá android-sdk-tools, android-build-tools y muchas otras cosas.  
 
Para compilar con las llaves necesarias para validar en el market de android

#Solo una vez, crear la llave
#keytool -genkey -v -keystore appname-key.keystore -alias MyAppName -keyalg RSA -keysize 2048 -validity 10000
```
cordova build android --release
```

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /PATH/keys/appname-key.keystore /PATH/platforms/android/ant-build/MyAppName-release-unaligned.apk MyAppName 

rm /PATH/platforms/android/ant-build/MyAppName-release.apk

zipalign -v 4 /PATH/platforms/android/ant-build/MyAppName-release-unaligned.apk /PATH/platforms/android/ant-build/MyAppName-release.apk


### Instrucciones para compilar y publicar

Cambiar el número de versión y otros detalles en config.xml.  



