import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

describe('App Component', () => {
  it('renders the generic exercise heading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Stock Dashboard Exercise/i)).toBeInTheDocument();
  });
});
