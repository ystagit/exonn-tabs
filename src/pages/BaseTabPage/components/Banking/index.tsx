import React, { Component } from 'react';
import Row from '../../../../components/Row';

type BankingProps = {
    args?: any,
};

class Banking extends Component<BankingProps> {

    render() {

        return (
            <Row horizontalAlign={'center'}>
                It's Banking tab
            </Row>
        )
    }
}

export default Banking;