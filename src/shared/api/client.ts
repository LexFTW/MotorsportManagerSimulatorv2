import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

class HttpClient {

    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log("HttpClient initialized with baseURL:", import.meta.env.VITE_API_URL);
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.client
            .get<T>(url, config)
            .then(r => r.data);
    }

    public post<TRequest, TResponse>(
        url: string,
        body: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        return this.client
            .post<TResponse>(url, body, config)
            .then(r => r.data);
    }

    public put<TRequest, TResponse>(
        url: string,
        body: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        return this.client
            .put<TResponse>(url, body, config)
            .then(r => r.data);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<void> {
        return this.client
            .delete(url, config)
            .then(() => undefined);
    }
}

export const httpClient = new HttpClient();