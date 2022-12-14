import {createSlice} from '@reduxjs/toolkit';
import {LocationObject} from 'expo-location';

const initialState: AppSlice = {
  getLocation: null,
  weather: null,
  forecast: null,
  loadingPermission: false,
  errorMessagePermission: null,
  permission: false,
  locationAuto: false,
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
    SET_LOADING_PERMISSION: (state, action) => {
      state.loadingPermission = action.payload;
    },
    SET_ERROR_MESSAGE: (state, action) => {
      console.log(action.payload);
      state.errorMessagePermission = action.payload;
    },
    CLEAR_ERROR_MESSAGE: state => {
      state.errorMessagePermission = null;
    },
    SET_PERMISSION(state, action) {
      state.permission = action.payload;
    },
    SET_LOCATION_AUTO(state, action) {
      state.locationAuto = action.payload;
    },
  },
});

export const getLocation = (state: {appSlice: AppSlice}) =>
  state.appSlice.getLocation;
export const getWeather = (state: {appSlice: AppSlice}) =>
  state.appSlice.weather;
export const getForecast = (state: {appSlice: AppSlice}) =>
  state.appSlice.weather;

export const {
  SET_LOCATION_AUTO,
  SET_LOADING_PERMISSION,
  SET_LOCATION,
  SET_WEATHER,
  SET_FORECAST_DAY,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE,
  SET_PERMISSION,
} = appSlice.actions;

export default appSlice.reducer;
