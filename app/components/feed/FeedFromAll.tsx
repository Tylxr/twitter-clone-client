import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setFeed } from "@/app/store/tweet/tweetSlice";
import Tweet from "../Tweet";
import coreFetch from "@/app/lib/coreFetch";
import { subscribe, unsubscribe } from "@/app/lib/events";
import { getMainFeedData } from "./hooks";

export default function Feed() {
    // Store, state, etc
    const [updateKey, setUpdateKey] = useState(0);
    const dispatch = useAppDispatch();
    const feed = useAppSelector(({ tweet }) => tweet.mainFeed);
    const [refreshKey, setRefreshkey] = useState(0);

    // Lifecycle hooks
    useEffect(() => {
        const fetchData = async () => {
            const { error, feed: mainFeed } = await getMainFeedData();
            if (!error) {
                dispatch(setFeed({ source: "main", feed: mainFeed }));
                setRefreshkey(refreshKey + 1); // Helps to force the feed to update if a deep property has changed
            }
        };
        fetchData();

        // Listen for new tweet creation event
        subscribe("post_created", async () => {
            await fetchData();
        });

        return () => {
            unsubscribe("post_created");
        };
    }, [dispatch, updateKey]);

    useEffect(() => {
        // Polling to check for new tweets
        const polling = setInterval(async () => {
            if (feed.length === 0) return;

            try {
                const response = await coreFetch("/feed/fromAll/check", {
                    method: "POST",
                    body: { tweetId: feed[0]?._id },
                });
                if (response && response.status === 200 && response.data.latest === false) {
                    setUpdateKey(updateKey + 1);
                }
            } catch (err) {
                console.error(err);
            }
        }, 30000);

        return () => {
            clearInterval(polling);
        };
    }, [updateKey, feed]);

    if (feed.length === 0) return <p className="text-black text-center">No posts yet. Be the first!</p>;

    return (
        <div key={refreshKey}>
            {feed && feed?.map((tweet) => <Tweet key={tweet._id} data={tweet} source={"main"} />)}
        </div>
    );
}
