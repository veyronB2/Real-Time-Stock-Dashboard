import { currencyFormatter } from "../../../../shared/formatters/currency";

describe('currencyFormatter', () => {
    it('should return value with correctly mapped currency', () => {
        expect(currencyFormatter(150.25, 'AAPL')).toBe('$150.25');
        expect(currencyFormatter(299.99, 'MSFT')).toBe('£299.99');
    });

    it('should return default currency for unknown symbols', () => {
        expect(currencyFormatter(78.56, 'GOGL')).toBe('$78.56');
        expect(currencyFormatter(700.1)).toBe('$700.10');
    });
});