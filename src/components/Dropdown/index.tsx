import React, {Component, ReactNode} from 'react';
import Divider from '../Divider';
import {v4 as uuidv4} from 'uuid';
import {DropdownControlType, DropdownItem} from './types';
import {AlignType} from '../../asserts/types/style-types';
import Duration from '../../helpers/shared/duration';

import './index.css';

type DropdownProps = {
    children?: ReactNode,
    items?: DropdownItem[],
    itemComponent?: Function,
    control?: DropdownControlType
    className?: string,
    style?: any,
    disabled?: boolean,
    onClick?: Function,
}

type DropdownStates = {
    dropdownContentId: string,
    visible: boolean
}

class Dropdown extends Component<DropdownProps, DropdownStates> {

    public static defaultProps = {
        control: DropdownControlType.LEFT,
        items: [],
        disabled: false
    }

    elementRef: HTMLDivElement | null = null;
    duration = new Duration();

    constructor(props: DropdownProps) {
        super(props);
        
        this.state = {
            dropdownContentId: uuidv4(),
            visible: false,
        }
    }

    setPosition = (e: any) => {
        const element: any = this.elementRef;
        const rect = element?.getBoundingClientRect();

        if (rect) {
            if (window.innerWidth - e.pageX < rect.width) {
                element.style.right = 0;
                element.style.marginRight = '5px';
            } else {
                element.style.left = e.pageX + 'px';
                element.style.top = e.pageY + 15 + 'px';
            }
        }
    }

    clearRightAlign = () => {
        const element: any = this.elementRef;

        if (element) {
            element.style.right = null;
            element.style.marginRight = null;
        }
    }

    handlePress = (e: any) => {
        e.preventDefault();

        if (this.props.disabled) {

            if (this.state.visible) {
                this.setState({ visible: false });
            }

            return null;
        }

        if (this.state.visible
            && this.props.control === DropdownControlType.RIGTH
            && e.nativeEvent.button === 0)
        {
            this.clearRightAlign();
            this.setState({ visible: false });
        } else if (
            this.props.control === DropdownControlType.LEFT && e.nativeEvent.button === 0
            || this.props.control === DropdownControlType.RIGTH && e.nativeEvent.button === 2
        ) {
            const visible = !this.state.visible;

            if (visible) {
                this.setPosition(e);
                e.stopPropagation();
            } else {
                this.clearRightAlign();
            }

            this.setState({ visible });
        }

        this.props.onClick?.(e);
    }



    handleMouseEnter = () => {
        if (this.duration.isStarted()) {
            this.duration.stop();
        }
    }

    handleMouseLeave = () => {
        if (this.props.disabled) { return null; }

        this.duration.start(300).then(() => {
            this.clearRightAlign();
            this.setState({ visible: false });
        });
    }

    render() {
        const items = this.props.items;

        return (
            <div className={'dropdown-container ' + (this.props.className ?? '')}
                 style={this.props.style}
                 onMouseLeave={this.handleMouseLeave}
                 onMouseEnter={this.handleMouseEnter}
                 onClick={this.handlePress}
                 onContextMenu={this.handlePress}
            >
                {!this.props.itemComponent && this.props.children}
                {this.props.itemComponent?.(this.state.visible, this.props.disabled)}
                <div ref={(ref) => this.elementRef = ref}
                     className={'dropdown-content dropdown-scroll ' + (this.state.visible && 'dropdown-visible')}>
                        {items?.map((item: DropdownItem, index) => (
                            <div key={item.id}>
                                {item.component}
                                {index !== items.length - 1 &&
                                    <Divider align={AlignType.CENTER} width={'90%'}/>
                                }
                            </div>
                        ))}
                </div>
            </div>
        )
    }

    handleHideDropdown = () => {
        if (this.state.visible) {
            this.setState({ visible: false });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleHideDropdown);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleHideDropdown);
    }
}

export default Dropdown;