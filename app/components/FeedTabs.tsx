import { Tab, Tabs } from "@mui/material";
import React from "react";
import { PeopleAlt, Portrait } from "@mui/icons-material";

interface FeedTabsProps {
    children: React.ReactNode;
    currentTab: number;
    handleTabChange: (e: React.SyntheticEvent, tab: number) => void;
}

export function FeedTabs(props: FeedTabsProps) {
    return (
        <>
            <Tabs value={props.currentTab} onChange={(e, tab) => props.handleTabChange(e, tab)} centered>
                <Tab
                    icon={<PeopleAlt fontSize="small" />}
                    iconPosition="start"
                    label="Everyone"
                    className="text-sky-800"
                    sx={{ textTransform: "revert", paddingHorizontal: 8 }}
                ></Tab>
                <Tab
                    icon={<Portrait />}
                    iconPosition="start"
                    label="Following"
                    className="text-sky-800"
                    sx={{ textTransform: "revert", paddingHorizontal: 8 }}
                ></Tab>
            </Tabs>
            <div className="mt-4">{props.children}</div>
        </>
    );
}

interface FeedTabPanelProps {
    children?: React.ReactNode;
    currentTab: number;
    tabIndex: number;
}
export function FeedTabPanel(props: FeedTabPanelProps) {
    return (
        <div role="tabpanel" hidden={props.currentTab !== props.tabIndex}>
            {props.children}
        </div>
    );
}
