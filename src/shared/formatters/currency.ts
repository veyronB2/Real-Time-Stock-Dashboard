const currencyLookup: Record<string, string> = {
    AAPL: '$',
    GOOGL: '$',
    MSFT: '£',
    AMZN: '£',
    TSLA: '$',
};


export const currencyFormatter = (value: number, symbol?: string) => {
    const currencySymbol = symbol ? currencyLookup[symbol] ?? '$' : '$';
    const formattedValue = value.toFixed(2);

    return `${currencySymbol}${formattedValue}`
}