import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const currencyLookup: Record<string, string> = {
    AAPL: '$',
    GOOGL: '$',
    MSFT: '£',
    AMZN: '£',
    TSLA: '$',
};

export const fetchData = async <T>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios({
            url,
            method: "GET",
            ...options
        });

        return response.data
    } catch (error) {
        console.log("Error", error)
        throw error;
    }
};

export const currencyFormatter = (value: number, symbol?: string) => {
    const currencySymbol = symbol ? currencyLookup[symbol] ?? '$' : '$';
    const formattedValue = value.toFixed(2);

    return `${currencySymbol}${formattedValue}`
}
