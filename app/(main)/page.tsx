"use client";
import { FeedTabs, FeedTabPanel } from "../components/FeedTabs";
import Tweet from "../components/Tweet";
import React, { useState } from "react";
import { Card } from "@mui/material";

export default function Page({ children }: { children: React.ReactNode }) {
    const [currentTab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, tab: number) => setTab(tab);

    return (
        <Card className="p-4 bg-gray-0">
            <FeedTabs currentTab={currentTab} handleTabChange={handleTabChange}>
                <FeedTabPanel currentTab={currentTab} tabIndex={0}>
                    <div className="mb-4">
                        <Tweet likeCount={19} commentCount={4} />
                    </div>
                    <div className="mb-4">
                        <Tweet likeCount={74} commentCount={1} />
                    </div>
                </FeedTabPanel>
                <FeedTabPanel currentTab={currentTab} tabIndex={1}>
                    <div className="mb-4">
                        <Tweet likeCount={10} commentCount={8} />
                    </div>
                </FeedTabPanel>
            </FeedTabs>
        </Card>
    );
}
