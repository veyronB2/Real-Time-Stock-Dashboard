import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Stock } from '../services/mockStockService';
import { fetchData } from '../../../shared/lib/dataFetcher';

interface StocksState {
    stocks: Stock[];
    isLoading: boolean;
    error: unknown | null;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initialState: StocksState = {
    stocks: [],
    isLoading: false,
    error: null,
};

export const fetchStocks = createAsyncThunk('stocks/requestStatus', async (_, { rejectWithValue }) => {
    try {
        await wait(1000);
        return await fetchData<Stock[]>('/stocks.json');
    } catch (error) {
        return rejectWithValue(`Failed to fetch stock data ${error}`);
    }
});

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStocks.fulfilled, (state, action: PayloadAction<Stock[]>) => {
                state.stocks = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? action.error.message ?? null;
            });
    },
});

export default stocksSlice.reducer;