import stocksReducer, { fetchStocks } from './stocks.slice';

import type { Stock } from '../services/mockStockService';

describe('stocksSlice', () => {
    it('sets loading to true when the request starts', () => {
        const nextState = stocksReducer(undefined, fetchStocks.pending('request-1', undefined));

        expect(nextState).toEqual({
            stocks: [],
            isLoading: true,
            error: null,
        });
    });

    it('stores fetched stocks when the request succeeds', () => {
        const stocks: Stock[] = [
            { id: '1', symbol: 'AAPL', price: 189.32 },
            { id: '2', symbol: 'GOGL', price: 78.56 },
        ];

        const nextState = stocksReducer(undefined, fetchStocks.fulfilled(stocks, 'request-1', undefined));

        expect(nextState).toEqual({
            stocks,
            isLoading: false,
            error: null,
        });
    });

    it('stores an error and stops loading when the request fails', () => {
        const loadingState = {
            stocks: [],
            isLoading: true,
            error: null,
        };

        const nextState = stocksReducer(loadingState, fetchStocks.rejected(null, 'request-1', undefined, 'Network error'));

        expect(nextState).toEqual({
            stocks: [],
            isLoading: false,
            error: 'Network error',
        });
    });
});