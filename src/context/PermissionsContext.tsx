import React, {createContext, useState} from 'react';
import {Platform} from 'react-native';
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
  const checkLocatioinPermisson = () => {};
  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermissioins, checkLocatioinPermisson}}>
      {children}
    </PermissionsContext.Provider>
  );
};
