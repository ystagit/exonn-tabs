import { TABS } from './constants';
import { TabData } from './types';

export const initTabs = (tabs: TabData[]) => {
    return { type: TABS.INIT, tabs }
}

export const changeTabPosition = (id: string, nextIndex: number) => {
    return { type: TABS.CHANGE_POSITION, id, nextIndex }
}

export const updateTabPin = (id: string, pinned: boolean) => {
    return { type: TABS.UPDATE_PIN, id, pinned }
}

export const selectTab = (id: string, onSuccess: Function | null = null) => {
    return { type: TABS.SELECT, id, onSuccess }
}

export const hoverTab = (id: string) => {
    return { type: TABS.HOVER, id }
}