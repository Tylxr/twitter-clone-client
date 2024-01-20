"use client";
import { CustomTabs, CustomTabPanel } from "../components/CustomTabs";
import Tweet from "../components/Tweet";
import React, { useState } from "react";

export default function Page({ children }: { children: React.ReactNode }) {
    const [currentTab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, tab: number) => setTab(tab);

    return (
        <div className="">
            <CustomTabs currentTab={currentTab} handleTabChange={handleTabChange}>
                <CustomTabPanel currentTab={currentTab} tabIndex={0}>
                    <div className="mb-4">
                        <Tweet />
                    </div>
                    <div className="mb-4">
                        <Tweet />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} tabIndex={1}>
                    <div className="mb-4">
                        <Tweet />
                    </div>
                </CustomTabPanel>
            </CustomTabs>
        </div>
    );
}
