import { render, screen } from '@testing-library/react';

import App from '../App';
import { Provider } from 'react-redux';
import { fetchData } from '../utils/helpers';
import { store } from '../store/store';

jest.mock('../utils/helpers', () => ({
  fetchData: jest.fn(),
}));

const mockedFetchData = jest.mocked(fetchData);

describe('App Component', () => {
  beforeEach(() => {
    mockedFetchData.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders the generic exercise heading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Stock Dashboard/i)).toBeInTheDocument();
  });
});
