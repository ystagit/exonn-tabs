import React, { Component } from 'react';
import Row from '../../../../components/Row';
import Space from '../../../../components/Space';
import './index.css';

type NoTabProps = {
    description?: string
};

class NoTab extends Component<NoTabProps> {

    render() {

        return <div className={'no-tab-container'} >
            <Space hSize={'100px'}/>
            <Row horizontalAlign={'center'}>
                <div className={'no-tab-header'}>
                    404
                </div>
            </Row>
            <Space hSize={'10px'}/>
            <Row horizontalAlign={'center'}>
                <div className={'no-tab-content'}>
                    {this.props.description ?? 'Not found the tab'}
                </div>
            </Row>
        </div>
    }
}

export default NoTab;