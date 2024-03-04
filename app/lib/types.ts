export type FetchConfig = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body: Object;
    headers: [string, string][];
};

export type FetchResponse = { status: number; data: any } | undefined;

export type AuthRequestInterceptor = { fetchUrl: string; authHeader: [string, string] };

export type Tweet = {
    body: string;
    comments: string[];
    createdDate: string;
    likes: string[];
    userProfile: { username: string; name: string };
    _id: string;
};

export type FeedSource = "main" | "following" | "user";

export type UserProfile = {
    _id: string;
    username: string;
    name: string;
    bio: string;
    followers: Array<string>;
    following: Array<string>;
    followersFormatted?: string;
    followingFormatted: string;
    createdDate: Date;
};
