import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';

import {colorByType, getTypeStatus} from '../../common/common';

export default function HeaderHome({moment}: any) {
  const weather = useSelector((state: any) => state.appSlice.weather);

  const [weatherIcon, setWeatherIcon] = useState<string | null>('');

  const getIcon = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  useEffect(() => {
    if (weather) {
      setWeatherIcon(getIcon(weather.weather[0].icon));
    }
  }, [weather]);

  return (
    <View style={{...styles.container}}>
      {weather && (
        <View
          style={{
            backgroundColor: `rgba(
              ${colorByType[getTypeStatus(weather.weather[0].id)][moment].r},
              ${colorByType[getTypeStatus(weather.weather[0].id)][moment].g},
              ${colorByType[getTypeStatus(weather.weather[0].id)][moment].b},
              0.3
            )`,
            height: 250,
            justifyContent: 'center',
            borderRadius: 20,
            top: -15,
          }}>
          <View style={{...styles.infoContainer}}>
            <Text style={styles.title}>{weather.name}</Text>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={styles.icon}
              size={20}
            />
          </View>
          <View style={{...styles.infoContainer}}>
            <Text
              style={{
                ...styles.infoContainerTemp,
                includeFontPadding: false,
              }}>
              {Math.round(weather.main.temp)}
            </Text>
            <View style={styles.infoContainerTempUnit}>
              <Text style={styles.textTempUnit}>°C</Text>
            </View>
          </View>
          <View
            style={{
              ...styles.infoContainer,
              transform: [{translateY: -15}],
            }}>
            <Text style={styles.title}>
              {`${Math.round(weather.main.temp_max)}° / ${Math.round(
                weather.main.temp_min,
              )}°`}
            </Text>
          </View>
          <View
            style={{
              ...styles.infoContainer,
              flexDirection: 'column',
            }}>
            <Text style={styles.title}>
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  infoContainerTempUnit: {
    position: 'absolute',
    top: 10,
    left: 170,
    right: 0,
    bottom: 0,
  },
  textTempUnit: {
    fontSize: 20,
    color: 'white',
  },
  container: {
    height: 400,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  infoContainerTemp: {
    color: 'white',
    fontSize: 100,
    fontWeight: '200',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  infoContainerWeather: {},
  icon: {
    color: 'white',
  },
});
