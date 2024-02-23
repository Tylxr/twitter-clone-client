import { getCookie } from "cookies-next";
import { fetchConfig, fetchResponse } from "../types";

// Private fetch wrapper for Core Service
export default async function coreFetch(url: string, config?: Partial<fetchConfig>): Promise<fetchResponse> {
    // Format url
    if (!url) {
        console.error("No url supplied to fetchAuth service.");
        return;
    }
    const fetchUrl = url.includes("http")
        ? url
        : `${process.env.NEXT_PUBLIC_CORE_BASE_URL}${url[0] === "/" ? url : "/" + url}`;

    // Setup headers
    const headers: HeadersInit = [["Content-Type", "application/json"]];
    if (config?.headers) headers.push(...config.headers);
    const accessToken = getCookie("twitter_token");
    const authHeader: [string, string] | undefined = accessToken
        ? ["Authorization", `Bearer ${accessToken}`]
        : undefined;
    if (!authHeader) {
        console.error("No auth header present for coreFetch service.");
        return;
    }
    headers.push(authHeader);

    // Setup method
    const method = config?.method || "POST"; // default to POST

    // Perform request
    return await fetch(fetchUrl, {
        headers,
        method,
        [method === "GET" ? "query" : "body"]: config?.body ? JSON.stringify(config.body) : "{}",
        credentials: "include",
    })
        .then(async (data) => await { status: data.status, data: await data.json() })
        .catch((err) => {
            console.error(err);
            return undefined;
        });
}
