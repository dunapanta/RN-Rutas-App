import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermissioins} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>Permissions Screen</Text>
      <Button title="Permiso" onPress={askLocationPermissioins} />
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
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
