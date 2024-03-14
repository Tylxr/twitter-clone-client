"use client";

import { FeedTabs, FeedTabPanel } from "../components/FeedTabs";
import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import ProfileSidebar from "../components/ProfileSidebar";
import FeedFromAll from "../components/feed/FeedFromAll";
import { initSocket } from "../lib/socket";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Tweet from "../components/Tweet";
import { Tweet as TweetType } from "../lib/types";
import { setFeed } from "../store/tweet/tweetSlice";
import coreFetch from "../lib/coreFetch";

export default function Page() {
    // Store, state, etc
    const dispatch = useAppDispatch();
    const [currentTab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, tab: number) => setTab(tab);
    const followingFeed = useAppSelector(({ tweet }) => tweet.followingFeed);

    // Lifecycle hooks
    useEffect(() => {
        const socket = initSocket();

        // Event listeners or any other Socket.io logic can be implemented here
        socket.on("connect", () => console.log("Connected to Socket.io server"));

        socket.on("FOLLOWING_FEED_UPDATED", (feed: TweetType[]) => {
            console.log("GOT FEED", feed);
            dispatch(setFeed({ source: "following", feed }));
        });

        return () => {
            // Clean up the socket connection when the component unmounts
            console.log("Disconnecting socket.io connection.");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await coreFetch(`/feed/fromFollowing`, { method: "GET" });
            if (response && !response.data.error) {
                dispatch(setFeed({ source: "following", feed: response.data.feed }));
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <>
            <div className="w-full h-full md:w-1/3">
                <div className="m-4">
                    <ProfileSidebar />
                </div>
            </div>
            <div className="w-full h-full md:w-2/3">
                <div className="m-4">
                    <Card className="p-4 overflow-y-scroll container-scroll">
                        <FeedTabs currentTab={currentTab} handleTabChange={handleTabChange}>
                            <FeedTabPanel currentTab={currentTab} tabIndex={0}>
                                <FeedFromAll />
                            </FeedTabPanel>
                            <FeedTabPanel currentTab={currentTab} tabIndex={1}>
                                {followingFeed?.map((tweet) => (
                                    <Tweet key={tweet._id} data={tweet} source={"following"} />
                                ))}
                            </FeedTabPanel>
                        </FeedTabs>
                    </Card>
                </div>
            </div>
        </>
    );
}
