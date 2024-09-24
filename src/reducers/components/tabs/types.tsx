import {ReactNode} from 'react';

export interface TabListData {
    hoverTabId?: string | null,
    activeTabId?: string | null,
    pinnedTabs: TabData[],
    unpinnedTabs: TabData[]
}

export interface TabData {
    id?: string | null,
    link: string,
    icon: string,
    iconLib: string,
    name: string,
    pinned: boolean,
    componentName: any,
}