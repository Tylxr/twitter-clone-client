import { Tab, Tabs } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, Fragment } from "react";
import Tweet from "./Tweet";

interface CustomTabsProps {
    children: React.ReactNode;
    currentTab: number;
    handleTabChange: (e: React.SyntheticEvent, tab: number) => void;
}

export function CustomTabs(props: CustomTabsProps) {
    return (
        <>
            <Tabs value={props.currentTab} onChange={(e, tab) => props.handleTabChange(e, tab)}>
                <Tab icon={<FontAwesomeIcon icon="heart" />} label="Tab 1"></Tab>
                <Tab icon={<FontAwesomeIcon icon="comment" />} label="Second tab"></Tab>
            </Tabs>
            {props.children}
        </>
    );
}

interface CustomTabPanelProps {
    children?: React.ReactNode;
    currentTab: number;
    tabIndex: number;
}
export function CustomTabPanel(props: CustomTabPanelProps) {
    return (
        <div role="tabpanel" hidden={props.currentTab !== props.tabIndex}>
            {props.children}
        </div>
    );
}
