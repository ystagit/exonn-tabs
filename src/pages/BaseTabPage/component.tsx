import React, { Component } from 'react';
import Container from '../../components/Container';
import NoTab from './components/NoTab';

import {TabData} from '../../reducers/components/tabs/types';
import {TabComponnetType, TabComponents} from './tab-components';

type BaseTabPageProps = {
    activeTabId: string,
    unpinnedTabs: TabData[],
    pinnedTabs: TabData[],
}

type BaseTabPageStates = {
    activeTab: TabData | null
}

class BaseTabPageComponent extends Component<BaseTabPageProps, BaseTabPageStates> {

    constructor(props: BaseTabPageProps) {
        super(props);

        this.state = {
            activeTab: null
        }
    }

    static getDerivedStateFromProps(props : BaseTabPageProps, state : BaseTabPageStates) : any {
        const activeTab = [ ...props.unpinnedTabs, ...props.pinnedTabs ]
            .find((tab: TabData) => tab.id === props.activeTabId);
        return { activeTab }
    }

    get component() {
        let type: TabComponnetType = (TabComponnetType as any)[this.state.activeTab?.componentName];
        type = type ?? TabComponnetType.NO_TAB;
        return TabComponents[type]?.();
    }

    render() {
        if (!this.state.activeTab) { return null; }

        const component = this.component;

        if (component) {
            return (
                <Container>
                    {component}
                </Container>
            )
        }

        return null;
    }
}

export default BaseTabPageComponent;