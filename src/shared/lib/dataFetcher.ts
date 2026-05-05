import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
