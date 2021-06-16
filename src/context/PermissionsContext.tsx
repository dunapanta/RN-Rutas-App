import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  openSettings,
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

  const handleAppStateChange = (state: string) => {
    if (state !== 'active') return;

    // si esta la app esta active reviso los permisos
    checkLocatioinPermisson();
  };

  //con este useEffect siempre el permiso que tiene o que otorgo el usuario
  //si se sale de la app en iOS -> inactive , en Android -> background
  useEffect(() => {
    //Tengo que hacerlo asi porque despues da error en iOS al iniciar la app
    //o en Android cunado presiono atras y vuelvo a entrar a la app
    handleAppStateChange(AppState.currentState);

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      console.log('remove ' + AppState.currentState);
      AppState.removeEventListener('change', handleAppStateChange);
    };
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
    //En caso en que el usuario nego el permiso es decir esta blocked
    //se debe redirigir para que lo habilite manualmente
    if (permissionsStatus === 'blocked') {
      openSettings();
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
      //console.log('IOS', permissionsStatus);
    } else {
      permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      //console.log('ANDRID', permissionsStatus);
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
