import {all, put, takeLatest} from 'redux-saga/effects';
import {v4 as uuidv4} from 'uuid';
import {TABS} from './constants';
import {TabData, TabListData} from './types';
import {EntityType} from '../../../helpers/storage/entity/types';
import {saveEntity} from '../../storage/actions';
import store from '../../../helpers/store';

function* onInitTab(action: any) {
    const {tabs} = action;

    const unpinnedTabs: TabData[] = tabs.map((tab: TabData) => {
        tab.id = uuidv4();
        return tab;
    });

    yield put(saveEntity(EntityType.TABS, {
        hoverTabId: null,
        activeTabId: unpinnedTabs[0].id,
        unpinnedTabs: unpinnedTabs,
        pinnedTabs: []
    } as TabListData));
}

function* onChangeTabPosition(action: any) {
    const {id, nextIndex} = action;
    const tabs = store.getState()?.storage?.tabs;

    if (!tabs) { return; }

    const unpinnedTabs = tabs.unpinnedTabs;
    const tempElement = unpinnedTabs.find((tab: TabData) => tab.id === id);
    const tempUnpinnedTabs: TabData[] = unpinnedTabs.filter((tab: TabData) => tab.id !== id);
    tempUnpinnedTabs.splice(nextIndex, 0, tempElement);

    yield put(saveEntity(EntityType.TABS, {
        hoverTabId: tabs.hoverTabId,
        activeTabId: tabs.activeTabId,
        unpinnedTabs: tempUnpinnedTabs,
        pinnedTabs: tabs.pinnedTabs,
    } as TabListData));
}

function* onUpdatePin(action: any) {
    const {id, pinned} = action;
    const tabs = store.getState()?.storage?.tabs;

    if (!tabs) { return; }

    const result = {
        hoverTabId: tabs.hoverTabId,
        activeTabId: tabs.activeTabId,
        unpinnedTabs: tabs.unpinnedTabs,
        pinnedTabs: tabs.pinnedTabs,
    }

    if (pinned) {
        const foundTab = tabs.unpinnedTabs.find((tab: TabData) => tab.id === id);
        if (foundTab) {
            result.unpinnedTabs = tabs.unpinnedTabs.filter((tab: TabData) => tab.id !== id);
            foundTab.pinned = true;
            result.pinnedTabs = [...tabs.pinnedTabs, foundTab];
        }
    } else {
        const foundTab = tabs.pinnedTabs.find((tab: TabData) => tab.id === id);
        if (foundTab) {
            result.pinnedTabs = tabs.pinnedTabs.filter((tab: TabData) => tab.id !== id);
            foundTab.pinned = false;
            result.unpinnedTabs = [foundTab, ...tabs.unpinnedTabs];
        }
    }

    yield put(saveEntity(EntityType.TABS, result as TabListData));
}

function* onSelect(action: any) {
    const {id, onSuccess} = action;
    const tabs = store.getState()?.storage?.tabs;

    if (!tabs) { return; }

    // Activates new tab id if the tab exists in the list
    let foundTab = tabs.unpinnedTabs.find((tab: any) => tab.id === id);

    if (!foundTab) {
        foundTab = tabs.pinnedTabs.find((tab: any) => tab.id === id);
    }

    if (foundTab) {
        yield put(saveEntity(EntityType.TABS, {
            hoverTabId: tabs.hoverTabId,
            activeTabId: foundTab.id,
            unpinnedTabs: tabs.unpinnedTabs,
            pinnedTabs: tabs.pinnedTabs,
        } as TabListData));

        onSuccess?.();
    } else {
        console.warn('Tab :: Not found tab with ID: ', id);
    }
}

function* onHover(action: any) {
    const {id} = action;
    const tabs = store.getState()?.storage?.tabs;

    if (!tabs) { return; }

    yield put(saveEntity(EntityType.TABS, {
        hoverTabId: id,
        activeTabId: tabs.activeTabId,
        unpinnedTabs: tabs.unpinnedTabs,
        pinnedTabs: tabs.pinnedTabs,
    } as TabListData));
}

export default function* watchTabs() {
    yield all([
        takeLatest([TABS.INIT], onInitTab),
        takeLatest([TABS.CHANGE_POSITION], onChangeTabPosition),
        takeLatest([TABS.UPDATE_PIN], onUpdatePin),
        takeLatest([TABS.SELECT], onSelect),
        takeLatest([TABS.HOVER], onHover),
    ])
}