import {View, Text, StyleSheet} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationPin} from '@fortawesome/free-solid-svg-icons/faLocationPin';
import React from 'react';

export default function Header() {
  console.log('test');
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <FontAwesomeIcon icon={faLocationPin} size={52} />

        <Text>Header</Text>
      </View>
      <Text>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  location: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'grey',
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
