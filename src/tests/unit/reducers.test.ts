import stockReducer, { fetchStock } from '../../redux/reducers/stockReducer';

import type { Stock } from '../../services/mockStockService';

describe('stockReducer', () => {
	it('sets loading to true when the request starts', () => {
		const nextState = stockReducer(
			undefined,
			fetchStock.pending('request-1', undefined),
		);

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

		const nextState = stockReducer(
			undefined,
			fetchStock.fulfilled(stocks, 'request-1', undefined),
		);

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

		const nextState = stockReducer(
			loadingState,
			fetchStock.rejected(null, 'request-1', undefined, 'Network error'),
		);

		expect(nextState).toEqual({
			stocks: [],
			isLoading: false,
			error: 'Network error',
		});
	});
});
