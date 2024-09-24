import React, {Component, ReactNode} from 'react';
import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import Row from '../../../Row';
import Icon from '../../../Icon';
import Dropdown from '../../../Dropdown';

import {DropdownItem, DropdownControlType} from '../../../Dropdown/types';
import {AlignType, OrientationType} from '../../../../asserts/types/style-types';
import {ActiveTabStyle, TabType} from './types';
import './index.css';

type TabProps = {
    navigate: NavigateFunction,
    path: string,
    activeTabId: string,
    tab: TabType,
    endDivider: boolean,
    activeTabStyle?: ActiveTabStyle,
    style?: any,
    dropdownItems?: {id: string, component: ReactNode}[],
    onSelectTab?: Function,
    onHoverTab?: Function
}

type TabStates = {
    dropdownItems: DropdownItem[],
    hovered: boolean
}

class TabComponent extends Component<TabProps, TabStates> {

    public static defaultProps = {
        activeTabStyle: ActiveTabStyle.STANDARD,
        endDivider: false,
    }

    constructor(props: TabProps) {
        super(props);

        this.state = {
            dropdownItems: [],
            hovered: false
        }
    }

    handleClick = (e: any) => {
        if (e.nativeEvent.button === 0) {
            this.props.onSelectTab?.(this.props.tab.id);
            this.props.navigate(this.props.tab.link);
        }

        e.preventDefault();
    }

    handleHover = () => this.props.onHoverTab?.(this.props.tab.id);
    handleBlur = () => this.props.onHoverTab?.(null);

    get activeTabStyle() {

        // if (this.props.tab.link !== this.props.path) { return 'inactive-tab'; }
        if (this.props.activeTabId !== this.props.tab.id) { return 'inactive-tab'; }

        return ActiveTabStyle.DROPDOWN === this.props.activeTabStyle ? 'active-tab-dropdown'
            : 'active-tab';
    }

    get className(): string {
        return 'tab-container ' + this.activeTabStyle;
    }

    render() {
        const pinned = this.props.tab?.pinned ?? false;

        if (!this.props.dropdownItems?.length) {

            return (
                <Row h={'50px'}
                     className={this.className}
                     onClick={this.handleClick}
                     onMouseEnter={this.handleHover}
                     onMouseLeave={this.handleBlur}
                >
                    <Row className={'tab-content'}
                         verticalAlign={'center'}
                    >
                        <Icon w={'25px'} h={'25px'}
                              style={{ paddingTop: '3px' }}
                              lib={this.props.tab.iconLib}
                              name={this.props.tab.icon} />
                        {!pinned &&
                            <div className={'tab-name'}>
                                {this.props.tab.name}
                            </div>
                        }
                    </Row>
                </Row>
            )
        }

        return (
            <Dropdown
                style={this.props.style}
                className={this.className}
                control={DropdownControlType.RIGTH}
                items={this.props.dropdownItems}
            >
                <Row h={'50px'}
                     onClick={this.handleClick}
                     onMouseEnter={this.handleHover}
                     onMouseLeave={this.handleBlur}
                >
                    <Row className={'tab-content'}
                         verticalAlign={'center'}
                    >
                        <Icon w={'25px'} h={'25px'}
                              style={{ paddingTop: '3px' }}
                              lib={this.props.tab.iconLib}
                              name={this.props.tab.icon} />
                        {!pinned &&
                            <div className={'tab-name'}>
                                {this.props.tab.name}
                            </div>
                        }
                    </Row>
                </Row>
            </Dropdown>
        )
    }
}

export default (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <TabComponent
            navigate={navigate}
            path={location.pathname}
            activeTabId={props.activeTabId}
            tab={props.tab}
            endDivider={props.endDivider}
            activeTabStyle={props.activeTabStyle}
            style={props.style}
            dropdownItems={props.dropdownItems}
            onSelectTab={props.onSelectTab}
            onHoverTab={props.onHoverTab} />
    )
};