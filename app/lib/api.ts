import axios from "axios";

export const authApi = () => {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const api = axios.create({
        baseURL: authUrl,
        headers: { "Content-Type": "application/json" },
    });

    // TODO: Interceptors for auth...

    return api;
};
