import {connect} from 'react-redux';
import {Action} from 'redux-saga';
import {Dispatch} from 'react';
import {selectTab, hoverTab} from '../../../../reducers/components/tabs/actions';

import TabComponent from './component';


const mapStateToProps = (state: any) => ({
    activeTabId: state.storage.tabs?.activeTabId ?? null
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onSelectTab: (id: string) => {
        dispatch(selectTab(id))
    },
    onHoverTab: (id: string) => {
        dispatch(hoverTab(id))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabComponent);