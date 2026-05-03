import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import App from '../../App';
import { Provider } from 'react-redux';
import { act } from 'react';
import { fetchData } from '../../shared/lib/http';
import stockSlice from '../../store/slices/stockSlice';

jest.mock('../../shared/lib/http', () => {
  const actualHelpers = jest.requireActual('../../shared/lib/http');

  return {
    ...actualHelpers,
    fetchData: jest.fn(),
  };
});

const mockedFetchData = jest.mocked(fetchData);
const mockStocks = [
  { id: '1', symbol: 'AAPL', price: 150.25 },
  { id: '2', symbol: 'GOOGL', price: 2800.5 },
  { id: '3', symbol: 'MSFT', price: 299.99 },
  { id: '4', symbol: 'AMZN', price: 3450.0 },
  { id: '5', symbol: 'TSLA', price: 700.1 },
];

const renderApp = () => {
  const testStore = configureStore({
    reducer: {
      app: combineReducers({
        stockManagement: stockSlice,
      }),
    },
  });

  return render(
    <Provider store={testStore}>
      <App />
    </Provider>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedFetchData.mockResolvedValue(mockStocks);
    renderApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders dashboards header', () => {
    expect(screen.getByText(/Stock Dashboard/i)).toBeInTheDocument();
  });

  it('renders dashboards eyebrow', () => {
    expect(screen.getByText(/Market Overview/i)).toBeInTheDocument();
  });

  it("renders the grid container", () => {
    const gridContainer = screen.getByRole("grid");
    expect(gridContainer).toBeInTheDocument();
  })

  it("renders the correct number of rows", async () => {
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await screen.findByText("AAPL");
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(mockStocks.length + 1)
  })

  it("renders the correct row data", async () => {
    await act(async () => {
          jest.advanceTimersByTime(1000);
        });

        const symbolCell = await screen.findByText("AAPL");
        const priceCell = await screen.findByText(("$150.25"))

        expect(symbolCell).toBeInTheDocument();
        expect(priceCell).toBeInTheDocument();
      })
});

