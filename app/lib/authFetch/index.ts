import { getCookie } from "cookies-next";
import { fetchConfig, fetchResponse } from "../types";

export const authFetchClient = async (url: string, config?: Partial<fetchConfig>): Promise<fetchResponse> => {
    if (!url) {
        console.error("No url supplied to authFetchClient service.");
        return;
    }

    // Request setup
    config ??= {};
    if (!config.headers) config.headers = [];
    const accessToken = getCookie("twitter_token");
    const authHeader: [string, string] | undefined = accessToken
        ? ["Authorization", `Bearer ${accessToken}`]
        : undefined;
    if (authHeader) config.headers.push(authHeader);

    // Perform request
    const response = await authFetch(url, config);

    return response;
};

export const ensureAuthenticated = async (accessToken: string, refreshToken: string) => {
    const authHeader: [string, string] | undefined = accessToken
        ? ["Authorization", `Bearer ${accessToken}`]
        : undefined;
    const config: Partial<fetchConfig> = {};
    if (authHeader) config.headers = [authHeader];

    try {
        // Perform request
        const response = await authFetch("/authenticated", config);

        if ((response && response.status !== 401) || !refreshToken) return response;

        const refreshResponse = await authFetch("/refresh", {
            body: { refreshToken },
        });
        return refreshResponse;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

// Private fetch wrapper for Auth Service
const authFetch = async (url: string, config?: Partial<fetchConfig>) => {
    // Format url
    const fetchUrl = url.includes("http")
        ? url
        : `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}${url[0] === "/" ? url : "/" + url}`;

    // Setup headers
    const headers: HeadersInit = [["Content-Type", "application/json"]];
    if (config?.headers) headers.push(...config.headers);

    // Perform request
    try {
        const response = await fetch(fetchUrl, {
            headers,
            credentials: "include",
            method: config?.method || "POST", // default to POST as this is the most common endpoint type for the auth service
            body: config?.body ? JSON.stringify(config.body) : "{}",
        })
            .then(async (data) => await { status: data.status, data: await data.json() })
            .catch((err) => {
                console.error(err);
                return undefined;
            });

        return response;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
