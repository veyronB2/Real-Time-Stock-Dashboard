export interface Stock {
  id: string;
  symbol: string;
  price: number;
}

const INITIAL_STOCKS: Stock[] = [
  { id: '1', symbol: 'AAPL', price: 150.25 },
  { id: '2', symbol: 'GOOGL', price: 2800.50 },
  { id: '3', symbol: 'MSFT', price: 299.99 },
  { id: '4', symbol: 'AMZN', price: 3450.00 },
  { id: '5', symbol: 'TSLA', price: 700.10 },
];

/**
 * Simulates a WebSocket subscription for real-time stock price updates.
 * @param callback Function to call when prices update.
 * @returns A function to unsubscribe.
 */
export const subscribeToStockUpdates = (callback: (updatedStock: Stock) => void): (() => void) => {
  const currentStocks = [...INITIAL_STOCKS];

  const intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * currentStocks.length);
    const stockToUpdate = currentStocks[randomIndex];

    const fluctuation = (Math.random() * 10) - 5;

    const newPrice = Math.max(0, stockToUpdate.price + fluctuation);

    const updatedStock = {
      ...stockToUpdate,
      price: parseFloat(newPrice.toFixed(2))
    };

    currentStocks[randomIndex] = updatedStock;

    callback(updatedStock);
  }, 1000);

  return () => clearInterval(intervalId);
};
