import axios from "axios";
import { getCookie } from "cookies-next";

export const authApi = () => {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const api = axios.create({
        baseURL: authUrl,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    // Interceptors for auth...
    api.interceptors.request.use(
        function (config) {
            const twitterToken = getCookie("twitter_token");
            if (twitterToken) config.headers.Authorization = `Bearer ${twitterToken}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    // api.interceptors.response.use(
    //     function (response) {
    //         // Any status code that lie within the range of 2xx cause this function to trigger
    //         // Do something with response data
    //         return response;
    //     },
    //     function (error) {
    //         // Any status codes that falls outside the range of 2xx cause this function to trigger
    //         // Do something with response error
    //         return Promise.reject(error);
    //     }
    // );

    return api;
};
