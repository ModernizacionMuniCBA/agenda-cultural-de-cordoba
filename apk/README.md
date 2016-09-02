# HTML5 => app en Cordova

Instalar [android-sdk-linux](https://developer.android.com/studio/index.html).   

Instalar cordova y crear el entorno

```
npm install -g cordova
# ir al directorio
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

Probar la app

```
cordova run feriadellibro
```



### Instrucciones para compilar y publicar

Cambiar el número de versión y otros detalles en config.xml.  



