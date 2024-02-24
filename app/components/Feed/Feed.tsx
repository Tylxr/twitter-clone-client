import { useEffect } from "react";
import { getDataRequestBySource } from "./hooks";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setMainFeed } from "@/app/store/tweet/tweetSlice";
import Tweet from "../Tweet";

export type FeedProps = {
    source: "main" | "following" | "user";
    userId?: string;
};

export default function Feed(feedProps: FeedProps) {
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
    }, [getData, dispatch]);

    return <div>{feed?.map((tweet, i) => <Tweet key={tweet._id} data={tweet} />)}</div>;
}
