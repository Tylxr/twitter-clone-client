"use client";
import { FeedTabs, FeedTabPanel } from "../components/FeedTabs";
import React, { useState } from "react";
import { Card } from "@mui/material";
import ProfileSidebar from "../components/ProfileSidebar";
import Feed from "../components/Feed/Feed";

export default function Page() {
    const [currentTab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, tab: number) => setTab(tab);

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
                                <Feed source="main" />
                            </FeedTabPanel>
                            <FeedTabPanel currentTab={currentTab} tabIndex={1}>
                                {/* <Feed source="following" /> */}
                            </FeedTabPanel>
                        </FeedTabs>
                    </Card>
                </div>
            </div>
        </>
    );
}
