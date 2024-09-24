import React, { Component } from 'react';
import Row from '../../components/Row';
import Space from '../../components/Space';
import './index.css';

type NoFoundPageProps = {
    description?: string
};

class NoFoundPage extends Component<NoFoundPageProps> {

    render() {

        return <div className={'no-page-container'} >
            <Space hSize={'100px'}/>
            <Row horizontalAlign={'center'}>
                <div className={'no-page-header'}>
                    404
                </div>
            </Row>
            <Space hSize={'10px'}/>
            <Row horizontalAlign={'center'}>
                <div className={'no-page-content'}>
                    {this.props.description ?? 'Not found page'}
                </div>
            </Row>
        </div>
    }
}

export default NoFoundPage;