import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  containerLoading: {
    height: '100%',
    alignItems: 'stretch',
    alignContent: 'stretch',
    justifyContent: 'center',
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  containerError: {
    paddingVertical: 24,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    top: 12,
  },
  containerErrorText: {
    color: 'white',
  },
});

const requestLocationPermission = async () => {
  setLoadingPermission(true);
  let {status} = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    setErrorMsg('Permission as denied is necessary to access this app.');
  } else {
    setErrorMsg(null);
    let location = await Location.getCurrentPositionAsync({});
    dispatch(SET_LOCATION(location));
  }
  setTimeout(() => {
    setLoadingPermission(false);
  }, 1000);
};

export default function NotLocation() {
  return (
    <View style={styles.containerLoading}>
      <ImageBackground
        source={require('./assets/other/loading.jpg')}
        resizeMode="cover">
        <View style={{height: '100%'}}>
          <View style={styles.containerError}>
            <Image
              style={styles.logo}
              source={require('./assets/other/logo.png')}
            />
            <View>
              <Text style={styles.containerErrorText}>{errorMsg}</Text>
              <Button
                title="Activate Location"
                onPress={() => requestLocationPermission()}></Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
