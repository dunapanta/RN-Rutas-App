import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export const PermissionsScreen = () => {
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

  return (
    <View style={styles.container}>
      <Text>Permissions Screen</Text>
      <Button title="Permiso" onPress={checkLocationPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
