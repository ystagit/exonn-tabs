import React, {Component} from 'react';
import {v4 as uuidv4} from 'uuid';
import Row from '../Row';
import Divider from '../Divider';

import {AlignType, OrientationType} from '../../asserts/types/style-types';
import {DeviceType} from '../../reducers/options/options-type';
import Duration from '../../helpers/shared/duration';
import {findElementByPosition, setElementByPosition} from '../../helpers/shared/element';
import {getPosition} from '../../helpers/shared/cursor';

type ItemRowMoverComponentProps = {
    deviceType: DeviceType,
    isMoveable?: boolean,
    hoverItemId?: string,
    activeItemId?: string,
    items: any[],
    renderItemComponent: Function,
    onChange?: Function
    onChangeComplete?: Function
}

type ItemRowMoverComponentStates = {
    elementRef: HTMLDivElement | null,
    id: string,
    originElementStyle: {
        position: string,
        left: string,
        top: string,
        color: string,
        background: string,
        minWidth: string
        width: string
        height: string
    } | null,
    element: any,
    index: number
}

class ItemRowMoverComponent extends Component<ItemRowMoverComponentProps, ItemRowMoverComponentStates> {

    public static defaultProps = {
        isMoveable: true,
    }

    focusedElementId = null;
    nextIndex = -1;
    duration = new Duration();
    
    constructor(props: ItemRowMoverComponentProps) {
        super(props);

        this.state = {
            elementRef: null,
            id: uuidv4(),
            originElementStyle: null,
            element: null,
            index: -1
        }
    }

    handleInitRef = (elementRef: HTMLDivElement) => {
        if (elementRef) { this.setState({ elementRef }); }
    }

    handleStartChangeEl = (position: { x: number, y: number }) => {
        const element: any = findElementByPosition(this.state.elementRef, position);

        if (element) {
            const originElementStyle = {
                position: element.style.position,
                left: element.style.left,
                top: element.style.top,
                color: element.style.color,
                background: element.style.background,
                minWidth: element.style.minWidth,
                width: element.style.width,
                height: element.style.height,
                zIndex: 1,
            }

            const el = element.children[0];
            el.style.background = '#666';
            el.style.width = 'unset';
            el.style.height = 'unset';
            el.style.color = '#FFF';
            el.style.zIndex = 2000;
            element.style.minWidth = (el?.getBoundingClientRect()?.width ?? 25) + 'px';

            const { nextIndex } = setElementByPosition(this.state.elementRef, position, el);

            this.setState({element: el, originElementStyle, index: nextIndex});
        }
    }

    handleChangeEl = (element: any, position: { x: number, y: number }) => {

        if (position) {
            const rect = element?.getBoundingClientRect();

            element.style.position = 'absolute';
            element.style.left = (position.x - rect.width * 0.5) + 'px';
            element.style.top = (position.y - rect.height * 0.5) + 'px';

            const { focusedElementId, nextIndex } = setElementByPosition(this.state.elementRef, position, element);

            if (nextIndex !== -1 && nextIndex !== this.state.index) {
                this.focusedElementId = focusedElementId;
                this.nextIndex = nextIndex;

                this.setState({ index: nextIndex },
                    () => this.props.onChange?.(focusedElementId, nextIndex));
            }
        }
    }

    handleEndChangeEl = () => {
        const { element, originElementStyle } = this.state;

        if (element && originElementStyle) {
            element.style.position = originElementStyle.position;
            element.style.left = originElementStyle.left;
            element.style.top = originElementStyle.top;
            element.style.color = originElementStyle.color;
            element.style.width = originElementStyle.width;
            element.style.height = originElementStyle.height;
            element.style.background = originElementStyle.background;
            element.parentElement.style.minWidth = originElementStyle.minWidth;

            if (this.focusedElementId !== null && this.nextIndex != -1) {
                this.props.onChangeComplete?.(this.focusedElementId, this.nextIndex);
            }

            this.focusedElementId = null;
            this.nextIndex = -1;
            this.setState({element: null, index: -1});
        }
    }

    handlePressDown = (e: any) => {
        const position = getPosition(e);

        if (position) {
            const element: any = findElementByPosition(this.state.elementRef, position);

            if (element) {
                const item = this.props.items.find((item) => item.id === element?.id);

                if (item?.pinned) {
                    console.log('ItemRowMover :: Item is pinned')
                    return;
                }
            }

            const timeout = this.props.deviceType === DeviceType.DESKTOP ? 300 : 2000;

            this.duration.start(timeout).then(() => {
                this.duration.stop();
                this.handleStartChangeEl(position);
            });
        }
    }

    handleMove = (e: any) => {
        const element: any = this.state.element;

        if (element) {
            const position = getPosition(e);
            position && this.handleChangeEl(element, position);
        }
    }

    handlePressUp = () => {
        if (this.duration.isStarted()) {
            this.duration.stop();
        } else {
            this.handleEndChangeEl();
        }
    }
    
    get items() {
        const {activeItemId, hoverItemId, items} = this.props;

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === activeItemId || hoverItemId && items[i].id === hoverItemId) {
                items[i].divider = false;
                if (i > 0) { items[i-1].divider = false; }
                continue;
            }

            if (i === items.length-1) { // it's last items
                items[i].divider = false;
                continue;
            }

            items[i].divider = true;
        }

        return items;
    }

    render() {
        const items = this.items;

        return (
            <Row ref={this.handleInitRef} id={this.state.id}>
                {items?.map((item, index) => {
                    return (
                        <Row style={{height: '50px'}} id={item.id} key={item.id}>
                            {this.props.renderItemComponent(item, index === items.length-1)}
                            <Divider
                                bg={item.divider ? '#FFF' : 'transparent'}
                                color={item.divider ? '#d1d1d1' : 'transparent'}
                                width={'40%'}
                                align={AlignType.CENTER}
                                orientation={OrientationType.VERICAL} />
                        </Row>
                    )
                })}
            </Row>
        )
    }

    componentDidMount() {

        if (!this.props.isMoveable) { return; }
        // For mobile
        document.addEventListener('touchstart', this.handlePressDown);
        document.addEventListener('touchmove', this.handleMove);
        document.addEventListener('touchend', this.handlePressUp);
        // For desktop
        document.addEventListener('mousedown', this.handlePressDown);
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('mouseup', this.handlePressUp);
    }

    componentWillUnmount() {
        // For mobile
        document.removeEventListener('touchstart', this.handlePressDown);
        document.removeEventListener('touchmove', this.handleMove);
        document.removeEventListener('touchend', this.handlePressUp);
        // For desktop
        document.removeEventListener('mousedown', this.handlePressDown);
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', this.handlePressUp);
    }
}

export default ItemRowMoverComponent;