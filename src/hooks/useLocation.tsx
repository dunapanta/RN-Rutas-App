import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {useEffect} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
    });

    /* Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        setHasLocation(true);
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
      },
    ); */
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followUserLocation = () => {
    Geolocation.watchPosition(
      ({coords}) => {
        setUserLocation({
          longitude: coords.longitude,
          latitude: coords.latitude,
        });
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };
  return {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
  };
};
