import { combineReducers, configureStore } from '@reduxjs/toolkit';

import stocksSlice from '../features/stocks/slices/stocks.slice';

const appReducer = combineReducers({
  stocks: stocksSlice,
});

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
