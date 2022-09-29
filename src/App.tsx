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
import {Provider, useDispatch} from 'react-redux';

import * as Location from 'expo-location';
import {NavigationContainer} from '@react-navigation/native';
import {LocationObject} from 'expo-location';

import Home from './screens/Home';
import Settings from './screens/Settings';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {store} from './redux/store';
import {SET_LOCATION} from './redux/slicer/app';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const dispatch = useDispatch();

  const [locationSet, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingPermission, setLoadingPermission] = useState<boolean>(true);

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
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: {display: 'none'},
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
