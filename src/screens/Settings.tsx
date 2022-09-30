import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import * as Location from 'expo-location';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  CLEAR_ERROR_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_PERMISSION,
} from '../redux/slicer/app';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {API_KEY} from '../common/common';

export default function Settings({navigation}: any) {
  const dispatch = useDispatch();
  const [location, setLocation] = React.useState('');
  const [result, setResult] = React.useState<any[]>([]);

  const requestLocationPermission = async () => {
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        dispatch(
          SET_ERROR_MESSAGE(
            'Permission as denied is necessary to access this app.',
          ),
        );
      } else {
        dispatch(CLEAR_ERROR_MESSAGE());
        dispatch(SET_PERMISSION(true));
        navigation.goBack();
      }
    } catch (e) {
      dispatch(
        SET_ERROR_MESSAGE(
          'Permission as denied is necessary to access this app.',
        ),
      );
    }
  };

  const enabledLocation = async () => {
    requestLocationPermission();
    // const {status} = await Location.getForegroundPermissionsAsync();
    // console.log('status: ', status);
    // if (status === 'denied') {
    //   console.log('ici');

    // }
  };

  const searchTown = async () => {
    // https://api.openweathermap.org/geo/1.0/direct?q=vegas&appid=5f3d421c789c40e4aaf0c1561c20b22c
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`,
      )
      .then(res => {
        setResult(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTopBar}>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="gray" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'gray', left: -10}}>Settings</Text>
        <Text></Text>
      </View>

      <View>
        <View style={{paddingHorizontal: 42}}>
          <Button
            title="Enabled Location"
            onPress={() => enabledLocation()}></Button>
        </View>
      </View>
      {/* <View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            placeholder="town"
          />
          <Button title="SearchTown" onPress={() => searchTown()}></Button>
        </View>
      </View>
      <FlatList
        data={result}
        renderItem={({item}) => <ItemRender item={item} />}
        keyExtractor={item => item.id}
      /> */}
      {/* {"coords": {"accuracy": 15.12600040435791, "altitude": 153.6999969482422, "altitudeAccuracy": 1, "heading": 0, "latitude": 47.8621383, "longitude": 1.8974041, "speed": 0}, "mocked": false, "timestamp": 1664534392933} */}
    </View>
  );
}

const ItemRender = ({item}: any) => {
  console.log('item: ', item);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>{item.name}</Text>
      <Text>{item.country}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTopBar: {
    paddingTop: StatusBar.currentHeight || 0 + 10,
    paddingBottom: 12,
    alignSelf: 'stretch',
    flexDirection: 'row', // row

    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
