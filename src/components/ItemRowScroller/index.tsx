import React, { Component, ReactNode } from 'react';

import './index.css';

/**
 * Returns true if child start/end sides of the element inside parent element, otherwise false
 * |====== parent element =======|
 *     |== child element ==|
 * @param element - it's child element
 * @param parentElement - it's parent element
 * returns boolean value
 * */
const isVisible = (element: any, parentElement: any) => {
    const parentRect = parentElement?.getBoundingClientRect();
    const rect = element?.getBoundingClientRect();

    return rect &&
        rect.left >= parentRect.left &&
        rect.right <= parentRect.right+1
}

type ItemRowScrollerProps = {
    children?: ReactNode,
    depth: number[] // depth must contain index of the children
    onChangeVisibleItems?: Function
}

type ItemRowScrollerState = {
    elementRef: HTMLDivElement | null,
    childrenLength: number,
    visibleItems: boolean[],
}

class ItemRowScroller extends Component<ItemRowScrollerProps, ItemRowScrollerState> {

    public static defaultProps = {
        depth: [],
    }

    constructor(props: ItemRowScrollerProps) {
        super(props);

        this.state = {
            elementRef: null,
            childrenLength: 0,
            visibleItems: []
        }
    }


    handleInitRef = (elementRef: any) => {

        if (elementRef) {
            window.addEventListener('resize', this.handleUpdateVisibleItems);
            elementRef.addEventListener('wheel', this.handleWheel);
            elementRef.addEventListener('touchmove', this.handleUpdateVisibleItems);

            this.updateVisibleItemsFromRef(elementRef);
            this.setState({ elementRef })
        }
    }

    updateVisibleItemsFromRef = (ref: any) => {
        if (ref) {
            this.updateVisibleItems(ref, this.children)
        }
    }

    /**
     * Creates visible item list to set left/right shadows
     * and also we need to set the elements in the dropdown list
     * */
    updateVisibleItems = (ref:any, children: any) => {
        if (children) {
            const visibleItems: boolean[] = [];

            for (let i = 0; i < children.length; i++) {
                visibleItems[i] = isVisible(children[i], ref);
            }

            // console.log('ItemRowMover :: Visible items: ', visibleItems);
            this.setState({ visibleItems });
            this.props.onChangeVisibleItems?.(visibleItems);
        }
    }

    handleUpdateVisibleItems = () =>
        this.updateVisibleItemsFromRef(this.state.elementRef);

    handleWheel = (e: any) => {
        this.state.elementRef?.scrollBy(e.deltaY, 0);
        this.handleUpdateVisibleItems();
    }

    /**
     * Gets child element by depth
     * */
    get children() {
        let children: any = this.state.elementRef?.children;

        if (children && this.props.depth.length) {
            for (let i of this.props.depth) {
                const nextChildren = children[i].children;

                if (nextChildren) {
                    children = nextChildren;
                }
            }
        }

        return children;
    }

    render() {

        return (
            <div className={'item-row-scroller-container'}>
                <div className={'scroller-shadow-container'}>
                    {!this.state.visibleItems?.[0] &&
                        <div className={'left-shadow'}/>
                    }
                    {!this.state.visibleItems?.[this.state.visibleItems.length - 1] &&
                        <div className={'right-shadow'}/>
                    }
                </div>
                <div ref={this.handleInitRef}
                     className={'item-row-scroller-content'}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    /**
     * Removes listerens: whell, touchmove and resize
     * */
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleUpdateVisibleItems);
        this.state.elementRef?.removeEventListener('wheel', this.handleWheel);
        this.state.elementRef?.removeEventListener('touchmove', this.handleUpdateVisibleItems);
    }

    /**
     * Updates visible items if the number of the child elements was changed
     * */
    componentDidUpdate(prevProps: Readonly<ItemRowScrollerProps>, prevState: Readonly<ItemRowScrollerState>, snapshot?: any) {
        const {elementRef} = prevState;

        if (elementRef) {
            const children = this.children;

            if (children?.length !== this.state.childrenLength) {
                this.setState({childrenLength: children?.length ?? 0}, () => {
                    elementRef && this.updateVisibleItems(elementRef, children);
                });
            }
        }
    }
}

export default ItemRowScroller;