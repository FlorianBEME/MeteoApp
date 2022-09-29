import {createSlice} from '@reduxjs/toolkit';
import {LocationObject} from 'expo-location';

const initialState: AppSlice = {
  getLocation: null,
  weather: null,
  forecast: null,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    SET_LOCATION: (state, action) => {
      state.getLocation = action.payload;
    },
    SET_WEATHER: (state, action) => {
      state.weather = action.payload;
    },
    SET_FORECAST_DAY: (state, action) => {
      state.forecast = [...action.payload.list];
    },
  },
});

export const getLocation = (state: {appSlice: AppSlice}) =>
  state.appSlice.getLocation;
export const getWeather = (state: {appSlice: AppSlice}) =>
  state.appSlice.weather;
export const getForecast = (state: {appSlice: AppSlice}) =>
  state.appSlice.weather;

export const {SET_LOCATION, SET_WEATHER, SET_FORECAST_DAY} = appSlice.actions;

export default appSlice.reducer;
