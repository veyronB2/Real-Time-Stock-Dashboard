import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Stock } from "../../services/mockStockService";
import { fetchData } from "../../utils/helpers";

interface StockState {
    stocks: Stock[];
    isLoading: boolean;
    error: unknown | null;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initialState: StockState = { 
    stocks: [],
    isLoading: false,
    error: null,
}

export const fetchStock = createAsyncThunk("stock/requestStatus", async (_, { rejectWithValue }) => {
    try {
        await wait(1000); //mimick data fetching to show loader on the table
        return await fetchData<Stock[]>('/stocks.json')
    } catch (error) {        
        return rejectWithValue(`Failed to fetch stock data ${error}`);
    }
});

const stockReducer = createSlice({
    name: "stockManagement",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchStock.pending, state => {
            state.isLoading = true;
        })
        .addCase(fetchStock.fulfilled, (state, action: PayloadAction<Stock[]>) => {
            state.stocks = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchStock.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? action.error.message ?? null;
        })
    }
})

export default stockReducer.reducer;