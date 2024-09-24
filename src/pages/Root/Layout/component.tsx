import React, {Component} from 'react';
import {Outlet} from 'react-router-dom';
import Tabs from '../../../components/Tabs';

import useDeviceDetection from '../../../hooks/useDeviceDetection';
import './index.css';

type LayoutProps = {
    device: string,
    onChangeDeviceType: Function
}

type LayoutState = {
    width: number,
    height: number,
}

class LayoutComponent extends Component<LayoutProps, LayoutState> {

    constructor(props: LayoutProps) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    handleResize = () => this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });

    get height() {
        const height = (this.state.height - 65) + 'px';

        return {
            height,
            maxHeight: height
        };
    }

    render() {

        return (
            <div>
                <div className={'layout-container'}>
                    <nav className="header-wrapper">
                        <Tabs />
                    </nav>
                    <div className={'body-context'} style={this.height}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        )
    }

    shouldComponentUpdate(nextProps:Readonly<LayoutProps>) {
        nextProps.onChangeDeviceType(nextProps.device);
        return true;
    }
}

export default (props: any) => {
    const device = useDeviceDetection();
    return <LayoutComponent device={device}
                            onChangeDeviceType={props.onChangeDeviceType} />
}