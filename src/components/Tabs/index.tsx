import {connect} from 'react-redux';
import {Action} from 'redux-saga';
import {Dispatch} from 'react';
import {TabData} from '../../reducers/components/tabs/types';
import {changeTabPosition, initTabs, updateTabPin} from '../../reducers/components/tabs/actions';
import {getEntity} from '../../reducers/storage/actions';
import {EntityType} from '../../helpers/storage/entity/types';

import TabsComponent from './component';

const mapStateToProps = (state: any) => ({
    hoverTabId: state.storage?.tabs?.hoverTabId ?? null,
    activeTabId: state.storage?.tabs?.activeTabId ?? null,
    unpinnedTabs: state.storage?.tabs?.unpinnedTabs ?? [],
    pinnedTabs: state.storage?.tabs?.pinnedTabs ?? [],
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onInitTabs: (tabs: TabData[]) => {
        dispatch(initTabs(tabs));
    },
    onLoadTabs: (callback: Function) => {
        dispatch(getEntity(EntityType.TABS, callback));
    },
    onUpdateTabPin: (id: string, pinned: boolean) => {
        dispatch(updateTabPin(id, pinned));
    },
    onChangeTabPosition: (id: string, nextIndex: number) => {
        dispatch(changeTabPosition(id, nextIndex));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabsComponent);