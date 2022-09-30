import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import {LocationObject} from 'expo-location';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from 'react-redux';

import {
  CLEAR_ERROR_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_LOADING_PERMISSION,
  SET_LOCATION,
} from '../redux/slicer/app';

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

export default function NotLocation({navigation}: any) {
  const dispatch = useDispatch();

  const loadingPermission = useSelector(
    (state: any) => state.appSlice.loadingPermission,
  );
  const errorMsg = useSelector(
    (state: any) => state.appSlice.errorMessagePermission,
  );

  //   // à extraire car répéter dans le component App.tsx
  //   const requestLocationPermission = async () => {
  //     dispatch(SET_LOADING_PERMISSION(true));

  //     try {
  //       let {status} = await Location.requestForegroundPermissionsAsync();

  //       if (status !== 'granted') {
  //         dispatch(
  //           SET_ERROR_MESSAGE(
  //             'Permission as denied is necessary to access this app.',
  //           ),
  //         );
  //       } else {
  //         let location = await Location.getCurrentPositionAsync({});
  //         if (!location) {
  //           dispatch(
  //             SET_ERROR_MESSAGE(
  //               'Permission as denied is necessary to access this app.',
  //             ),
  //           );
  //         }
  //         dispatch(CLEAR_ERROR_MESSAGE());
  //         dispatch(SET_LOCATION(location));
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       dispatch(
  //         SET_ERROR_MESSAGE(
  //           'Permission as denied is necessary to access this app.',
  //         ),
  //       );
  //     }

  //     setTimeout(() => {
  //       dispatch(SET_LOADING_PERMISSION(false));
  //     }, 1000);
  //   };

  return (
    <View style={styles.containerLoading}>
      <ImageBackground
        source={require('../assets/other/loading.jpg')}
        resizeMode="cover">
        <View style={{height: '100%'}}>
          <View style={styles.containerError}>
            <Image
              style={styles.logo}
              source={require('../assets/other/logo.png')}
            />
            <View>
              <Text style={styles.containerErrorText}>{errorMsg}</Text>
              <Button
                title="Activate Location"
                onPress={() => navigation.navigate('Settings')}></Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
