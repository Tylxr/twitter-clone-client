import { getCookie } from "cookies-next";
import { fetchResponse } from "../types";

// Interceptors
export const requestInterceptor = () => {
    const accessToken = getCookie("twitter_token");
    const authHeader: [string, string] | undefined = accessToken
        ? ["Authorization", `Bearer ${accessToken}`]
        : undefined;

    return { authHeader };
};
export const responseInterceptor = (response: fetchResponse) => {
    
    return response;
};
