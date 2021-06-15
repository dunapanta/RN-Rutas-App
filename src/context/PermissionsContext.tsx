import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permisionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermissioins: () => void;
  checkLocatioinPermisson: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permisionInitState);

  //con este useEffect siempre se el status
  //si se sale de la app en iOS -> inactive , en Android -> background
  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;

      // si esta la app esta active reviso los permisos
      checkLocatioinPermisson();
    });

    //return () => AppState.removeEventListener
  }, []);

  const askLocationPermissioins = async () => {
    let permissionsStatus: PermissionStatus;
    if (Platform.OS == 'ios') {
      //permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      //permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionsStatus,
    });
  };
  const checkLocatioinPermisson = async () => {
    let permissionsStatus: PermissionStatus;
    if (Platform.OS == 'ios') {
      permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionsStatus,
    });
  };
  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermissioins, checkLocatioinPermisson}}>
      {children}
    </PermissionsContext.Provider>
  );
};
