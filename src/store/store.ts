import { combineReducers, configureStore } from '@reduxjs/toolkit';

import stockSlice from './slices/stockSlice'

const appReducer = combineReducers({
  stockManagement: stockSlice,
});

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
