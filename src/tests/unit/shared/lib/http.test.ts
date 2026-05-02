


import axios from 'axios';
import { Stock } from '../../../../services/mockStockService';
import { fetchData } from '../../../../shared/lib/http';

jest.mock('axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('fetchData', () => {
	beforeEach(() => {
		mockedAxios.mockReset();
	});

	it('returns response data from a GET request', async () => {
		const data: Stock[] = [
            { id: "1", symbol: 'AAPL', price: 189.32 },
            { id: "2", symbol: 'GOGL', price: 78.56 },
        ];

		mockedAxios.mockResolvedValueOnce({
			data,
		} as Awaited<ReturnType<typeof axios>>);

		await expect(fetchData<typeof data>('/api/stocks')).resolves.toEqual(data);
		expect(mockedAxios).toHaveBeenCalledWith({
			url: '/api/stocks',
			method: 'GET',
		});
	});

	it('rethrows axios errors', async () => {
		const error = new Error('Network error');

		mockedAxios.mockRejectedValueOnce(error);

		await expect(fetchData('/api/stocks')).rejects.toThrow('Network error');
	});
});