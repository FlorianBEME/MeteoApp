import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';
import {NavigationContainer} from '@react-navigation/native';

import Home from './screens/Home';
import Settings from './screens/Settings';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {store} from './redux/store';
import {
  CLEAR_ERROR_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_LOADING_PERMISSION,
  SET_LOCATION,
  SET_PERMISSION,
} from './redux/slicer/app';
import NotLocation from './screens/NotLocation';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const dispatch = useDispatch();
  const loadingPermission = useSelector(
    (state: any) => state.appSlice.loadingPermission,
  );
  const errorMsg = useSelector(
    (state: any) => state.appSlice.errorMessagePermission,
  );
  const permission = useSelector((state: any) => state.appSlice.permission);

  // const getLocationInStorage = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@locationSave');

  //     if (value === null) {
  //       dispatch(
  //         SET_ERROR_MESSAGE('Location is necessary to access this app.'),
  //       );
  //     } else {
  //       return value;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getLocation = async () => {
    Location.getCurrentPositionAsync({})
      .then(location => {
        if (!location) {
          dispatch(
            SET_ERROR_MESSAGE('Locationis necessary to access this app.'),
          );
        }
        dispatch(CLEAR_ERROR_MESSAGE());
        dispatch(SET_LOCATION(location));
      })
      .catch(e => {
        console.error(e);
        dispatch(
          SET_ERROR_MESSAGE('Location is necessary to access this app.'),
        );
      });
  };

  const requestLocationPermission = async () => {
    dispatch(SET_LOADING_PERMISSION(true));

    const {status} = await Location.getForegroundPermissionsAsync();
    if (status === 'granted') {
      dispatch(SET_PERMISSION(true));
      await getLocation();
      dispatch(SET_LOADING_PERMISSION(false));
      return;
    } else {
      try {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          dispatch(
            SET_ERROR_MESSAGE(
              'Permission as denied is necessary to access this app.',
            ),
          );
        } else {
          await getLocation();
        }
      } catch (e) {
        dispatch(
          SET_ERROR_MESSAGE(
            'Permission as denied is necessary to access this app.',
          ),
        );
      }
    }

    setTimeout(() => {
      dispatch(SET_LOADING_PERMISSION(false));
    }, 1000);
  };

  useEffect(() => {
    requestLocationPermission();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permission) {
      dispatch(SET_LOADING_PERMISSION(true));
      getLocation();
      dispatch(SET_LOADING_PERMISSION(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission]);

  if (loadingPermission) {
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
                <Text style={styles.containerErrorText}>Loading</Text>
                <ActivityIndicator />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: {display: 'none'},
            swipeEnabled: false,
          }}>
          <Tab.Screen
            name="Home"
            component={errorMsg && !loadingPermission ? NotLocation : Home}
          />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    height: '100%',
    alignItems: 'stretch',
    alignContent: 'stretch',
    justifyContent: 'center',
  },
  containerError: {
    paddingVertical: 24,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerErrorText: {
    color: 'white',
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

  logo: {
    width: 200,
    height: 100,
    top: 12,
  },
});

export default WrappedApp;
