export type fetchConfig = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body: Object;
    headers: [string, string][];
};

export type fetchResponse = { status: number; data: any } | undefined;

export type AuthRequestInterceptor = { fetchUrl: string; authHeader: [string, string] };
