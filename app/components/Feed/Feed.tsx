import { useEffect, useState } from "react";
import { getDataRequestBySource } from "./hooks";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setMainFeed } from "@/app/store/tweet/tweetSlice";
import Tweet from "../Tweet";
import coreFetch from "@/app/lib/coreFetch";

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
        };
        fetchData();
    }, [getData, dispatch, updateKey]);

    useEffect(() => {
        setInterval(async () => {
            if (feed.length === 0) return;

            try {
                console.log("Calling /check");
                const response = await coreFetch("/feed/fromAll/check", {
                    method: "POST",
                    body: { tweetId: feed[feed.length - 1]?._id },
                });
                if (response && response.status === 200 && response.data.latest === false) {
                    console.log("Latest is false, updating feed!");
                    setUpdateKey(updateKey + 1);
                } else {
                    console.log("Feed is showing latest tweet!");
                }
            } catch (err) {
                console.error(err);
            }
        }, 15000);

        // return () => {
        //     clearInterval(polling);
        // };
    }, [updateKey]);

    return <div>{feed?.map((tweet, i) => <Tweet key={tweet._id} data={tweet} />)}</div>;
}
