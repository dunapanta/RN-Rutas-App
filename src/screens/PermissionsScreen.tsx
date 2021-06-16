import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BlackButton} from '../components/BlackButton';

import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermissioins} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Es necesario el uso del GPS</Text>
      <BlackButton title="Permiso" onPress={askLocationPermissioins} />
      <Text style={styles.textPermission}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  textPermission: {
    fontSize: 17,
    marginTop: 40,
  },
});
