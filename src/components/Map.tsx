import React, {useEffect, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';

export const Map = () => {
  const {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();

  useEffect(() => {
    followUserLocation();

    return () => {
      //Cancelar seguimiento
    };
  }, []);

  useEffect(() => {
    //const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: userLocation,
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: location,
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        //provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* Marcador en Mapa */}
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="titulo"
          description="descripcion marcador"
        /> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};
