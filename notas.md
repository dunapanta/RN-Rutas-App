# Notas

## Clase 275 Instalacion Iconos

`yarn add react-native-vector-icons`
`yarn add -D @types/react-native-vector-icons`

### iOS

- abrir con Fiinder node_modules/react-native-vector-icons/Fonts
- abrir en Xcode --> ios/nombreProyecto.xcworkspace
- en Xcode clic derecho en el proyecto RNRutasApp new group llamado Fonts
- arrastro las fuentes que voy a utilizar ej Ionicons.ttf check en copy items if needed ----> Aceptar
- Abro como codigo el archivo info.plist
- antes de que termine la etiqueta `</dict>` pego

```
<key>UIAppFonts</key>
<array>
  <string>Ionicons.ttf</string>
</array>
```

`npx pod-install`

### Android

- abro archivo android/app/build.gradle
- al inicio del archivo (despues de las importaciones) pego

```
project.ext.vectoricons = [
    iconFontNames: [ 'Ionicons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

## Clase 276 Navegcion

`yarn add @react-navigation/native`
`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
`yarn add @react-navigation/stack`

`npx pod-install`

- En App en el inicio pego
  `import 'react-native-gesture-handler';`
- Tambien importo
  `import {NavigationContainer} from '@react-navigation/native';`
- Envuelvo la App con NavigationContainer

```
const App = () => {
  return (
     <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};
```

- Creo Navigator y lo utilizo en App

## Clase 277 Configuracion inicial de Permisos GPS Android

- Paquete para permisos
- https://www.npmjs.com/package/react-native-permissions
- `yarn add react-native-permissions`
- En la ruta android/app/src/main/AndroidManifest.xml
- Para permisos de localización pego

```
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

- Usando este paquete existen 5 posibilidades con los permisos `RESULTS.UNAVAILABLE`, `RESULTS.DENIED`, `RESULTS.GRANTED`, `RESULTS.LIMITED` y `RESULTS.BLOCKED`

## Clase 278 Configuracion de Permisos GPS iOS

- Es necesario ir a Podfile y despues de `target 'RNRutasApp' do` agregar lo siguiente: `permissions_path = '../node_modules/react-native-permissions/ios'`
- Pego los permisos que voy a usar

```
pod 'Permission-LocationAccuracy', :path => "#{permissions_path}/LocationAccuracy"
  pod 'Permission-LocationAlways', :path => "#{permissions_path}/LocationAlways"
  pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse"
```

- Actualizo el archivo `Info.plist` verificar que no existan copias porque aveces ya esta incluido en el archivo

```
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSLocationAlwaysUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>YOUR TEXT</string>
```

- `npx pod-install`

## Clase 279 Solicitar y Revisar Permisos

- Importo lo que necesito

```
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
```

- Pregunto Permiso Usuario

```
const checkLocationPermission = async () => {
    let permissionsStatus: PermissionStatus;
    if (Platform.OS == 'ios') {
      //permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      //preguntar po permiso
      permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      //permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    console.log({permissionsStatus});
  };
```

## Clase 290 Mapas

- https://github.com/react-native-maps/react-native-maps
- Instalacion `yarn add react-native-maps -E`
- Creo cuenta en https://developers.google.com/maps/documentation/ios-sdk/get-api-key
- Creo nuevo proyecto
- En Panel --> Habilitar API y Servicios
- Selecciono y habilito Maps SDK for Android y Maps SDK for iOS
- Clic en Credenciales
- Clic en Credenciales en la sección API y servicios
- Click CREAR CREDENCIALES ---> Clave API
- Copio API key
- Ojo hay varias opciones para restringir el API

## Clase 292 Android Configuración Google Maps

- En build.gradle en ext pegar playServicesVersion = `"17.0.0"`
- Pegar en android/app/build.gradle en la parte de dependencies

```
implementation(project(':react-native-maps')){
       exclude group: 'com.google.android.gms', module: 'play-services-base'
       exclude group: 'com.google.android.gms', module: 'play-services-maps'
   }
   implementation 'com.google.android.gms:play-services-base:17.2.1'
   implementation 'com.google.android.gms:play-services-maps:17.0.0'
```

- Agregar el API key en android/app/src/main/AndroidManifest.xml

```
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>

   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
</application>
```

- `npx react-native run-android`

## Clase 293 iOS Configuración Google Maps

- `npx pod-install`
- Habilitar google Maps en `AppDelegate.m` y pego
  `#import <GoogleMaps/GoogleMaps.h>`
- En el mismo archivo busco la funcion
  `(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`

y pego con el API key ´[GMSServices provideAPIKey:@"_YOUR_API_KEY_"];´

- En Podfile arriba de ´use_native_modules!´ pego

```
rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path
```

- `npx pod-install`
- En MapView utilizar `provider={PROVIDER_GOOGLE}`

<!-- > ### Aplicación realizada con React Native consiste en una aplicación tipo Pokedex -->

<!-- - Ejecuta `cd RN-Pokedex`
- Ejecuta `yarn install`
- Si lo ejecutas para iOS `npx pod-install && npx react-native run-ios`
- Si lo ejecutas para Android `npx react-native run-android` -->
