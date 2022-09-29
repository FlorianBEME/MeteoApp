import {View, ImageBackground, StyleSheet, Text, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDroplet,
  faWind,
  faTemperatureHalf,
  faGauge,
} from '@fortawesome/free-solid-svg-icons/';
import {faCompass} from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import HeaderHome from '../components/home/HeaderHome';
import {
  API_KEY,
  colorByType,
  getDirection,
  getMoment,
  getTypeStatus,
  IMAGE_BY_STATUS,
} from '../common/common';
import {useDispatch, useSelector} from 'react-redux';
import {SET_FORECAST_DAY, SET_WEATHER} from '../redux/slicer/app';
import Forecast from '../components/home/Forecast';

export default function Home() {
  const dispatch = useDispatch();
  const weather = useSelector((state: any) => state.appSlice.weather);
  const location = useSelector((state: any) => state.appSlice.getLocation);

  const fadeAnimInfo = useRef(new Animated.Value(0)).current;

  const getApiUrl = (
    lat: number,
    lng: number,
    key: string,
    call: string = 'weather',
    metric: string = 'metric',
    lang: string = 'fr',
  ) => {
    return `https://api.openweathermap.org/data/2.5/${call}?lat=${lat}&lon=${lng}&units=${metric}&appid=${key}&lang=${lang}`;
  };

  const fetchWeather = async () => {
    axios
      .get(
        getApiUrl(
          location.coords.latitude,
          location.coords.longitude,
          API_KEY,
          'weather',
        ),
      )
      .then(res => {
        dispatch(SET_WEATHER(res.data));
        console.log(res.data);

        fadeIn(fadeAnimInfo);
      })
      .catch(err => console.log(err));

    // const obj = {
    //   base: 'stations',
    //   clouds: {all: 0},
    //   cod: 200,
    //   coord: {lat: 47.8621, lon: 1.8974},
    //   dt: 1664465149,
    //   id: 2989611,
    //   main: {
    //     feels_like: 13.11,
    //     humidity: 75,
    //     pressure: 1002,
    //     temp: 13.72,
    //     temp_max: 14.51,
    //     temp_min: 13.12,
    //   },
    //   name: 'Olivet',
    //   sys: {
    //     country: 'FR',
    //     id: 2041405,
    //     sunrise: 1664430500,
    //     sunset: 1664473028,
    //     type: 2,
    //   },
    //   timezone: 7200,
    //   visibility: 10000,
    //   weather: [
    //     {description: 'ciel dégagé', icon: '01d', id: 5000, main: 'Clear'},
    //   ],
    //   wind: {deg: 290, speed: 2.06},
    // };
    // dispatch(SET_WEATHER(obj));

    // fadeIn(fadeAnimInfo);
  };

  const fetchForcast = async () => {
    axios
      .get(
        getApiUrl(
          location.coords.latitude,
          location.coords.longitude,
          API_KEY,
          'forecast',
        ),
      )
      .then(res => {
        dispatch(SET_FORECAST_DAY(res.data));
        console.log(res.data);
      })
      .catch(err => console.log(err));
    // const obj = {
    //   cod: '200',
    //   message: 0,
    //   cnt: 40,
    //   list: [
    //     {
    //       dt: 1664485200,
    //       main: {
    //         temp: 11.12,
    //         feels_like: 10.53,
    //         temp_min: 9.87,
    //         temp_max: 11.12,
    //         pressure: 1006,
    //         sea_level: 1006,
    //         grnd_level: 995,
    //         humidity: 86,
    //         temp_kf: 1.25,
    //       },
    //       weather: [
    //         {id: 801, main: 'Clouds', description: 'peu nuageux', icon: '02n'},
    //       ],
    //       clouds: {all: 23},
    //       wind: {speed: 2.33, deg: 24, gust: 3.43},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-09-29 21:00:00',
    //     },
    //     {
    //       dt: 1664496000,
    //       main: {
    //         temp: 9.98,
    //         feels_like: 9.24,
    //         temp_min: 9.1,
    //         temp_max: 9.98,
    //         pressure: 1008,
    //         sea_level: 1008,
    //         grnd_level: 997,
    //         humidity: 87,
    //         temp_kf: 0.88,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 27},
    //       wind: {speed: 1.91, deg: 35, gust: 2.17},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-09-30 00:00:00',
    //     },
    //     {
    //       dt: 1664506800,
    //       main: {
    //         temp: 8.52,
    //         feels_like: 7.99,
    //         temp_min: 8.52,
    //         temp_max: 8.52,
    //         pressure: 1009,
    //         sea_level: 1009,
    //         grnd_level: 997,
    //         humidity: 85,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 31},
    //       wind: {speed: 1.47, deg: 69, gust: 1.46},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-09-30 03:00:00',
    //     },
    //     {
    //       dt: 1664517600,
    //       main: {
    //         temp: 7.46,
    //         feels_like: 6.55,
    //         temp_min: 7.46,
    //         temp_max: 7.46,
    //         pressure: 1012,
    //         sea_level: 1012,
    //         grnd_level: 999,
    //         humidity: 84,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 801, main: 'Clouds', description: 'peu nuageux', icon: '02d'},
    //       ],
    //       clouds: {all: 18},
    //       wind: {speed: 1.68, deg: 323, gust: 1.66},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-09-30 06:00:00',
    //     },
    //     {
    //       dt: 1664528400,
    //       main: {
    //         temp: 13.4,
    //         feels_like: 12.36,
    //         temp_min: 13.4,
    //         temp_max: 13.4,
    //         pressure: 1013,
    //         sea_level: 1013,
    //         grnd_level: 1001,
    //         humidity: 60,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 800, main: 'Clear', description: 'ciel dégagé', icon: '01d'},
    //       ],
    //       clouds: {all: 4},
    //       wind: {speed: 0.82, deg: 284, gust: 1.1},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-09-30 09:00:00',
    //     },
    //     {
    //       dt: 1664539200,
    //       main: {
    //         temp: 17.16,
    //         feels_like: 16,
    //         temp_min: 17.16,
    //         temp_max: 17.16,
    //         pressure: 1013,
    //         sea_level: 1013,
    //         grnd_level: 1001,
    //         humidity: 41,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 800, main: 'Clear', description: 'ciel dégagé', icon: '01d'},
    //       ],
    //       clouds: {all: 3},
    //       wind: {speed: 2.37, deg: 226, gust: 2.62},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-09-30 12:00:00',
    //     },
    //     {
    //       dt: 1664550000,
    //       main: {
    //         temp: 17.78,
    //         feels_like: 16.68,
    //         temp_min: 17.78,
    //         temp_max: 17.78,
    //         pressure: 1012,
    //         sea_level: 1012,
    //         grnd_level: 1000,
    //         humidity: 41,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 800, main: 'Clear', description: 'ciel dégagé', icon: '01d'},
    //       ],
    //       clouds: {all: 7},
    //       wind: {speed: 4.07, deg: 232, gust: 5.33},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-09-30 15:00:00',
    //     },
    //     {
    //       dt: 1664560800,
    //       main: {
    //         temp: 13.18,
    //         feels_like: 12.07,
    //         temp_min: 13.18,
    //         temp_max: 13.18,
    //         pressure: 1013,
    //         sea_level: 1013,
    //         grnd_level: 1001,
    //         humidity: 58,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 26},
    //       wind: {speed: 2.88, deg: 221, gust: 7.36},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-09-30 18:00:00',
    //     },
    //     {
    //       dt: 1664571600,
    //       main: {
    //         temp: 12.66,
    //         feels_like: 11.6,
    //         temp_min: 12.66,
    //         temp_max: 12.66,
    //         pressure: 1013,
    //         sea_level: 1013,
    //         grnd_level: 1001,
    //         humidity: 62,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04n'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 4.31, deg: 224, gust: 12.1},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-09-30 21:00:00',
    //     },
    //     {
    //       dt: 1664582400,
    //       main: {
    //         temp: 12.61,
    //         feels_like: 12.07,
    //         temp_min: 12.61,
    //         temp_max: 12.61,
    //         pressure: 1012,
    //         sea_level: 1012,
    //         grnd_level: 1000,
    //         humidity: 82,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10n'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 6.26, deg: 218, gust: 13.05},
    //       visibility: 10000,
    //       pop: 0.38,
    //       rain: {'3h': 0.44},
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-01 00:00:00',
    //     },
    //     {
    //       dt: 1664593200,
    //       main: {
    //         temp: 12.4,
    //         feels_like: 12.15,
    //         temp_min: 12.4,
    //         temp_max: 12.4,
    //         pressure: 1011,
    //         sea_level: 1011,
    //         grnd_level: 999,
    //         humidity: 94,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 501, main: 'Rain', description: 'pluie modérée', icon: '10n'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 7.47, deg: 211, gust: 16.5},
    //       visibility: 9311,
    //       pop: 1,
    //       rain: {'3h': 5.11},
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-01 03:00:00',
    //     },
    //     {
    //       dt: 1664604000,
    //       main: {
    //         temp: 13.74,
    //         feels_like: 13.65,
    //         temp_min: 13.74,
    //         temp_max: 13.74,
    //         pressure: 1011,
    //         sea_level: 1011,
    //         grnd_level: 999,
    //         humidity: 95,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10d'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 6.89, deg: 229, gust: 14.34},
    //       visibility: 10000,
    //       pop: 1,
    //       rain: {'3h': 1.74},
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-01 06:00:00',
    //     },
    //     {
    //       dt: 1664614800,
    //       main: {
    //         temp: 16.03,
    //         feels_like: 15.93,
    //         temp_min: 16.03,
    //         temp_max: 16.03,
    //         pressure: 1013,
    //         sea_level: 1013,
    //         grnd_level: 1001,
    //         humidity: 86,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10d'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 4.76, deg: 259, gust: 9.95},
    //       visibility: 10000,
    //       pop: 0.78,
    //       rain: {'3h': 1.63},
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-01 09:00:00',
    //     },
    //     {
    //       dt: 1664625600,
    //       main: {
    //         temp: 19.87,
    //         feels_like: 19.43,
    //         temp_min: 19.87,
    //         temp_max: 19.87,
    //         pressure: 1014,
    //         sea_level: 1014,
    //         grnd_level: 1002,
    //         humidity: 58,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10d'},
    //       ],
    //       clouds: {all: 76},
    //       wind: {speed: 6.36, deg: 272, gust: 10.57},
    //       visibility: 10000,
    //       pop: 0.69,
    //       rain: {'3h': 0.18},
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-01 12:00:00',
    //     },
    //     {
    //       dt: 1664636400,
    //       main: {
    //         temp: 20.69,
    //         feels_like: 20.09,
    //         temp_min: 20.69,
    //         temp_max: 20.69,
    //         pressure: 1016,
    //         sea_level: 1016,
    //         grnd_level: 1004,
    //         humidity: 49,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03d',
    //         },
    //       ],
    //       clouds: {all: 30},
    //       wind: {speed: 5.85, deg: 277, gust: 10.36},
    //       visibility: 10000,
    //       pop: 0.06,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-01 15:00:00',
    //     },
    //     {
    //       dt: 1664647200,
    //       main: {
    //         temp: 16.01,
    //         feels_like: 15.39,
    //         temp_min: 16.01,
    //         temp_max: 16.01,
    //         pressure: 1019,
    //         sea_level: 1019,
    //         grnd_level: 1007,
    //         humidity: 66,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 33},
    //       wind: {speed: 2.76, deg: 275, gust: 6.31},
    //       visibility: 10000,
    //       pop: 0.01,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-01 18:00:00',
    //     },
    //     {
    //       dt: 1664658000,
    //       main: {
    //         temp: 15.46,
    //         feels_like: 14.92,
    //         temp_min: 15.46,
    //         temp_max: 15.46,
    //         pressure: 1021,
    //         sea_level: 1021,
    //         grnd_level: 1009,
    //         humidity: 71,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 803, main: 'Clouds', description: 'nuageux', icon: '04n'},
    //       ],
    //       clouds: {all: 69},
    //       wind: {speed: 2.85, deg: 231, gust: 8.7},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-01 21:00:00',
    //     },
    //     {
    //       dt: 1664668800,
    //       main: {
    //         temp: 15.47,
    //         feels_like: 15.03,
    //         temp_min: 15.47,
    //         temp_max: 15.47,
    //         pressure: 1022,
    //         sea_level: 1022,
    //         grnd_level: 1010,
    //         humidity: 75,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 803, main: 'Clouds', description: 'nuageux', icon: '04n'},
    //       ],
    //       clouds: {all: 78},
    //       wind: {speed: 4.03, deg: 236, gust: 11.12},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-02 00:00:00',
    //     },
    //     {
    //       dt: 1664679600,
    //       main: {
    //         temp: 15.88,
    //         feels_like: 15.98,
    //         temp_min: 15.88,
    //         temp_max: 15.88,
    //         pressure: 1022,
    //         sea_level: 1022,
    //         grnd_level: 1009,
    //         humidity: 94,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04n'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 4.06, deg: 224, gust: 10.51},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-02 03:00:00',
    //     },
    //     {
    //       dt: 1664690400,
    //       main: {
    //         temp: 15.8,
    //         feels_like: 15.94,
    //         temp_min: 15.8,
    //         temp_max: 15.8,
    //         pressure: 1021,
    //         sea_level: 1021,
    //         grnd_level: 1009,
    //         humidity: 96,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10d'},
    //       ],
    //       clouds: {all: 96},
    //       wind: {speed: 3.99, deg: 212, gust: 10.8},
    //       visibility: 10000,
    //       pop: 0.2,
    //       rain: {'3h': 0.2},
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-02 06:00:00',
    //     },
    //     {
    //       dt: 1664701200,
    //       main: {
    //         temp: 16.68,
    //         feels_like: 16.75,
    //         temp_min: 16.68,
    //         temp_max: 16.68,
    //         pressure: 1022,
    //         sea_level: 1022,
    //         grnd_level: 1009,
    //         humidity: 90,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10d'},
    //       ],
    //       clouds: {all: 82},
    //       wind: {speed: 4.8, deg: 226, gust: 10.58},
    //       visibility: 10000,
    //       pop: 0.53,
    //       rain: {'3h': 0.34},
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-02 09:00:00',
    //     },
    //     {
    //       dt: 1664712000,
    //       main: {
    //         temp: 18.94,
    //         feels_like: 18.72,
    //         temp_min: 18.94,
    //         temp_max: 18.94,
    //         pressure: 1021,
    //         sea_level: 1021,
    //         grnd_level: 1009,
    //         humidity: 70,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 500, main: 'Rain', description: 'légère pluie', icon: '10d'},
    //       ],
    //       clouds: {all: 89},
    //       wind: {speed: 7.18, deg: 228, gust: 11.61},
    //       visibility: 10000,
    //       pop: 0.21,
    //       rain: {'3h': 0.27},
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-02 12:00:00',
    //     },
    //     {
    //       dt: 1664722800,
    //       main: {
    //         temp: 22.47,
    //         feels_like: 22.03,
    //         temp_min: 22.47,
    //         temp_max: 22.47,
    //         pressure: 1019,
    //         sea_level: 1019,
    //         grnd_level: 1007,
    //         humidity: 48,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03d',
    //         },
    //       ],
    //       clouds: {all: 35},
    //       wind: {speed: 6.81, deg: 243, gust: 12.65},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-02 15:00:00',
    //     },
    //     {
    //       dt: 1664733600,
    //       main: {
    //         temp: 18.62,
    //         feels_like: 18.37,
    //         temp_min: 18.62,
    //         temp_max: 18.62,
    //         pressure: 1020,
    //         sea_level: 1020,
    //         grnd_level: 1008,
    //         humidity: 70,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 49},
    //       wind: {speed: 6.81, deg: 259, gust: 13.37},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-02 18:00:00',
    //     },
    //     {
    //       dt: 1664744400,
    //       main: {
    //         temp: 14.96,
    //         feels_like: 14.52,
    //         temp_min: 14.96,
    //         temp_max: 14.96,
    //         pressure: 1022,
    //         sea_level: 1022,
    //         grnd_level: 1010,
    //         humidity: 77,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 31},
    //       wind: {speed: 5.74, deg: 273, gust: 10.82},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-02 21:00:00',
    //     },
    //     {
    //       dt: 1664755200,
    //       main: {
    //         temp: 15.02,
    //         feels_like: 14.69,
    //         temp_min: 15.02,
    //         temp_max: 15.02,
    //         pressure: 1023,
    //         sea_level: 1023,
    //         grnd_level: 1011,
    //         humidity: 81,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 803, main: 'Clouds', description: 'nuageux', icon: '04n'},
    //       ],
    //       clouds: {all: 66},
    //       wind: {speed: 3.92, deg: 281, gust: 8.33},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-03 00:00:00',
    //     },
    //     {
    //       dt: 1664766000,
    //       main: {
    //         temp: 15.09,
    //         feels_like: 14.87,
    //         temp_min: 15.09,
    //         temp_max: 15.09,
    //         pressure: 1024,
    //         sea_level: 1024,
    //         grnd_level: 1012,
    //         humidity: 85,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04n'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 3.24, deg: 354, gust: 7.19},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-03 03:00:00',
    //     },
    //     {
    //       dt: 1664776800,
    //       main: {
    //         temp: 14.57,
    //         feels_like: 14.28,
    //         temp_min: 14.57,
    //         temp_max: 14.57,
    //         pressure: 1025,
    //         sea_level: 1025,
    //         grnd_level: 1013,
    //         humidity: 84,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04d'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 2.12, deg: 36, gust: 5.54},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-03 06:00:00',
    //     },
    //     {
    //       dt: 1664787600,
    //       main: {
    //         temp: 16.05,
    //         feels_like: 15.46,
    //         temp_min: 16.05,
    //         temp_max: 16.05,
    //         pressure: 1026,
    //         sea_level: 1026,
    //         grnd_level: 1014,
    //         humidity: 67,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04d'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 2.72, deg: 51, gust: 3.6},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-03 09:00:00',
    //     },
    //     {
    //       dt: 1664798400,
    //       main: {
    //         temp: 18.44,
    //         feels_like: 17.78,
    //         temp_min: 18.44,
    //         temp_max: 18.44,
    //         pressure: 1026,
    //         sea_level: 1026,
    //         grnd_level: 1014,
    //         humidity: 55,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04d'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 2.2, deg: 64, gust: 2.63},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-03 12:00:00',
    //     },
    //     {
    //       dt: 1664809200,
    //       main: {
    //         temp: 19.44,
    //         feels_like: 18.75,
    //         temp_min: 19.44,
    //         temp_max: 19.44,
    //         pressure: 1024,
    //         sea_level: 1024,
    //         grnd_level: 1012,
    //         humidity: 50,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04d'},
    //       ],
    //       clouds: {all: 100},
    //       wind: {speed: 2.6, deg: 68, gust: 3.22},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-03 15:00:00',
    //     },
    //     {
    //       dt: 1664820000,
    //       main: {
    //         temp: 14.5,
    //         feels_like: 13.99,
    //         temp_min: 14.5,
    //         temp_max: 14.5,
    //         pressure: 1024,
    //         sea_level: 1024,
    //         grnd_level: 1012,
    //         humidity: 76,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 804, main: 'Clouds', description: 'couvert', icon: '04n'},
    //       ],
    //       clouds: {all: 85},
    //       wind: {speed: 2.42, deg: 103, gust: 4.47},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-03 18:00:00',
    //     },
    //     {
    //       dt: 1664830800,
    //       main: {
    //         temp: 12.75,
    //         feels_like: 12.33,
    //         temp_min: 12.75,
    //         temp_max: 12.75,
    //         pressure: 1023,
    //         sea_level: 1023,
    //         grnd_level: 1011,
    //         humidity: 86,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 35},
    //       wind: {speed: 1.62, deg: 99, gust: 1.8},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-03 21:00:00',
    //     },
    //     {
    //       dt: 1664841600,
    //       main: {
    //         temp: 11.65,
    //         feels_like: 11.22,
    //         temp_min: 11.65,
    //         temp_max: 11.65,
    //         pressure: 1022,
    //         sea_level: 1022,
    //         grnd_level: 1010,
    //         humidity: 90,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 25},
    //       wind: {speed: 1.37, deg: 94, gust: 1.41},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-04 00:00:00',
    //     },
    //     {
    //       dt: 1664852400,
    //       main: {
    //         temp: 10.86,
    //         feels_like: 10.4,
    //         temp_min: 10.86,
    //         temp_max: 10.86,
    //         pressure: 1021,
    //         sea_level: 1021,
    //         grnd_level: 1008,
    //         humidity: 92,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03n',
    //         },
    //       ],
    //       clouds: {all: 29},
    //       wind: {speed: 1.68, deg: 100, gust: 1.99},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-04 03:00:00',
    //     },
    //     {
    //       dt: 1664863200,
    //       main: {
    //         temp: 10.33,
    //         feels_like: 9.87,
    //         temp_min: 10.33,
    //         temp_max: 10.33,
    //         pressure: 1020,
    //         sea_level: 1020,
    //         grnd_level: 1008,
    //         humidity: 94,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03d',
    //         },
    //       ],
    //       clouds: {all: 47},
    //       wind: {speed: 1.85, deg: 107, gust: 2.23},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-04 06:00:00',
    //     },
    //     {
    //       dt: 1664874000,
    //       main: {
    //         temp: 16.22,
    //         feels_like: 15.7,
    //         temp_min: 16.22,
    //         temp_max: 16.22,
    //         pressure: 1020,
    //         sea_level: 1020,
    //         grnd_level: 1008,
    //         humidity: 69,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 803, main: 'Clouds', description: 'nuageux', icon: '04d'},
    //       ],
    //       clouds: {all: 70},
    //       wind: {speed: 1.68, deg: 140, gust: 2.39},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-04 09:00:00',
    //     },
    //     {
    //       dt: 1664884800,
    //       main: {
    //         temp: 21.03,
    //         feels_like: 20.49,
    //         temp_min: 21.03,
    //         temp_max: 21.03,
    //         pressure: 1019,
    //         sea_level: 1019,
    //         grnd_level: 1007,
    //         humidity: 50,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {
    //           id: 802,
    //           main: 'Clouds',
    //           description: 'partiellement nuageux',
    //           icon: '03d',
    //         },
    //       ],
    //       clouds: {all: 46},
    //       wind: {speed: 1.55, deg: 161, gust: 1.92},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-04 12:00:00',
    //     },
    //     {
    //       dt: 1664895600,
    //       main: {
    //         temp: 22.24,
    //         feels_like: 21.64,
    //         temp_min: 22.24,
    //         temp_max: 22.24,
    //         pressure: 1018,
    //         sea_level: 1018,
    //         grnd_level: 1006,
    //         humidity: 43,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 803, main: 'Clouds', description: 'nuageux', icon: '04d'},
    //       ],
    //       clouds: {all: 72},
    //       wind: {speed: 1.19, deg: 211, gust: 1.56},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'd'},
    //       dt_txt: '2022-10-04 15:00:00',
    //     },
    //     {
    //       dt: 1664906400,
    //       main: {
    //         temp: 16.91,
    //         feels_like: 16.25,
    //         temp_min: 16.91,
    //         temp_max: 16.91,
    //         pressure: 1019,
    //         sea_level: 1019,
    //         grnd_level: 1006,
    //         humidity: 61,
    //         temp_kf: 0,
    //       },
    //       weather: [
    //         {id: 803, main: 'Clouds', description: 'nuageux', icon: '04n'},
    //       ],
    //       clouds: {all: 54},
    //       wind: {speed: 0.42, deg: 211, gust: 0.56},
    //       visibility: 10000,
    //       pop: 0,
    //       sys: {pod: 'n'},
    //       dt_txt: '2022-10-04 18:00:00',
    //     },
    //   ],
    //   city: {
    //     id: 2989611,
    //     name: 'Olivet',
    //     coord: {lat: 47.8621, lon: 1.8974},
    //     country: 'FR',
    //     population: 22604,
    //     timezone: 7200,
    //     sunrise: 1664430500,
    //     sunset: 1664473028,
    //   },
    // };
    // dispatch(SET_FORECAST_DAY(obj));
  };
  useEffect(() => {
    fetchWeather();
    fetchForcast();
  }, []);

  useEffect(() => {
    if (!weather) {
      fadeOut(fadeAnimInfo);
    } else {
      fadeIn(fadeAnimInfo);
    }
  }, [weather]);

  const fadeIn = (ref: any) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(ref, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = (ref: any) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(ref, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      {weather && (
        <>
          <Animated.View
            style={[
              {
                opacity: fadeAnimInfo,
              },
            ]}>
            <ImageBackground
              source={
                IMAGE_BY_STATUS[getTypeStatus(weather.weather[0].id)][
                  getMoment(weather.sys.sunrise, weather.sys.sunset)
                ]
              }
              resizeMode="cover">
              <View style={{minHeight: '100%'}}>
                <HeaderHome
                  moment={getMoment(weather.sys.sunrise, weather.sys.sunset)}
                />
                <Forecast />
                <View
                  style={{
                    top: -60,
                    width: '90%',
                    backgroundColor: `rgba(
                      ${
                        colorByType[getTypeStatus(weather.weather[0].id)][
                          getMoment(weather.sys.sunrise, weather.sys.sunset)
                        ].r
                      },
                      ${
                        colorByType[getTypeStatus(weather.weather[0].id)][
                          getMoment(weather.sys.sunrise, weather.sys.sunset)
                        ].g
                      },
                      ${
                        colorByType[getTypeStatus(weather.weather[0].id)][
                          getMoment(weather.sys.sunrise, weather.sys.sunset)
                        ].b
                      },
                      0.3
                    )`,
                    padding: 12,
                    alignSelf: 'center',
                    flexDirection: 'column',
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-around',
                      marginVertical: 20,
                    }}>
                    <View style={styles.detailsContainer}>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        style={styles.icon}
                        size={25}
                      />
                      <Text style={styles.detailsContainerTitle}>Humidity</Text>
                      <Text style={styles.detailsContainerText}>
                        {weather.main.humidity} %
                      </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                      <FontAwesomeIcon
                        icon={faWind}
                        style={styles.icon}
                        size={25}
                      />
                      <Text style={styles.detailsContainerTitle}>
                        Wind Speed
                      </Text>

                      <Text style={styles.detailsContainerText}>
                        {Math.round(weather.wind.speed * 3.6)} km/h
                      </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                      <FontAwesomeIcon
                        icon={faCompass}
                        style={styles.icon}
                        size={25}
                      />
                      <Text style={styles.detailsContainerTitle}>
                        Direction
                      </Text>

                      <Text style={styles.detailsContainerText}>
                        {getDirection(weather.wind.deg)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-around',
                      marginVertical: 20,
                    }}>
                    <View style={styles.detailsContainer}>
                      <FontAwesomeIcon
                        icon={faTemperatureHalf}
                        style={styles.icon}
                        size={25}
                      />
                      <Text style={styles.detailsContainerTitle}>Feeling</Text>
                      <Text style={styles.detailsContainerText}>
                        {Math.round(weather.main.feels_like)} °C
                      </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                      <FontAwesomeIcon
                        icon={faGauge}
                        style={styles.icon}
                        size={25}
                      />
                      <Text style={styles.detailsContainerTitle}>Pressure</Text>

                      <Text style={styles.detailsContainerText}>
                        {Math.round(weather.main.pressure)} hPa
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    elevation: 40,
    color: 'white',
    marginBottom: 5,
  },
  detailsContainer: {flexDirection: 'column', alignItems: 'center'},
  detailsContainerTitle: {fontWeight: '300', color: 'white', marginBottom: 2},
  detailsContainerText: {fontWeight: '400', color: 'white'},
});
