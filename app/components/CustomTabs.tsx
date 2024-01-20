import { Tab, Tabs } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, Fragment } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import { Face, PeopleAlt } from "@mui/icons-material";

interface CustomTabsProps {
    children: React.ReactNode;
    currentTab: number;
    handleTabChange: (e: React.SyntheticEvent, tab: number) => void;
}

export function CustomTabs(props: CustomTabsProps) {
    return (
        <>
            <Tabs value={props.currentTab} onChange={(e, tab) => props.handleTabChange(e, tab)}>
                <Tab icon={<PeopleAlt />} iconPosition="start" label="Everyone"></Tab>
                <Tab icon={<Face />} iconPosition="start" label="Following"></Tab>
            </Tabs>
            <div className="mt-4">{props.children}</div>
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
