import { combineReducers, configureStore } from '@reduxjs/toolkit';

import stockReducer from '../redux/reducers/stockReducer'

const appReducer = combineReducers({
  stockManagement: stockReducer,
});

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
