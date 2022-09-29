import {faDroplet} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import {
  colorByType,
  getIcon,
  getMoment,
  getTypeStatus,
} from '../../common/common';

export default function Forecast() {
  const forecast = useSelector(
    (state: {appSlice: AppSlice}) => state.appSlice.forecast,
  );
  const weatherNow = useSelector(
    (state: {appSlice: AppSlice}) => state.appSlice.weather,
  );

  return (
    <View style={stylesForecast.box}>
      {weatherNow && forecast ? (
        <View style={stylesForecast.container}>
          <FlatList
            horizontal={true}
            data={forecast}
            renderItem={({item}) => (
              <ItemRenderList item={item} weatherNow={weatherNow} />
            )}
            contentInset={{right: 20, top: 0, left: 20, bottom: 0}}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

interface IpropsItemsRender {
  item: Weather;
  weatherNow: Weather;
}

const ItemRenderList = ({item, weatherNow}: IpropsItemsRender) => {
  return (
    <View
      style={{
        ...stylesItemRenderList.container,
        backgroundColor: `rgba(
        ${
          colorByType[getTypeStatus(weatherNow.weather[0].id)][
            getMoment(weatherNow.sys.sunrise, weatherNow.sys.sunset)
          ].r
        },
        ${
          colorByType[getTypeStatus(weatherNow.weather[0].id)][
            getMoment(weatherNow.sys.sunrise, weatherNow.sys.sunset)
          ].g
        },
        ${
          colorByType[getTypeStatus(weatherNow.weather[0].id)][
            getMoment(weatherNow.sys.sunrise, weatherNow.sys.sunset)
          ].b
        },
        0.3
      )`,
      }}>
      <Text style={stylesItemRenderList.text}>
        {item.dt_txt.split(' ')[1].split(':')[0] +
          ':' +
          item.dt_txt.split(' ')[1].split(':')[1]}
      </Text>
      <Image
        style={{width: 50, height: 50, top: -8}}
        source={{
          uri: getIcon(
            item.weather[0].icon,
            getMoment(weatherNow.sys.sunrise, weatherNow.sys.sunset),
          ),
        }}
      />

      <Text style={{...stylesItemRenderList.text, marginTop: -14}}>
        {`${Math.round(item.main.temp)} °C `}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          icon={faDroplet}
          style={{marginRight: 5, color: 'white'}}
        />
        <Text style={{...stylesItemRenderList.text}}>
          {`${Math.round(item.main.humidity)} % `}
        </Text>
      </View>
    </View>
  );
};

const stylesItemRenderList = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
    fontWeight: '300',
  },
});

const stylesForecast = StyleSheet.create({
  container: {
    top: -60,
    alignSelf: 'stretch',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  box: {
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
  },
});
