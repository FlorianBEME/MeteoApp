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

  // à extraire car répété
  const requestLocationPermission = async () => {
    dispatch(SET_LOADING_PERMISSION(true));

    try {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        dispatch(
          SET_ERROR_MESSAGE(
            'Permission as denied is necessary to access this app.',
          ),
        );
      } else {
        Location.getCurrentPositionAsync({})
          .then(location => {
            if (!location) {
              dispatch(
                SET_ERROR_MESSAGE(
                  'Permission as denied is necessary to access this app.',
                ),
              );
            }
            dispatch(CLEAR_ERROR_MESSAGE());
            dispatch(SET_LOCATION(location));
          })
          .catch(e => {
            console.error(e);
            dispatch(
              SET_ERROR_MESSAGE(
                'Permission as denied is necessary to access this app.',
              ),
            );
          });
      }
    } catch (e) {
      dispatch(
        SET_ERROR_MESSAGE(
          'Permission as denied is necessary to access this app.',
        ),
      );
    }

    setTimeout(() => {
      dispatch(SET_LOADING_PERMISSION(false));
    }, 1000);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

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
  } else if (errorMsg && !loadingPermission) {
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
            component={NotLocation}
            options={{tabBarLabel: 'Home'}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{tabBarLabel: 'Updates'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
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
            component={Home}
            options={{tabBarLabel: 'Home'}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{tabBarLabel: 'Updates'}}
          />
        </Tab.Navigator>
      </NavigationContainer>

      // <SafeAreaView style={backgroundStyle}>
      //   <StatusBar
      //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      //     backgroundColor={backgroundStyle.backgroundColor}
      //   />

      //   {locationSet && (
      //     <ScrollView
      //       contentInsetAdjustmentBehavior="automatic"
      //       style={backgroundStyle}>
      //       {/* <View
      //     style={{
      //       backgroundColor: isDarkMode ? Colors.black : Colors.white,
      //     }}>
      //     <Section title="Step One">
      //       Edit <Text style={styles.highlight}>App.tsx</Text> to change this
      //       screen and then come back to see your edits.
      //     </Section>
      //     <Section title="See Your Changes">
      //       <ReloadInstructions />
      //     </Section>
      //     <Section title="Debug">
      //       <DebugInstructions />
      //     </Section>
      //     <Section title="Learn More">
      //       Read the docs to discover what to do next:
      //     </Section>
      //     <LearnMoreLinks />
      //   </View> */}
      //       <Text>test</Text>
      //     </ScrollView>
      //   )}
      // </SafeAreaView>
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

export default WrappedApp;
