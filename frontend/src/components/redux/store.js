import { configureStore } from '@reduxjs/toolkit';
import industryDataReducer from './industryData';
import userDataReducer from './userDataSlice';

export const store = configureStore({
  reducer: {
    industryData: industryDataReducer,
    userData: userDataReducer,

  },
});