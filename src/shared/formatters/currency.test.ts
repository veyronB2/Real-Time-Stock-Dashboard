import { formatCurrency } from './currency';

describe('currencyFormatter', () => {
    it('should return value with correctly mapped currency', () => {
        expect(formatCurrency(150.25, 'AAPL')).toBe('$150.25');
        expect(formatCurrency(299.99, 'MSFT')).toBe('£299.99');
    });

    it('should return default currency for unknown symbols', () => {
        expect(formatCurrency(78.56, 'GOGL')).toBe('$78.56');
        expect(formatCurrency(700.1)).toBe('$700.10');
    });
});