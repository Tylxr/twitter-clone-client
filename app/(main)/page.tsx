"use client";
import { FeedTabs, FeedTabPanel } from "../components/FeedTabs";
import Tweet from "../components/Tweet";
import React, { useState } from "react";
import { Card } from "@mui/material";
import ProfileSidebar from "../components/ProfileSidebar";

export default function Page({ children }: { children: React.ReactNode }) {
    const [currentTab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, tab: number) => setTab(tab);

    return (
        <>
            <div className="w-full h-full md:w-1/3">
                <div className="m-4">
                    <ProfileSidebar
                        initial="T"
                        username="@tylerjeremiahh"
                        followers="1.3k"
                        following="57"
                        name="Tyler Marshall"
                        bio="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere repudiandae quasi nam sequi doloremque fugiat omnis inventore cumque deserunt, sapiente suscipit voluptatem veritatis. Placeat autem dolorem magni! Velit, dignissimos commodi!"
                    />
                </div>
            </div>
            <div className="w-full h-full md:w-2/3">
                <div className="m-4">
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
                </div>
            </div>
        </>
    );
}
