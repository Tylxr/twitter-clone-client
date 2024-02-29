import coreFetch from "@/app/lib/coreFetch";
import { Tweet } from "@/app/lib/types";

export const getMainFeedData = async (): Promise<{ error: boolean; feed: Tweet[] }> => {
    try {
        const response = await coreFetch("/feed/fromAll", { method: "GET" });
        if (response && response.status === 200) {
            return response.data as { error: boolean; feed: Tweet[] };
        } else {
            console.error("Unable to get main feed.");
            return { error: true, feed: [] };
        }
    } catch (err) {
        console.error(err);
        return { error: true, feed: [] };
    }
};

export const getUserFeedData = async (username: string): Promise<{ error: boolean; feed: Tweet[] }> => {
    try {
        const response = await coreFetch(`/feed/fromUser/${username}`, { method: "GET" });
        if (response && response.status === 200) {
            return response.data as { error: boolean; feed: Tweet[] };
        } else {
            console.error("Unable to get main feed.");
            return { error: true, feed: [] };
        }
    } catch (err) {
        console.error(err);
        return { error: true, feed: [] };
    }
};
