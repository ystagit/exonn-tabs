import React, {Component} from 'react';
import Tab from './components/Tab';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import ItemRowMover from '../ItemRowMover';
import ItemRowScroller from '../ItemRowScroller';
import Divider from '../Divider';
import Row from '../Row';
import PinButton from './components/PinButton';

import {OrientationType} from '../../asserts/types/style-types';
import {TabData} from '../../reducers/components/tabs/types';
import {ActiveTabStyle} from './components/Tab/types';
import tabsJson from '../../asserts/fomrs/tabs.json';

import './index.css';

type TabsComponentProps = {
    hoverTabId: string,
    activeTabId: string,
    unpinnedTabs: TabData[],
    pinnedTabs: TabData[],
    onLoadTabs: any,
    onInitTabs: any,
    onUpdateTabPin: any,
    onChangeTabPosition: Function,
}

type TabsComponentStates = {
    visibleItems: boolean[],
}

class TabsComponent extends Component<TabsComponentProps, TabsComponentStates> {

    constructor(props: TabsComponentProps) {
        super(props);

        this.state = {
            visibleItems: []
        }
    }

    handleChangePin = (id: string, pinned: boolean) =>
        this.props.onUpdateTabPin?.(id, pinned);

    handleChangeTabPosition = (id: string, nextIndex: number) => {
        if (id && nextIndex !== -1) {
            this.props.onChangeTabPosition?.(id, nextIndex);
        }
    }

    handleChangeVisibleItems = (visibleItems: boolean[]) => {
        this.setState({ visibleItems });
    }

    renderItemComponent = (tab: any, last: boolean = false) => {
        const handleChangePin = (pinned: boolean) =>
            this.handleChangePin(tab.id, pinned);

        return (
            <Tab
                tab={tab}
                dropdownItems={[
                    {
                        id: '0',
                        component: <PinButton pinned={tab.pinned} onClick={handleChangePin} />
                    }
                ]}
                endDivider={!last} />
        )
    }

    get dropdownItems() {
        const { visibleItems } = this.state;

        if (!visibleItems?.length) { return []; }

        const dropdownItems: any = [];
        const notPinnedTabs = this.props.unpinnedTabs?.filter((tab) => !tab.pinned) ?? [];

        visibleItems.forEach((visible, index) => {
            if (!visible) {
                const tab = notPinnedTabs[index];

                if (tab) {
                    dropdownItems.push({
                        id: index,
                        component: <Tab tab={tab}
                                            style={{borderRadius: '5px'}}
                                            activeTabStyle={ActiveTabStyle.DROPDOWN} />
                    });
                }
            }
        })

        return dropdownItems;
    }

    render() {
        if (!this.props.unpinnedTabs?.length && !this.props.pinnedTabs?.length) { return; }

        const dropdownItems = this.dropdownItems;

        return (
            <div className={'tabs-wrapper'}>
                <Row>
                    <ItemRowMover
                        isMoveable={false}
                        hoverItemId={this.props.hoverTabId}
                        activeItemId={this.props.activeTabId}
                        items={this.props.pinnedTabs}
                        renderItemComponent={this.renderItemComponent} />
                    <Divider
                        orientation={OrientationType.VERICAL} />
                </Row>
                <ItemRowScroller
                    depth={[ 0 ]}
                    onChangeVisibleItems={this.handleChangeVisibleItems}
                >
                    <ItemRowMover
                        hoverItemId={this.props.hoverTabId}
                        activeItemId={this.props.activeTabId}
                        items={this.props.unpinnedTabs}
                        renderItemComponent={this.renderItemComponent}
                        onChangeComplete={this.handleChangeTabPosition} />
                </ItemRowScroller>
                <Dropdown
                    disabled={dropdownItems.length === 0}
                    items={dropdownItems}
                    itemComponent={(visible: boolean, disabled: boolean) => (
                        <Icon w={'25px'} h={'25px'}
                              style={{
                                  cursor: 'pointer',
                                  height: '100%',
                                  background: disabled ? '#e6e6e6' : visible ? '#009dff' : '#FFF',
                                  color: (disabled || visible) ? '#FFF' : '#c5c5c5',
                              }}
                              name={visible ? 'MdKeyboardArrowUp' : 'MdKeyboardArrowDown'} />
                    )}
                />
            </div>
        )
    }

    /**
     * Gets tabs from a stogare
     * Initalezes tabs from json if there are no tabs in the stogate
     * */
    componentDidMount() {

        this.props.onLoadTabs((entity: any) => {
            const tabs = entity?.model?.tabs;

            if (!tabs) {
                this.props.onInitTabs(tabsJson.tabs);
            }
        });
    }
}

export default TabsComponent;