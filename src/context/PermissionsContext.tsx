import React, {createContext, useState} from 'react';
import {PermissionStatus} from 'react-native-permissions';

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
  const askLocationPermissioins = () => {};
  const checkLocatioinPermisson = () => {};
  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermissioins, checkLocatioinPermisson}}>
      {children}
    </PermissionsContext.Provider>
  );
};
