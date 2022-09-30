import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
} from 'react-native';
import React from 'react';

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

  const errorMsg = useSelector(
    (state: any) => state.appSlice.errorMessagePermission,
  );

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
                title="Settings"
                onPress={() => navigation.navigate('Settings')}></Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
