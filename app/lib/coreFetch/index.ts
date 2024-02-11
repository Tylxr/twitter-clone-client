import { fetchConfig, fetchResponse } from "../types";
import { requestInterceptor, responseInterceptor } from "./hooks";

export const coreFetchClient = async (url: string, config?: Partial<fetchConfig>): Promise<fetchResponse> => {
    if (!url) {
        console.error("No url supplied to fetchAuth service.");
        return;
    }

    // Request interceptor
    const { authHeader } = requestInterceptor();

    // Request setup
    config ??= {};
    if (!config.headers) config.headers = [];
    if (authHeader) config.headers.push(authHeader);

    // Perform request
    const response = await coreFetch(url, config);

    // Response interceptor
    const interceptedResponse = response ? responseInterceptor(response) : undefined;
    return interceptedResponse;
};

// export const ensureAuthenticated = async (accessToken: string) => {
//     const authHeader: [string, string] | undefined = accessToken
//         ? ["Authorization", `Bearer ${accessToken}`]
//         : undefined;
//     const config: Partial<fetchConfig> = {};
//     if (authHeader) config.headers = [authHeader];
//     const response = await coreFetch("/authenticated", config);
//     return response;
// };

// Private fetch wrapper for Auth Service
const coreFetch = async (url: string, config?: Partial<fetchConfig>) => {
    // Format url
    const fetchUrl = url.includes("http")
        ? url
        : `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}${url[0] === "/" ? url : "/" + url}`;

    // Setup headers
    const headers: HeadersInit = [["Content-Type", "application/json"]];
    if (config?.headers) headers.push(...config.headers);

    // Perform request
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
};
