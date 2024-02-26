import { useEffect, useState } from "react";
import { getDataRequestBySource } from "./hooks";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setMainFeed } from "@/app/store/tweet/tweetSlice";
import Tweet from "../Tweet";
import coreFetch from "@/app/lib/coreFetch";
import { publish } from "@/app/lib/events";

export type FeedProps = {
    source: "main" | "following" | "user";
    userId?: string;
};

export default function Feed(feedProps: FeedProps) {
    const [updateKey, setUpdateKey] = useState(0);
    const dispatch = useAppDispatch();
    const feed = useAppSelector(({ tweet }) => tweet.mainFeed);
    const getData = getDataRequestBySource(feedProps.source);

    useEffect(() => {
        const fetchData = async () => {
            const { error, feed } = await getData();
            if (!error) {
                dispatch(setMainFeed(feed));
            }

            setTimeout(() => {
                console.log("Emitting...");
                publish("test", 123);
            }, 5000);
        };
        fetchData();
    }, [getData, dispatch, updateKey]);

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

    return <div>{feed?.map((tweet, i) => <Tweet key={tweet._id} data={tweet} />)}</div>;
}
