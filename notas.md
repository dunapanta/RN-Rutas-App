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

<!-- > ### Aplicación realizada con React Native consiste en una aplicación tipo Pokedex -->

<!-- - Ejecuta `cd RN-Pokedex`
- Ejecuta `yarn install`
- Si lo ejecutas para iOS `npx pod-install && npx react-native run-ios`
- Si lo ejecutas para Android `npx react-native run-android` -->
