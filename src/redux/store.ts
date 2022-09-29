import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slicer/app';

export const store = configureStore({
  reducer: {
    appSlice: appSlice,
  },
});
