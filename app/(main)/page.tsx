"use client";
import { FeedTabs, FeedTabPanel } from "../components/FeedTabs";
import Tweet from "../components/Tweet";
import React, { useState } from "react";
import { Card } from "@mui/material";

export default function Page({ children }: { children: React.ReactNode }) {
    const [currentTab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, tab: number) => setTab(tab);

    return (
        <Card className="p-4 overflow-y-scroll container-scroll">
            <FeedTabs currentTab={currentTab} handleTabChange={handleTabChange}>
                <FeedTabPanel currentTab={currentTab} tabIndex={0}>
                    <Tweet likeCount={19} commentCount={4} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                    <Tweet likeCount={74} commentCount={1} />
                </FeedTabPanel>
                <FeedTabPanel currentTab={currentTab} tabIndex={1}>
                    <Tweet likeCount={10} commentCount={8} />
                </FeedTabPanel>
            </FeedTabs>
        </Card>
    );
}
